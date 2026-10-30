import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { resetPassword } from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  Alert,
  Button,
  Card,
  Input,
  Screen,
} from "../../components/ui";
import { colors, spacing, typography } from "../../constants/theme";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (newPassword.length < 8) {
      setError("Mật khẩu mới tối thiểu 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu không khớp.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      await resetPassword({ token: String(token ?? ""), newPassword });
      setMessage("Đặt lại mật khẩu thành công.");
    } catch (err) {
      setError(err?.message ?? "Không đặt lại được mật khẩu. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen padded={false}>
      <AppHeader title="Đặt lại mật khẩu" showAvatar={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.heading}>Đặt mật khẩu mới</Text>
          <Text style={styles.subheading}>
            Chọn một mật khẩu mới cho tài khoản của bạn.
          </Text>
        </View>

        <Alert title="Thành công" variant="success" message={message} />
        <Alert title="Lỗi" message={error} />

        <Card>
          <Input
            label="Mật khẩu mới"
            leftIcon="lock"
            secure
            placeholder="Tối thiểu 8 ký tự"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            label="Xác nhận mật khẩu mới"
            leftIcon="lock"
            secure
            placeholder="Nhập lại mật khẩu mới"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
          />
          <Button
            label={submitting ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
            icon="check"
            loading={submitting}
            onPress={handleSubmit}
          />
        </Card>

        {message ? (
          <Button
            label="Về trang đăng nhập"
            variant="outline"
            icon="arrow-back"
            onPress={() => router.replace("/(auth)/sign-in")}
          />
        ) : null}
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
});
