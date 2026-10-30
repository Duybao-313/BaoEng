import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../constants/theme";
import { Icon } from "./Icon";

const VARIANTS = {
  error: {
    icon: "error-outline",
    iconColor: colors.danger,
    container: { backgroundColor: colors.errorContainer },
    title: { color: colors.danger },
    message: { color: colors.onErrorContainer },
  },
  success: {
    icon: "check-circle",
    iconColor: colors.success,
    container: { backgroundColor: colors.secondaryFixed },
    title: { color: colors.onSecondaryFixedVariant },
    message: { color: colors.onSecondaryFixedVariant },
  },
};

/**
 * Bang thong bao (mac dinh: loi) — dung cho thong bao o cap man hinh.
 *
 * @param {{
 *   visible?: boolean,
 *   variant?: 'error' | 'success',
 *   title?: string,
 *   message?: string | null,
 *   style?: any,
 * }} props
 */
export function Alert({
  visible = true,
  variant = "error",
  title,
  message,
  style,
}) {
  if (!visible || !message) return null;

  const tone = VARIANTS[variant] ?? VARIANTS.error;

  return (
    <View accessibilityRole="alert" style={[styles.container, tone.container, style]}>
      <Icon
        name={tone.icon}
        size={20}
        color={tone.iconColor}
        style={styles.icon}
      />
      <View style={styles.body}>
        {title ? <Text style={[styles.title, tone.title]}>{title}</Text> : null}
        <Text style={[styles.message, tone.message]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.errorContainer,
  },
  icon: { marginTop: 2 },
  body: { flex: 1, gap: 2 },
  title: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.danger,
  },
  message: { fontSize: typography.bodyMd, color: colors.onErrorContainer },
});
