package com.example.BaoEng.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Giả lập gửi email ở môi trường dev — in link/token ra console.
 */
@Service
@Slf4j
public class ConsoleEmailService implements EmailService {

    @Override
    public void sendVerificationEmail(String to, String verifyToken) {
        log.info("[DEV EMAIL] To: {} — verify: http://localhost:8080/api/v1/auth/verify-email  token={}",
                to, verifyToken);
    }

    @Override
    public void sendResetPasswordEmail(String to, String resetToken) {
        log.info("[DEV EMAIL] To: {} — reset password token={}", to, resetToken);
    }
}
