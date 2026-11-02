package com.example.BaoEng.repository;

import com.example.BaoEng.entity.VocabularyItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocabularyItemRepository extends JpaRepository<VocabularyItem, Long> {

    List<VocabularyItem> findByLessonIdOrderByVocabIdAsc(Long lessonId);

    long countByLessonId(Long lessonId);
}
