import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../constants/theme";
import { Icon } from "./ui";

/**
 * Dong bai hoc trong man hinh Chi tiet chu de.
 * @param {{ index: number, lesson: object, onPress?: () => void }} props
 */
export function LessonRow({ index, lesson, onPress }) {
  const completed = Boolean(lesson.completed);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}
    >
      <View style={[styles.badge, completed ? styles.badgeDone : null]}>
        {completed ? (
          <Icon name="check" size={16} color={colors.onSecondary} />
        ) : (
          <Text style={styles.badgeText}>{index + 1}</Text>
        )}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {lesson.title}
      </Text>

      <Icon name="chevron-right" size={20} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  pressed: { opacity: 0.7 },
  badge: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerHigh,
  },
  badgeDone: { backgroundColor: colors.secondary },
  badgeText: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.text,
  },
  title: {
    flex: 1,
    fontSize: typography.bodyLg,
    color: colors.text,
  },
});
