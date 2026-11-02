package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.CertificateCreateRequest;
import com.example.BaoEng.dto.CertificateResponse;
import com.example.BaoEng.dto.CertificateUpdateRequest;
import com.example.BaoEng.security.UserPrincipal;
import com.example.BaoEng.service.CertificateService;
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
@RequestMapping(AppConstants.API_BASE + "/teachers/me/certificates")
@PreAuthorize("hasRole('TEACHER')")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping
    public ApiResponse<List<CertificateResponse>> list(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.ok(certificateService.list(principal), "OK");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<CertificateResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CertificateCreateRequest request) {
        return ApiResponse.ok(certificateService.create(principal, request), "Thêm chứng chỉ thành công");
    }

    @PutMapping("/{certificateId}")
    public ApiResponse<CertificateResponse> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long certificateId,
            @Valid @RequestBody CertificateUpdateRequest request) {
        return ApiResponse.ok(certificateService.update(principal, certificateId, request), "Cập nhật chứng chỉ thành công");
    }

    @DeleteMapping("/{certificateId}")
    public ApiResponse<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long certificateId) {
        certificateService.delete(principal, certificateId);
        return ApiResponse.ok(null, "Xóa chứng chỉ thành công");
    }
}
