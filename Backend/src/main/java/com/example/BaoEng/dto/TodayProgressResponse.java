package com.example.BaoEng.dto;

import java.time.LocalDate;

/**
 * Tien do hoc tap trong ngay cua Student (khoi "Tien do hom nay" o Trang chu).
 *
 * @param date                     ngay duoc thong ke (theo mui gio server)
 * @param dailyGoalMinutes         muc tieu phut hoc moi ngay (cau hinh)
 * @param minutesToday             so phut da hoc hom nay
 * @param lessonsCompletedToday    so bai hoc hoan thanh hom nay
 * @param streakDays               so ngay hoc lien tiep (tinh ca hom nay)
 * @param studiedToday             hom nay da co hoat dong hoc hay chua
 * @param currentTopicId           chu de dang hoc do (null neu khong co)
 * @param currentTopicTitle        ten chu de dang hoc do
 * @param currentTopicProgressPercent % hoan thanh cua chu de dang hoc do
 */
public record TodayProgressResponse(
        LocalDate date,
        int dailyGoalMinutes,
        int minutesToday,
        int lessonsCompletedToday,
        int streakDays,
        boolean studiedToday,
        Long currentTopicId,
        String currentTopicTitle,
        Double currentTopicProgressPercent
) {
}
