package com.example.BaoEng.dto;

import com.example.BaoEng.entity.Lesson;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record LessonResponse(
        Long lessonId,
        Long topicId,
        String title,
        Integer orderIndex,
        BigDecimal completionThreshold,
        String status,
        LocalDateTime createdAt,
        List<MaterialResponse> materials,
        List<MinigameResponse> minigames
) {
    public static LessonResponse from(Lesson lesson) {
        return fromDetail(lesson, List.of(), List.of());
    }

    public static LessonResponse fromDetail(
            Lesson lesson,
            List<MaterialResponse> materials,
            List<MinigameResponse> minigames) {
        return new LessonResponse(
                lesson.getLessonId(),
                lesson.getTopicId(),
                lesson.getTitle(),
                lesson.getOrderIndex(),
                lesson.getCompletionThreshold(),
                lesson.getStatus().name(),
                lesson.getCreatedAt(),
                materials,
                minigames);
    }
}
