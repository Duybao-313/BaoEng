import { Pressable, View } from "react-native";
import { Text } from "../../../components/ui/Text";

import { colors, radius, shadows, spacing, themed, typography } from "../../../constants/theme";
import { Icon, ProgressBar } from "../../../components/ui";

/**
 * The tien do cua mot chu de: icon, ten, mo ta, so bai hoan thanh, thanh tien do
 * va hanh dong "Hoc tiep" (hoac trang thai da hoan thanh).
 *
 * @param {{ topic: object, onPress?: () => void, onContinue?: () => void }} props
 */
export function TopicProgressCard({ topic, onPress, onContinue }) {
  const percent = Number(topic.progressPercent) || 0;
  const completed = percent >= 100;
  const nextLessonTitle = topic.nextLessonTitle;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Xem chủ đề ${topic.title}, đã hoàn thành ${
        topic.completedLessons ?? 0
      } trên ${topic.totalLessons ?? 0} bài học`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconBox,
            completed ? styles.iconBoxDone : styles.iconBoxActive,
          ]}
        >
          <Icon
            name={completed ? "military-tech" : "menu-book"}
            size={24}
            color={completed ? colors.onTertiaryFixed : colors.secondary}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {topic.title}
          </Text>
          {topic.description ? (
            <Text style={styles.description} numberOfLines={1}>
              {topic.description}
            </Text>
          ) : null}
        </View>
      </View>

      <View>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            {`${topic.completedLessons ?? 0}/${topic.totalLessons ?? 0} bài hoàn thành`}
          </Text>
          {completed ? (
            <View style={styles.doneMeta}>
              <Icon
                name="emoji-events"
                size={14}
                color={colors.onTertiaryFixed}
              />
              <Text style={styles.doneText}>Hoàn thành</Text>
            </View>
          ) : (
            <Text style={styles.percent}>{`${Math.round(percent)}%`}</Text>
          )}
        </View>
        <ProgressBar value={percent} height={8} />
      </View>

      <View style={styles.footer}>
        <View style={styles.nextWrap}>
          <Icon
            name={completed ? "check-circle" : "schedule"}
            size={16}
            color={completed ? colors.secondary : colors.textMuted}
          />
          <Text
            style={[styles.nextText, completed ? styles.nextTextDone : null]}
            numberOfLines={1}
          >
            {completed
              ? "Đã hoàn thành chủ đề"
              : nextLessonTitle
                ? `Bài tiếp: ${nextLessonTitle}`
                : "Sẵn sàng học bài đầu tiên"}
          </Text>
        </View>
        {!completed && onContinue ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Học tiếp chủ đề ${topic.title}`}
            onPress={onContinue}
            style={({ pressed }) => [
              styles.continueButton,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.continueLabel}>Học tiếp</Text>
            <Icon name="arrow-forward" size={16} color={colors.onPrimary} />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = themed((colors) => ({
  card: {
    gap: spacing.sm + 2,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLow,
    ...shadows.sm,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm + 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxActive: { backgroundColor: colors.secondaryFixed },
  iconBoxDone: { backgroundColor: colors.tertiaryFixed },
  headerText: { flex: 1, gap: 2 },
  title: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    color: colors.text,
  },
  description: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  doneMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    backgroundColor: colors.tertiaryFixed,
  },
  doneText: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.onTertiaryFixed,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  meta: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.text,
  },
  percent: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.secondary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  nextWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flex: 1,
  },
  nextText: {
    flex: 1,
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
  nextTextDone: { color: colors.secondary, fontWeight: "600" },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primaryContainer,
  },
  continueLabel: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.onPrimary,
  },
}));
