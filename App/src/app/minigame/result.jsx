import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../../components/ui/Text";

import { getLesson, listTopicLessons } from "../../api";
import { Button, Icon, Screen } from "../../components/ui";
import { colors, radius, shadows, spacing, themed, typography } from "../../constants/theme";

export default function MinigameResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const minigameId = params.minigameId;
  const lessonId = params.lessonId;
  const title = params.title ?? "Kết quả Minigame";
  const score = Number(params.score ?? 0);
  const totalQuestions = Number(params.totalQuestions ?? 0);
  const correctAnswers = Number(params.correctAnswers ?? 0);
  const isPassed = params.isPassed === "true";
  const lessonCompleted = params.lessonCompleted === "true";
  const topicProgressPercent = Number(params.topicProgressPercent ?? 0);

  const [nextLesson, setNextLesson] = useState(null);
  const [loadingNext, setLoadingNext] = useState(Boolean(lessonId));

  // Xac dinh bai ke tiep trong cung chu de: bai chua hoan thanh ngay sau bai hien tai.
  useEffect(() => {
    if (!lessonId) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const current = await getLesson(lessonId);
        const lessons = await listTopicLessons(current.topicId);
        const list = (Array.isArray(lessons) ? lessons : lessons?.content ?? [])
          .filter((item) => item.lessonId !== Number(lessonId))
          .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
        const currentOrder = current.orderIndex ?? 0;
        const after = list.filter((item) => (item.orderIndex ?? 0) > currentOrder);
        const next = after.find((item) => !item.completed) ?? after[0] ?? null;
        if (!cancelled) setNextLesson(next);
      } catch {
        // Khong lay duoc bai ke tiep => quay lai bai hien tai.
      } finally {
        if (!cancelled) setLoadingNext(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const handleRetry = () => {
    router.replace({
      pathname: "/minigame/[id]",
      params: { id: String(minigameId), ...(lessonId ? { lessonId: String(lessonId) } : null) },
    });
  };

  const handleNext = () => {
    const targetId = nextLesson?.lessonId ?? lessonId;
    if (targetId) {
      router.replace({
        pathname: "/lesson/[id]",
        params: { id: String(targetId) },
      });
    } else {
      router.replace("/");
    }
  };

  return (
    <Screen padded>
      <View style={styles.wrap}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View
          style={[
            styles.scoreCircle,
            { borderColor: isPassed ? colors.secondaryFixed : colors.errorContainer },
          ]}
        >
          <Text style={styles.scoreValue}>{Math.round(score)}</Text>
          <Text style={styles.scoreUnit}>điểm</Text>
        </View>

        <Text style={styles.correctText}>
          {correctAnswers}/{totalQuestions} câu đúng
        </Text>

        <View
          style={[
            styles.badge,
            isPassed ? styles.badgePassed : styles.badgeFailed,
          ]}
        >
          <Icon
            name={isPassed ? "check-circle" : "cancel"}
            size={18}
            color={isPassed ? colors.onSecondaryFixed : colors.onErrorContainer}
          />
          <Text
            style={[
              styles.badgeText,
              isPassed ? styles.badgeTextPassed : styles.badgeTextFailed,
            ]}
          >
            {isPassed ? "Đạt" : "Chưa đạt"}
          </Text>
        </View>

        {lessonCompleted ? (
          <View style={styles.note}>
            <Icon name="emoji-events" size={18} color={colors.secondary} />
            <Text style={styles.noteText}>
              Bài học đã hoàn thành — Tiến độ chủ đề: {Math.round(topicProgressPercent)}%
            </Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <Button
            label="Làm lại"
            variant="outline"
            icon="refresh"
            onPress={handleRetry}
          />
          <Button
            label={
              nextLesson
                ? "Bài tiếp theo"
                : lessonId
                  ? "Quay lại bài học"
                  : "Về trang chủ"
            }
            icon="arrow-forward"
            loading={loadingNext}
            onPress={handleNext}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = themed((colors) => ({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  title: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    textAlign: "center",
    color: colors.text,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.primary,
  },
  scoreUnit: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  correctText: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  badgePassed: { backgroundColor: colors.secondaryFixed },
  badgeFailed: { backgroundColor: colors.errorContainer },
  badgeText: {
    fontSize: typography.labelLg,
    fontWeight: "700",
  },
  badgeTextPassed: { color: colors.onSecondaryFixed },
  badgeTextFailed: { color: colors.onErrorContainer },
  note: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLow,
  },
  noteText: {
    flex: 1,
    fontSize: typography.bodyMd,
    color: colors.text,
  },
  actions: {
    width: "100%",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
}));
