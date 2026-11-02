package com.example.BaoEng.dto;

import com.example.BaoEng.entity.VocabularyItem;

public record VocabItemResponse(
        Long vocabId,
        String word,
        String meaning,
        String pronunciation,
        String example
) {
    public static VocabItemResponse from(VocabularyItem item) {
        return new VocabItemResponse(
                item.getVocabId(),
                item.getWord(),
                item.getMeaning(),
                item.getPronunciation(),
                item.getExample());
    }
}
