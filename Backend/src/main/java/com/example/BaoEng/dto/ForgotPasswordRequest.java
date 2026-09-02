package com.example.BaoEng.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(
        @NotBlank(message = "email must not be blank")
        @Email(message = "email must be a valid email")
        String email
) {
}
