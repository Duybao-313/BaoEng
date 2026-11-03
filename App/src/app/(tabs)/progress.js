import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Text } from "../../components/ui/Text";

import { getProgress } from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  Button,
  EmptyState,
  ProgressRing,
  Screen,
  Skeleton,
} from "../../components/ui";
import { radius, shadows, spacing, themed, typography } from "../../constants/theme";
import { TodayProgressCard, useTodayProgress } from "../../features/home";
import {
  ProgressStatTiles,
  TopicProgressCard,
  WeeklyPracticeChart,
} from "../../features/progress";
import { formatMinutes, formatPercent } from "../../utils";
import { useAsync } from "../../hooks";

export default function ProgressScreen() {
  const router = useRouter();
  const { data, loading, error, run } = useAsync(getProgress, {});
  const todayProgress = useTodayProgress();
  const reloadToday = todayProgress.reload;
  const [refreshing, setRefreshing] = useState(false);
  const isFirstFocus = useRef(true);

  const topics = data?.topics ?? [];
  const overall = data?.overallProgressPercent ?? 0;
  const totals = topics.reduce(
    (acc, topic) => ({
      completed: acc.completed + (topic.completedLessons ?? 0),
      total: acc.total + (topic.totalLessons ?? 0),
    }),
    { completed: 0, total: 0 },
  );
  const completedTopics = topics.filter(
    (topic) => (Number(topic.progressPercent) || 0) >= 100,
  ).length;
  const inProgressTopics = topics.filter(
    (topic) => (Number(topic.progressPercent) || 0) < 100,
  );
  const finishedTopics = topics.filter(
    (topic) => (Number(topic.progressPercent) || 0) >= 100,
  );

  const openTopic = useCallback(
    (topicId) => router.push(`/topic/${topicId}`),
    [router],
  );

  // Tien do thay doi sau moi lan hoc xong bai/minigame nen tai lai khi tab duoc focus.
  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return undefined;
      }
      run().catch(() => {});
      reloadToday();
      return undefined;
    }, [run, reloadToday]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.allSettled([run(), reloadToday()]);
    setRefreshing(false);
  }, [run, reloadToday]);

  const renderTopicRow = (topic) => (
    <TopicProgressCard
      key={topic.topicId}
      topic={topic}
      onPress={() => openTopic(topic.topicId)}
      onContinue={() => openTopic(topic.topicId)}
    />
  );

  const statItems = [
    {
      icon: "task-alt",
      value: `${totals.completed}/${totals.total}`,
      label: "Bài hoàn thành",
      tone: "secondary",
    },
    {
      icon: "schedule",
      value: formatMinutes(data?.totalMinutes ?? 0),
      label: "Giờ tích lũy",
      tone: "tertiary",
    },
    {
      icon: "workspace-premium",
      value: `${completedTopics}/${topics.length}`,
      label: "Chủ đề xong",
      tone: "primary",
    },
  ];

  return (
    <Screen padded={false}>
      <AppHeader
        title="Tiến độ"
        showAvatar={false}
        streakDays={todayProgress.streakDays}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.skeletons}>
            <View style={styles.skeletonCard}>
              <Skeleton width={112} height={112} style={styles.skeletonRing} />
              <View style={styles.skeletonLines}>
                <Skeleton width="70%" height={18} />
                <Skeleton width="45%" height={14} />
                <Skeleton width="85%" height={14} />
              </View>
            </View>

            <ProgressStatTiles loading />

            <View style={styles.skeletonRow}>
              <Skeleton width="65%" height={18} />
              <Skeleton width="35%" height={14} />
              <Skeleton height={8} />
              <Skeleton height={96} />
            </View>

            <Skeleton width="40%" height={18} />
            {[0, 1].map((item) => (
              <View key={item} style={styles.skeletonRow}>
                <View style={styles.skeletonTopicHead}>
                  <Skeleton
                    width={44}
                    height={44}
                    style={styles.skeletonIconBox}
                  />
                  <View style={styles.skeletonLines}>
                    <Skeleton width="70%" height={16} />
                    <Skeleton width="50%" height={12} />
                  </View>
                </View>
                <Skeleton width="45%" height={12} />
                <Skeleton height={8} />
              </View>
            ))}
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.stateBox}>
            <EmptyState
              icon="cloud-off"
              title="Không tải được tiến độ"
              message={error?.message ?? "Vui lòng thử lại sau."}
            />
            <Button
              label="Thử lại"
              variant="outline"
              icon="refresh"
              onPress={() => run().catch(() => {})}
            />
          </View>
        ) : null}

        {!loading && !error && topics.length === 0 ? (
          <View style={styles.stateBox}>
            <EmptyState
              icon="flag"
              title="Bạn chưa bắt đầu học"
              message="Tham gia một chủ đề và hoàn thành bài học đầu tiên để xem tiến độ tại đây."
            />
            <Button
              label="Khám phá chủ đề"
              icon="explore"
              onPress={() => router.push("/")}
            />
          </View>
        ) : null}

        {!loading && !error && topics.length > 0 ? (
          <>
            {/* Card tien do tong the */}
            <View style={styles.overallCard}>
              <ProgressRing
                value={overall}
                size={112}
                strokeWidth={10}
                accessibilityLabel={`Tiến độ tổng thể ${formatPercent(overall)}`}
              >
                <Text style={styles.ringValue}>{formatPercent(overall)}</Text>
                <Text style={styles.ringLabel}>hoàn thành</Text>
              </ProgressRing>
              <View style={styles.overallBody}>
                <Text style={styles.overallTitle}>Tiến độ tổng thể</Text>
                <Text style={styles.overallMeta}>
                  {totals.completed}/{totals.total} bài học
                </Text>
                <Text style={styles.overallSub}>
                  {totals.total - totals.completed > 0
                    ? `Chỉ còn ${totals.total - totals.completed} bài học nữa để hoàn thành lộ trình.`
                    : "Bạn đã hoàn thành toàn bộ lộ trình đã tham gia."}
                </Text>
              </View>
            </View>

            <ProgressStatTiles loading={loading} items={statItems} />

            <WeeklyPracticeChart
              loading={todayProgress.loading}
              error={todayProgress.error}
              onRetry={reloadToday}
              minutes={todayProgress.weeklyMinutes}
              goalMinutes={todayProgress.weeklyGoalMinutes}
              percent={todayProgress.weeklyPercent}
              goalReached={todayProgress.weeklyGoalReached}
              daysStudied={todayProgress.daysStudiedThisWeek}
              dailyMinutes={todayProgress.weeklyDailyMinutes}
              weekStart={todayProgress.weekStart}
              previousWeekMinutes={todayProgress.previousWeekMinutes}
            />

            <TodayProgressCard
              loading={todayProgress.loading}
              error={todayProgress.error}
              onRetry={reloadToday}
              minutes={todayProgress.minutes}
              goalMinutes={todayProgress.goalMinutes}
              goalPercent={todayProgress.goalPercent}
              remainingMinutes={todayProgress.remainingMinutes}
              streakDays={todayProgress.streakDays}
              lessonsCompletedToday={todayProgress.lessonsCompletedToday}
              studiedToday={todayProgress.studiedToday}
              currentTopicId={todayProgress.currentTopicId}
              currentTopicTitle={todayProgress.currentTopicTitle}
              currentTopicProgressPercent={
                todayProgress.currentTopicProgressPercent
              }
              onContinueLearning={openTopic}
            />

            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Chủ đề đang học</Text>
              <Text style={styles.sectionCount}>
                {inProgressTopics.length} chủ đề
              </Text>
            </View>

            {inProgressTopics.length === 0 ? (
              <Text style={styles.sectionEmpty}>
                Bạn đã hoàn thành mọi chủ đề đã tham gia.
              </Text>
            ) : (
              inProgressTopics.map(renderTopicRow)
            )}

            {finishedTopics.length > 0 ? (
              <>
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>Đã hoàn thành</Text>
                  <Text style={styles.sectionCount}>
                    {finishedTopics.length} chủ đề
                  </Text>
                </View>
                {finishedTopics.map(renderTopicRow)}
              </>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = themed((colors) => ({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  skeletons: { gap: spacing.md, paddingTop: spacing.md },
  skeletonCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  skeletonRing: { borderRadius: radius.full },
  skeletonLines: { flex: 1, gap: spacing.sm },
  skeletonTopicHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
  },
  skeletonIconBox: { borderRadius: radius.md },
  skeletonRow: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  stateBox: { gap: spacing.md, paddingTop: spacing.md },
  overallCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLow,
    ...shadows.sm,
  },
  ringValue: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.secondary,
  },
  ringLabel: {
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
  overallBody: { flex: 1, gap: spacing.xs },
  overallTitle: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    color: colors.text,
  },
  overallMeta: {
    fontSize: typography.bodyLg,
    fontWeight: "700",
    color: colors.secondary,
  },
  overallSub: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    color: colors.textMuted,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  sectionCount: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  sectionEmpty: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
}));
