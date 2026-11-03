package com.example.BaoEng.repository;

import com.example.BaoEng.entity.Enrollment;
import com.example.BaoEng.enums.EnrollmentStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByStudentIdAndTopicId(Long studentId, Long topicId);

    List<Enrollment> findByStudentId(Long studentId);

    /** So luot dang ky (khong tinh DROPPED) theo tung chu de — dung de xep hang "noi bat". */
    @Query("""
            select e.topicId, count(e)
            from Enrollment e
            where e.status <> :excluded
            group by e.topicId
            """)
    List<Object[]> countByTopicExcludingStatus(@Param("excluded") EnrollmentStatus excluded);
}
