package com.example.BaoEng.repository;

import com.example.BaoEng.entity.LessonProgress;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {

    Optional<LessonProgress> findTopByStudentIdAndLessonIdOrderByAttemptNumberDesc(Long studentId, Long lessonId);
}
