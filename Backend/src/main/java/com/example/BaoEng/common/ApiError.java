package com.example.BaoEng.common;

import java.util.List;

/**
 * Cấu trúc lỗi chuẩn: { "code", "message", "details": [ { "field", "message" } ] }.
 */
public class ApiError {

    private String code;
    private String message;
    private List<FieldErrorDetail> details;

    public ApiError(String code, String message, List<FieldErrorDetail> details) {
        this.code = code;
        this.message = message;
        this.details = details;
    }

    public static ApiError of(String code, String message) {
        return new ApiError(code, message, null);
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public List<FieldErrorDetail> getDetails() {
        return details;
    }

    /**
     * Chi tiết lỗi cho từng field (dùng cho lỗi validate).
     */
    public static class FieldErrorDetail {
        private String field;
        private String message;

        public FieldErrorDetail(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public String getField() {
            return field;
        }

        public String getMessage() {
            return message;
        }
    }
}
