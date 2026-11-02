package com.example.BaoEng.dto;

import jakarta.validation.constraints.Size;

public record TopicUpdateRequest(
        @Size(max = 255, message = "title must be at most 255 characters")
        String title,

        String description,

        String level,

        String status
) {
}
