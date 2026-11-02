package com.example.BaoEng.service;

import com.example.BaoEng.dto.CsvRowError;
import com.example.BaoEng.dto.MinigameResponse;
import com.example.BaoEng.dto.VocabCsvUploadResponse;
import com.example.BaoEng.dto.VocabItemResponse;
import com.example.BaoEng.entity.Lesson;
import com.example.BaoEng.entity.VocabularyItem;
import com.example.BaoEng.exception.BusinessException;
import com.example.BaoEng.exception.ErrorCode;
import com.example.BaoEng.repository.LessonRepository;
import com.example.BaoEng.repository.VocabularyItemRepository;
import com.example.BaoEng.security.UserPrincipal;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * Quản lý từ vựng & upload CSV (FR-TEACHER-04, FR-TEACHER-05).
 */
@Service
public class VocabService {

    private final VocabularyItemRepository vocabRepository;
    private final LessonRepository lessonRepository;
    private final LessonService lessonService;
    private final MinigameService minigameService;

    public VocabService(
            VocabularyItemRepository vocabRepository,
            LessonRepository lessonRepository,
            LessonService lessonService,
            MinigameService minigameService) {
        this.vocabRepository = vocabRepository;
        this.lessonRepository = lessonRepository;
        this.lessonService = lessonService;
        this.minigameService = minigameService;
    }

    public List<VocabItemResponse> list(Long lessonId) {
        if (!lessonRepository.existsById(lessonId)) {
            throw new BusinessException(ErrorCode.LESSON_NOT_FOUND);
        }
        return vocabRepository.findByLessonIdOrderByVocabIdAsc(lessonId).stream()
                .map(VocabItemResponse::from)
                .toList();
    }

    @Transactional
    public VocabCsvUploadResponse uploadCsv(UserPrincipal principal, Long lessonId, MultipartFile file) {
        Lesson lesson = lessonService.findOwnedLesson(principal, lessonId);

        String content;
        try {
            content = new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INVALID_CSV, "Không đọc được file CSV.");
        }
        if (content.startsWith("\uFEFF")) {
            content = content.substring(1);
        }

        List<String> lines = content.lines().toList();
        if (lines.isEmpty()) {
            throw new BusinessException(ErrorCode.INVALID_CSV, "File CSV rỗng.");
        }

        Map<String, Integer> columns = parseHeader(lines.get(0));
        if (!columns.containsKey("word") || !columns.containsKey("meaning")) {
            throw new BusinessException(ErrorCode.INVALID_CSV,
                    "Header CSV bắt buộc phải có cột 'word' và 'meaning'.");
        }

        List<VocabularyItem> items = new ArrayList<>();
        List<CsvRowError> errors = new ArrayList<>();

        for (int i = 1; i < lines.size(); i++) {
            String line = lines.get(i);
            if (line.isBlank()) {
                continue;
            }
            List<String> fields = parseCsvLine(line);
            String word = field(fields, columns.get("word"));
            String meaning = field(fields, columns.get("meaning"));
            String pronunciation = field(fields, columns.get("pronunciation"));
            String example = field(fields, columns.get("example"));

            if (word.isBlank()) {
                errors.add(new CsvRowError(i + 1, "Cột 'word' bị trống"));
                continue;
            }
            if (meaning.isBlank()) {
                errors.add(new CsvRowError(i + 1, "Cột 'meaning' bị trống"));
                continue;
            }

            items.add(VocabularyItem.builder()
                    .lessonId(lessonId)
                    .word(word)
                    .meaning(meaning)
                    .pronunciation(pronunciation.isBlank() ? null : pronunciation)
                    .example(example.isBlank() ? null : example)
                    .build());
        }

        vocabRepository.saveAll(items);

        MinigameResponse minigame = null;
        if (!items.isEmpty()) {
            minigame = minigameService.generateForLesson(lesson, items);
        }
        return new VocabCsvUploadResponse(items.size(), errors, minigame);
    }

    private Map<String, Integer> parseHeader(String headerLine) {
        Map<String, Integer> map = new LinkedHashMap<>();
        List<String> fields = parseCsvLine(headerLine);
        for (int i = 0; i < fields.size(); i++) {
            String name = fields.get(i).trim().toLowerCase();
            if (!name.isBlank()) {
                map.put(name, i);
            }
        }
        return map;
    }

    private String field(List<String> fields, Integer index) {
        if (index == null || index >= fields.size()) {
            return "";
        }
        return fields.get(index).trim();
    }

    /** Parser CSV đơn giản, hỗ trợ trường đặt trong dấu ngoặc kép. */
    private List<String> parseCsvLine(String line) {
        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (inQuotes) {
                if (c == '"') {
                    if (i + 1 < line.length() && line.charAt(i + 1) == '"') {
                        current.append('"');
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    current.append(c);
                }
            } else {
                if (c == '"') {
                    inQuotes = true;
                } else if (c == ',') {
                    result.add(current.toString());
                    current.setLength(0);
                } else {
                    current.append(c);
                }
            }
        }
        result.add(current.toString());
        return result;
    }
}
