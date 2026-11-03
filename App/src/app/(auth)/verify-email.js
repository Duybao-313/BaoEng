import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { Text } from "../../components/ui/Text";

import { verifyEmail } from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  Alert,
  Button,
  Icon,
  Screen,
  Skeleton,
} from "../../components/ui";
import { colors, radius, spacing, themed, typography } from "../../constants/theme";
import { useAsync } from "../../hooks";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  const { data, loading, error } = useAsync(
    () => verifyEmail({ token: String(token ?? "") }),
    { deps: [token] },
  );

  const success = Boolean(data);

  return (
    <Screen padded={false}>
      <AppHeader title="Xác thực email" showAvatar={false} />

      <View style={styles.body}>
        {loading ? (
          <View style={styles.loading}>
            <Skeleton height={20} width="60%" />
            <Skeleton height={80} />
          </View>
        ) : null}

        {!loading && success ? (
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Icon name="verified" size={40} color={colors.secondary} />
            </View>
            <Text style={styles.title}>Xác thực thành công!</Text>
            <Text style={styles.message}>
              Tài khoản của bạn đã được kích hoạt. Giờ bạn có thể đăng nhập và bắt đầu học.
            </Text>
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.card}>
            <Alert
              title="Xác thực không thành công"
              message={error?.message ?? "Token không hợp lệ hoặc đã hết hạn."}
            />
          </View>
        ) : null}

        {!loading ? (
          <Button
            label="Về trang đăng nhập"
            icon="arrow-back"
            onPress={() => router.replace("/(auth)/sign-in")}
          />
        ) : null}
      </View>
    </Screen>
  );
}

const styles = themed((colors) => ({
  body: {
    flex: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  loading: { gap: spacing.md },
  card: {
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  iconBox: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondaryFixed,
  },
  title: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    textAlign: "center",
    color: colors.text,
  },
  message: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    textAlign: "center",
    color: colors.textMuted,
  },
}));
