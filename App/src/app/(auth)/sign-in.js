import { useRouter } from "expo-router";
import {
  Alert as AlertDialog,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppHeader } from "../../components/layout/AppHeader";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Divider,
  Icon,
  Input,
  Screen,
} from "../../components/ui";
import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from "../../constants/theme";
import { SocialSignIn, useSignIn } from "../../features/auth";

const LOGO = require("../../../assets/icon.png");

/** @param {string} feature */
function comingSoon(feature) {
  AlertDialog.alert(
    "Sắp ra mắt",
    `${feature} sẽ được bổ sung trong bản cập nhật tới.`,
  );
}

export default function SignInScreen() {
  const router = useRouter();
  const { values, errors, formError, submitting, setField, submit } =
    useSignIn();

  const handleSubmit = async () => {
    const result = await submit();
    if (result.ok) router.replace("/");
  };

  return (
    <Screen padded={false}>
      <AppHeader title="Đăng nhập" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand + mascot */}
        <View style={styles.intro}>
          <View style={styles.logoWrap}>
            <View style={styles.logoBox}>
              <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            </View>
            <View style={styles.streakBadge}>
              <Icon
                name="local-fire-department"
                size={14}
                color={colors.tertiary}
              />
              <Text style={styles.streakText}>5 ngày</Text>
            </View>
          </View>

          <Text style={styles.heading}>Chào mừng trở lại! 👋</Text>
          <Text style={styles.subheading}>
            Đăng nhập để tiếp tục chuỗi ngày học tiếng Anh cùng BaoEng.
          </Text>
        </View>

        {/* Loi o cap form */}
        <Alert title="Đăng nhập không thành công" message={formError} />

        {/* Form */}
        <Card>
          <Input
            label="Tên đăng nhập"
            leftIcon="person"
            placeholder="VD: quocbao24"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="username"
            returnKeyType="next"
            value={values.username}
            onChangeText={(text) => setField("username", text)}
            error={errors.username}
          />

          <Input
            label="Mật khẩu"
            leftIcon="lock"
            secure
            placeholder="Nhập mật khẩu của bạn"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            returnKeyType="done"
            value={values.password}
            onChangeText={(text) => setField("password", text)}
            error={errors.password}
            onSubmitEditing={handleSubmit}
          />

          <View style={styles.helperRow}>
            <Checkbox
              label="Ghi nhớ đăng nhập"
              checked={values.remember}
              onChange={(next) => setField("remember", next)}
            />
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => comingSoon("Chức năng quên mật khẩu")}
            >
              <Text style={styles.link}>Quên mật khẩu?</Text>
            </Pressable>
          </View>

          <Button
            label={submitting ? "Đang xác thực..." : "Đăng nhập"}
            icon="arrow-forward"
            loading={submitting}
            onPress={handleSubmit}
          />
        </Card>

        <Divider label="Hoặc đăng nhập với" />

        <SocialSignIn
          onPressProvider={(provider) =>
            comingSoon(
              `Đăng nhập bằng ${provider === "google" ? "Google" : "Apple"}`,
            )
          }
        />

        <View style={styles.signUpRow}>
          <Text style={styles.mutedText}>Chưa có tài khoản học viên?</Text>
          <Pressable
            accessibilityRole="link"
            hitSlop={8}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <View style={styles.signUpLink}>
              <Text style={styles.linkStrong}>Đăng ký ngay</Text>
              <Icon
                name="chevron-right"
                size={16}
                color={colors.primaryContainer}
              />
            </View>
          </Pressable>
        </View>

        {/* Dong vien hang ngay */}
        <View style={styles.motivation}>
          <View style={styles.motivationIcon}>
            <Icon name="workspace-premium" size={20} color={colors.onPrimary} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.motivationLabel}>Học cùng BaoEng</Text>
            <Text style={styles.motivationText}>
              15 phút mỗi ngày để mở khóa phản xạ tiếng Anh tự nhiên.
            </Text>
          </View>
        </View>

        <View style={styles.trust}>
          <Icon name="verified-user" size={16} color={colors.secondary} />
          <Text style={styles.trustText}>
            Dành riêng cho học viên BaoEng • Mã hóa an toàn SSL 256-bit
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  flex: { flex: 1 },

  intro: { alignItems: "center", gap: spacing.sm, paddingTop: spacing.md },
  logoWrap: { marginBottom: spacing.sm },
  logoBox: {
    width: 80,
    height: 80,
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  logo: { width: "100%", height: "100%" },
  streakBadge: {
    position: "absolute",
    bottom: -6,
    right: -12,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    backgroundColor: colors.tertiaryFixed,
    ...shadows.sm,
  },
  streakText: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.onTertiaryFixed,
  },
  heading: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "600",
    textAlign: "center",
    color: colors.text,
  },
  subheading: {
    maxWidth: 300,
    fontSize: typography.bodyMd,
    lineHeight: 20,
    textAlign: "center",
    color: colors.textMuted,
  },

  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  link: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.primaryContainer,
  },
  linkStrong: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.primaryContainer,
  },

  signUpRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  signUpLink: { flexDirection: "row", alignItems: "center" },
  mutedText: { fontSize: typography.bodyMd, color: colors.textMuted },

  motivation: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: "rgba(111, 251, 190, 0.3)",
    ...shadows.sm,
  },
  motivationIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  motivationLabel: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.onSecondaryFixedVariant,
  },
  motivationText: { fontSize: typography.bodyMd, color: colors.text },

  trust: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  trustText: {
    flexShrink: 1,
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
});
