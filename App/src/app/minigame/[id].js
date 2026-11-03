import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getMinigame, submitMinigameAttempt } from "../../api";
import {
  Alert,
  Button,
  EmptyState,
  ProgressBar,
  Screen,
  Skeleton,
} from "../../components/ui";
import { colors, radius, shadows, spacing, typography } from "../../constants/theme";
import { formatDuration } from "../../utils";
import { useAsync } from "../../hooks";

const OPTION_KEYS = ["A", "B", "C", "D"];

export default function MinigameScreen() {
  const router = useRouter();
  const { id, lessonId } = useLocalSearchParams();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const { data, loading, error, run } = useAsync(() => getMinigame(id), {
    deps: [id],
  });

  const minigame = data;
  const questions = minigame?.questions ?? [];
  const question = questions[current];

  // Dong ho dem gio (chi de tham khao, khong chan thoi gian nop bai).
  useEffect(() => {
    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (questionId, key) => {
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    if (questions.length === 0) return;

    const unanswered = questions.filter((q) => !answers[q.questionId]);
    if (unanswered.length > 0) {
      setSubmitError("Vui lòng trả lời tất cả câu hỏi trước khi nộp bài.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitMinigameAttempt(
        id,
        questions.map((q) => ({
          questionId: q.questionId,
          selectedKey: answers[q.questionId],
        })),
      );

      router.replace({
        pathname: "/minigame/result",
        params: {
          minigameId: String(id),
          ...(lessonId ? { lessonId: String(lessonId) } : null),
          title: minigame?.title ?? "Kết quả Minigame",
          score: String(result.score ?? 0),
          totalQuestions: String(result.totalQuestions ?? questions.length),
          correctAnswers: String(result.correctAnswers ?? 0),
          isPassed: String(result.isPassed ?? false),
          lessonCompleted: String(result.lessonCompleted ?? false),
          topicProgressPercent: String(result.topicProgressPercent ?? 0),
        },
      });
    } catch (err) {
      setSubmitError(err?.message ?? "Không nộp được bài làm. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = questions.filter((q) => answers[q.questionId]).length;

  return (
    <Screen padded={false}>
      <View style={styles.topBar}>
        <Button
          variant="ghost"
          icon="arrow-back"
          fullWidth={false}
          label="Thoát"
          onPress={() => router.back()}
        />
        <Text style={styles.timer}>{formatDuration(seconds)}</Text>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <Skeleton height={24} width="60%" />
          <Skeleton height={120} />
          <Skeleton height={56} />
          <Skeleton height={56} />
        </View>
      ) : null}

      {!loading && error ? (
        <View style={styles.stateBox}>
          <EmptyState
            icon="cloud-off"
            title="Không tải được minigame"
            message={error?.message ?? "Vui lòng thử lại sau."}
          />
          <Button
            label="Thử lại"
            variant="outline"
            icon="refresh"
            onPress={() => run().catch(() => {})}
          />
        </View>
      ) : null}

      {!loading && !error && minigame ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{minigame.title}</Text>

          {/* Tien do cau hoi */}
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              Câu {current + 1}/{questions.length}
            </Text>
            <View style={styles.progressTrack}>
              <ProgressBar value={(answeredCount / questions.length) * 100} />
            </View>
          </View>

          {question ? (
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>
                {question.questionText ?? question.payload?.questionText ?? "Câu hỏi"}
              </Text>

              <View style={styles.options}>
                {(question.options ?? question.payload?.options ?? []).map((option, index) => {
                  const selected =
                    answers[question.questionId] === option.key;
                  return (
                    <Pressable
                      key={option.key ?? index}
                      accessibilityRole="button"
                      onPress={() => handleSelect(question.questionId, option.key)}
                      style={[
                        styles.option,
                        selected ? styles.optionSelected : null,
                      ]}
                    >
                      <View
                        style={[
                          styles.optionKey,
                          selected ? styles.optionKeySelected : null,
                        ]}
                      >
                        <Text
                          style={[
                            styles.optionKeyText,
                            selected ? styles.optionKeyTextSelected : null,
                          ]}
                        >
                          {OPTION_KEYS[index] ?? option.key}
                        </Text>
                      </View>
                      <Text style={styles.optionText}>{option.text}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          <Alert title="Không thể nộp bài" message={submitError} />

          <View style={styles.navRow}>
            <Button
              label="Câu trước"
              variant="outline"
              icon="arrow-back"
              fullWidth={false}
              disabled={current === 0}
              onPress={() => setCurrent((prev) => Math.max(0, prev - 1))}
            />
            {current < questions.length - 1 ? (
              <Button
                label="Câu sau"
                icon="arrow-forward"
                fullWidth={false}
                onPress={() =>
                  setCurrent((prev) => Math.min(questions.length - 1, prev + 1))
                }
              />
            ) : (
              <Button
                label={submitting ? "Đang nộp bài..." : "Nộp bài"}
                icon="send"
                fullWidth={false}
                loading={submitting}
                onPress={handleSubmit}
              />
            )}
          </View>
        </ScrollView>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  timer: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.textMuted,
  },
  loading: {
    gap: spacing.md,
    padding: spacing.md,
  },
  stateBox: {
    gap: spacing.md,
    padding: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  title: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.text,
  },
  progressRow: { gap: spacing.xs },
  progressText: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.textMuted,
  },
  progressTrack: { width: "100%" },
  questionCard: {
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  questionText: {
    fontSize: typography.headlineSm,
    fontWeight: "600",
    lineHeight: 26,
    color: colors.text,
  },
  options: { gap: spacing.md },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 56,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryFixed,
  },
  optionKey: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerHigh,
  },
  optionKeySelected: {
    backgroundColor: colors.primary,
  },
  optionKeyText: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.text,
  },
  optionKeyTextSelected: { color: colors.onPrimary },
  optionText: {
    flex: 1,
    fontSize: typography.bodyMd,
    color: colors.text,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
