package com.example.BaoEng.dto;

import com.example.BaoEng.entity.LessonMaterial;
import java.time.LocalDateTime;

public record MaterialResponse(
        Long materialId,
        Long lessonId,
        String type,
        String fileUrl,
        LocalDateTime createdAt
) {
    public static MaterialResponse from(LessonMaterial material) {
        return new MaterialResponse(
                material.getMaterialId(),
                material.getLessonId(),
                material.getType().name(),
                material.getFileUrl(),
                material.getCreatedAt());
    }
}
