package com.example.BaoEng.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCommentRequest(
        @NotBlank(message = "targetType must not be blank")
        String targetType,

        @NotNull(message = "targetId must not be null")
        Long targetId,

        @NotBlank(message = "content must not be blank")
        String content
) {
}
