package com.example.BaoEng.dto;

import java.util.List;

public record ProgressOverviewResponse(
        double overallProgressPercent,
        List<TopicProgressResponse> topics
) {
}
