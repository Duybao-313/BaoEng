package com.example.BaoEng.service;

import com.example.BaoEng.dto.NotificationResponse;
import com.example.BaoEng.entity.Notification;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.NotificationRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Thông báo trong app cho người dùng.
 *
 * <p>Hiện chỉ sinh thông báo khi giáo viên/admin trả lời bình luận của người học; nội dung
 * thông báo giữ lại {@code referenceType}/{@code referenceId} để client mở đúng chủ đề hoặc bài học.
 */
@Service
public class NotificationService {

    public static final String TYPE_COMMENT_REPLY = "COMMENT_REPLY";
    private static final int MESSAGE_SNIPPET_LENGTH = 120;

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationResponse> list(UserPrincipal principal) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(principal.getUserId()).stream()
                .map(NotificationResponse::from)
                .toList();
    }

    public long unreadCount(UserPrincipal principal) {
        return notificationRepository.countByUserIdAndIsReadFalse(principal.getUserId());
    }

    @Transactional
    public void markRead(UserPrincipal principal, Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .filter(item -> item.getUserId().equals(principal.getUserId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.NOTIFICATION_NOT_FOUND));
        if (!Boolean.TRUE.equals(notification.getIsRead())) {
            notification.setIsRead(true);
            notificationRepository.save(notification);
        }
    }

    @Transactional
    public int markAllRead(UserPrincipal principal) {
        return notificationRepository.markAllRead(principal.getUserId());
    }

    /** Tạo thông báo "giáo viên đã trả lời bình luận" cho tác giả bình luận gốc. */
    @Transactional
    public void notifyCommentReply(
            Long recipientUserId,
            String actorName,
            String targetType,
            Long targetId,
            String replyContent) {
        if (recipientUserId == null) {
            return;
        }
        notificationRepository.save(Notification.builder()
                .userId(recipientUserId)
                .type(TYPE_COMMENT_REPLY)
                .title("Phản hồi mới cho bình luận của bạn")
                .message(actorName + " đã trả lời: " + snippet(replyContent))
                .referenceType(targetType)
                .referenceId(targetId)
                .isRead(false)
                .build());
    }

    private static String snippet(String content) {
        if (content == null) {
            return "";
        }
        String trimmed = content.trim();
        return trimmed.length() <= MESSAGE_SNIPPET_LENGTH
                ? trimmed
                : trimmed.substring(0, MESSAGE_SNIPPET_LENGTH) + "…";
    }
}
