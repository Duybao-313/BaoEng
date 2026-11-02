package com.example.BaoEng.service;

import com.example.BaoEng.dto.CommentResponse;
import com.example.BaoEng.dto.ReplyCommentRequest;
import com.example.BaoEng.entity.Comment;
import com.example.BaoEng.entity.User;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.CommentRepository;
import com.example.BaoEng.repository.UserRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý bình luận & phản hồi (FR-TEACHER-06).
 */
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    public List<CommentResponse> list() {
        return commentRepository.findByParentCommentIdIsNullOrderByCreatedAtDesc().stream()
                .map(this::toResponse)
                .toList();
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

        return toResponse(reply);
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
