package com.example.BaoEng.service;

import com.example.BaoEng.dto.ProgressOverviewResponse;
import com.example.BaoEng.dto.StudyActivityRequest;
import com.example.BaoEng.dto.TodayProgressResponse;
import com.example.BaoEng.dto.TopicProgressResponse;
import com.example.BaoEng.entity.Enrollment;
import com.example.BaoEng.entity.Lesson;
import com.example.BaoEng.entity.LessonProgress;
import com.example.BaoEng.entity.Student;
import com.example.BaoEng.entity.StudySession;
import com.example.BaoEng.entity.Topic;
import com.example.BaoEng.enums.EnrollmentStatus;
import com.example.BaoEng.enums.LessonProgressStatus;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.EnrollmentRepository;
import com.example.BaoEng.repository.LessonProgressRepository;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.StudySessionRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final StudySessionRepository studySessionRepository;

    public ProgressService(
            StudentService studentService,
            EnrollmentRepository enrollmentRepository,
            TopicRepository topicRepository,
            LessonRepository lessonRepository,
            LessonProgressRepository lessonProgressRepository,
            StudySessionRepository studySessionRepository) {
        this.studentService = studentService;
        this.enrollmentRepository = enrollmentRepository;
        this.topicRepository = topicRepository;
        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.studySessionRepository = studySessionRepository;
    }

    /** Muc tieu phut hoc moi ngay, cau hinh qua `app.progress.daily-goal-minutes`. */
    @Value("${app.progress.daily-goal-minutes:15}")
    private int dailyGoalMinutes;

    /**
     * Tien do hoc tap trong ngay (khoi "Tien do hom nay" o Trang chu).
     * Phut hoc = time_spent_minutes cua bai da lam hom nay + thoi gian client bao qua /progress/activity.
     */
    public TodayProgressResponse todayProgress(UserPrincipal principal) {
        Student student = studentService.getOrCreateStudent(principal.getUserId());
        LocalDate today = LocalDate.now();

        int minutesToday = 0;
        Set<Long> completedLessonIds = new HashSet<>();
        Set<LocalDate> activityDates = new HashSet<>();

        for (LessonProgress row : lessonProgressRepository.findByStudentIdOrderByCreatedAtDesc(student.getStudentId())) {
            LocalDate activityDate = toDate(row.getLastActivityAt() != null ? row.getLastActivityAt() : row.getCreatedAt());
            if (activityDate != null) {
                activityDates.add(activityDate);
                if (activityDate.equals(today) && row.getTimeSpentMinutes() != null) {
                    minutesToday += row.getTimeSpentMinutes();
                }
            }
            if (row.getStatus() == LessonProgressStatus.COMPLETED) {
                LocalDate completedDate = toDate(
                        row.getCompletedAt() != null ? row.getCompletedAt() : row.getCreatedAt());
                if (today.equals(completedDate)) {
                    completedLessonIds.add(row.getLessonId());
                }
            }
        }

        for (StudySession session : studySessionRepository.findByStudentIdOrderByStudiedAtDesc(student.getStudentId())) {
            LocalDate studiedDate = toDate(session.getStudiedAt());
            if (studiedDate == null) {
                continue;
            }
            activityDates.add(studiedDate);
            if (studiedDate.equals(today) && session.getMinutes() != null) {
                minutesToday += session.getMinutes();
            }
        }

        TopicProgressResponse current = currentTopic(student.getStudentId());

        return new TodayProgressResponse(
                today,
                dailyGoalMinutes,
                minutesToday,
                completedLessonIds.size(),
                streakDays(activityDates, today),
                activityDates.contains(today),
                current == null ? null : current.topicId(),
                current == null ? null : current.title(),
                current == null ? null : current.progressPercent());
    }

    /** Ghi nhan thoi gian hoc client bao ve (khi roi man Bai hoc) va tra ve tien do hom nay. */
    @Transactional
    public TodayProgressResponse recordStudyActivity(UserPrincipal principal, StudyActivityRequest request) {
        Student student = studentService.getOrCreateStudent(principal.getUserId());
        if (request.lessonId() != null) {
            lessonRepository.findById(request.lessonId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.LESSON_NOT_FOUND));
        }
        studySessionRepository.save(StudySession.builder()
                .studentId(student.getStudentId())
                .lessonId(request.lessonId())
                .minutes(request.minutes())
                .build());
        return todayProgress(principal);
    }

    /** So ngay hoc lien tiep tinh den hom nay (hom nay chua hoc thi tinh tu hom qua). */
    private int streakDays(Set<LocalDate> activityDates, LocalDate today) {
        LocalDate cursor = activityDates.contains(today) ? today : today.minusDays(1);
        int streak = 0;
        while (activityDates.contains(cursor)) {
            streak++;
            cursor = cursor.minusDays(1);
        }
        return streak;
    }

    /** Chu de dang hoc do: da tham gia, chua hoan thanh 100%, moi hoat dong gan nhat. */
    private TopicProgressResponse currentTopic(Long studentId) {
        List<Enrollment> enrollments = new ArrayList<>(enrollmentRepository.findByStudentId(studentId));
        enrollments.sort(Comparator.comparing(
                (Enrollment e) -> e.getLastActivityAt() != null ? e.getLastActivityAt() : e.getEnrolledAt(),
                Comparator.nullsLast(Comparator.reverseOrder())));

        TopicProgressResponse fallback = null;
        for (Enrollment enrollment : enrollments) {
            if (enrollment.getStatus() == EnrollmentStatus.DROPPED) {
                continue;
            }
            TopicProgressResponse progress = buildTopicProgress(studentId, enrollment.getTopicId());
            if (progress.progressPercent() >= 100.0 || progress.totalLessons() == 0) {
                continue;
            }
            if (fallback == null) {
                fallback = progress;
            }
            if (progress.completedLessons() > 0) {
                return progress;
            }
        }
        return fallback;
    }

    private LocalDate toDate(LocalDateTime value) {
        return value == null ? null : value.toLocalDate();
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

    /**
     * % hoàn thành của nhiều chủ đề trong một lượt (tránh N+1 khi render danh sách chủ đề).
     * Mỗi chủ đề tính theo bản ghi LESSON_PROGRESS mới nhất của từng bài học.
     */
    public Map<Long, Double> topicProgressPercents(Long studentId, Collection<Long> topicIds) {
        if (topicIds == null || topicIds.isEmpty()) {
            return Map.of();
        }

        Map<Long, List<Lesson>> lessonsByTopic = lessonRepository.findByTopicIdIn(topicIds).stream()
                .collect(Collectors.groupingBy(Lesson::getTopicId));
        Map<Long, LessonProgressStatus> latestStatusByLesson = new HashMap<>();
        for (LessonProgress row : lessonProgressRepository.findByStudentIdOrderByCreatedAtDesc(studentId)) {
            latestStatusByLesson.putIfAbsent(row.getLessonId(), row.getStatus());
        }

        Map<Long, Double> result = new HashMap<>();
        for (Long topicId : topicIds) {
            List<Lesson> lessons = lessonsByTopic.getOrDefault(topicId, List.of());
            long completed = lessons.stream()
                    .filter(lesson -> latestStatusByLesson.get(lesson.getLessonId()) == LessonProgressStatus.COMPLETED)
                    .count();
            result.put(topicId, lessons.isEmpty() ? 0.0 : round1(completed * 100.0 / lessons.size()));
        }
        return result;
    }

    /** Chủ đề đang học dở gần nhất (null nếu chưa tham gia chủ đề nào). */
    public TopicProgressResponse currentInProgressTopic(Long studentId) {
        return currentTopic(studentId);
    }

    /** Trạng thái hoàn thành của nhiều bài học (bản ghi LESSON_PROGRESS mới nhất). */
    public Map<Long, Boolean> completedLessons(Long studentId, Collection<Long> lessonIds) {
        if (lessonIds == null || lessonIds.isEmpty()) {
            return Map.of();
        }
        Map<Long, LessonProgressStatus> latestStatusByLesson = new HashMap<>();
        for (LessonProgress row : lessonProgressRepository.findByStudentIdOrderByCreatedAtDesc(studentId)) {
            latestStatusByLesson.putIfAbsent(row.getLessonId(), row.getStatus());
        }

        Map<Long, Boolean> result = new HashMap<>();
        for (Long lessonId : lessonIds) {
            result.put(lessonId, latestStatusByLesson.get(lessonId) == LessonProgressStatus.COMPLETED);
        }
        return result;
    }

    /** Các chủ đề Student đang tham gia (bỏ qua bản ghi đã hủy đăng ký). */
    public Set<Long> enrolledTopicIds(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId).stream()
                .filter(enrollment -> enrollment.getStatus() != EnrollmentStatus.DROPPED)
                .map(Enrollment::getTopicId)
                .collect(Collectors.toSet());
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
