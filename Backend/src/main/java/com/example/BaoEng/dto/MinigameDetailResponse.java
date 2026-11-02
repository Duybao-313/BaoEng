package com.example.BaoEng.dto;

import java.util.List;

public record MinigameDetailResponse(
        Long minigameId,
        Long lessonId,
        String title,
        String status,
        List<QuestionResponse> questions
) {
}
