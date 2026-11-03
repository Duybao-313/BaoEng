import { Pressable, View } from "react-native";
import { Text } from "./Text";

import { colors, radius, spacing, themed, typography } from "../../constants/theme";
import { Icon } from "./Icon";

/**
 * Checkbox co nhan — khong can thu vien ngoai.
 *
 * @param {{
 *   checked?: boolean,
 *   onChange?: (next: boolean) => void,
 *   label?: string,
 *   disabled?: boolean,
 *   style?: any,
 * }} props
 */
export function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onChange?.(!checked)}
      style={({ pressed }) => [
        styles.row,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <View style={[styles.box, checked ? styles.boxChecked : null]}>
        {checked ? (
          <Icon name="check" size={14} color={colors.onPrimary} />
        ) : null}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = themed((colors) => ({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  box: {
    width: 18,
    height: 18,
    borderRadius: radius.sm / 2,
    borderWidth: 1.5,
    borderColor: colors.outline,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  boxChecked: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  label: { fontSize: typography.bodyMd, color: colors.textMuted },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.5 },
}));
