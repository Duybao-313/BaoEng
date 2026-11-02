package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.VocabCsvUploadResponse;
import com.example.BaoEng.dto.VocabItemResponse;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.VocabService;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(AppConstants.API_BASE)
public class VocabController {

    private final VocabService vocabService;

    public VocabController(VocabService vocabService) {
        this.vocabService = vocabService;
    }

    @GetMapping("/lessons/{lessonId}/vocab")
    public ApiResponse<List<VocabItemResponse>> list(@PathVariable Long lessonId) {
        return ApiResponse.ok(vocabService.list(lessonId), "OK");
    }

    @PostMapping("/lessons/{lessonId}/vocab/csv")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<VocabCsvUploadResponse> uploadCsv(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long lessonId,
            @RequestParam("file") MultipartFile file) {
        return ApiResponse.ok(vocabService.uploadCsv(principal, lessonId, file), "Import từ vựng thành công");
    }
}
