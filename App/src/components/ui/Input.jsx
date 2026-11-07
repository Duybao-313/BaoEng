import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Text } from "./Text";

import { colors, radius, shadows, spacing, themed, typography } from "../../constants/theme";
import { translate } from "../../i18n";
import { Icon } from "./Icon";

/**
 * O nhap lieu: label, icon dau dong, nut hien/an mat khau,
 * trang thai focus / loi / hop le.
 *
 * @param {{
 *   label?: string,
 *   error?: string,
 *   valid?: boolean,
 *   validLabel?: string,
 *   leftIcon?: string,
 *   secure?: boolean,
 *   editable?: boolean,
 *   style?: any,
 *   containerStyle?: any,
 * }} props
 */
export function Input({
  label,
  placeholder,
  error,
  valid = false,
  validLabel = "Hợp lệ",
  leftIcon,
  secure = false,
  editable = true,
  onFocus,
  onBlur,
  style,
  containerStyle,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secure);
  const hasError = Boolean(error);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {valid && !hasError ? (
            <Text style={styles.validTag}>{validLabel}</Text>
          ) : null}
        </View>
      ) : null}

      <View
        style={[
          styles.field,
          leftIcon ? styles.fieldWithIcon : null,
          focused ? styles.fieldFocused : null,
          hasError ? styles.fieldError : null,
          !editable ? styles.fieldDisabled : null,
        ]}
      >
        {leftIcon ? (
          <Icon
            name={leftIcon}
            size={20}
            color={focused ? colors.primary : colors.textMuted}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          accessibilityLabel={translate(label)}
          editable={editable}
          placeholder={translate(placeholder)}
          placeholderTextColor={colors.outline}
          secureTextEntry={hidden}
          style={[styles.input, style]}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...rest}
        />

        {secure ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
            hitSlop={8}
            onPress={() => setHidden((prev) => !prev)}
            style={({ pressed }) => [
              styles.trailingButton,
              pressed ? styles.pressed : null,
            ]}
          >
            <Icon
              name={hidden ? "visibility" : "visibility-off"}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>

      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = themed((colors) => ({
  wrapper: { width: "100%", gap: spacing.xs },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.text,
  },
  validTag: {
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.secondary,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: colors.surfaceContainerLow,
  },
  fieldWithIcon: { paddingLeft: spacing.xs },
  fieldFocused: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    ...shadows.md,
  },
  fieldError: { borderColor: colors.danger },
  fieldDisabled: { opacity: 0.6 },
  leftIcon: { marginRight: spacing.sm },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: typography.bodyMd,
    color: colors.text,
  },
  trailingButton: { padding: spacing.xs, borderRadius: radius.sm },
  pressed: { opacity: 0.7 },
  errorText: { fontSize: typography.caption, color: colors.danger },
}));
