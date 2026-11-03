package com.example.BaoEng.service;

import com.example.BaoEng.dto.AnswerRequest;
import com.example.BaoEng.dto.MinigameAttemptResponse;
import com.example.BaoEng.dto.MinigameDetailResponse;
import com.example.BaoEng.dto.MinigameResponse;
import com.example.BaoEng.dto.QuestionOption;
import com.example.BaoEng.dto.QuestionResponse;
import com.example.BaoEng.dto.SubmitAttemptRequest;
import com.example.BaoEng.entity.Lesson;
import com.example.BaoEng.entity.LessonProgress;
import com.example.BaoEng.entity.Minigame;
import com.example.BaoEng.entity.MinigameAttempt;
import com.example.BaoEng.entity.MinigameQuestion;
import com.example.BaoEng.entity.Student;
import com.example.BaoEng.entity.VocabularyItem;
import com.example.BaoEng.enums.ContentStatus;
import com.example.BaoEng.enums.Difficulty;
import com.example.BaoEng.enums.LessonProgressStatus;
import com.example.BaoEng.enums.QuestionType;
import com.example.BaoEng.enums.Role;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.LessonProgressRepository;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.MinigameAttemptRepository;
import com.example.BaoEng.repository.MinigameQuestionRepository;
import com.example.BaoEng.repository.MinigameRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Quản lý minigame ôn tập từ vựng (FR-TEACHER-04, FR-MINIGAME).
 */
@Service
public class MinigameService {

    private static final String[] LETTERS = {"A", "B", "C", "D"};

    private final MinigameRepository minigameRepository;
    private final MinigameQuestionRepository questionRepository;
    private final LessonService lessonService;
    private final StudentService studentService;
    private final LessonRepository lessonRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final MinigameAttemptRepository minigameAttemptRepository;
    private final ProgressService progressService;

    public MinigameService(
            MinigameRepository minigameRepository,
            MinigameQuestionRepository questionRepository,
            LessonService lessonService,
            StudentService studentService,
            LessonRepository lessonRepository,
            LessonProgressRepository lessonProgressRepository,
            MinigameAttemptRepository minigameAttemptRepository,
            ProgressService progressService) {
        this.minigameRepository = minigameRepository;
        this.questionRepository = questionRepository;
        this.lessonService = lessonService;
        this.studentService = studentService;
        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.minigameAttemptRepository = minigameAttemptRepository;
        this.progressService = progressService;
    }

    public List<MinigameResponse> list(Long lessonId) {
        return minigameRepository.findByLessonIdOrderByCreatedAtAsc(lessonId).stream()
                .map(m -> MinigameResponse.from(m, questionRepository.countByMinigameId(m.getMinigameId())))
                .toList();
    }

    /** Chi tiet minigame. `correct` trong options chi hien thi cho TEACHER. */
    public MinigameDetailResponse detail(UserPrincipal principal, Long minigameId) {
        Minigame minigame = findMinigame(minigameId);
        boolean includeCorrect = principal != null && principal.getRole() == Role.TEACHER;
        List<QuestionResponse> questions = questionRepository
                .findByMinigameIdOrderByQuestionOrderAsc(minigameId).stream()
                .map(q -> toQuestionResponse(q, includeCorrect))
                .toList();
        return new MinigameDetailResponse(
                minigame.getMinigameId(),
                minigame.getLessonId(),
                minigame.getTitle(),
                minigame.getStatus().name(),
                questions);
    }

    @Transactional
    public MinigameResponse publish(UserPrincipal principal, Long minigameId) {
        Minigame minigame = findOwnedMinigame(principal, minigameId);
        minigame.setStatus(ContentStatus.PUBLISHED);
        minigameRepository.save(minigame);
        return MinigameResponse.from(minigame, questionRepository.countByMinigameId(minigameId));
    }

    /**
     * Sinh viên nộp bài làm minigame. Chấm điểm, lưu lịch sử làm bài
     * (minigame_attempts) và cập nhật tiến độ bài học (lesson_progress).
     */
    @Transactional
    public MinigameAttemptResponse submitAttempt(
            UserPrincipal principal, Long minigameId, SubmitAttemptRequest request) {
        Minigame minigame = findMinigame(minigameId);
        if (minigame.getStatus() != ContentStatus.PUBLISHED) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Minigame chưa được xuất bản.");
        }

