package com.example.BaoEng.dto;

import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.entity.User;
import java.time.LocalDate;

public record TeacherProfileResponse(
        Long teacherId,
        Long userId,
        String teacherCode,
        String fullName,
        String username,
        String email,
        String phone,
        String gender,
        LocalDate dateOfBirth,
        String academicTitle,
        String highestEducation,
        String graduateSchool,
        String specialization,
        Integer teachingExperienceYears,
        String bio
) {
    public static TeacherProfileResponse from(Teacher teacher, User user) {
        return new TeacherProfileResponse(
                teacher.getTeacherId(),
                teacher.getUserId(),
                teacher.getTeacherCode(),
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                teacher.getPhone(),
                teacher.getGender() != null ? teacher.getGender().name() : null,
                teacher.getDateOfBirth(),
                teacher.getAcademicTitle(),
                teacher.getHighestEducation(),
                teacher.getGraduateSchool(),
                teacher.getSpecialization(),
                teacher.getTeachingExperienceYears(),
                teacher.getBio());
    }
}
