package com.example.BaoEng.service;

import com.example.BaoEng.dto.EnrollmentResponse;
import com.example.BaoEng.dto.TopicCreateRequest;
import com.example.BaoEng.dto.TopicResponse;
import com.example.BaoEng.dto.TopicUpdateRequest;
import com.example.BaoEng.entity.Enrollment;
import com.example.BaoEng.entity.Student;
import com.example.BaoEng.entity.Teacher;
import com.example.BaoEng.entity.Topic;
import com.example.BaoEng.entity.User;
import com.example.BaoEng.enums.ContentStatus;
import com.example.BaoEng.enums.EnrollmentStatus;
import com.example.BaoEng.enums.Level;
import com.example.BaoEng.enums.Role;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.EnrollmentRepository;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.TeacherRepository;
import com.example.BaoEng.repository.TopicRepository;
import com.example.BaoEng.repository.UserRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý chủ đề học (FR-TEACHER-01).
 */
@Service
public class TopicService {

    private static final int DEFAULT_RECOMMENDED_LIMIT = 6;
    private static final int DEFAULT_FEATURED_LIMIT = 10;
    private static final int MAX_LIMIT = 20;

    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final TeacherService teacherService;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final StudentService studentService;
    private final EnrollmentRepository enrollmentRepository;
    private final ProgressService progressService;

    public TopicService(
            TopicRepository topicRepository,
            LessonRepository lessonRepository,
            TeacherService teacherService,
            TeacherRepository teacherRepository,
            UserRepository userRepository,
            StudentService studentService,
            EnrollmentRepository enrollmentRepository,
            ProgressService progressService) {
        this.topicRepository = topicRepository;
        this.lessonRepository = lessonRepository;
        this.teacherService = teacherService;
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
        this.studentService = studentService;
        this.enrollmentRepository = enrollmentRepository;
        this.progressService = progressService;
    }

    /**
     * Danh sach chu de, ho tro loc theo level va tim kiem theo tu khoa (title/description).
     *
     * @param level BEGINNER | INTERMEDIATE | ADVANCED (null/rong = tat ca)
     * @param q     tu khoa tim kiem (null/rong = khong loc)
     */
    public List<TopicResponse> list(UserPrincipal principal, String level, String q) {
        List<Topic> topics;
        if (principal.getRole() == Role.TEACHER) {
            Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
            topics = topicRepository.findByTeacherIdOrderByCreatedAtDesc(teacher.getTeacherId());
        } else {
            topics = topicRepository.findAllByOrderByCreatedAtDesc();
        }

        List<Topic> filtered = filterTopics(topics, level, q);
        if (principal.getRole() == Role.TEACHER) {
            return filtered.stream().map(this::toResponse).toList();
        }

        Student student = studentService.getOrCreateStudent(principal.getUserId());
        Map<Long, Double> progressByTopic = progressService.topicProgressPercents(
                student.getStudentId(), filtered.stream().map(Topic::getTopicId).toList());
        Set<Long> enrolledTopicIds = progressService.enrolledTopicIds(student.getStudentId());

        return filtered.stream()
                .map(topic -> toResponse(
                        topic,
                        progressByTopic.get(topic.getTopicId()),
                        enrolledTopicIds.contains(topic.getTopicId())))
                .toList();
    }

    /**
     * Chủ đề đề xuất cho Student (khối "Chủ đề đề xuất cho bạn" ở Trang chủ).
     * Ưu tiên: chưa tham gia > cùng level với chủ đề đang học > level gần nhất >
     * nhiều lượt đăng ký > mới nhất. Bỏ qua chủ đề đã hoàn thành 100%.
     */
    public List<TopicResponse> recommended(UserPrincipal principal, Integer limit) {
        Student student = studentService.getOrCreateStudent(principal.getUserId());
        int size = normalizeLimit(limit, DEFAULT_RECOMMENDED_LIMIT);
        Long studentId = student.getStudentId();

        List<Topic> published = topicRepository.findAllByOrderByCreatedAtDesc().stream()
                .filter(topic -> topic.getStatus() == ContentStatus.PUBLISHED)
                .toList();
        if (published.isEmpty()) {
            return List.of();
        }

        Map<Long, Double> progressByTopic = progressService.topicProgressPercents(
                studentId, published.stream().map(Topic::getTopicId).toList());
        Set<Long> enrolledTopicIds = progressService.enrolledTopicIds(studentId);
        Map<Long, Long> popularity = popularityByTopic();
        Level currentLevel = currentTopicLevel(studentId);

        List<Topic> candidates = published.stream()
                .filter(topic -> progressByTopic.getOrDefault(topic.getTopicId(), 0.0) < 100.0)
                .sorted(recommendationOrder(currentLevel, enrolledTopicIds, popularity))
                .limit(size)
                .toList();

        return toResponses(candidates, progressByTopic, enrolledTopicIds);
    }

