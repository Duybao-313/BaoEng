package com.example.BaoEng.service;

import com.example.BaoEng.common.AppConstants;
import com.example.BaoEng.dto.MaterialResponse;
import com.example.BaoEng.entity.Lesson;
import com.example.BaoEng.entity.LessonMaterial;
import com.example.BaoEng.enums.MaterialType;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.LessonMaterialRepository;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * Quản lý học liệu đa phương tiện (FR-TEACHER-03).
 */
@Service
public class MaterialService {

    private static final long MAX_VIDEO_BYTES = 200L * 1024 * 1024;
    private static final long MAX_DOCUMENT_BYTES = 25L * 1024 * 1024;

    private final LessonMaterialRepository materialRepository;
    private final LessonRepository lessonRepository;
    private final LessonService lessonService;
    private final UploadStorage uploadStorage;

    public MaterialService(
            LessonMaterialRepository materialRepository,
            LessonRepository lessonRepository,
            LessonService lessonService,
            UploadStorage uploadStorage) {
        this.materialRepository = materialRepository;
        this.lessonRepository = lessonRepository;
        this.lessonService = lessonService;
        this.uploadStorage = uploadStorage;
    }

    public List<MaterialResponse> list(Long lessonId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new BusinessException(ErrorCode.LESSON_NOT_FOUND);
        }
        return materialRepository.findByLessonIdOrderByCreatedAtAsc(lessonId).stream()
                .map(MaterialResponse::from)
                .toList();
    }

    @Transactional
    public MaterialResponse upload(
            UserPrincipal principal, Long lessonId, String type, MultipartFile file) {
        Lesson lesson = lessonService.findOwnedLesson(principal, lessonId);
        MaterialType materialType = parseType(type);
        validateSize(materialType, file.getSize());

        String storedName = UUID.randomUUID() + extensionOf(file);
        try (var in = file.getInputStream()) {
            uploadStorage.save("materials", storedName, in);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_ERROR, "Không thể lưu file.");
        }

        LessonMaterial material = LessonMaterial.builder()
                .lessonId(lesson.getLessonId())
                .type(materialType)
                .fileUrl(AppConstants.API_BASE + "/files/" + storedName)
                .build();
        return MaterialResponse.from(materialRepository.save(material));
    }

    @Transactional
    public void delete(UserPrincipal principal, Long materialId) {
        LessonMaterial material = materialRepository.findById(materialId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MATERIAL_NOT_FOUND));
        lessonService.findOwnedLesson(principal, material.getLessonId());
        deleteFileIfExists(material.getFileUrl());
        materialRepository.delete(material);
    }

    private void deleteFileIfExists(String fileUrl) {
        if (fileUrl == null) {
            return;
        }
        String filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        uploadStorage.deleteQuietly("materials", filename);
    }

    private MaterialType parseType(String value) {
        try {
            return MaterialType.valueOf(value.trim().toUpperCase());
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INVALID_FILE_TYPE, "type phải là VIDEO, PDF hoặc WORD");
        }
    }

    private void validateSize(MaterialType type, long size) {
        long max = type == MaterialType.VIDEO ? MAX_VIDEO_BYTES : MAX_DOCUMENT_BYTES;
        if (size > max) {
            throw new BusinessException(ErrorCode.FILE_TOO_LARGE,
                    "File vượt quá giới hạn " + (max / (1024 * 1024)) + "MB");
        }
    }

    private String extensionOf(MultipartFile file) {
        String original = file.getOriginalFilename();
        if (original != null && original.contains(".")) {
            String ext = original.substring(original.lastIndexOf('.'));
            if (ext.matches("\\.[a-zA-Z0-9]{1,10}")) {
                return ext;
            }
        }
        return "";
    }
}
