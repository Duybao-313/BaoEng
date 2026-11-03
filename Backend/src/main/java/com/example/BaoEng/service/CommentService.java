package com.example.BaoEng.service;

import com.example.BaoEng.dto.CommentResponse;
import com.example.BaoEng.dto.CreateCommentRequest;
import com.example.BaoEng.dto.ReplyCommentRequest;
import com.example.BaoEng.entity.Comment;
import com.example.BaoEng.entity.User;
import com.example.BaoEng.enums.CommentTargetType;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.CommentRepository;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.repository.UserRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý bình luận & phản hồi (FR-TEACHER-06, FR-STUDENT-06).
 */
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final NotificationService notificationService;

    public CommentService(
            CommentRepository commentRepository,
            UserRepository userRepository,
            TopicRepository topicRepository,
            LessonRepository lessonRepository,
            NotificationService notificationService) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.lessonRepository = lessonRepository;
        this.notificationService = notificationService;
    }

    /** Danh sach binh luan goc; loc theo targetType + targetId khi co. */
    public List<CommentResponse> list(String targetType, Long targetId) {
        boolean filtered = targetType != null && !targetType.isBlank() && targetId != null;
        List<Comment> roots = filtered
                ? commentRepository
                        .findByTargetTypeAndTargetIdAndParentCommentIdIsNullOrderByCreatedAtDesc(
                                parseTargetType(targetType), targetId)
                : commentRepository.findByParentCommentIdIsNullOrderByCreatedAtDesc();

        return roots.stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public CommentResponse create(UserPrincipal principal, CreateCommentRequest request) {
        CommentTargetType targetType = parseTargetType(request.targetType());

        boolean targetExists = switch (targetType) {
            case TOPIC -> topicRepository.existsById(request.targetId());
            case LESSON -> lessonRepository.existsById(request.targetId());
        };
        if (!targetExists) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Không tìm thấy đối tượng bình luận: " + targetType + " " + request.targetId());
        }

        Comment comment = Comment.builder()
                .targetType(targetType)
                .targetId(request.targetId())
                .authorUserId(principal.getUserId())
                .authorRole(principal.getRole())
                .content(request.content().trim())
                .status("ACTIVE")
                .likeCount(0)
                .replyCount(0)
                .build();
        return toResponse(commentRepository.save(comment));
    }

    private CommentTargetType parseTargetType(String value) {
        try {
            return CommentTargetType.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Invalid targetType: " + value);
        }
    }

    @Transactional
    public CommentResponse reply(UserPrincipal principal, Long commentId, ReplyCommentRequest request) {
        Comment parent = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND));

        Comment reply = Comment.builder()
                .targetType(parent.getTargetType())
                .targetId(parent.getTargetId())
                .parentCommentId(parent.getCommentId())
                .authorUserId(principal.getUserId())
                .authorRole(principal.getRole())
                .content(request.content())
                .status("ACTIVE")
                .likeCount(0)
                .replyCount(0)
                .build();
        commentRepository.save(reply);

        parent.setReplyCount(parent.getReplyCount() + 1);
        commentRepository.save(parent);

        notifyReplyRecipient(principal, parent, reply.getContent());

        return toResponse(reply);
    }

    /** Báo cho tác giả bình luận gốc khi người khác trả lời (bỏ qua nếu tự trả lời mình). */
    private void notifyReplyRecipient(UserPrincipal principal, Comment parent, String replyContent) {
        if (parent.getAuthorUserId() == null
                || parent.getAuthorUserId().equals(principal.getUserId())) {
            return;
        }
        String actorName = userRepository.findById(principal.getUserId())
                .map(User::getFullName)
                .filter(name -> name != null && !name.isBlank())
                .orElse(principal.getUsername());
        notificationService.notifyCommentReply(
                parent.getAuthorUserId(),
                actorName,
                parent.getTargetType().name(),
                parent.getTargetId(),
                replyContent);
    }

    private CommentResponse toResponse(Comment comment) {
        String authorName = userRepository.findById(comment.getAuthorUserId())
                .map(User::getFullName)
                .orElse("Ẩn danh");
        List<CommentResponse> replies = comment.getReplyCount() > 0
                ? commentRepository.findByParentCommentIdOrderByCreatedAtAsc(comment.getCommentId()).stream()
                        .map(this::toResponse)
                        .toList()
                : List.of();

        return new CommentResponse(
                comment.getCommentId(),
                comment.getTargetType().name(),
                comment.getTargetId(),
                comment.getParentCommentId(),
                comment.getAuthorUserId(),
                authorName,
                comment.getAuthorRole().name(),
                comment.getContent(),
                comment.getLikeCount(),
                comment.getReplyCount(),
                comment.getCreatedAt(),
                replies);
    }
}
