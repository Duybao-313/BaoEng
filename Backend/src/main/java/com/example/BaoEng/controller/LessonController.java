package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.LessonCreateRequest;
import com.example.BaoEng.dto.LessonResponse;
import com.example.BaoEng.dto.LessonUpdateRequest;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.LessonService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.API_BASE)
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/topics/{topicId}/lessons")
    public ApiResponse<List<LessonResponse>> list(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId) {
        return ApiResponse.ok(lessonService.list(topicId, principal), "OK");
    }

    @GetMapping("/lessons/{lessonId}")
    public ApiResponse<LessonResponse> detail(@PathVariable Long lessonId) {
        return ApiResponse.ok(lessonService.detail(lessonId), "OK");
    }

    @PostMapping("/topics/{topicId}/lessons")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<LessonResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId,
            @Valid @RequestBody LessonCreateRequest request) {
        return ApiResponse.ok(lessonService.create(principal, topicId, request), "Tạo bài học thành công");
    }

    @PutMapping("/lessons/{lessonId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<LessonResponse> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long lessonId,
            @Valid @RequestBody LessonUpdateRequest request) {
        return ApiResponse.ok(lessonService.update(principal, lessonId, request), "Cập nhật bài học thành công");
    }

    @DeleteMapping("/lessons/{lessonId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long lessonId) {
        lessonService.delete(principal, lessonId);
        return ApiResponse.ok(null, "Xóa bài học thành công");
    }
}
