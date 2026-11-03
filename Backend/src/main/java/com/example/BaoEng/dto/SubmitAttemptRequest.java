package com.example.BaoEng.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public record SubmitAttemptRequest(
        @NotNull(message = "answers must not be null")
        List<AnswerRequest> answers
) {
}