    /**
     * Chủ đề nổi bật (khối "Tất cả chủ đề nổi bật" ở Trang chủ).
     * Sắp theo lượt đăng ký > số bài học > mới nhất; chỉ lấy chủ đề đã xuất bản.
     * Hỗ trợ lọc `level` và tìm `q` để tái sử dụng cho trang danh sách đầy đủ.
     */
    public List<TopicResponse> featured(UserPrincipal principal, String level, String q, Integer limit) {
        int size = normalizeLimit(limit, DEFAULT_FEATURED_LIMIT);

        List<Topic> base;
        if (principal.getRole() == Role.TEACHER) {
            Teacher teacher = teacherService.getOrCreateTeacher(principal.getUserId());
            base = topicRepository.findByTeacherIdOrderByCreatedAtDesc(teacher.getTeacherId());
        } else {
            base = topicRepository.findAllByOrderByCreatedAtDesc();
        }

        List<Topic> published = base.stream()
                .filter(topic -> topic.getStatus() == ContentStatus.PUBLISHED)
                .toList();
        List<Topic> filtered = filterTopics(published, level, q);
        if (filtered.isEmpty()) {
            return List.of();
        }

        Map<Long, Long> popularity = popularityByTopic();
        Map<Long, Long> lessonCounts = lessonCountByTopic(filtered);
        List<Topic> ordered = filtered.stream()
                .sorted(Comparator
                        .comparing((Topic topic) -> popularity.getOrDefault(topic.getTopicId(), 0L))
                        .reversed()
                        .thenComparing(
                                (Topic topic) -> lessonCounts.getOrDefault(topic.getTopicId(), 0L),
                                Comparator.reverseOrder())
                        .thenComparing(Topic::getCreatedAt, Comparator.reverseOrder()))
                .limit(size)
                .toList();

        if (principal.getRole() == Role.TEACHER) {
            return ordered.stream().map(this::toResponse).toList();
        }

        Student student = studentService.getOrCreateStudent(principal.getUserId());
        Map<Long, Double> progressByTopic = progressService.topicProgressPercents(
                student.getStudentId(), ordered.stream().map(Topic::getTopicId).toList());
        return toResponses(ordered, progressByTopic, progressService.enrolledTopicIds(student.getStudentId()));
    }

    private Comparator<Topic> recommendationOrder(
            Level currentLevel, Set<Long> enrolledTopicIds, Map<Long, Long> popularity) {
        return Comparator
                .comparing((Topic topic) -> enrolledTopicIds.contains(topic.getTopicId()) ? 1 : 0)
                .thenComparing(topic -> levelDistance(currentLevel, topic.getLevel()))
                .thenComparing(
                        (Topic topic) -> popularity.getOrDefault(topic.getTopicId(), 0L),
                        Comparator.reverseOrder())
                .thenComparing(Topic::getCreatedAt, Comparator.reverseOrder());
    }

    /** 0 = cùng level (hoặc chưa học chủ đề nào), ưu tiên level thấp hơn level cao hơn. */
    private int levelDistance(Level current, Level candidate) {
        if (current == null || candidate == null) {
            return 0;
        }
        int gap = Math.abs(candidate.ordinal() - current.ordinal());
        if (gap == 0) {
            return 0;
        }
        return gap * 2 + (candidate.ordinal() < current.ordinal() ? 0 : 1);
    }

    private Level currentTopicLevel(Long studentId) {
        var current = progressService.currentInProgressTopic(studentId);
        if (current == null) {
            return null;
        }
        return topicRepository.findById(current.topicId()).map(Topic::getLevel).orElse(null);
    }

    private Map<Long, Long> popularityByTopic() {
        Map<Long, Long> popularity = new HashMap<>();
        for (Object[] row : enrollmentRepository.countByTopicExcludingStatus(EnrollmentStatus.DROPPED)) {
            popularity.put((Long) row[0], ((Number) row[1]).longValue());
        }
        return popularity;
    }

    private Map<Long, Long> lessonCountByTopic(List<Topic> topics) {
        Map<Long, Long> counts = new HashMap<>();
        lessonRepository.findByTopicIdIn(topics.stream().map(Topic::getTopicId).toList())
                .forEach(lesson -> counts.merge(lesson.getTopicId(), 1L, Long::sum));
        return counts;
    }

