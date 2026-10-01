import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../constants/theme";

/** Man hinh 404 — Expo Router tu dong dung file nay cho moi route khong ton tai. */
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Khong tim thay", headerShown: true }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.message}>Man hinh ban tim khong ton tai.</Text>
        <Link href="/" style={styles.link}>
          Ve trang chu
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.primary,
  },
  message: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  link: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    overflow: "hidden",
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.surface,
    backgroundColor: colors.primary,
  },
});
