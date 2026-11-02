package com.example.BaoEng.dto;

import jakarta.validation.constraints.Size;

public record CertificateUpdateRequest(
        @Size(max = 100, message = "name must be at most 100 characters")
        String name,

        @Size(max = 50, message = "score must be at most 50 characters")
        String score,

        @Size(max = 255, message = "issuingBody must be at most 255 characters")
        String issuingBody,

        @Size(max = 500, message = "imageUrl must be at most 500 characters")
        String imageUrl
) {
}
