package com.example.BaoEng.service;

import com.example.BaoEng.dto.TeacherProfileResponse;
import com.example.BaoEng.dto.UpdateTeacherProfileRequest;
import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.entity.User;
import com.example.BaoEng.enums.Gender;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.TeacherRepository;
import com.example.BaoEng.repository.UserRepository;
import com.example.BaoEng.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý hồ sơ giáo viên — ánh xạ user_id -> teacher_id (tự tạo hàng teachers nếu thiếu).
 */
@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    public TeacherService(TeacherRepository teacherRepository, UserRepository userRepository) {
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }

    /** Lấy (hoặc tự tạo) hồ sơ giáo viên theo userId. */
    @Transactional
    public Teacher getOrCreateTeacher(Long userId) {
        return teacherRepository.findByUserId(userId).orElseGet(() -> {
            Teacher teacher = Teacher.builder()
                    .userId(userId)
                    .teacherCode("GV-" + userId)
                    .teachingExperienceYears(0)
                    .build();
            return teacherRepository.save(teacher);
        });
    }

    public TeacherProfileResponse getProfile(UserPrincipal principal) {
        User user = findUser(principal.getUserId());
        Teacher teacher = getOrCreateTeacher(user.getUserId());
        return TeacherProfileResponse.from(teacher, user);
    }

    @Transactional
    public TeacherProfileResponse updateProfile(UserPrincipal principal, UpdateTeacherProfileRequest request) {
        User user = findUser(principal.getUserId());
        Teacher teacher = getOrCreateTeacher(user.getUserId());

        if (request.teacherCode() != null && !request.teacherCode().isBlank()) {
            teacher.setTeacherCode(request.teacherCode());
        }
        if (request.phone() != null) {
            teacher.setPhone(request.phone());
        }
        if (request.gender() != null && !request.gender().isBlank()) {
            teacher.setGender(parseGender(request.gender()));
        }
        if (request.dateOfBirth() != null) {
            teacher.setDateOfBirth(request.dateOfBirth());
        }
        if (request.academicTitle() != null) {
            teacher.setAcademicTitle(request.academicTitle());
        }
        if (request.highestEducation() != null) {
            teacher.setHighestEducation(request.highestEducation());
        }
        if (request.graduateSchool() != null) {
            teacher.setGraduateSchool(request.graduateSchool());
        }
        if (request.specialization() != null) {
            teacher.setSpecialization(request.specialization());
        }
        if (request.teachingExperienceYears() != null) {
            teacher.setTeachingExperienceYears(request.teachingExperienceYears());
        }
        if (request.bio() != null) {
            teacher.setBio(request.bio());
        }

        teacherRepository.save(teacher);
        return TeacherProfileResponse.from(teacher, user);
    }

    private Gender parseGender(String value) {
        try {
            return Gender.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Invalid gender value: " + value);
        }
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }
}
