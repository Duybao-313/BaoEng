package com.example.BaoEng.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record UpdateTeacherProfileRequest(
        @Size(max = 50, message = "teacherCode must be at most 50 characters")
        String teacherCode,

        @Size(max = 20, message = "phone must be at most 20 characters")
        String phone,

        String gender,

        LocalDate dateOfBirth,

        @Size(max = 100, message = "academicTitle must be at most 100 characters")
        String academicTitle,

        @Size(max = 255, message = "highestEducation must be at most 255 characters")
        String highestEducation,

        @Size(max = 255, message = "graduateSchool must be at most 255 characters")
        String graduateSchool,

        @Size(max = 255, message = "specialization must be at most 255 characters")
        String specialization,

        @Min(value = 0, message = "teachingExperienceYears must not be negative")
        Integer teachingExperienceYears,

        String bio
) {
}
