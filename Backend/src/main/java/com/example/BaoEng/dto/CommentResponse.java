package com.example.BaoEng.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CommentResponse(
        Long commentId,
        String targetType,
        Long targetId,
        Long parentCommentId,
        Long authorUserId,
        String authorName,
        String authorRole,
        String content,
        Integer likeCount,
        Integer replyCount,
        LocalDateTime createdAt,
        List<CommentResponse> replies
) {
}
