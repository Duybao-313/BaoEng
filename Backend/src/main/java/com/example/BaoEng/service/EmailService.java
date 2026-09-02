package com.example.BaoEng.service;

/**
 * Gửi email — giai đoạn dev dùng ConsoleEmailService (log ra console).
 * Sau này cắm SMTP thật bằng cách tạo impl mới.
 */
public interface EmailService {

    void sendVerificationEmail(String to, String verifyToken);

    void sendResetPasswordEmail(String to, String resetToken);
}
