package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.TeacherProfileResponse;
import com.example.BaoEng.dto.UpdateTeacherProfileRequest;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.TeacherService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.API_BASE + "/teachers")
@PreAuthorize("hasRole('TEACHER')")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/me")
    public ApiResponse<TeacherProfileResponse> me(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(teacherService.getProfile(principal), "OK");
    }

    @PutMapping("/me")
    public ApiResponse<TeacherProfileResponse> updateMe(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpdateTeacherProfileRequest request) {
        return ApiResponse.ok(teacherService.updateProfile(principal, request), "Cập nhật thành công");
    }
}
