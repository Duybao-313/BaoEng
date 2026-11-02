package com.example.BaoEng.dto;

import java.util.List;

public record QuestionResponse(
        Long questionId,
        String questionType,
        Integer orderIndex,
        String questionText,
        List<QuestionOption> options
) {
}
