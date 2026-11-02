package com.example.BaoEng.dto;

/**
 * Lỗi một dòng khi parse CSV từ vựng.
 */
public record CsvRowError(int line, String error) {
}
