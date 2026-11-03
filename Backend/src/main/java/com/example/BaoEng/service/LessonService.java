package com.example.BaoEng.service;

import com.example.BaoEng.dto.LessonCreateRequest;
import com.example.BaoEng.dto.LessonResponse;
import com.example.BaoEng.dto.LessonUpdateRequest;
import com.example.BaoEng.dto.MaterialResponse;
import com.example.BaoEng.dto.MinigameResponse;
import com.example.BaoEng.entity.Lesson;
import com.example.BaoEng.enums.ContentStatus;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.LessonMaterialRepository;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.MinigameQuestionRepository;
import com.example.BaoEng.repository.MinigameRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý bài học trong chủ đề (FR-TEACHER-02).
 */
@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final TopicRepository topicRepository;
    private final TopicService topicService;
    private final LessonMaterialRepository materialRepository;
    private final MinigameRepository minigameRepository;
    private final MinigameQuestionRepository questionRepository;

    public LessonService(
            LessonRepository lessonRepository,
            TopicRepository topicRepository,
            TopicService topicService,
            LessonMaterialRepository materialRepository,
            MinigameRepository minigameRepository,
            MinigameQuestionRepository questionRepository) {
        this.lessonRepository = lessonRepository;
        this.topicRepository = topicRepository;
        this.topicService = topicService;
        this.materialRepository = materialRepository;
        this.minigameRepository = minigameRepository;
        this.questionRepository = questionRepository;
    }

    public List<LessonResponse> list(Long topicId) {
        if (!topicRepository.existsById(topicId)) {
            throw new BusinessException(ErrorCode.TOPIC_NOT_FOUND);
        }
        return lessonRepository.findByTopicIdOrderByOrderIndexAsc(topicId).stream()
                .map(this::toResponseWithMinigames)
                .toList();
    }

    /** Chi tiết bài học kèm học liệu và minigame (để client hiển thị nút làm bài). */
    public LessonResponse detail(Long lessonId) {
        Lesson lesson = findLesson(lessonId);

        List<MaterialResponse> materials = materialRepository
                .findByLessonIdOrderByCreatedAtAsc(lessonId).stream()
                .map(MaterialResponse::from)
                .toList();

        List<MinigameResponse> minigames = minigameRepository
                .findByLessonIdOrderByCreatedAtAsc(lessonId).stream()
                .map(m -> MinigameResponse.from(m, questionRepository.countByMinigameId(m.getMinigameId())))
                .toList();

        return LessonResponse.fromDetail(lesson, materials, minigames);
    }

    /** Ban rut gon cho danh sach: chi kem minigame de client biet bai co bai tap on tap. */
    private LessonResponse toResponseWithMinigames(Lesson lesson) {
        List<MinigameResponse> minigames = minigameRepository
                .findByLessonIdOrderByCreatedAtAsc(lesson.getLessonId()).stream()
                .map(m -> MinigameResponse.from(m, questionRepository.countByMinigameId(m.getMinigameId())))
                .toList();
        return LessonResponse.fromDetail(lesson, List.of(), minigames);
    }

    @Transactional
    public LessonResponse create(UserPrincipal principal, Long topicId, LessonCreateRequest request) {
        topicService.findOwnedTopic(principal, topicId);
        Lesson lesson = Lesson.builder()
                .topicId(topicId)
                .title(request.title())
                .orderIndex(request.orderIndex() != null ? request.orderIndex() : 1)
                .completionThreshold(request.completionThreshold() != null
                        ? BigDecimal.valueOf(request.completionThreshold())
                        : new BigDecimal("80.00"))
                .status(ContentStatus.DRAFT)
                .build();
        return LessonResponse.from(lessonRepository.save(lesson));
    }

    @Transactional
    public LessonResponse update(UserPrincipal principal, Long lessonId, LessonUpdateRequest request) {
        Lesson lesson = findOwnedLesson(principal, lessonId);
        if (request.title() != null && !request.title().isBlank()) {
            lesson.setTitle(request.title());
        }
        if (request.orderIndex() != null) {
            lesson.setOrderIndex(request.orderIndex());
        }
        if (request.completionThreshold() != null) {
            lesson.setCompletionThreshold(BigDecimal.valueOf(request.completionThreshold()));
        }
        if (request.status() != null && !request.status().isBlank()) {
            lesson.setStatus(parseStatus(request.status()));
        }
        return LessonResponse.from(lessonRepository.save(lesson));
    }

    @Transactional
    public void delete(UserPrincipal principal, Long lessonId) {
        Lesson lesson = findOwnedLesson(principal, lessonId);
        lessonRepository.delete(lesson);
    }

    public Lesson findOwnedLesson(UserPrincipal principal, Long lessonId) {
        Lesson lesson = findLesson(lessonId);
        topicService.findOwnedTopic(principal, lesson.getTopicId());
        return lesson;
    }

    private Lesson findLesson(Long lessonId) {
        return lessonRepository.findById(lessonId)
                .orElseThrow(() -> new BusinessException(ErrorCode.LESSON_NOT_FOUND));
    }

    private ContentStatus parseStatus(String value) {
        try {
            return ContentStatus.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Invalid status: " + value);
        }
    }
}
