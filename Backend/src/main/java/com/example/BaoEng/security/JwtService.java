package com.example.BaoEng.security;

import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.entity.User;
import java.time.Instant;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;

/**
 * Phát hành & đọc JWT (HS256) — theo Docs/JWT_Authentication_Design.md.
 */
@Service
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final long accessTokenTtl;
    private final long refreshTokenTtl;

    public JwtService(
            JwtEncoder jwtEncoder,
            JwtDecoder jwtDecoder,
            @Value("${jwt.access-token-ttl}") long accessTokenTtl,
            @Value("${jwt.refresh-token-ttl}") long refreshTokenTtl) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
        this.accessTokenTtl = accessTokenTtl;
        this.refreshTokenTtl = refreshTokenTtl;
    }

    public String generateAccessToken(User user) {
        return generateToken(user, accessTokenTtl, null);
    }

    public String generateRefreshToken(User user) {
        return generateToken(user, refreshTokenTtl, null);
    }

    public String generateEmailToken(User user, String purpose, long ttlSeconds) {
        return generateToken(user, ttlSeconds, purpose);
    }

    /**
     * Giải mã + xác thực chữ ký & hạn dùng.
     * Ném JwtValidationException (hết hạn) hoặc JwtException (sai chữ ký/định dạng).
     */
    public Jwt parseToken(String token) {
        return jwtDecoder.decode(token);
    }

    private String generateToken(User user, long ttlSeconds, String purpose) {
        Instant now = Instant.now();
        JwtClaimsSet.Builder claims = JwtClaimsSet.builder()
                .subject(String.valueOf(user.getUserId()))
                .issuedAt(now)
                .expiresAt(now.plusSeconds(ttlSeconds))
                .id(UUID.randomUUID().toString())
                .claim(AppConstants.CLAIM_ROLE, user.getRole().name())
                .claim(AppConstants.CLAIM_EMAIL, user.getEmail())
                .claim(AppConstants.CLAIM_USERNAME, user.getUsername());
        if (purpose != null) {
            claims.claim(AppConstants.CLAIM_PURPOSE, purpose);
        }
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).type("JWT").build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims.build())).getTokenValue();
    }
}
