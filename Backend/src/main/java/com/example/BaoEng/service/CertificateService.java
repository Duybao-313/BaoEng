package com.example.BaoEng.service;

import com.example.BaoEng.dto.CertificateCreateRequest;
import com.example.BaoEng.dto.CertificateResponse;
import com.example.BaoEng.dto.CertificateUpdateRequest;
import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.entity.TeacherCertificate;
import com.example.BaoEng.enums.CertificateStatus;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.TeacherCertificateRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý chứng chỉ giáo viên (FR-TEACHER, API spec mục 13).
 */
@Service
public class CertificateService {

    private final TeacherCertificateRepository certificateRepository;
    private final TeacherService teacherService;

    public CertificateService(
            TeacherCertificateRepository certificateRepository,
            TeacherService teacherService) {
        this.certificateRepository = certificateRepository;
        this.teacherService = teacherService;
    }

    public List<CertificateResponse> list(UserPrincipal principal) {
        Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
        return certificateRepository.findByTeacherIdOrderByCreatedAtDesc(teacher.getTeacherId()).stream()
                .map(CertificateResponse::from)
                .toList();
    }

    @Transactional
    public CertificateResponse create(UserPrincipal principal, CertificateCreateRequest request) {
        Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
        TeacherCertificate certificate = TeacherCertificate.builder()
                .teacherId(teacher.getTeacherId())
                .name(request.name())
                .score(request.score())
                .issuingBody(request.issuingBody())
                .imageUrl(request.imageUrl())
                .status(CertificateStatus.PENDING)
                .build();
        return CertificateResponse.from(certificateRepository.save(certificate));
    }

    @Transactional
    public CertificateResponse update(UserPrincipal principal, Long certificateId, CertificateUpdateRequest request) {
        TeacherCertificate certificate = findOwned(principal, certificateId);
        if (request.name() != null && !request.name().isBlank()) {
            certificate.setName(request.name());
        }
        if (request.score() != null) {
            certificate.setScore(request.score());
        }
        if (request.issuingBody() != null) {
            certificate.setIssuingBody(request.issuingBody());
        }
        if (request.imageUrl() != null) {
            certificate.setImageUrl(request.imageUrl());
        }
        return CertificateResponse.from(certificateRepository.save(certificate));
    }

    @Transactional
    public void delete(UserPrincipal principal, Long certificateId) {
        TeacherCertificate certificate = findOwned(principal, certificateId);
        certificateRepository.delete(certificate);
    }

    private TeacherCertificate findOwned(UserPrincipal principal, Long certificateId) {
        Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
        return certificateRepository.findByCertificateIdAndTeacherId(certificateId, teacher.getTeacherId())
                .orElseThrow(() -> new BusinessException(ErrorCode.CERTIFICATE_NOT_FOUND));
    }
}
