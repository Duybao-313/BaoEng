package com.example.BaoEng.service;

import com.example.BaoEng.dto.TopicCreateRequest;
import com.example.BaoEng.dto.TopicResponse;
import com.example.BaoEng.dto.TopicUpdateRequest;
import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.entity.Topic;
import com.example.BaoEng.entity.User;
import com.example.BaoEng.enums.ContentStatus;
import com.example.BaoEng.enums.Level;
import com.example.BaoEng.enums.Role;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.TeacherRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.repository.UserRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý chủ đề học (FR-TEACHER-01).
 */
@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final TeacherService teacherService;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    public TopicService(
            TopicRepository topicRepository,
            LessonRepository lessonRepository,
            TeacherService teacherService,
            TeacherRepository teacherRepository,
            UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.lessonRepository = lessonRepository;
        this.teacherService = teacherService;
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }

    public List<TopicResponse> list(UserPrincipal principal) {
        List<Topic> topics;
        if (principal.getRole() == Role.TEACHER) {
            Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
            topics = topicRepository.findByTeacherIdOrderByCreatedAtDesc(teacher.getTeacherId());
        } else {
            topics = topicRepository.findAllByOrderByCreatedAtDesc();
        }
        return topics.stream().map(this::toResponse).toList();
    }

    public TopicResponse get(UserPrincipal principal, Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TOPIC_NOT_FOUND));
        return toResponse(topic);
    }

    @Transactional
    public TopicResponse create(UserPrincipal principal, TopicCreateRequest request) {
        Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
        Topic topic = Topic.builder()
                .teacherId(teacher.getTeacherId())
                .title(request.title())
                .description(request.description())
                .level(parseLevel(request.level()))
                .status(ContentStatus.DRAFT)
                .build();
        return toResponse(topicRepository.save(topic));
    }

    @Transactional
    public TopicResponse update(UserPrincipal principal, Long topicId, TopicUpdateRequest request) {
        Topic topic = findOwnedTopic(principal, topicId);
        if (request.title() != null && !request.title().isBlank()) {
            topic.setTitle(request.title());
        }
        if (request.description() != null) {
            topic.setDescription(request.description());
        }
        if (request.level() != null && !request.level().isBlank()) {
            topic.setLevel(parseLevel(request.level()));
        }
        if (request.status() != null && !request.status().isBlank()) {
            topic.setStatus(parseStatus(request.status()));
        }
        return toResponse(topicRepository.save(topic));
    }

    @Transactional
    public void delete(UserPrincipal principal, Long topicId) {
        Topic topic = findOwnedTopic(principal, topicId);
        topicRepository.delete(topic);
    }

    public Topic findOwnedTopic(UserPrincipal principal, Long topicId) {
        Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
        return topicRepository.findByTopicIdAndTeacherId(topicId, teacher.getTeacherId())
                .orElseThrow(() -> new BusinessException(ErrorCode.TOPIC_NOT_FOUND));
    }

    public TopicResponse toResponse(Topic topic) {
        long lessonCount = lessonRepository.countByTopicId(topic.getTopicId());
        return TopicResponse.from(topic, lessonCount, resolveTeacherName(topic.getTeacherId()));
    }

    private String resolveTeacherName(Long teacherId) {
        return teacherRepository.findById(teacherId)
                .flatMap(t -> userRepository.findById(t.getUserId()))
                .map(User::getFullName)
                .orElse(null);
    }

    private Level parseLevel(String value) {
        try {
            return Level.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Invalid level: " + value);
        }
    }

    private ContentStatus parseStatus(String value) {
        try {
            return ContentStatus.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Invalid status: " + value);
        }
    }
}
