import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "../../components/ui/Text";

import { AppHeader } from "../../components/layout/AppHeader";
import { Alert, Button, Card, Input, Screen } from "../../components/ui";
import { spacing, themed, typography } from "../../constants/theme";
import { useSignUp } from "../../features/auth";

export default function SignUpScreen() {
  const router = useRouter();
  const { values, errors, formError, submitting, setField, submit, fillDemo } =
    useSignUp();

  const handleSubmit = async () => {
    const result = await submit();
    if (result.ok) router.replace("/(auth)/sign-in");
  };

  return (
    <Screen padded={false}>
      <AppHeader title="Đăng ký" showAvatar={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.heading}>Tạo tài khoản học viên</Text>
          <Text style={styles.subheading}>
            Bắt đầu lộ trình 15 phút mỗi ngày cùng BaoEng.
          </Text>
        </View>

        <Alert title="Đăng ký không thành công" message={formError} />

        <Button
          label="Điền nhanh dữ liệu mẫu"
          variant="outline"
          icon="bolt"
          onPress={fillDemo}
        />

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
            label="Họ và tên"
            leftIcon="badge"
            placeholder="VD: Nguyễn Quốc Bảo"
            autoCapitalize="words"
            returnKeyType="next"
            value={values.fullName}
            onChangeText={(text) => setField("fullName", text)}
            error={errors.fullName}
          />

          <Input
            label="Email"
            leftIcon="alternate-email"
            placeholder="VD: quocbao@email.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            value={values.email}
            onChangeText={(text) => setField("email", text)}
            error={errors.email}
          />

          <Input
            label="Mật khẩu"
            leftIcon="lock"
            secure
            placeholder="Tối thiểu 8 ký tự"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            value={values.password}
            onChangeText={(text) => setField("password", text)}
            error={errors.password}
            onSubmitEditing={handleSubmit}
          />

          <Button
            label={submitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            icon="arrow-forward"
            loading={submitting}
            onPress={handleSubmit}
          />

          <Text style={styles.verifyNote}>
            Sau khi đăng ký, vui lòng kiểm tra email để xác thực tài khoản trước
            khi đăng nhập.
          </Text>
        </Card>

        <View style={styles.signInRow}>
          <Text style={styles.mutedText}>Đã có tài khoản?</Text>
          <Pressable
            accessibilityRole="link"
            hitSlop={8}
            onPress={() => router.back()}
          >
            <Text style={styles.link}>Đăng nhập</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = themed((colors) => ({
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
  intro: { gap: spacing.xs, paddingTop: spacing.md },
  heading: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "600",
    color: colors.text,
  },
  subheading: { fontSize: typography.bodyMd, color: colors.textMuted },
  signInRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  verifyNote: {
    fontSize: typography.labelSm,
    lineHeight: 16,
    color: colors.textMuted,
    textAlign: "center",
  },
  mutedText: { fontSize: typography.bodyMd, color: colors.textMuted },
  link: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.primaryContainer,
  },
}));
