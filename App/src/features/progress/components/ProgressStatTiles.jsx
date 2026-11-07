import { View } from "react-native";
import { Text } from "../../../components/ui/Text";

import { colors, radius, shadows, spacing, themed, typography } from "../../../constants/theme";
import { Icon, Skeleton } from "../../../components/ui";

const TONES = {
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  tertiary: { color: colors.tertiary },
};

/**
 * Hang 3 the thong ke nhanh o dau man Tien do (bai hoan thanh, gio tich luy, chu de xong).
 *
 * @param {{
 *   loading?: boolean,
 *   items?: Array<{ icon: string, value: string, label: string, tone?: "primary"|"secondary"|"tertiary" }>,
 * }} props
 */
export function ProgressStatTiles({ loading = false, items = [] }) {
  if (loading) {
    return (
      <View style={styles.row}>
        {[0, 1, 2].map((item) => (
          <View key={item} style={styles.tile}>
            <Skeleton width={20} height={20} />
            <Skeleton width={44} height={18} />
            <Skeleton width={56} height={10} />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.row}>
      {items.map((item) => {
        const tone = TONES[item.tone] ?? TONES.primary;

        return (
          <View
            key={item.label}
            style={styles.tile}
            accessibilityLabel={`${item.label}: ${item.value}`}
          >
            <Icon name={item.icon} size={20} color={tone.color} />
            <Text
              style={[styles.value, { color: tone.color }]}
              numberOfLines={1}
            >
              {item.value}
            </Text>
            <Text style={styles.label} numberOfLines={2}>
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = themed((colors) => ({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainer,
    ...shadows.sm,
  },
  value: {
    fontSize: typography.headlineSm,
    fontWeight: "700",
  },
  label: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
    textAlign: "center",
  },
}));
