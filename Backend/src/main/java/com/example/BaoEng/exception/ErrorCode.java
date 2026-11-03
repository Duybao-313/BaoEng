package com.example.BaoEng.exception;

import org.springframework.http.HttpStatus;

/**
 * Mã lỗi nghiệp vụ (chỉ cho quy tắc nghiệp vụ — theo AI_CODING_RULES).
 * Lỗi validate field gộp vào VALIDATION_ERROR, chi tiết nằm trong details.
 */
public enum ErrorCode {

    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Invalid input data"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Unauthorized or invalid token"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Token has expired"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid token"),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid refresh token"),
    REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Refresh token has expired"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "You do not have permission to perform this action"),

    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Incorrect username or password"),
    ACCOUNT_PENDING(HttpStatus.FORBIDDEN, "Account is pending email verification"),
    ACCOUNT_LOCKED(HttpStatus.FORBIDDEN, "Account has been locked"),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "Email is already in use"),
    USERNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "Username already exists"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    TOPIC_NOT_FOUND(HttpStatus.NOT_FOUND, "Topic not found"),
    ALREADY_ENROLLED(HttpStatus.CONFLICT, "Already enrolled in this topic"),
    ENROLLMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Enrollment not found"),
    LESSON_NOT_FOUND(HttpStatus.NOT_FOUND, "Lesson not found"),
    MATERIAL_NOT_FOUND(HttpStatus.NOT_FOUND, "Material not found"),
    MINIGAME_NOT_FOUND(HttpStatus.NOT_FOUND, "Minigame not found"),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Comment not found"),
    CERTIFICATE_NOT_FOUND(HttpStatus.NOT_FOUND, "Certificate not found"),
    FILE_TOO_LARGE(HttpStatus.PAYLOAD_TOO_LARGE, "File too large"),
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "Invalid file type"),
    INVALID_CSV(HttpStatus.BAD_REQUEST, "Invalid CSV file"),

    INVALID_VERIFY_TOKEN(HttpStatus.BAD_REQUEST, "Invalid email verification token"),
    VERIFY_TOKEN_EXPIRED(HttpStatus.BAD_REQUEST, "Email verification token has expired"),
    INVALID_RESET_TOKEN(HttpStatus.BAD_REQUEST, "Invalid password reset token"),
    RESET_TOKEN_EXPIRED(HttpStatus.BAD_REQUEST, "Password reset token has expired"),
    OLD_PASSWORD_INCORRECT(HttpStatus.BAD_REQUEST, "Incorrect old password"),

    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");

    private final HttpStatus status;
    private final String defaultMessage;

    ErrorCode(HttpStatus status, String defaultMessage) {
        this.status = status;
        this.defaultMessage = defaultMessage;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
