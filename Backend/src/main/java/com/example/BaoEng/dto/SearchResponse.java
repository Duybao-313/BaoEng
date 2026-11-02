package com.example.BaoEng.dto;

import java.util.List;

public record SearchResponse(
        List<TopicResponse> topics,
        List<LessonResponse> lessons
) {
}
