import { useRouter } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { Text } from "../ui/Text";

import { resolveAssetUrl } from "../../api";
import { colors, radius, spacing, themed, typography } from "../../constants/theme";
import { useSettings } from "../../providers";
import { useAuth } from "../../store/auth";
import { Icon } from "../ui/Icon";

const LOGO = require("../../../assets/icon.png");

/**
 * App bar cua app: logo + ten app | tieu de man hinh + nut doi ngon ngu + avatar.
 * Mo phong theo mockup: header nam trong safe area, nen trung voi background.
 *
 * @param {{
 *   title?: string,
 *   showLanguage?: boolean,
 *   showAvatar?: boolean,
 *   streakDays?: number,
 *   onPressAvatar?: () => void,
 *   onPressSearch?: () => void,
 *   showSettings?: boolean,
 * }} props
 */
export function AppHeader({
  title,
  showLanguage = true,
  showAvatar = true,
  showSettings = true,
  streakDays = 0,
  onPressAvatar,
  onPressSearch,
}) {
  const { session } = useAuth();
  const { language, toggleLanguage, t } = useSettings();
  const router = useRouter();
  const avatarUri = resolveAssetUrl(session?.user?.avatarUrl);

  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brandName} numberOfLines={1}>
          BaoEng
        </Text>
      </View>

      <View style={styles.actions}>
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}

        {streakDays > 0 ? (
          <View
            style={styles.streakPill}
            accessibilityLabel={`Chuỗi ${streakDays} ngày học liên tiếp`}
          >
            <Icon
              name="local-fire-department"
              size={16}
              color={colors.tertiary}
            />
            <Text style={styles.streakText}>{streakDays} ngày</Text>
          </View>
        ) : null}

        {onPressSearch ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tìm kiếm nội dung học"
            onPress={onPressSearch}
            style={({ pressed }) => [
              styles.pill,
              pressed ? styles.pressed : null,
            ]}
          >
            <Icon name="search" size={18} color={colors.primary} />
          </Pressable>
        ) : null}

        {showSettings ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("Cài đặt")}
            onPress={() => router.push("/settings")}
            style={({ pressed }) => [styles.pill, pressed ? styles.pressed : null]}
          >
            <Icon name="settings" size={18} color={colors.primary} />
          </Pressable>
        ) : null}

        {showLanguage ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("Đổi ngôn ngữ")}
            onPress={toggleLanguage}
            style={({ pressed }) => [
              styles.pill,
              pressed ? styles.pressed : null,
            ]}
          >
            <Icon name="language" size={18} color={colors.primary} />
            <Text style={styles.pillLabel}>{language === "vi" ? "VI" : "EN"}</Text>
          </Pressable>
        ) : null}

        {showAvatar ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tài khoản"
            onPress={onPressAvatar}
            style={styles.avatar}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <Icon name="person" size={18} color={colors.onPrimary} />
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = themed((colors) => ({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexShrink: 0,
  },
  logo: { width: 32, height: 32, borderRadius: radius.sm },
  brandName: {
    fontSize: typography.headlineSm,
    fontWeight: "700",
    letterSpacing: -0.4,
    color: colors.primary,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexShrink: 1,
  },
  title: { fontSize: typography.labelLg, color: colors.text, flexShrink: 1 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    minHeight: 36,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  pillLabel: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.text,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    minHeight: 36,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  streakText: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.tertiary,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  pressed: { opacity: 0.8 },
}));
