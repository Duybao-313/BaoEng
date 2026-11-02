package com.example.BaoEng.repository;

import com.example.BaoEng.entity.LessonMaterial;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonMaterialRepository extends JpaRepository<LessonMaterial, Long> {

    List<LessonMaterial> findByLessonIdOrderByCreatedAtAsc(Long lessonId);
}
