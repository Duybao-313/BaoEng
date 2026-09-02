package com.example.BaoEng.dto;

public record RefreshResponse(
        String accessToken,
        String tokenType,
        long expiresIn
) {
}
