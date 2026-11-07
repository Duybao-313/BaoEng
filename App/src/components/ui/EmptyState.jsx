import { View } from "react-native";
import { Text } from "./Text";

import { colors, radius, spacing, themed, typography } from "../../constants/theme";
import { Icon } from "./Icon";

/**
 * Trang thai rong (empty state) dung chung.
 * @param {{ icon?: string, title?: string, message?: string }} props
 */
export function EmptyState({ icon = "inbox", title, message }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconBox}>
        <Icon name={icon} size={28} color={colors.textMuted} />
      </View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = themed((colors) => ({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.xl,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  message: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: "center",
  },
}));
