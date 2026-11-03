package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.ProgressOverviewResponse;
import com.example.BaoEng.dto.TopicProgressResponse;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.ProgressService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.API_BASE)
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/progress")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<ProgressOverviewResponse> overview(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(progressService.overview(principal), "OK");
    }

    @GetMapping("/topics/{topicId}/progress")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<TopicProgressResponse> topicProgress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long topicId) {
        return ApiResponse.ok(progressService.topicProgress(principal, topicId), "OK");
    }
}
