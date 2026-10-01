import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../constants/theme";
import { Icon } from "./Icon";

/**
 * Bang thong bao (mac dinh: loi) — dung cho loi o cap form.
 *
 * @param {{
 *   visible?: boolean,
 *   title?: string,
 *   message?: string | null,
 *   style?: any,
 * }} props
 */
export function Alert({ visible = true, title, message, style }) {
  if (!visible || !message) return null;

  return (
    <View accessibilityRole="alert" style={[styles.container, style]}>
      <Icon
        name="error-outline"
        size={20}
        color={colors.danger}
        style={styles.icon}
      />
      <View style={styles.body}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Text style={styles.message}>{message}</Text>
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
