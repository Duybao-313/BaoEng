package com.example.BaoEng.repository;

import com.example.BaoEng.entity.Lesson;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByTopicIdOrderByOrderIndexAsc(Long topicId);

    long countByTopicId(Long topicId);

    List<Lesson> findAllByOrderByCreatedAtDesc();

    List<Lesson> findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(String title);

    List<Lesson> findByTopicIdIn(java.util.Collection<Long> topicIds);
}
