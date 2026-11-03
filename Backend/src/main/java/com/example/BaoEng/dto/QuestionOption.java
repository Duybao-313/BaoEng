package com.example.BaoEng.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Một lựa chọn đáp án. `correct` chỉ trả về cho giáo viên (xem MinigameService.detail);
 * với học sinh field này bị ẩn (null) để không lộ đáp án trước khi làm bài.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record QuestionOption(String key, String text, Boolean correct) {
}
