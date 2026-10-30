import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { forgotPassword } from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  Alert,
  Button,
  Card,
  Input,
  Screen,
} from "../../components/ui";
import { colors, spacing, typography } from "../../constants/theme";
import { isEmail } from "../../utils";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isEmail(email)) {
      setError("Email không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      await forgotPassword({ email: email.trim() });
      setMessage(
        "Nếu email tồn tại, liên kết đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.",
      );
    } catch (err) {
      setError(err?.message ?? "Không gửi được yêu cầu. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen padded={false}>
      <AppHeader title="Quên mật khẩu" showAvatar={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.heading}>Quên mật khẩu?</Text>
          <Text style={styles.subheading}>
            Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu cho bạn.
          </Text>
        </View>

        <Alert title="Thành công" variant="success" message={message} />
        <Alert title="Lỗi" message={error} />

        <Card>
          <Input
            label="Email"
            leftIcon="alternate-email"
            placeholder="VD: quocbao@email.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={handleSubmit}
          />
          <Button
            label={submitting ? "Đang gửi..." : "Gửi liên kết đặt lại"}
            icon="mail"
            loading={submitting}
            onPress={handleSubmit}
          />
        </Card>

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="link"
            hitSlop={8}
            onPress={() => router.back()}
          >
            <Text style={styles.link}>Quay lại đăng nhập</Text>
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
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  intro: { gap: spacing.xs, paddingTop: spacing.md },
  heading: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "600",
    color: colors.text,
  },
  subheading: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    color: colors.textMuted,
  },
  footer: { alignItems: "center" },
  link: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.primaryContainer,
  },
});
