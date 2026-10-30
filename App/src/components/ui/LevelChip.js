import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../constants/theme";

const LEVEL_TONES = {
  BEGINNER: { label: "Beginner", color: "#0E7490", bg: "#E0F2FE" },
  INTERMEDIATE: { label: "Intermediate", color: "#B45309", bg: "#FEF3C7" },
  ADVANCED: { label: "Advanced", color: "#B91C1C", bg: "#FEE2E2" },
};

/**
 * Chip hien thi do kho cua chu de.
 * @param {{ level?: string }} props
 */
export function LevelChip({ level }) {
  const tone =
    LEVEL_TONES[level] ?? {
      label: level ?? "Unknown",
      color: colors.textMuted,
      bg: colors.surfaceContainerHigh,
    };

  return (
    <View style={[styles.chip, { backgroundColor: tone.bg }]}>
      <Text style={[styles.label, { color: tone.color }]}>{tone.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  label: {
    fontSize: typography.labelSm,
    fontWeight: "700",
  },
});
