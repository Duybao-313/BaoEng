package com.example.BaoEng.dto;

import com.example.BaoEng.entity.Notification;
import java.time.LocalDateTime;

public record NotificationResponse(
        Long notificationId,
        String type,
        String title,
        String message,
        String referenceType,
        Long referenceId,
        boolean isRead,
        LocalDateTime createdAt) {

    public static NotificationResponse from(Notification notification) {
        return new NotificationResponse(
                notification.getNotificationId(),
                notification.getType(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getReferenceType(),
                notification.getReferenceId(),
                Boolean.TRUE.equals(notification.getIsRead()),
                notification.getCreatedAt());
    }
}
