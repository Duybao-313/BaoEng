package com.example.BaoEng.dto;

import com.example.BaoEng.entity.Lesson;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LessonResponse(
        Long lessonId,
        Long topicId,
        String title,
        Integer orderIndex,
        BigDecimal completionThreshold,
        String status,
        LocalDateTime createdAt
) {
    public static LessonResponse from(Lesson lesson) {
        return new LessonResponse(
                lesson.getLessonId(),
                lesson.getTopicId(),
                lesson.getTitle(),
                lesson.getOrderIndex(),
                lesson.getCompletionThreshold(),
                lesson.getStatus().name(),
                lesson.getCreatedAt());
    }
}
