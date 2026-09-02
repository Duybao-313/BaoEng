package com.example.BaoEng.security;

import com.example.BaoEng.enums.Role;
import lombok.Getter;

/**
 * Principal chứa thông tin user — dùng với @AuthenticationPrincipal trong controller.
 */
@Getter
public class UserPrincipal {

    private final Long userId;
    private final String email;
    private final String username;
    private final Role role;

    public UserPrincipal(Long userId, String email, String username, Role role) {
        this.userId = userId;
        this.email = email;
        this.username = username;
        this.role = role;
    }

    public String getName() {
        return username;
    }

    @Override
    public String toString() {
        return username;
    }
}
