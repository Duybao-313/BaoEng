package com.example.BaoEng.controller;

import com.example.BaoEng.common.ApiResponse;
import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.AuthResponse;
import com.example.BaoEng.dto.ForgotPasswordRequest;
import com.example.BaoEng.dto.LoginRequest;
import com.example.BaoEng.dto.RefreshResponse;
import com.example.BaoEng.dto.RegisterRequest;
import com.example.BaoEng.dto.ResetPasswordRequest;
import com.example.BaoEng.dto.UserResponse;
import com.example.BaoEng.dto.VerifyEmailRequest;
import com.example.BaoEng.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AppConstants.AUTH_BASE)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.ok(
                authService.register(request),
                "Đăng ký thành công. Vui lòng kiểm tra email để xác thực.");
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        return ApiResponse.ok(authService.login(request, response), "Đăng nhập thành công");
    }

    @PostMapping("/refresh")
    public ApiResponse<RefreshResponse> refresh(
            HttpServletRequest request, HttpServletResponse response) {
        return ApiResponse.ok(authService.refresh(request, response), "Làm mới token thành công");
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ApiResponse.ok(null, "Đăng xuất thành công");
    }

    @PostMapping("/forgot-password")
    public ApiResponse<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ApiResponse.ok(null, "Nếu email tồn tại, liên kết đặt lại đã được gửi.");
    }

    @PostMapping("/reset-password")
    public ApiResponse<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ApiResponse.ok(null, "Đặt lại mật khẩu thành công");
    }

    @PostMapping("/verify-email")
    public ApiResponse<Void> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        authService.verifyEmail(request);
        return ApiResponse.ok(null, "Xác thực email thành công.");
    }
}
