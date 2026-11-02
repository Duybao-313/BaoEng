package com.example.BaoEng.repository;

import com.example.BaoEng.entity.MinigameQuestion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MinigameQuestionRepository extends JpaRepository<MinigameQuestion, Long> {

    List<MinigameQuestion> findByMinigameIdOrderByQuestionOrderAsc(Long minigameId);

    long countByMinigameId(Long minigameId);
}
