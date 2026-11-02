package com.example.BaoEng.dto;

import com.example.BaoEng.entity.Topic;
import java.time.LocalDateTime;

public record TopicResponse(
        Long topicId,
        Long teacherId,
        String title,
        String description,
        String level,
        String status,
        String teacherName,
        long lessonCount,
        LocalDateTime createdAt
) {
    public static TopicResponse from(Topic topic, long lessonCount, String teacherName) {
        return new TopicResponse(
                topic.getTopicId(),
                topic.getTeacherId(),
                topic.getTitle(),
                topic.getDescription(),
                topic.getLevel().name(),
                topic.getStatus().name(),
                teacherName,
                lessonCount,
                topic.getCreatedAt());
    }
}
