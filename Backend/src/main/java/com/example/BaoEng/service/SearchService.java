package com.example.BaoEng.service;

import com.example.BaoEng.dto.LessonResponse;
import com.example.BaoEng.dto.SearchResponse;
import com.example.BaoEng.dto.TopicResponse;
import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.entity.Topic;
import com.example.BaoEng.enums.Role;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.List;
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

    public SearchResponse search(UserPrincipal principal, String q) {
        if (q == null || q.isBlank()) {
            return new SearchResponse(List.of(), List.of());
        }
        String keyword = q.trim();

        List<TopicResponse> topics;
        List<LessonResponse> lessons;

        if (principal.getRole() == Role.TEACHER) {
            Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
            topics = topicRepository
                    .findByTeacherIdAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(teacher.getTeacherId(), keyword)
                    .stream().map(topicService::toResponse).toList();

            Set<Long> topicIds = topicRepository.findByTeacherIdOrderByCreatedAtDesc(teacher.getTeacherId()).stream()
                    .map(Topic::getTopicId)
                    .collect(Collectors.toSet());
            lessons = lessonRepository.findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(keyword).stream()
                    .filter(l -> topicIds.contains(l.getTopicId()))
                    .map(LessonResponse::from)
                    .toList();
        } else {
            topics = topicRepository.findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(keyword).stream()
                    .map(topicService::toResponse).toList();
            lessons = lessonRepository.findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(keyword).stream()
                    .map(LessonResponse::from)
                    .toList();
        }

        return new SearchResponse(topics, lessons);
    }
}
