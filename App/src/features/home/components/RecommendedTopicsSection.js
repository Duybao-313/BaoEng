import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button, Skeleton } from "../../../components/ui";
import { LevelChip } from "../../../components/ui/LevelChip";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from "../../../constants/theme";

/**
 * Khoi "Chu de de xuat cho ban": danh sach ngang cac card gon.
 * An han khi khong co goi y va khong co loi (khong lam trong trang).
 */
export function RecommendedTopicsSection({
  topics = [],
  loading = false,
  error = null,
  onRetry,
  onPressTopic,
}) {
  if (!loading && !error && topics.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Chủ đề đề xuất cho bạn</Text>

      {loading ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {[0, 1].map((item) => (
            <View key={item} style={styles.card}>
              <Skeleton height={18} width="80%" />
              <Skeleton height={14} width="50%" />
              <Skeleton height={8} />
            </View>
          ))}
        </ScrollView>
      ) : null}

      {!loading && error ? (
        <View style={styles.stateBox}>
          <Text style={styles.hint}>Không tải được chủ đề đề xuất.</Text>
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
      ) : null}

      {!loading && !error ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {topics.map((topic) => (
            <Pressable
              key={topic.topicId}
              accessibilityRole="button"
              accessibilityLabel={`Mở chủ đề ${topic.title}`}
              onPress={() => onPressTopic?.(topic)}
              style={({ pressed }) => [
                styles.card,
                pressed ? styles.pressed : null,
              ]}
            >
              <LevelChip level={topic.level} />
              <Text style={styles.cardTitle} numberOfLines={2}>
                {topic.title}
              </Text>
              <Text style={styles.meta} numberOfLines={1}>
                {(topic.teacherName ? `${topic.teacherName} • ` : "") +
                  `${topic.lessonCount ?? 0} bài học`}
              </Text>
              {topic.progressPercent != null && topic.progressPercent > 0 ? (
                <ProgressBar value={topic.progressPercent} showLabel />
              ) : null}
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  title: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  row: { gap: spacing.md, paddingVertical: spacing.xs },
  card: {
    width: 220,
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: typography.bodyLg,
    fontWeight: "600",
    color: colors.text,
  },
  meta: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  stateBox: { gap: spacing.sm },
  hint: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  pressed: { opacity: 0.9 },
});
