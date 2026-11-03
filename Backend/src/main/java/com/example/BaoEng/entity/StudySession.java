package com.example.BaoEng.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

import java.time.LocalDateTime;

/**
 * Bảng STUDY_SESSIONS (Thời gian học theo phiên) — dùng cho khối "Tiến độ hôm nay".
 * Client báo số phút đã học khi rời màn bài học; mỗi lần báo là một bản ghi.
 */
@Entity
@Table(name = "study_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long sessionId;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "lesson_id")
    private Long lessonId;

    @Column(name = "minutes", nullable = false)
    private Integer minutes;

    @CreationTimestamp
    @Column(name = "studied_at", nullable = false, updatable = false)
    private LocalDateTime studiedAt;
}
