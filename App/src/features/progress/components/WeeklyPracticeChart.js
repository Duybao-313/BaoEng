import { View } from "react-native";
import { Text } from "../../../components/ui/Text";

import { colors, radius, shadows, spacing, themed, typography } from "../../../constants/theme";
import { Button, Icon, ProgressBar, Skeleton } from "../../../components/ui";
import { formatMinutes } from "../../../utils";

const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/** Chi so hom nay trong tuan (0 = Thu Hai); -1 neu khong xac dinh duoc. */
function todayIndex(weekStart) {
  if (!weekStart) return -1;
  const start = new Date(`${weekStart}T00:00:00`);
  if (Number.isNaN(start.getTime())) return -1;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((today.getTime() - start.getTime()) / 86400000);
  return diff >= 0 && diff < 7 ? diff : -1;
}

/**
 * Khoi "Thoi gian luyen tap tuan nay": tong phut, muc tieu tuan, xu huong so voi tuan truoc
 * va bieu do cot phut hoc tung ngay (T2 -> CN).
 *
 * @param {{
 *   loading?: boolean,
 *   error?: Error | null,
 *   onRetry?: () => void,
 *   minutes?: number,
 *   goalMinutes?: number,
 *   percent?: number,
 *   goalReached?: boolean,
 *   daysStudied?: number,
 *   dailyMinutes?: number[],
 *   weekStart?: string | null,
 *   previousWeekMinutes?: number,
 * }} props
 */
export function WeeklyPracticeChart({
  loading = false,
  error = null,
  onRetry,
  minutes = 0,
  goalMinutes = 90,
  percent = 0,
  goalReached = false,
  daysStudied = 0,
  dailyMinutes = [],
  weekStart = null,
  previousWeekMinutes = 0,
}) {
  if (loading) {
    return (
      <View style={styles.card}>
        <Skeleton height={20} width="70%" />
        <Skeleton height={14} width="40%" />
        <View style={styles.chart}>
          {DAY_LABELS.map((label) => (
            <View key={label} style={styles.barColumn}>
              <Skeleton width={28} height={80} />
              <Skeleton width={16} height={10} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Thời gian luyện tập tuần này</Text>
        <Text style={styles.hint}>Không tải được dữ liệu luyện tập tuần này.</Text>
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

  const activeIndex = todayIndex(weekStart);
  const peak = dailyMinutes.reduce((max, value) => Math.max(max, value ?? 0), 0);
  const trendPercent =
    previousWeekMinutes > 0
      ? Math.round(((minutes - previousWeekMinutes) * 100) / previousWeekMinutes)
      : null;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Thời gian luyện tập tuần này</Text>
          <Text style={styles.total}>
            Tổng cộng: <Text style={styles.totalStrong}>{formatMinutes(minutes)}</Text>
            {` / ${goalMinutes} phút`}
          </Text>
        </View>
        {trendPercent !== null ? (
          <View
            style={[styles.trendPill, trendPercent < 0 ? styles.trendDown : null]}
            accessibilityLabel={`So với tuần trước ${
              trendPercent >= 0 ? "tăng" : "giảm"
            } ${Math.abs(trendPercent)} phần trăm`}
          >
            <Icon
              name={trendPercent >= 0 ? "trending-up" : "trending-down"}
              size={16}
              color={
                trendPercent >= 0
                  ? colors.onSecondaryFixedVariant
                  : colors.onErrorContainer
              }
            />
            <Text
              style={[
                styles.trendText,
                trendPercent < 0 ? styles.trendTextDown : null,
              ]}
            >
              {`${trendPercent >= 0 ? "+" : ""}${trendPercent}%`}
            </Text>
          </View>
        ) : null}
      </View>

      <ProgressBar value={percent} showLabel height={8} />

      <View style={styles.chart}>
        {DAY_LABELS.map((label, index) => {
          const value = dailyMinutes[index] ?? 0;
          const isPeak = peak > 0 && value === peak;
          const isToday = index === activeIndex;
          const heightPercent = peak > 0 && value > 0 ? Math.max(6, (value / peak) * 100) : 0;

          return (
            <View
              key={label}
              style={styles.barColumn}
              accessibilityLabel={
                isToday
                  ? `${label} hôm nay: ${value} phút`
                  : `${label}: ${value} phút`
              }
            >
              <Text
                style={[
                  styles.barValue,
                  isPeak ? styles.barValuePeak : null,
                  isToday && !isPeak ? styles.barValueToday : null,
                ]}
              >
                {value > 0 ? `${value}p` : ""}
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    { height: `${heightPercent}%` },
                    isPeak ? styles.barPeak : null,
                    isToday && !isPeak ? styles.barToday : null,
                  ]}
                />
              </View>
              <Text style={[styles.barLabel, isToday ? styles.barLabelToday : null]}>
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.hint}>
        {goalReached
          ? "Tuyệt vời! Bạn đã đạt mục tiêu luyện tập của tuần này."
          : `${daysStudied}/7 ngày có học · còn ${
              goalMinutes - minutes > 0 ? goalMinutes - minutes : 0
            } phút để đạt mục tiêu tuần`}
      </Text>
    </View>
  );
}

const styles = themed((colors) => ({
  card: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLow,
    ...shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  headerText: { flex: 1, gap: 2 },
  title: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    color: colors.text,
  },
  total: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  totalStrong: {
    fontWeight: "700",
    color: colors.text,
  },
  trendPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.primaryFixed,
  },
  trendDown: { backgroundColor: colors.errorContainer },
  trendText: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.onSecondaryFixedVariant,
  },
  trendTextDown: { color: colors.onErrorContainer },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.xs,
    height: 132,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  barColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    height: "100%",
  },
  barValue: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  barValuePeak: { color: colors.primary, fontWeight: "700" },
  barValueToday: { color: colors.secondary, fontWeight: "700" },
  barTrack: {
    flex: 1,
    width: "100%",
    maxWidth: 28,
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceContainerHigh,
  },
  barPeak: { backgroundColor: colors.primaryContainer },
  barToday: { backgroundColor: colors.secondary },
  barLabel: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  barLabelToday: { color: colors.primary, fontWeight: "700" },
  hint: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
}));
