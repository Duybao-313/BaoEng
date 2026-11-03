import { View } from "react-native";
import { Text } from "./Text";

import { spacing, themed, typography } from "../../constants/theme";

/**
 * Thanh tien do ngang (tuy chon kem nhan %).
 * @param {{ value?: number, showLabel?: boolean, height?: number }} props
 */
export function ProgressBar({ value = 0, showLabel = false, height = 8 }) {
  const percent = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <View style={styles.row}>
      <View
        style={[styles.track, { height, borderRadius: height / 2 }]}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: percent }}
      >
        <View
          style={[
            styles.fill,
            { width: `${percent}%`, borderRadius: height / 2 },
          ]}
        />
      </View>
      {showLabel ? (
        <Text style={styles.label}>{Math.round(percent)}%</Text>
      ) : null}
    </View>
  );
}

const styles = themed((colors) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  track: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: colors.secondary,
  },
  label: {
    minWidth: 40,
    textAlign: "right",
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.secondary,
  },
}));
