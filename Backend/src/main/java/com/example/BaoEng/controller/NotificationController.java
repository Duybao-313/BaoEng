package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.NotificationResponse;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.NotificationService;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.API_BASE + "/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ApiResponse<List<NotificationResponse>> list(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(notificationService.list(principal), "OK");
    }

    @GetMapping("/unread-count")
    public ApiResponse<Long> unreadCount(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(notificationService.unreadCount(principal), "OK");
    }

    @PutMapping("/{notificationId}/read")
    public ApiResponse<Void> markRead(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long notificationId) {
        notificationService.markRead(principal, notificationId);
        return ApiResponse.ok(null, "Đã đọc thông báo");
    }

    @PutMapping("/read-all")
    public ApiResponse<Integer> markAllRead(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(notificationService.markAllRead(principal), "Đã đọc tất cả thông báo");
    }
}
