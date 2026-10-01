import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../constants/theme";
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
 *   onPressAvatar?: () => void,
 * }} props
 */
export function AppHeader({
  title,
  showLanguage = true,
  showAvatar = true,
  onPressAvatar,
}) {
  // TODO: noi vao i18n that su khi bo sung da ngon ngu.
  const [language, setLanguage] = useState("VN");

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

        {showLanguage ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Đổi ngôn ngữ"
            onPress={() => setLanguage((prev) => (prev === "VN" ? "EN" : "VN"))}
            style={({ pressed }) => [
              styles.pill,
              pressed ? styles.pressed : null,
            ]}
          >
            <Icon name="language" size={18} color={colors.primary} />
            <Text style={styles.pillLabel}>{language}</Text>
          </Pressable>
        ) : null}

        {showAvatar ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tài khoản"
            onPress={onPressAvatar}
            style={styles.avatar}
          >
            <Icon name="person" size={18} color={colors.onPrimary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  avatar: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  pressed: { opacity: 0.8 },
});
