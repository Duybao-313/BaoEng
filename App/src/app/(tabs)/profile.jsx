import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Text } from "../../components/ui/Text";

import { changePassword, resolveAssetUrl, updateMe, uploadAvatar } from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  Alert,
  Button,
  Card,
  Icon,
  Input,
  Screen,
} from "../../components/ui";
import { colors, radius, spacing, themed, typography } from "../../constants/theme";
import { useAuth } from "../../store/auth";

export default function ProfileScreen() {
  const router = useRouter();
  const { session, signOut, updateUser } = useAuth();

  const user = session?.user ?? {};
  const avatarUrl = resolveAssetUrl(user.avatarUrl);
  const [fullName, setFullName] = useState(user.fullName ?? "");

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState(null);
  const [avatarError, setAvatarError] = useState(null);

  const [saving, setSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);
  const [profileError, setProfileError] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);

  const handlePickAvatar = async () => {
    setAvatarError(null);
    setAvatarMessage(null);

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setAvatarError("Bạn cần cấp quyền truy cập thư viện ảnh để đổi ảnh đại diện.");
      return;
    }

    const picked = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (picked.canceled || !picked.assets?.length) return;

    const asset = picked.assets[0];
    setUploadingAvatar(true);
    try {
      const updated = await uploadAvatar({
        uri: asset.uri,
        name: asset.fileName ?? "avatar.jpg",
        type: asset.mimeType ?? "image/jpeg",
        file: asset.file,
      });
      updateUser({
        avatarUrl: updated?.avatarUrl ?? null,
        fullName: updated?.fullName ?? user.fullName,
      });
      setAvatarMessage("Đã cập nhật ảnh đại diện.");
    } catch (err) {
      setAvatarError(err?.message ?? "Không cập nhật được ảnh đại diện.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      setProfileError("Vui lòng nhập họ tên.");
      return;
    }
    setSaving(true);
    setProfileError(null);
    setProfileMessage(null);
    try {
      await updateMe({ fullName: fullName.trim() });
      setProfileMessage("Đã lưu thay đổi hồ sơ.");
    } catch (err) {
      setProfileError(err?.message ?? "Không lưu được hồ sơ. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword) {
      setPasswordError("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Mật khẩu mới tối thiểu 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Xác nhận mật khẩu không khớp.");
      return;
    }

    setChangingPassword(true);
    setPasswordError(null);
    setPasswordMessage(null);
    try {
      await changePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Đổi mật khẩu thành công.");
    } catch (err) {
      setPasswordError(err?.message ?? "Không đổi được mật khẩu. Vui lòng thử lại.");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <Screen padded={false}>
      <AppHeader title="Hồ sơ" showAvatar={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Đổi ảnh đại diện"
            onPress={handlePickAvatar}
            disabled={uploadingAvatar}
            style={({ pressed }) => [pressed ? styles.pressed : null]}
          >
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Icon name="person" size={40} color={colors.onPrimary} />
              </View>
            )}
            <View style={styles.avatarBadge}>
              <Icon
                name={uploadingAvatar ? "hourglass-empty" : "photo-camera"}
                size={16}
                color={colors.onPrimary}
              />
            </View>
          </Pressable>
          <Text style={styles.username}>{user.username ?? ""}</Text>
          <Text style={styles.role}>Học viên</Text>
        </View>

        <Alert
          title="Ảnh đại diện"
          variant="success"
          visible={Boolean(avatarMessage)}
          message={avatarMessage}
        />
        <Alert title="Ảnh đại diện" message={avatarError} />

        <Alert
          title="Thông tin cá nhân"
          variant="success"
          visible={Boolean(profileMessage)}
          message={profileMessage}
        />
        <Alert title="Lỗi" message={profileError} />

        <Card title="Thông tin cá nhân">
          <Input
            label="Họ và tên"
            leftIcon="badge"
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
          />
          <Input
            label="Email"
            leftIcon="alternate-email"
            editable={false}
            value={user.email ?? ""}
          />
          <Button
            label={saving ? "Đang lưu..." : "Lưu thay đổi"}
            icon="save"
            loading={saving}
            onPress={handleSaveProfile}
          />
        </Card>

        <Alert
          title="Đổi mật khẩu"
          variant="success"
          visible={Boolean(passwordMessage)}
          message={passwordMessage}
        />
        <Alert title="Đổi mật khẩu" message={passwordError} />

        <Card title="Đổi mật khẩu">
          <Input
            label="Mật khẩu hiện tại"
            leftIcon="lock"
            secure
            autoCapitalize="none"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <Input
            label="Mật khẩu mới"
            leftIcon="lock"
            secure
            autoCapitalize="none"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            label="Xác nhận mật khẩu mới"
            leftIcon="lock"
            secure
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button
            label={changingPassword ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            icon="key"
            loading={changingPassword}
            onPress={handleChangePassword}
          />
        </Card>

        <Button
          label="Đăng xuất"
          variant="outline"
          icon="logout"
          onPress={handleLogout}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = themed((colors) => ({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  avatarWrap: {
    alignItems: "center",
    gap: spacing.xs,
    paddingTop: spacing.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  avatarBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },
  pressed: { opacity: 0.85 },
  username: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  role: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
}));
