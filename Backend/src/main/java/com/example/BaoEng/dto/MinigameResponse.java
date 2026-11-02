package com.example.BaoEng.dto;

import com.example.BaoEng.entity.Minigame;
import java.time.LocalDateTime;

public record MinigameResponse(
        Long minigameId,
        Long lessonId,
        String title,
        String status,
        long questionCount,
        LocalDateTime createdAt
) {
    public static MinigameResponse from(Minigame minigame, long questionCount) {
        return new MinigameResponse(
                minigame.getMinigameId(),
                minigame.getLessonId(),
                minigame.getTitle(),
                minigame.getStatus().name(),
                questionCount,
                minigame.getCreatedAt());
    }
}
