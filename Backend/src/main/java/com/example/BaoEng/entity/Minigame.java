package com.example.BaoEng.entity;

import com.example.BaoEng.enums.ContentStatus;
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

import java.time.LocalDateTime;

/**
 * Bảng MINIGAMES (Minigame ôn tập từ vựng).
 */
@Entity
@Table(name = "minigames")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Minigame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "minigame_id")
    private Long minigameId;

    @Column(name = "lesson_id", nullable = false)
    private Long lessonId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('DRAFT','PUBLISHED') DEFAULT 'DRAFT'")
    @Builder.Default
    private ContentStatus status = ContentStatus.DRAFT;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
