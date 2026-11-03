package com.example.BaoEng.dto;

import java.util.List;

/**
 * Tien do tong the cua Student.
 *
 * @param overallProgressPercent % hoan thanh tren toan bo chu de da tham gia
 * @param totalMinutes           tong so phut da luyen tap (tich luy, dung cho the "Gio tich luy")
 * @param topics                 tien do tung chu de
 */
public record ProgressOverviewResponse(
        double overallProgressPercent,
        int totalMinutes,
        List<TopicProgressResponse> topics
) {
}
