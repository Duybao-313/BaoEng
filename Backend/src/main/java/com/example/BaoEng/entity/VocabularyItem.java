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

/**
 * Bảng VOCABULARY_ITEMS (Từ vựng theo bài học).
 */
@Entity
@Table(name = "vocabulary_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VocabularyItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vocab_id")
    private Long vocabId;

    @Column(name = "lesson_id", nullable = false)
    private Long lessonId;

    @Column(name = "word", nullable = false, length = 255)
    private String word;

    @Column(name = "meaning", nullable = false, length = 500)
    private String meaning;

    @Column(name = "pronunciation", length = 255)
    private String pronunciation;

    @Column(name = "example", columnDefinition = "TEXT")
    private String example;
}
