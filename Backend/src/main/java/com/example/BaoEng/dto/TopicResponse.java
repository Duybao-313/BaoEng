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
        LocalDateTime createdAt,
        /** % hoàn thành của Student hiện tại (null với Teacher/Admin). */
        Double progressPercent,
        /** Student đã tham gia chủ đề chưa (null với Teacher/Admin). */
        Boolean enrolled
) {
    public static TopicResponse from(Topic topic, long lessonCount, String teacherName) {
        return from(topic, lessonCount, teacherName, null, null);
    }

    public static TopicResponse from(
            Topic topic,
            long lessonCount,
            String teacherName,
            Double progressPercent,
            Boolean enrolled) {
        return new TopicResponse(
                topic.getTopicId(),
                topic.getTeacherId(),
                topic.getTitle(),
                topic.getDescription(),
                topic.getLevel().name(),
                topic.getStatus().name(),
                teacherName,
                lessonCount,
                topic.getCreatedAt(),
                progressPercent,
                enrolled);
    }
}
