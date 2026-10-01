import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "../components/layout/AppHeader";
import { Button, Card, Icon, Screen } from "../components/ui";
import { colors, radius, spacing, typography } from "../constants/theme";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen padded={false}>
      <AppHeader showLanguage={false} />

      <View style={styles.body}>
        <Card>
          <View style={styles.badge}>
            <Icon name="school" size={22} color={colors.primary} />
          </View>
          <Text style={styles.title}>BaoEng</Text>
          <Text style={styles.subtitle}>
            Ứng dụng học tiếng Anh — Mobile App
          </Text>
          <Text style={styles.description}>
            Khởi tạo React Native + Expo (Expo Router) thành công. Thêm màn hình
            mới bằng cách tạo file trong{" "}
            <Text style={styles.code}>src/app/</Text>.
          </Text>
        </Card>

        <Button
          label="Đăng nhập"
          icon="arrow-forward"
          onPress={() => router.push("/(auth)/sign-in")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: spacing.md, padding: spacing.lg },
  badge: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLow,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "600",
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.heading,
    fontWeight: "500",
    color: colors.text,
  },
  description: {
    fontSize: typography.body,
    lineHeight: 22,
    color: colors.textMuted,
  },
  code: {
    fontWeight: "600",
    color: colors.primary,
  },
});
