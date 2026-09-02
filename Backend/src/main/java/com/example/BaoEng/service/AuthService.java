package com.example.BaoEng.service;

import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.AuthResponse;
import com.example.BaoEng.dto.ForgotPasswordRequest;
import com.example.BaoEng.dto.LoginRequest;
import com.example.BaoEng.dto.RefreshResponse;
import com.example.BaoEng.dto.RegisterRequest;
import com.example.BaoEng.dto.ResetPasswordRequest;
import com.example.BaoEng.dto.UserResponse;
import com.example.BaoEng.dto.VerifyEmailRequest;
import com.example.BaoEng.entity.InvalidToken;
import com.example.BaoEng.entity.User;
import com.example.BaoEng.enums.InvalidationReason;
import com.example.BaoEng.enums.Role;
import com.example.BaoEng.enums.TokenType;
import com.example.BaoEng.enums.UserStatus;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.InvalidTokenRepository;
import com.example.BaoEng.repository.UserRepository;
import com.example.BaoEng.security.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final InvalidTokenRepository invalidTokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final long accessTokenTtlSeconds;
    private final long refreshTokenTtlSeconds;
    private final boolean cookieSecure;

    public AuthService(
            UserRepository userRepository,
            InvalidTokenRepository invalidTokenRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder,
            EmailService emailService,
            @Value("${jwt.access-token-ttl}") long accessTokenTtlSeconds,
            @Value("${jwt.refresh-token-ttl}") long refreshTokenTtlSeconds,
            @Value("${jwt.cookie-secure:false}") boolean cookieSecure) {
        this.userRepository = userRepository;
        this.invalidTokenRepository = invalidTokenRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.accessTokenTtlSeconds = accessTokenTtlSeconds;
        this.refreshTokenTtlSeconds = refreshTokenTtlSeconds;
        this.cookieSecure = cookieSecure;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new BusinessException(ErrorCode.USERNAME_ALREADY_EXISTS);
        }
        User user = User.builder()
                .username(request.username())
                .fullName(request.fullName())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.STUDENT)
                .status(UserStatus.PENDING)
                .build();
        userRepository.save(user);

        String verifyToken = jwtService.generateEmailToken(
                user, AppConstants.PURPOSE_EMAIL_VERIFY, AppConstants.VERIFY_EMAIL_TTL_SECONDS);
        emailService.sendVerificationEmail(user.getEmail(), verifyToken);
        return UserResponse.from(user);
    }

    public AuthResponse login(LoginRequest request, HttpServletResponse response) {
        User user = userRepository.findByEmailOrUsername(request.login(), request.login())
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BusinessException(ErrorCode.INVALID_CREDENTIALS);
        }
        if (user.getStatus() == UserStatus.PENDING) {
            throw new BusinessException(ErrorCode.ACCOUNT_PENDING);
        }
        if (user.getStatus() == UserStatus.LOCKED || user.getStatus() == UserStatus.INACTIVE) {
            throw new BusinessException(ErrorCode.ACCOUNT_LOCKED);
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        setRefreshTokenCookie(response, refreshToken);

        return new AuthResponse(accessToken, "Bearer", accessTokenTtlSeconds, UserResponse.from(user));
    }

    @Transactional
    public RefreshResponse refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = readRefreshToken(request);
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        Jwt jwt = parseRefreshToken(refreshToken);
        String jti = jwt.getId();
        if (invalidTokenRepository.existsByJti(jti)) {
            throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        Long userId = Long.valueOf(jwt.getSubject());
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BusinessException(ErrorCode.ACCOUNT_LOCKED);
        }

        // Rotation: vô hiệu hóa refresh token cũ
        invalidTokenRepository.save(InvalidToken.builder()
                .userId(userId)
                .jti(jti)
                .tokenType(TokenType.REFRESH)
                .reason(InvalidationReason.REFRESH_ROTATION)
                .invalidatedAt(LocalDateTime.now())
                .expiresAt(toLocalDateTime(jwt.getExpiresAt()))
                .build());

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);
        setRefreshTokenCookie(response, newRefreshToken);

        return new RefreshResponse(newAccessToken, "Bearer", accessTokenTtlSeconds);
    }

    @Transactional
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = readRefreshToken(request);
        if (refreshToken != null && !refreshToken.isBlank()) {
            try {
                Jwt jwt = jwtService.parseToken(refreshToken);
                invalidTokenRepository.save(InvalidToken.builder()
                        .userId(Long.valueOf(jwt.getSubject()))
                        .jti(jwt.getId())
                        .tokenType(TokenType.REFRESH)
                        .reason(InvalidationReason.LOGOUT)
                        .invalidatedAt(LocalDateTime.now())
                        .expiresAt(toLocalDateTime(jwt.getExpiresAt()))
                        .build());
            } catch (JwtException ignored) {
                // token không hợp lệ — vẫn xóa cookie
            }
        }
        clearRefreshTokenCookie(response);
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        userRepository.findByEmail(request.email()).ifPresent(user -> {
            String token = jwtService.generateEmailToken(
                    user, AppConstants.PURPOSE_PASSWORD_RESET, AppConstants.RESET_PASSWORD_TTL_SECONDS);
            emailService.sendResetPasswordEmail(user.getEmail(), token);
        });
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        Jwt jwt = parseEmailToken(request.token(),
                AppConstants.PURPOSE_PASSWORD_RESET,
                ErrorCode.INVALID_RESET_TOKEN,
                ErrorCode.RESET_TOKEN_EXPIRED);
        User user = userRepository.findById(Long.valueOf(jwt.getSubject()))
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void verifyEmail(VerifyEmailRequest request) {
        Jwt jwt = parseEmailToken(request.token(),
                AppConstants.PURPOSE_EMAIL_VERIFY,
                ErrorCode.INVALID_VERIFY_TOKEN,
                ErrorCode.VERIFY_TOKEN_EXPIRED);
        User user = userRepository.findById(Long.valueOf(jwt.getSubject()))
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        if (user.getStatus() == UserStatus.PENDING) {
            user.setStatus(UserStatus.ACTIVE);
            userRepository.save(user);
        }
    }

    // ---------- helpers ----------

    private Jwt parseRefreshToken(String token) {
        try {
            return jwtService.parseToken(token);
        } catch (JwtValidationException e) {
            throw new BusinessException(ErrorCode.REFRESH_TOKEN_EXPIRED);
        } catch (JwtException e) {
            throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
        }
    }

    private Jwt parseEmailToken(String token, String purpose, ErrorCode invalidCode, ErrorCode expiredCode) {
        try {
            Jwt jwt = jwtService.parseToken(token);
            if (!purpose.equals(jwt.getClaimAsString(AppConstants.CLAIM_PURPOSE))) {
                throw new BusinessException(invalidCode);
            }
            return jwt;
        } catch (BusinessException e) {
            throw e;
        } catch (JwtValidationException e) {
            throw new BusinessException(expiredCode);
        } catch (JwtException e) {
            throw new BusinessException(invalidCode);
        }
    }

    private String readRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if (AppConstants.REFRESH_TOKEN_COOKIE.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie(AppConstants.REFRESH_TOKEN_COOKIE, refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge((int) refreshTokenTtlSeconds);
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
    }

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(AppConstants.REFRESH_TOKEN_COOKIE, "");
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
    }

    private LocalDateTime toLocalDateTime(Instant instant) {
        return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
    }
}