        Student student = studentService.getOrCreateStudent(principal.getUserId());
        Lesson lesson = lessonRepository.findById(minigame.getLessonId())
                .orElseThrow(() -> new BusinessException(ErrorCode.LESSON_NOT_FOUND));

        List<MinigameQuestion> questions = questionRepository
                .findByMinigameIdOrderByQuestionOrderAsc(minigameId).stream()
                .filter(MinigameQuestion::getIsActive)
                .toList();

        int totalQuestions = questions.size();
        if (totalQuestions == 0) {
            throw new BusinessException(ErrorCode.MINIGAME_NOT_FOUND, "Minigame chưa có câu hỏi.");
        }

        Map<Long, String> selected = new HashMap<>();
        for (AnswerRequest answer : request.answers()) {
            selected.put(answer.questionId(), answer.selectedKey());
        }

        int correctAnswers = 0;
        for (MinigameQuestion question : questions) {
            String chosen = selected.get(question.getQuestionId());
            if (chosen != null && chosen.equalsIgnoreCase(question.getCorrectOption())) {
                correctAnswers++;
            }
        }

        double score = round1(correctAnswers * 100.0 / totalQuestions);
        double threshold = lesson.getCompletionThreshold() != null
                ? lesson.getCompletionThreshold().doubleValue()
                : 80.0;
        boolean isPassed = score >= threshold;

        MinigameAttempt attempt = minigameAttemptRepository.save(MinigameAttempt.builder()
                .minigameId(minigameId)
                .studentId(student.getStudentId())
                .score(BigDecimal.valueOf(score))
                .isPassed(isPassed)
                .build());

        saveLessonProgress(student.getStudentId(), lesson, score, isPassed);

        boolean lessonCompleted = isLessonCompleted(student.getStudentId(), lesson.getLessonId());
        double topicProgressPercent = progressService.topicProgressPercent(
                student.getStudentId(), lesson.getTopicId());

