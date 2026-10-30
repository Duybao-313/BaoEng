import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getProgress } from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  Button,
  EmptyState,
  ProgressBar,
  Screen,
  Skeleton,
} from "../../components/ui";
import { colors, radius, shadows, spacing, typography } from "../../constants/theme";
import { formatPercent } from "../../utils";
import { useAsync } from "../../hooks";

export default function ProgressScreen() {
  const { data, loading, error, run } = useAsync(getProgress, {});
  const topics = data?.topics ?? [];
  const overall = data?.overallProgressPercent;

  return (
    <Screen padded={false}>
      <AppHeader title="Tiến độ" showAvatar={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.skeletons}>
            <Skeleton height={140} />
            <Skeleton height={64} />
            <Skeleton height={64} />
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
          <EmptyState
            icon="flag"
            title="Bạn chưa bắt đầu học"
            message="Tham gia một chủ đề và hoàn thành bài học đầu tiên để xem tiến độ tại đây."
          />
        ) : null}

        {!loading && !error && topics.length > 0 ? (
          <>
            {/* Card tien do tong the */}
            <View style={styles.overallCard}>
              <View style={styles.donut}>
                <Text style={styles.donutValue}>
                  {formatPercent(overall)}
                </Text>
                <Text style={styles.donutLabel}>hoàn thành</Text>
              </View>
              <View style={styles.overallBody}>
                <Text style={styles.overallTitle}>Tiến độ tổng thể</Text>
                <Text style={styles.overallSub}>
                  Cứ kiên trì, mỗi ngày một chút nhé!
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Theo từng chủ đề</Text>

            {topics.map((topic) => (
              <View key={topic.topicId} style={styles.topicRow}>
                <Text style={styles.topicTitle} numberOfLines={1}>
                  {topic.title}
                </Text>
                <Text style={styles.topicMeta}>
                  {topic.completedLessons}/{topic.totalLessons} bài học
                </Text>
                <ProgressBar value={topic.progressPercent} showLabel />
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  skeletons: { gap: spacing.md, paddingTop: spacing.md },
  stateBox: { gap: spacing.md, paddingTop: spacing.md },
  overallCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  donut: {
    width: 120,
    height: 120,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
    borderColor: colors.secondaryFixed,
    backgroundColor: colors.surfaceContainerLow,
  },
  donutValue: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.secondary,
  },
  donutLabel: {
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
  overallBody: { flex: 1, gap: spacing.xs },
  overallTitle: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    color: colors.text,
  },
  overallSub: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    color: colors.textMuted,
  },
  sectionTitle: {
    marginTop: spacing.sm,
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  topicRow: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  topicTitle: {
    fontSize: typography.bodyLg,
    fontWeight: "600",
    color: colors.text,
  },
  topicMeta: {
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
});
