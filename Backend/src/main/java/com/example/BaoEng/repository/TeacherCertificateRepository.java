package com.example.BaoEng.repository;

import com.example.BaoEng.entity.TeacherCertificate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherCertificateRepository extends JpaRepository<TeacherCertificate, Long> {

    List<TeacherCertificate> findByTeacherIdOrderByCreatedAtDesc(Long teacherId);

    Optional<TeacherCertificate> findByCertificateIdAndTeacherId(Long certificateId, Long teacherId);
}
