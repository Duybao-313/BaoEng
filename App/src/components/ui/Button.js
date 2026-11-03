import { ActivityIndicator, Pressable } from "react-native";
import { Text } from "./Text";

import { radius, shadows, spacing, themed, typography } from "../../constants/theme";
import { Icon } from "./Icon";

const VARIANTS = themed((colors) => ({
  primary: {
    container: {
      backgroundColor: colors.primaryContainer,
      borderColor: colors.primaryContainer,
    },
    label: { color: colors.onPrimary },
    icon: colors.onPrimary,
  },
  outline: {
    container: { backgroundColor: colors.surface, borderColor: colors.border },
    label: { color: colors.primary },
    icon: colors.primary,
  },
  ghost: {
    container: { backgroundColor: "transparent", borderColor: "transparent" },
    label: { color: colors.primary },
    icon: colors.primary,
  },
}));

/**
 * Nut bam chuan cua app.
 * @param {{
 *   label?: string,
 *   onPress?: () => void,
 *   variant?: keyof typeof VARIANTS,
 *   icon?: string,
 *   fullWidth?: boolean,
 *   disabled?: boolean,
 *   loading?: boolean,
 *   style?: any,
 *   labelStyle?: any,
 * }} props
 */
export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  fullWidth = true,
  disabled = false,
  loading = false,
  style,
  labelStyle,
  ...rest
}) {
  const isDisabled = disabled || loading;
  const tone = VARIANTS[variant] ?? VARIANTS.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        fullWidth ? styles.fullWidth : null,
        tone.container,
        shadows.sm,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}
      {...rest}
    >
      {loading ? <ActivityIndicator color={tone.icon} /> : null}
      {label ? (
        <Text style={[styles.label, tone.label, labelStyle]} numberOfLines={1}>
          {label}
        </Text>
      ) : null}
      {!loading && icon ? (
        <Icon name={icon} size={18} color={tone.icon} />
      ) : null}
    </Pressable>
  );
}

const styles = themed((colors) => ({
  base: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  fullWidth: { alignSelf: "stretch" },
  label: { fontSize: typography.labelLg, fontWeight: "600" },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.6 },
}));
