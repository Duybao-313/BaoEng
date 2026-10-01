import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "../../components/layout/AppHeader";
import { Alert, Button, Card, Input, Screen } from "../../components/ui";
import { colors, spacing, typography } from "../../constants/theme";
import { useSignUp } from "../../features/auth";

export default function SignUpScreen() {
  const router = useRouter();
  const { values, errors, formError, submitting, setField, submit } =
    useSignUp();

  const handleSubmit = async () => {
    const result = await submit();
    if (result.ok) router.replace("/");
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

        <Card>
          <Input
            label="Họ và tên"
            leftIcon="badge"
            placeholder="VD: Nguyễn Quốc Bảo"
            autoCapitalize="words"
            value={values.name}
            onChangeText={(text) => setField("name", text)}
            error={errors.name}
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
  mutedText: { fontSize: typography.bodyMd, color: colors.textMuted },
  link: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.primaryContainer,
  },
});
