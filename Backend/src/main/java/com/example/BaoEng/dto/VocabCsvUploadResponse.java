package com.example.BaoEng.dto;

import java.util.List;

public record VocabCsvUploadResponse(
        int importedCount,
        List<CsvRowError> failedRows,
        MinigameResponse minigame
) {
}
