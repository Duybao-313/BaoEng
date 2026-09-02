package com.example.BaoEng.dto;

import com.example.BaoEng.entity.User;
import java.time.LocalDateTime;

public record UserResponse(
        Long userId,
        String username,
        String fullName,
        String email,
        String avatarUrl,
        String role,
        String status,
        LocalDateTime createdAt
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getUserId(),
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getAvatarUrl(),
                user.getRole().name(),
                user.getStatus().name(),
                user.getCreatedAt());
    }
}
