package com.example.BaoEng.dto;

import com.example.BaoEng.entity.TeacherCertificate;
import java.time.LocalDateTime;

public record CertificateResponse(
        Long certificateId,
        String name,
        String score,
        String issuingBody,
        String status,
        String imageUrl,
        LocalDateTime createdAt
) {
    public static CertificateResponse from(TeacherCertificate certificate) {
        return new CertificateResponse(
                certificate.getCertificateId(),
                certificate.getName(),
                certificate.getScore(),
                certificate.getIssuingBody(),
                certificate.getStatus().name(),
                certificate.getImageUrl(),
                certificate.getCreatedAt());
    }
}
