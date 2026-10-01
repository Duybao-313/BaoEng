package com.example.BaoEng.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Yêu cầu đăng nhập — CHỈ dùng username (không dùng email).
 *
 * <p>Tra cứu user theo cột `users.username` (unique). Collation MySQL là
 * case-insensitive nên "DuyBao" và "duybao" được coi là cùng một tài khoản.
 */
public record LoginRequest(
        @NotBlank(message = "username must not be blank")
        @Size(max = 50, message = "username must be at most 50 characters")
        String username,

        @NotBlank(message = "password must not be blank")
        String password
) {
}
