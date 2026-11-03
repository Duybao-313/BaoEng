package com.example.BaoEng.dto;

public record MinigameAttemptResponse(
        Long attemptId,
        double score,
        int totalQuestions,
        int correctAnswers,
        boolean isPassed,
        boolean lessonCompleted,
        double topicProgressPercent
) {
}