    private List<TopicResponse> toResponses(
            List<Topic> topics, Map<Long, Double> progressByTopic, Set<Long> enrolledTopicIds) {
        return topics.stream()
                .map(topic -> toResponse(
                        topic,
                        progressByTopic.get(topic.getTopicId()),
                        enrolledTopicIds.contains(topic.getTopicId())))
                .toList();
    }

    private int normalizeLimit(Integer limit, int fallback) {
        if (limit == null || limit <= 0) {
            return fallback;
        }
        return Math.min(limit, MAX_LIMIT);
    }

    private List<Topic> filterTopics(List<Topic> topics, String level, String q) {        Level levelFilter = (level == null || level.isBlank()) ? null : parseLevel(level);
        String keyword = (q == null || q.isBlank()) ? null : q.trim().toLowerCase(Locale.ROOT);
        if (levelFilter == null && keyword == null) {
            return topics;
        }
        return topics.stream()
                .filter(topic -> levelFilter == null || topic.getLevel() == levelFilter)
                .filter(topic -> keyword == null || matchesKeyword(topic, keyword))
                .toList();
    }

    private boolean matchesKeyword(Topic topic, String keyword) {
        return containsKeyword(topic.getTitle(), keyword)
                || containsKeyword(topic.getDescription(), keyword);
    }

    private boolean containsKeyword(String value, String keyword) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(keyword);
    }

    public TopicResponse get(UserPrincipal principal, Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TOPIC_NOT_FOUND));
        if (principal.getRole() == Role.TEACHER) {
            return toResponse(topic);
        }
        Student student = studentService.getOrCreateStudent(principal.getUserId());
        Map<Long, Double> progressByTopic = progressService.topicProgressPercents(
                student.getStudentId(), List.of(topicId));
        return toResponse(
                topic,
                progressByTopic.get(topicId),
                progressService.enrolledTopicIds(student.getStudentId()).contains(topicId));
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

    /**
     * Sinh viên đăng ký tham gia chủ đề.
     * Tạo mới bản ghi enrollment, hoặc tái kích hoạt nếu trước đó đã DROPPED.
     */
    @Transactional
    public EnrollmentResponse enroll(UserPrincipal principal, Long topicId) {
        topicRepository.findById(topicId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TOPIC_NOT_FOUND));

        Student student = studentService.getOrCreateStudent(principal.getUserId());

        try {
            Enrollment existing = enrollmentRepository
                    .findByStudentIdAndTopicId(student.getStudentId(), topicId)
                    .orElse(null);

            if (existing == null) {
                Enrollment enrollment = Enrollment.builder()
                        .studentId(student.getStudentId())
                        .topicId(topicId)
                        .status(EnrollmentStatus.ENROLLED)
                        .build();
                return EnrollmentResponse.from(enrollmentRepository.save(enrollment));
            }

            if (existing.getStatus() == EnrollmentStatus.DROPPED) {
                existing.setStatus(EnrollmentStatus.ENROLLED);
                return EnrollmentResponse.from(enrollmentRepository.save(existing));
            }

            throw new BusinessException(ErrorCode.ALREADY_ENROLLED);
        } catch (DataIntegrityViolationException e) {
            // Race: hai request enroll chạy song song cùng chèn một bản ghi
            // (UNIQUE student_id+topic_id) — coi như đã tham gia.
            throw new BusinessException(ErrorCode.ALREADY_ENROLLED);
        }
    }

    /**
     * Sinh viên rời chủ đề: chuyển trạng thái enrollment sang DROPPED
     * (giữ nguyên lịch sử tiến độ).
     */
    @Transactional
    public void unenroll(UserPrincipal principal, Long topicId) {
        topicRepository.findById(topicId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TOPIC_NOT_FOUND));

        Student student = studentService.getOrCreateStudent(principal.getUserId());

        Enrollment enrollment = enrollmentRepository
                .findByStudentIdAndTopicId(student.getStudentId(), topicId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENROLLMENT_NOT_FOUND));

        // Da roi chu de truoc do (hoac chua co ban ghi) => khong con dang tham gia.
        if (enrollment.getStatus() == EnrollmentStatus.DROPPED) {
            throw new BusinessException(ErrorCode.ENROLLMENT_NOT_FOUND);
        }

        enrollment.setStatus(EnrollmentStatus.DROPPED);
        enrollmentRepository.save(enrollment);
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

    public TopicResponse toResponse(Topic topic, Double progressPercent, Boolean enrolled) {
        long lessonCount = lessonRepository.countByTopicId(topic.getTopicId());
        return TopicResponse.from(
                topic, lessonCount, resolveTeacherName(topic.getTeacherId()), progressPercent, enrolled);
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
