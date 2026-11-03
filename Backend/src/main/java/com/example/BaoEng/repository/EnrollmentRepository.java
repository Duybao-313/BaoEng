package com.example.BaoEng.repository;

import com.example.BaoEng.entity.Enrollment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByStudentIdAndTopicId(Long studentId, Long topicId);

    List<Enrollment> findByStudentId(Long studentId);
}
