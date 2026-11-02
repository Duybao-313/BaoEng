package com.example.BaoEng.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record LessonUpdateRequest(
        @Size(max = 255, message = "title must be at most 255 characters")
        String title,

        @Min(value = 1, message = "orderIndex must be at least 1")
        Integer orderIndex,

        Double completionThreshold,

        String status
) {
}
