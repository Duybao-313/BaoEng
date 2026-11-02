package com.example.BaoEng.dto;

import jakarta.validation.constraints.NotBlank;

public record ReplyCommentRequest(
        @NotBlank(message = "content must not be blank")
        String content
) {
}
