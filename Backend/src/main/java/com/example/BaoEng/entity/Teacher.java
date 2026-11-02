package com.example.BaoEng.entity;

import com.example.BaoEng.enums.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Bảng TEACHERS (Hồ sơ giáo viên) — theo Docs/Database_Design_Specification_v2.md.
 */
@Entity
@Table(name = "teachers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Long teacherId;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "teacher_code", unique = true, length = 50)
    private String teacherCode;

    @Column(name = "phone", length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", columnDefinition = "ENUM('MALE','FEMALE','OTHER')")
    private Gender gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "academic_title", length = 100)
    private String academicTitle;

    @Column(name = "highest_education", length = 255)
    private String highestEducation;

    @Column(name = "graduate_school", length = 255)
    private String graduateSchool;

    @Column(name = "specialization", length = 255)
    private String specialization;

    @Column(name = "teaching_experience_years", nullable = false)
    @Builder.Default
    private Integer teachingExperienceYears = 0;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
