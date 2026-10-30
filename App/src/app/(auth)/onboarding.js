import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "../../components/layout/AppHeader";
import { Button, Icon, Screen } from "../../components/ui";
import { colors, radius, spacing, typography } from "../../constants/theme";

const SLIDES = [
  {
    icon: "ondemand-video",
    title: "Học liệu đa phương tiện",
    message: "Video, PDF và Word giúp bạn học tiếng Anh sinh động hơn.",
  },
  {
    icon: "bolt",
    title: "Minigame từ vựng",
    message: "Ôn tập từ mới qua các câu đố trắc nghiệm nhanh và thú vị.",
  },
  {
    icon: "insights",
    title: "Theo dõi tiến độ",
    message: "Biết rõ bạn đã hoàn thành bao nhiêu phần trong mỗi chủ đề.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.replace("/(auth)/sign-in");
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <Screen padded={false}>
      <AppHeader showLanguage={false} showAvatar={false} />

      <View style={styles.body}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/(auth)/sign-in")}
          style={styles.skip}
          hitSlop={8}
        >
          <Text style={styles.skipText}>Bỏ qua</Text>
        </Pressable>

        <View style={styles.slide}>
          <View style={styles.iconBox}>
            <Icon name={slide.icon} size={48} color={colors.primary} />
          </View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.message}>{slide.message}</Text>
        </View>

        <View style={styles.dots}>
          {SLIDES.map((_, dotIndex) => (
            <View
              key={dotIndex}
              style={[styles.dot, dotIndex === index ? styles.dotActive : null]}
            />
          ))}
        </View>

        <Button
          label={isLast ? "Bắt đầu" : "Tiếp theo"}
          icon="arrow-forward"
          onPress={handleNext}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "space-between",
  },
  skip: {
    alignSelf: "flex-end",
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.primaryContainer,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  iconBox: {
    width: 120,
    height: 120,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryFixed,
  },
  title: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    textAlign: "center",
    color: colors.text,
  },
  message: {
    maxWidth: 320,
    fontSize: typography.bodyMd,
    lineHeight: 22,
    textAlign: "center",
    color: colors.textMuted,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
});
