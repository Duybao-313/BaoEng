import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "../components/ui/Text";

import { AppHeader } from "../components/layout/AppHeader";
import { Card, Icon, Screen } from "../components/ui";
import {
  BACKGROUND_GRADIENT,
  colors,
  radius,
  spacing,
  themed,
  typography,
} from "../constants/theme";
import { useSettings } from "../providers";

const LANGUAGES = [
  { key: "vi", label: "Tiếng Việt", hint: "VI" },
  { key: "en", label: "Tiếng Anh", hint: "EN" },
];

const THEMES = [
  {
    key: "light",
    label: "Mặc định",
    icon: "light-mode",
    swatches: ["#FAF8FF", "#FFFFFF", "#004AC6"],
  },
  {
    key: "dark",
    label: "Tối",
    icon: "dark-mode",
    swatches: ["#0B0F16", "#141A24", "#B4C5FF"],
  },
  {
    key: "gradient",
    label: "Gradient",
    icon: "gradient",
    swatches: ["#DCE7FF", "#F3E6FF", "#DFF7EC"],
  },
];

/**
 * Cai dat toan app: ngon ngu (VI/EN) va giao dien mau (mac dinh / toi / gradient).
 */
export default function SettingsScreen() {
  const { language, setLanguage, themeMode, setThemeMode, t } = useSettings();
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <Screen padded={false}>
      <AppHeader title="Cài đặt" showAvatar={false} showSettings={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("Quay lại")}
          onPress={handleBack}
          style={({ pressed }) => [styles.backRow, pressed ? styles.pressed : null]}
        >
          <Icon name="arrow-back" size={18} color={colors.primary} />
          <Text style={styles.backText}>Quay lại</Text>
        </Pressable>

        <View style={styles.intro}>
          <Text style={styles.introTitle}>Cài đặt</Text>
          <Text style={styles.introText}>
            Tuỳ chỉnh ngôn ngữ và màu giao diện cho toàn bộ ứng dụng.
          </Text>
        </View>

        <Card title="Ngôn ngữ">
          <Text style={styles.hint}>
            Chọn ngôn ngữ hiển thị cho toàn bộ ứng dụng.
          </Text>
          <View style={styles.optionList}>
            {LANGUAGES.map((item) => {
              const selected = language === item.key;
              return (
                <Pressable
                  key={item.key}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={t(item.label)}
                  onPress={() => setLanguage(item.key)}
                  style={({ pressed }) => [
                    styles.optionRow,
                    selected ? styles.optionRowSelected : null,
                    pressed ? styles.pressed : null,
                  ]}
                >
                  <View style={styles.optionLeft}>
                    <View
                      style={[
                        styles.badge,
                        selected ? styles.badgeSelected : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          selected ? styles.badgeTextSelected : null,
                        ]}
                      >
                        {item.hint}
                      </Text>
                    </View>
                    <Text style={styles.optionLabel}>{item.label}</Text>
                  </View>
                  <Icon
                    name={selected ? "radio-button-checked" : "radio-button-off"}
                    size={20}
                    color={selected ? colors.primary : colors.outline}
                  />
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card title="Giao diện">
          <Text style={styles.hint}>Chọn màu giao diện cho toàn bộ ứng dụng.</Text>
          <View style={styles.themeList}>
            {THEMES.map((item) => {
              const selected = themeMode === item.key;
              return (
                <Pressable
                  key={item.key}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={t(item.label)}
                  onPress={() => setThemeMode(item.key)}
                  style={({ pressed }) => [
                    styles.themeCard,
                    selected ? styles.themeCardSelected : null,
                    pressed ? styles.pressed : null,
                  ]}
                >
                  <View style={styles.preview}>
                    {item.key === "gradient" ? (
                      <LinearGradient
                        colors={BACKGROUND_GRADIENT}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.previewFill}
                      >
                        <View style={styles.previewCard} />
                      </LinearGradient>
                    ) : (
                      <View
                        style={[
                          styles.previewFill,
                          { backgroundColor: item.swatches[0] },
                        ]}
                      >
                        <View
                          style={[
                            styles.previewCard,
                            { backgroundColor: item.swatches[1] },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                  <View style={styles.themeFooter}>
                    <Icon
                      name={item.icon}
                      size={16}
                      color={selected ? colors.primary : colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.themeLabel,
                        selected ? styles.themeLabelSelected : null,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {selected ? (
                      <Icon name="check-circle" size={16} color={colors.primary} />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card title="Xem trước">
          <Text style={styles.previewText}>Học tiếng Anh mỗi ngày</Text>
          <Text style={styles.previewSub}>
            Minigame từ vựng • Theo dõi tiến độ • Học liệu đa phương tiện
          </Text>
        </Card>
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
  intro: { gap: spacing.xs, paddingTop: spacing.sm },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  backText: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.primary,
  },
  introTitle: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.text,
  },
  introText: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  hint: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  optionList: { gap: spacing.sm },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceContainerLow,
  },
  optionRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  badge: {
    minWidth: 34,
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    borderRadius: radius.sm,
    alignItems: "center",
    backgroundColor: colors.surfaceContainerHigh,
  },
  badgeSelected: { backgroundColor: colors.primary },
  badgeText: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.textMuted,
  },
  badgeTextSelected: { color: colors.onPrimary },
  optionLabel: {
    fontSize: typography.bodyLg,
    fontWeight: "600",
    color: colors.text,
  },
  themeList: { flexDirection: "row", gap: spacing.sm },
  themeCard: {
    flex: 1,
    gap: spacing.xs,
    padding: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  themeCardSelected: { borderColor: colors.primary },
  preview: {
    height: 64,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  previewFill: {
    flex: 1,
    padding: spacing.xs,
    justifyContent: "center",
  },
  previewCard: {
    height: 18,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  themeFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  themeLabel: {
    flex: 1,
    fontSize: typography.labelSm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  themeLabelSelected: { color: colors.primary },
  previewText: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
  },
  previewSub: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  pressed: { opacity: 0.85 },
}));
