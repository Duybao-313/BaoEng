package com.example.BaoEng.repository;

import com.example.BaoEng.entity.Minigame;
import com.example.BaoEng.enums.ContentStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MinigameRepository extends JpaRepository<Minigame, Long> {

    List<Minigame> findByLessonIdOrderByCreatedAtAsc(Long lessonId);

    List<Minigame> findByLessonIdAndStatusOrderByCreatedAtAsc(Long lessonId, ContentStatus status);
}
