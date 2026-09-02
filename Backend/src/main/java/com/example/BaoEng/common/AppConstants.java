package com.example.BaoEng.common;

/**
 * Hằng số dùng chung toàn hệ thống.
 */
public final class AppConstants {

    public static final String API_BASE = "/api/v1";
    public static final String AUTH_BASE = "/api/v1/auth";

    public static final String REFRESH_TOKEN_COOKIE = "refresh_token";

    // TTL (giây) — theo Docs/JWT_Authentication_Design.md
    public static final long ACCESS_TOKEN_TTL_SECONDS = 3L * 60 * 60;          // 3 giờ
    public static final long REFRESH_TOKEN_TTL_SECONDS = 7L * 24 * 60 * 60;    // 7 ngày
    public static final long VERIFY_EMAIL_TTL_SECONDS = 24L * 60 * 60;         // 24 giờ
    public static final long RESET_PASSWORD_TTL_SECONDS = 15L * 60;            // 15 phút

    // JWT claim keys
    public static final String CLAIM_ROLE = "role";
    public static final String CLAIM_EMAIL = "email";
    public static final String CLAIM_USERNAME = "username";
    public static final String CLAIM_PURPOSE = "purpose";

    // Purpose cho token email
    public static final String PURPOSE_EMAIL_VERIFY = "EMAIL_VERIFY";
    public static final String PURPOSE_PASSWORD_RESET = "PASSWORD_RESET";

    private AppConstants() {
    }
}
