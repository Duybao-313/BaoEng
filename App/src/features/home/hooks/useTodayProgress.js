import { useCallback } from "react";

import { getTodayProgress } from "../../../api";
import { useAsync } from "../../../hooks";

/**
 * Tien do hoc trong ngay + trong tuan cho khoi "Tien do hom nay" (Trang chu)
 * va khoi "Thu thach thoi gian luyen tap tuan nay" (Tien do).
 * Tra ve du lieu goc + vai gia tri da tinh san de UI khong phai tu xu ly.
 */
export function useTodayProgress() {
  const { data, loading, error, run } = useAsync(() => getTodayProgress(), {
    deps: [],
  });

  const reload = useCallback(() => run().catch(() => {}), [run]);

  const goalMinutes = data?.dailyGoalMinutes ?? 15;
  const minutes = data?.minutesToday ?? 0;
  const goalPercent =
    goalMinutes > 0
      ? Math.min(100, Math.round((minutes / goalMinutes) * 100))
      : 0;
  const remainingMinutes = Math.max(0, goalMinutes - minutes);

  const weeklyGoalMinutes = data?.weeklyGoalMinutes ?? 90;
  const weeklyMinutes = data?.minutesThisWeek ?? 0;
  const weeklyPercent =
    weeklyGoalMinutes > 0
      ? Math.min(100, Math.round((weeklyMinutes / weeklyGoalMinutes) * 100))
      : 0;

  return {
    today: data,
    loading,
    error,
    reload,
    goalMinutes,
    minutes,
    goalPercent,
    remainingMinutes,
    streakDays: data?.streakDays ?? 0,
    lessonsCompletedToday: data?.lessonsCompletedToday ?? 0,
    studiedToday: Boolean(data?.studiedToday),
    currentTopicId: data?.currentTopicId ?? null,
    currentTopicTitle: data?.currentTopicTitle ?? null,
    currentTopicProgressPercent: data?.currentTopicProgressPercent ?? null,
    // Theo tuan (Thu Hai -> Chu Nhat)
    weekStart: data?.weekStart ?? null,
    weeklyGoalMinutes,
    weeklyMinutes,
    weeklyPercent,
    weeklyRemainingMinutes: Math.max(0, weeklyGoalMinutes - weeklyMinutes),
    weeklyGoalReached: weeklyPercent >= 100,
    previousWeekMinutes: data?.previousWeekMinutes ?? 0,
    daysStudiedThisWeek: data?.daysStudiedThisWeek ?? 0,
    weeklyDailyMinutes: Array.isArray(data?.weeklyDailyMinutes)
      ? data.weeklyDailyMinutes
      : [],
  };
}
