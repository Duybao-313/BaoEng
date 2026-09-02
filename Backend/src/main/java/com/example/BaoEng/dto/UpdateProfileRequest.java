package com.example.BaoEng.dto;

import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @Size(max = 255, message = "fullName must be at most 255 characters")
        String fullName,

        @Size(max = 500, message = "avatarUrl must be at most 500 characters")
        String avatarUrl
) {
}
