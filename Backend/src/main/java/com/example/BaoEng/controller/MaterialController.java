package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.MaterialResponse;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.MaterialService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(AppConstants.API_BASE)
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping("/lessons/{lessonId}/materials")
    public ApiResponse<List<MaterialResponse>> list(@PathVariable Long lessonId) {
        return ApiResponse.ok(materialService.list(lessonId), "OK");
    }

    @PostMapping("/lessons/{lessonId}/materials")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<MaterialResponse> upload(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long lessonId,
            @RequestParam("type") String type,
            @RequestParam("file") MultipartFile file) {
        return ApiResponse.ok(
                materialService.upload(principal, lessonId, type, file), "Upload học liệu thành công");
    }

    @DeleteMapping("/materials/{materialId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long materialId) {
        materialService.delete(principal, materialId);
        return ApiResponse.ok(null, "Xóa học liệu thành công");
    }
}
