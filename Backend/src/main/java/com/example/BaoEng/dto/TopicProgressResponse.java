package com.example.BaoEng.dto;

public record TopicProgressResponse(
        Long topicId,
        String title,
        long completedLessons,
        long totalLessons,
        double progressPercent,
        boolean enrolled
) {
}
