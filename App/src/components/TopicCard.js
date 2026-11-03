import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../constants/theme";
import { HighlightedText, LevelChip, ProgressBar } from "./ui";

/**
 * The chu de trong danh sach (Trang chu / Tim kiem).
 * @param {{ topic: object, onPress?: () => void, highlight?: string }} props
 */
export function TopicCard({ topic, onPress, highlight }) {
  const completedText =
    topic.completedLessons !== undefined
      ? `${topic.completedLessons}/${topic.totalLessons ?? topic.lessonCount} bài học`
      : `${topic.lessonCount ?? 0} bài học`;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}
    >
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <HighlightedText
            text={topic.title}
            keyword={highlight}
            style={styles.title}
            numberOfLines={2}
          />
        </View>
        <LevelChip level={topic.level} />
      </View>

      {topic.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {topic.description}
        </Text>
      ) : null}

      <View style={styles.metaRow}>
        {topic.teacherName ? (
          <Text style={styles.meta} numberOfLines={1}>
            {topic.teacherName}
          </Text>
        ) : null}
        <Text style={styles.meta}>{completedText}</Text>
      </View>

      {topic.progressPercent != null ? (
        <ProgressBar value={topic.progressPercent} showLabel />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  titleWrap: { flex: 1 },
  title: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    color: colors.text,
  },
  description: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  meta: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
  },
});
