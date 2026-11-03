package com.example.BaoEng.dto;

/**
 * Tien do cua mot chu de.
 *
 * @param topicId           ma chu de
 * @param title             ten chu de
 * @param description       mo ta ngan cua chu de (hien o the tien do)
 * @param completedLessons  so bai da hoan thanh
 * @param totalLessons      tong so bai cua chu de
 * @param progressPercent   % hoan thanh (0-100)
 * @param enrolled          Student da tham gia chu de chua
 * @param nextLessonTitle   ten bai hoc tiep theo chua hoan thanh (null neu da xong het)
 */
public record TopicProgressResponse(
        Long topicId,
        String title,
        String description,
        long completedLessons,
        long totalLessons,
        double progressPercent,
        boolean enrolled,
        String nextLessonTitle
) {
}
