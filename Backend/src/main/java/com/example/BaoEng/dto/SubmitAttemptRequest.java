package com.example.BaoEng.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;

public record SubmitAttemptRequest(
        @NotNull(message = "answers must not be null")
        List<AnswerRequest> answers,

        /** Thoi gian lam bai (giay) do client do duoc; dung de thong ke phut hoc hom nay. */
        @PositiveOrZero(message = "durationSeconds must not be negative")
        Integer durationSeconds
) {
}
