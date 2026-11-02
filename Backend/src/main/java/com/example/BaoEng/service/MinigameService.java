package com.example.BaoEng.service;

import com.example.BaoEng.dto.MinigameDetailResponse;
import com.example.BaoEng.dto.MinigameResponse;
import com.example.BaoEng.dto.QuestionOption;
import com.example.BaoEng.dto.QuestionResponse;
import com.example.BaoEng.entity.Lesson;
import com.example.BaoEng.entity.Minigame;
import com.example.BaoEng.entity.MinigameQuestion;
import com.example.BaoEng.entity.VocabularyItem;
import com.example.BaoEng.enums.ContentStatus;
import com.example.BaoEng.enums.Difficulty;
import com.example.BaoEng.enums.QuestionType;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.MinigameQuestionRepository;
import com.example.BaoEng.repository.MinigameRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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

    public MinigameService(
            MinigameRepository minigameRepository,
            MinigameQuestionRepository questionRepository,
            LessonService lessonService) {
        this.minigameRepository = minigameRepository;
        this.questionRepository = questionRepository;
        this.lessonService = lessonService;
    }

    public List<MinigameResponse> list(Long lessonId) {
        return minigameRepository.findByLessonIdOrderByCreatedAtAsc(lessonId).stream()
                .map(m -> MinigameResponse.from(m, questionRepository.countByMinigameId(m.getMinigameId())))
                .toList();
    }

    public MinigameDetailResponse detail(Long minigameId) {
        Minigame minigame = findMinigame(minigameId);
        List<QuestionResponse> questions = questionRepository
                .findByMinigameIdOrderByQuestionOrderAsc(minigameId).stream()
                .map(this::toQuestionResponse)
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

    private QuestionResponse toQuestionResponse(MinigameQuestion q) {
        List<QuestionOption> options = new ArrayList<>();
        if (q.getOptionA() != null) {
            options.add(new QuestionOption("A", q.getOptionA(), "A".equals(q.getCorrectOption())));
        }
        if (q.getOptionB() != null) {
            options.add(new QuestionOption("B", q.getOptionB(), "B".equals(q.getCorrectOption())));
        }
        if (q.getOptionC() != null) {
            options.add(new QuestionOption("C", q.getOptionC(), "C".equals(q.getCorrectOption())));
        }
        if (q.getOptionD() != null) {
            options.add(new QuestionOption("D", q.getOptionD(), "D".equals(q.getCorrectOption())));
        }
        return new QuestionResponse(
                q.getQuestionId(),
                q.getQuestionType().name(),
                q.getQuestionOrder(),
                q.getQuestionText(),
                options);
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
