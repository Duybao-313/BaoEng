package com.example.BaoEng.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Client báo thời gian học của một phiên (thường gọi khi rời màn Bài học).
 *
 * @param lessonId bài học đang học (null nếu không xác định)
 * @param minutes  số phút đã học trong phiên (1..600)
 */
public record StudyActivityRequest(
        Long lessonId,

        @NotNull(message = "minutes must not be null")
        @Min(value = 1, message = "minutes must be at least 1")
        @Max(value = 600, message = "minutes must be at most 600")
        Integer minutes
) {
}
