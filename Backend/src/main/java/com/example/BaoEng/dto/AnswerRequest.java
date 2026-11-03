package com.example.BaoEng.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AnswerRequest(
        @NotNull(message = "questionId must not be null")
        Long questionId,

        @NotBlank(message = "selectedKey must not be blank")
        String selectedKey
) {
}
