package com.example.BaoEng.repository;

import com.example.BaoEng.entity.Topic;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    List<Topic> findByTeacherIdOrderByCreatedAtDesc(Long teacherId);

    List<Topic> findAllByOrderByCreatedAtDesc();

    List<Topic> findByTeacherIdAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(Long teacherId, String title);

    List<Topic> findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(String title);

    List<Topic> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByCreatedAtDesc(
            String title, String description);

    Optional<Topic> findByTopicIdAndTeacherId(Long topicId, Long teacherId);
}
