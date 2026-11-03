package com.example.BaoEng.service;

import com.example.BaoEng.dto.LessonResponse;
import com.example.BaoEng.dto.SearchResponse;
import com.example.BaoEng.dto.TopicResponse;
import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.entity.Topic;
import com.example.BaoEng.enums.Level;
import com.example.BaoEng.enums.Role;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

/**
 * Tìm kiếm chủ đề / bài học (FR-CONTENT-03).
 */
@Service
public class SearchService {

    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final TeacherService teacherService;
    private final TopicService topicService;

    public SearchService(
            TopicRepository topicRepository,
            LessonRepository lessonRepository,
            TeacherService teacherService,
            TopicService topicService) {
        this.topicRepository = topicRepository;
        this.lessonRepository = lessonRepository;
        this.teacherService = teacherService;
        this.topicService = topicService;
    }

    public SearchResponse search(UserPrincipal principal, String q, String level) {
        if (q == null || q.isBlank()) {
            return new SearchResponse(List.of(), List.of());
        }
        String keyword = q.trim();
        Level levelFilter = parseLevel(level);

        List<Topic> scopedTopics;
        if (principal.getRole() == Role.TEACHER) {
            Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
            scopedTopics = topicRepository.findByTeacherIdOrderByCreatedAtDesc(teacher.getTeacherId());
        } else {
            scopedTopics = topicRepository.findAllByOrderByCreatedAtDesc();
        }

        Set<Long> allowedTopicIds = scopedTopics.stream()
                .filter(topic -> levelFilter == null || topic.getLevel() == levelFilter)
                .map(Topic::getTopicId)
                .collect(Collectors.toSet());

        List<TopicResponse> topics = scopedTopics.stream()
                .filter(topic -> allowedTopicIds.contains(topic.getTopicId()))
                .filter(topic -> matchesKeyword(topic, keyword))
                .map(topicService::toResponse)
                .toList();

        List<LessonResponse> lessons = lessonRepository
                .findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(keyword).stream()
                .filter(lesson -> allowedTopicIds.contains(lesson.getTopicId()))
                .map(LessonResponse::from)
                .toList();

        return new SearchResponse(topics, lessons);
    }

    private Level parseLevel(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return Level.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Invalid level: " + value);
        }
    }

    private boolean matchesKeyword(Topic topic, String keyword) {
        return containsKeyword(topic.getTitle(), keyword)
                || containsKeyword(topic.getDescription(), keyword);
    }

    private boolean containsKeyword(String value, String keyword) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(keyword.toLowerCase(Locale.ROOT));
    }
}
