import { Pressable, View } from "react-native";
import { Text } from "../../../components/ui/Text";

import { Icon } from "../../../components/ui";
import { colors, radius, shadows, spacing, themed, typography } from "../../../constants/theme";

const PROVIDERS = [
  { id: "google", label: "Google", icon: "google", color: "#4285F4" },
  { id: "apple", label: "Apple", icon: "apple", color: colors.text },
];

/**
 * Hai nut dang nhap bang Google / Apple (theo mockup).
 * @param {{ onPressProvider?: (providerId: string) => void }} props
 */
export function SocialSignIn({ onPressProvider }) {
  return (
    <View style={styles.row}>
      {PROVIDERS.map((provider) => (
        <Pressable
          key={provider.id}
          accessibilityRole="button"
          accessibilityLabel={`Đăng nhập với ${provider.label}`}
          onPress={() => onPressProvider?.(provider.id)}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressed : null,
          ]}
        >
          <Icon
            set="community"
            name={provider.icon}
            size={20}
            color={provider.color}
          />
          <Text style={styles.label}>{provider.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = themed((colors) => ({
  row: { flexDirection: "row", gap: spacing.md },
  button: {
    flex: 1,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  label: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.text,
  },
  pressed: { opacity: 0.85 },
}));
