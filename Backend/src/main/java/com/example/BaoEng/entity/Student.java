package com.example.BaoEng.entity;

import com.example.BaoEng.enums.Level;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Bảng STUDENTS (Hồ sơ học sinh) — theo Docs/Database_Design_Specification_v2.md.
 * Chỉ map các cột cần thiết cho nghiệp vụ enroll; các cột JSON/nullable còn lại
 * do DB tự quản lý (mặc định hoặc NULL).
 */
@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "student_code", unique = true, length = 50)
    private String studentCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_level", nullable = false, columnDefinition = "ENUM('BEGINNER','INTERMEDIATE','ADVANCED') DEFAULT 'BEGINNER'")
    @Builder.Default
    private Level currentLevel = Level.BEGINNER;

    @Column(name = "total_points", nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal totalPoints = BigDecimal.ZERO;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
