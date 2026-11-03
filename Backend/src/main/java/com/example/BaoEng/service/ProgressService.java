package com.example.BaoEng.service;

import com.example.BaoEng.dto.ProgressOverviewResponse;
import com.example.BaoEng.dto.TopicProgressResponse;
import com.example.BaoEng.entity.Enrollment;
import com.example.BaoEng.entity.Lesson;
import com.example.BaoEng.entity.LessonProgress;
import com.example.BaoEng.entity.Student;
import com.example.BaoEng.entity.Topic;
import com.example.BaoEng.enums.EnrollmentStatus;
import com.example.BaoEng.enums.LessonProgressStatus;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.EnrollmentRepository;
import com.example.BaoEng.repository.LessonProgressRepository;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 * Tính tiến độ học tập của Student (FR-STUDENT-04).
 * Số liệu dựa trên bản ghi LESSON_PROGRESS mới nhất (attempt_number cao nhất) của từng bài học.
 */
@Service
public class ProgressService {

    private final StudentService studentService;
    private final EnrollmentRepository enrollmentRepository;
    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final LessonProgressRepository lessonProgressRepository;

    public ProgressService(
            StudentService studentService,
            EnrollmentRepository enrollmentRepository,
            TopicRepository topicRepository,
            LessonRepository lessonRepository,
            LessonProgressRepository lessonProgressRepository) {
        this.studentService = studentService;
        this.enrollmentRepository = enrollmentRepository;
        this.topicRepository = topicRepository;
        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
    }

    /** Tiến độ tổng thể của Student (theo từng chủ đề đã tham gia). */
    public ProgressOverviewResponse overview(UserPrincipal principal) {
        Student student = studentService.getOrCreateStudent(principal.getUserId());
        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(student.getStudentId());

        List<TopicProgressResponse> topics = new ArrayList<>();
        long totalLessonsAll = 0;
        long completedLessonsAll = 0;

        for (Enrollment enrollment : enrollments) {
            if (enrollment.getStatus() == EnrollmentStatus.DROPPED) {
                continue;
            }
            TopicProgressResponse progress = buildTopicProgress(student.getStudentId(), enrollment.getTopicId());
            topics.add(progress);
            totalLessonsAll += progress.totalLessons();
            completedLessonsAll += progress.completedLessons();
        }

        double overall = totalLessonsAll == 0
                ? 0.0
                : round1(completedLessonsAll * 100.0 / totalLessonsAll);
        return new ProgressOverviewResponse(overall, topics);
    }

    /** Tiến độ theo một chủ đề cụ thể. */
    public TopicProgressResponse topicProgress(UserPrincipal principal, Long topicId) {
        topicRepository.findById(topicId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TOPIC_NOT_FOUND));

        Student student = studentService.getOrCreateStudent(principal.getUserId());
        return buildTopicProgress(student.getStudentId(), topicId);
    }

    /** Phần trăm hoàn thành chủ đề (dùng lại cho luồng nộp bài minigame). */
    public double topicProgressPercent(Long studentId, Long topicId) {
        return buildTopicProgress(studentId, topicId).progressPercent();
    }

    private TopicProgressResponse buildTopicProgress(Long studentId, Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TOPIC_NOT_FOUND));

        List<Lesson> lessons = lessonRepository.findByTopicIdOrderByOrderIndexAsc(topicId);

        long completed = 0;
        for (Lesson lesson : lessons) {
            Optional<LessonProgress> latest = lessonProgressRepository
                    .findTopByStudentIdAndLessonIdOrderByAttemptNumberDesc(studentId, lesson.getLessonId());
            if (latest.isPresent() && latest.get().getStatus() == LessonProgressStatus.COMPLETED) {
                completed++;
            }
        }

        double percent = lessons.isEmpty() ? 0.0 : round1(completed * 100.0 / lessons.size());

        boolean enrolled = enrollmentRepository
                .findByStudentIdAndTopicId(studentId, topicId)
                .map(e -> e.getStatus() != EnrollmentStatus.DROPPED)
                .orElse(false);

        return new TopicProgressResponse(topicId, topic.getTitle(), completed, lessons.size(), percent, enrolled);
    }

    private double round1(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
