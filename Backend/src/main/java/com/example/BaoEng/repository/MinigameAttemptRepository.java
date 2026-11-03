package com.example.BaoEng.repository;

import com.example.BaoEng.entity.MinigameAttempt;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MinigameAttemptRepository extends JpaRepository<MinigameAttempt, Long> {

    Optional<MinigameAttempt> findTopByStudentIdAndMinigameIdOrderByAttemptIdDesc(Long studentId, Long minigameId);

    List<MinigameAttempt> findByStudentIdAndMinigameIdOrderByAttemptIdDesc(Long studentId, Long minigameId);
}
