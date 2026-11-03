package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.MinigameAttemptResponse;
import com.example.BaoEng.dto.MinigameDetailResponse;
import com.example.BaoEng.dto.MinigameResponse;
import com.example.BaoEng.dto.SubmitAttemptRequest;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.MinigameService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.API_BASE)
public class MinigameController {

    private final MinigameService minigameService;

    public MinigameController(MinigameService minigameService) {
        this.minigameService = minigameService;
    }

    @GetMapping("/lessons/{lessonId}/minigames")
    public ApiResponse<List<MinigameResponse>> list(@PathVariable Long lessonId) {
        return ApiResponse.ok(minigameService.list(lessonId), "OK");
    }

    @GetMapping("/minigames/{minigameId}")
    public ApiResponse<MinigameDetailResponse> detail(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long minigameId) {
        return ApiResponse.ok(minigameService.detail(principal, minigameId), "OK");
    }

    @PostMapping("/minigames/{minigameId}/attempts")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<MinigameAttemptResponse> submitAttempt(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long minigameId,
            @Valid @RequestBody SubmitAttemptRequest request) {
        return ApiResponse.ok(
                minigameService.submitAttempt(principal, minigameId, request),
                "Nộp bài thành công");
    }

    @PostMapping("/minigames/{minigameId}/publish")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<MinigameResponse> publish(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long minigameId) {
        return ApiResponse.ok(minigameService.publish(principal, minigameId), "Xuất bản minigame thành công");
    }
}
