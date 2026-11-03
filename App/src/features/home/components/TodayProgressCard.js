import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../../constants/theme";
import { Button, Icon, Skeleton } from "../../../components/ui";
import { ProgressBar } from "../../../components/ui/ProgressBar";

/**
 * Khoi "Tien do hom nay" o Trang chu: muc tieu phut hoc, streak ngay lien tiep,
 * so bai hoan thanh hom nay va chu de dang hoc do.
 *
 * Nhan truc tiep ket qua cua `useTodayProgress` qua props.
 */
export function TodayProgressCard({
  loading,
  error,
  onRetry,
  minutes = 0,
  goalMinutes = 15,
  goalPercent = 0,
  remainingMinutes = 0,
  streakDays = 0,
  lessonsCompletedToday = 0,
  studiedToday = false,
  currentTopicId = null,
  currentTopicTitle = null,
  currentTopicProgressPercent = null,
  onContinueLearning,
}) {
  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Skeleton height={20} width="45%" />
          <Skeleton height={24} width={72} />
        </View>
        <Skeleton height={14} width="30%" />
        <Skeleton height={10} />
        <Skeleton height={16} width="60%" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Tiến độ hôm nay</Text>
        </View>
        <Text style={styles.hint}>Không tải được tiến độ hôm nay.</Text>
        {onRetry ? (
          <Button
            label="Thử lại"
            variant="outline"
            icon="refresh"
            fullWidth={false}
            onPress={onRetry}
          />
        ) : null}
      </View>
    );
  }

  const goalReached = minutes >= goalMinutes;
  const hasCurrentTopic = Boolean(currentTopicId && currentTopicTitle);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tiến độ hôm nay</Text>
        {streakDays > 0 ? (
          <View
            style={styles.streakPill}
            accessibilityLabel={`Chuỗi ${streakDays} ngày học liên tiếp`}
          >
            <Icon
              name="local-fire-department"
              size={16}
              color={colors.tertiary}
            />
            <Text style={styles.streakText}>{streakDays} ngày</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.minutesRow}>
        <Text style={styles.minutes}>{minutes}</Text>
        <Text style={styles.minutesUnit}>/{goalMinutes} phút</Text>
        <Text style={styles.status}>
          {goalReached
            ? "Đã đạt mục tiêu hôm nay"
            : `Còn ${remainingMinutes} phút nữa`}
        </Text>
      </View>

      <ProgressBar value={goalPercent} height={10} />

      <Text style={styles.hint}>
        {studiedToday
          ? `Hôm nay bạn đã hoàn thành ${lessonsCompletedToday} bài học.`
          : "Hôm nay bạn chưa học — bắt đầu với vài phút ôn từ vựng nhé!"}
      </Text>

      {hasCurrentTopic ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Học tiếp chủ đề ${currentTopicTitle}`}
          onPress={() => onContinueLearning?.(currentTopicId)}
          style={({ pressed }) => [
            styles.continueRow,
            pressed ? styles.pressed : null,
          ]}
        >
          <View style={styles.continueInfo}>
            <Text style={styles.continueLabel}>Đang học</Text>
            <Text style={styles.continueTitle} numberOfLines={1}>
              {currentTopicTitle}
            </Text>
          </View>
          {currentTopicProgressPercent !== null ? (
            <Text style={styles.continuePercent}>
              {Math.round(currentTopicProgressPercent)}%
            </Text>
          ) : null}
          <Icon name="chevron-right" size={20} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    color: colors.text,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.tertiaryFixed,
  },
  streakText: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.onTertiaryFixed,
  },
  minutesRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.xs,
  },
  minutes: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.primary,
  },
  minutesUnit: {
    fontSize: typography.bodyMd,
    fontWeight: "600",
    color: colors.textMuted,
  },
  status: {
    flex: 1,
    textAlign: "right",
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.secondary,
  },
  hint: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  continueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLow,
  },
  continueInfo: { flex: 1, gap: 2 },
  continueLabel: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  continueTitle: {
    fontSize: typography.bodyMd,
    fontWeight: "600",
    color: colors.text,
  },
  continuePercent: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.primary,
  },
  pressed: { opacity: 0.85 },
});