        return new MinigameAttemptResponse(
                attempt.getAttemptId(),
                score,
                totalQuestions,
                correctAnswers,
                isPassed,
                lessonCompleted,
                topicProgressPercent);
    }

    /** Ghi bản ghi lesson_progress mới (mỗi lần nộp bài là một attempt mới). */
    private void saveLessonProgress(Long studentId, Lesson lesson, double score, boolean isPassed) {
        Optional<LessonProgress> latest = lessonProgressRepository
                .findTopByStudentIdAndLessonIdOrderByAttemptNumberDesc(studentId, lesson.getLessonId());
        int attemptNumber = latest.map(p -> p.getAttemptNumber() + 1).orElse(1);

        LessonProgress progress = LessonProgress.builder()
                .studentId(studentId)
                .lessonId(lesson.getLessonId())
                .attemptNumber(attemptNumber)
                .status(isPassed ? LessonProgressStatus.COMPLETED : LessonProgressStatus.IN_PROGRESS)
                .completionPercent(BigDecimal.valueOf(score))
                .build();
        lessonProgressRepository.save(progress);
    }

    /** Bài học hoàn thành khi sinh viên đạt ngưỡng ở TẤT CẢ các minigame đã xuất bản. */
    private boolean isLessonCompleted(Long studentId, Long lessonId) {
        List<Minigame> publishedMinigames = minigameRepository
                .findByLessonIdAndStatusOrderByCreatedAtAsc(lessonId, ContentStatus.PUBLISHED);
        if (publishedMinigames.isEmpty()) {
            return false;
        }
        for (Minigame minigame : publishedMinigames) {
            Optional<MinigameAttempt> latestAttempt = minigameAttemptRepository
                    .findTopByStudentIdAndMinigameIdOrderByAttemptIdDesc(studentId, minigame.getMinigameId());
            if (latestAttempt.isEmpty() || !Boolean.TRUE.equals(latestAttempt.get().getIsPassed())) {
                return false;
            }
        }
        return true;
    }

    private double round1(double value) {
        return Math.round(value * 10) / 10.0;
    }

    /** Sinh minigame (DRAFT) kèm câu hỏi trắc nghiệm từ danh sách từ vựng. */
    @Transactional
    public MinigameResponse generateForLesson(Lesson lesson, List<VocabularyItem> vocabItems) {
        Minigame minigame = minigameRepository.save(Minigame.builder()
                .lessonId(lesson.getLessonId())
                .title("Ôn tập từ vựng " + lesson.getTitle())
                .status(ContentStatus.DRAFT)
                .build());

        List<String> allMeanings = vocabItems.stream()
                .map(VocabularyItem::getMeaning)
                .distinct()
                .toList();

        int order = 1;
        for (VocabularyItem vocab : vocabItems) {
            List<QuestionOption> options = buildOptions(vocab.getMeaning(), allMeanings);
            MinigameQuestion question = MinigameQuestion.builder()
                    .minigameId(minigame.getMinigameId())
                    .vocabId(vocab.getVocabId())
                    .questionText("Nghĩa của từ '" + vocab.getWord() + "' là gì?")
                    .questionType(QuestionType.MULTIPLE_CHOICE)
                    .optionA(optionAt(options, 0))
                    .optionB(optionAt(options, 1))
                    .optionC(optionAt(options, 2))
                    .optionD(optionAt(options, 3))
                    .correctOption(correctLetter(options))
                    .difficulty(Difficulty.MEDIUM)
                    .questionOrder(order++)
                    .isActive(true)
                    .build();
            questionRepository.save(question);
        }

        return MinigameResponse.from(minigame, vocabItems.size());
    }

    private List<QuestionOption> buildOptions(String correct, List<String> allMeanings) {
        List<String> distractors = new ArrayList<>(allMeanings);
        distractors.removeIf(m -> m.equals(correct));
        Collections.shuffle(distractors);

        List<String> pool = new ArrayList<>();
        pool.add(correct);
        for (int i = 0; i < 3 && i < distractors.size(); i++) {
            pool.add(distractors.get(i));
        }
        Collections.shuffle(pool);

        List<QuestionOption> options = new ArrayList<>();
        for (int i = 0; i < pool.size(); i++) {
            options.add(new QuestionOption(LETTERS[i], pool.get(i), pool.get(i).equals(correct)));
        }
        return options;
    }

    private String optionAt(List<QuestionOption> options, int index) {
        return index < options.size() ? options.get(index).text() : null;
    }

    private String correctLetter(List<QuestionOption> options) {
        return options.stream()
                .filter(QuestionOption::correct)
                .map(QuestionOption::key)
                .findFirst()
                .orElse(null);
    }

    private QuestionResponse toQuestionResponse(MinigameQuestion q, boolean includeCorrect) {
        List<QuestionOption> options = new ArrayList<>();
        if (q.getOptionA() != null) {
            options.add(new QuestionOption("A", q.getOptionA(), flag(includeCorrect, "A".equals(q.getCorrectOption()))));
        }
        if (q.getOptionB() != null) {
            options.add(new QuestionOption("B", q.getOptionB(), flag(includeCorrect, "B".equals(q.getCorrectOption()))));
        }
        if (q.getOptionC() != null) {
            options.add(new QuestionOption("C", q.getOptionC(), flag(includeCorrect, "C".equals(q.getCorrectOption()))));
        }
        if (q.getOptionD() != null) {
            options.add(new QuestionOption("D", q.getOptionD(), flag(includeCorrect, "D".equals(q.getCorrectOption()))));
        }
        return new QuestionResponse(
                q.getQuestionId(),
                q.getQuestionType().name(),
                q.getQuestionOrder(),
                q.getQuestionText(),
                options);
    }

    /** Tra ve null khi khong duoc phep lo dap an (Jackson se bo qua field null). */
    private Boolean flag(boolean includeCorrect, boolean isCorrect) {
        return includeCorrect ? isCorrect : null;
    }

    private Minigame findMinigame(Long minigameId) {
        return minigameRepository.findById(minigameId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MINIGAME_NOT_FOUND));
    }

    private Minigame findOwnedMinigame(UserPrincipal principal, Long minigameId) {
        Minigame minigame = findMinigame(minigameId);
        lessonService.findOwnedLesson(principal, minigame.getLessonId());
        return minigame;
    }
}
