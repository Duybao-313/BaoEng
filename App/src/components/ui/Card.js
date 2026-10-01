import { StyleSheet, Text, View } from "react-native";

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from "../../constants/theme";

/**
 * Card bao ngoai noi dung — nen trang, bo goc 16px, do bong nhe (theo mockup).
 * @param {{ children: import('react').ReactNode, title?: string, style?: any }} props
 */
export function Card({ children, title, style }) {
  return (
    <View style={[styles.card, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  title: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    color: colors.text,
  },
});
