package com.example.BaoEng.entity;

import com.example.BaoEng.enums.InvalidationReason;
import com.example.BaoEng.enums.TokenType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Bảng INVALID_TOKENS (blacklist token) — theo Docs/Database_Design_Specification_v2.md.
 */
@Entity
@Table(name = "invalid_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvalidToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invalid_token_id")
    private Long invalidTokenId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "jti", nullable = false, unique = true, length = 64)
    private String jti;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_type", nullable = false,
            columnDefinition = "ENUM('ACCESS','REFRESH')")
    private TokenType tokenType;

    @Column(name = "token_hash", length = 255)
    private String tokenHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "reason", nullable = false,
            columnDefinition = "ENUM('LOGOUT','REFRESH_ROTATION','PASSWORD_CHANGE','ADMIN_REVOKE','SECURITY_ISSUE')")
    private InvalidationReason reason;

    @Column(name = "invalidated_at", nullable = false)
    private LocalDateTime invalidatedAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "user_agent", length = 512)
    private String userAgent;
}
