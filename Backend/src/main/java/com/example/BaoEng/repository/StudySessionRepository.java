package com.example.BaoEng.repository;

import com.example.BaoEng.entity.StudySession;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findByStudentIdAndStudiedAtGreaterThanEqual(Long studentId, LocalDateTime from);

    List<StudySession> findByStudentIdOrderByStudiedAtDesc(Long studentId);
}
