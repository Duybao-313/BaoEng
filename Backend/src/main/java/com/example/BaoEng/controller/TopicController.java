package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.EnrollmentResponse;
import com.example.BaoEng.dto.TopicCreateRequest;
import com.example.BaoEng.dto.TopicResponse;
import com.example.BaoEng.dto.TopicUpdateRequest;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.TopicService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.API_BASE + "/topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public ApiResponse<List<TopicResponse>> list(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "q", required = false) String q) {
        return ApiResponse.ok(topicService.list(principal, level, q), "OK");
    }

    @GetMapping("/recommended")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<List<TopicResponse>> recommended(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(value = "limit", required = false) Integer limit) {
        return ApiResponse.ok(topicService.recommended(principal, limit), "OK");
    }

    @GetMapping("/featured")
    public ApiResponse<List<TopicResponse>> featured(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "limit", required = false) Integer limit) {
        return ApiResponse.ok(topicService.featured(principal, level, q, limit), "OK");
    }

    @GetMapping("/{topicId}")
    public ApiResponse<TopicResponse> detail(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId) {
        return ApiResponse.ok(topicService.get(principal, topicId), "OK");
    }

    @PostMapping("/{topicId}/enroll")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<EnrollmentResponse> enroll(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId) {
        return ApiResponse.ok(topicService.enroll(principal, topicId), "Đã đăng ký tham gia chủ đề.");
    }

    @DeleteMapping("/{topicId}/enroll")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<Void> unenroll(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId) {
        topicService.unenroll(principal, topicId);
        return ApiResponse.ok(null, "Đã rời chủ đề.");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<TopicResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody TopicCreateRequest request) {
        return ApiResponse.ok(topicService.create(principal, request), "Tạo chủ đề thành công");
    }

    @PutMapping("/{topicId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<TopicResponse> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId,
            @Valid @RequestBody TopicUpdateRequest request) {
        return ApiResponse.ok(topicService.update(principal, topicId, request), "Cập nhật chủ đề thành công");
    }

    @DeleteMapping("/{topicId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId) {
        topicService.delete(principal, topicId);
        return ApiResponse.ok(null, "Xóa chủ đề thành công");
    }
}
