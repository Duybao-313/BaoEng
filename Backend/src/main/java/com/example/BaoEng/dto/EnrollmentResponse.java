package com.example.BaoEng.dto;

import com.example.BaoEng.entity.Enrollment;

public record EnrollmentResponse(
        Long enrollmentId,
        Long topicId,
        String status
) {
    public static EnrollmentResponse from(Enrollment enrollment) {
        return new EnrollmentResponse(
                enrollment.getEnrollmentId(),
                enrollment.getTopicId(),
                enrollment.getStatus().name());
    }
}
