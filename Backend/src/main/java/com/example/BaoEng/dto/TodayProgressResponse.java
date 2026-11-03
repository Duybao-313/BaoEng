package com.example.BaoEng.dto;

import java.time.LocalDate;
import java.util.List;

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
 * @param weekStart                ngay Thu Hai cua tuan hien tai
 * @param weeklyGoalMinutes        muc tieu phut luyen tap moi tuan (cau hinh)
 * @param minutesThisWeek          so phut da luyen tap trong tuan (tu Thu Hai den hom nay)
 * @param previousWeekMinutes      so phut luyen tap ca tuan truoc (de tinh xu huong tang/giam)
 * @param daysStudiedThisWeek      so ngay co hoat dong hoc trong tuan
 * @param weeklyDailyMinutes       phut hoc tung ngay trong tuan, thu tu Thu Hai -> Chu Nhat (7 phan tu)
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
        Double currentTopicProgressPercent,
        LocalDate weekStart,
        int weeklyGoalMinutes,
        int minutesThisWeek,
        int previousWeekMinutes,
        int daysStudiedThisWeek,
        List<Integer> weeklyDailyMinutes
) {
}
