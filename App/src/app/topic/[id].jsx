import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "../../components/ui/Text";

import {
  enrollTopic,
  getTopic,
  getTopicProgress,
  listTopicLessons,
  unenrollTopic,
} from "../../api";
import { CommentSection } from "../../components/CommentSection";
import { LessonRow } from "../../components/LessonRow";
import {
  Button,
  EmptyState,
  Icon,
  LevelChip,
  ProgressBar,
  Screen,
  Skeleton,
} from "../../components/ui";
import { colors, radius, shadows, spacing, themed, typography } from "../../constants/theme";
import { useAsync } from "../../hooks";
import { formatPercent } from "../../utils";

export default function TopicDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [justEnrolled, setJustEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);

  const { data, loading, error, run } = useAsync(async () => {
    const [topic, lessons] = await Promise.all([
      getTopic(id),
      listTopicLessons(id),
    ]);

    // Backend chua implement GET /topics/{id}/progress — bo qua de khong chan man hinh.
    let progress = null;
    try {
      progress = await getTopicProgress(id);
    } catch {
      progress = null;
    }

    const lessonList = Array.isArray(lessons)
      ? lessons
      : lessons?.content ?? [];
    return { topic, lessons: lessonList, progress };
  }, { deps: [id] });

  const topic = data?.topic;
  const lessons = data?.lessons ?? [];
  const progress = data?.progress ?? topic;

  // `enrolled` lay tu server (topic.enrolled / progress.enrolled), ket hop
  // trang thai optimistic sau khi nguoi dung bam "Tham gia" hoac "Roi chu de".
  const enrolled = Boolean(topic?.enrolled ?? progress?.enrolled) || justEnrolled;
  const nextLesson = lessons.find((lesson) => !lesson.completed) ?? lessons[0];

  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollError(null);
    try {
      await enrollTopic(id);
      setJustEnrolled(true);
      run().catch(() => {});
    } catch (err) {
      if (err?.body?.error?.code === "ALREADY_ENROLLED") {
        setJustEnrolled(true);
      } else {
        setEnrollError(err?.message ?? "Không thể tham gia chủ đề. Vui lòng thử lại.");
      }
    } finally {
      setEnrolling(false);
    }
  };

  const handleLeave = async () => {
    setLeaving(true);
    setEnrollError(null);
    try {
      await unenrollTopic(id);
      setJustEnrolled(false);
      setConfirmLeave(false);
      run().catch(() => {});
    } catch (err) {
      setEnrollError(err?.message ?? "Không thể rời chủ đề. Vui lòng thử lại.");
    } finally {
      setLeaving(false);
    }
  };

  const openLesson = (lesson) =>
    router.push({ pathname: "/lesson/[id]", params: { id: lesson.lessonId } });

  return (
    <Screen padded={false}>
      {/* Thanh tieu de don gian voi nut quay lai */}
      <View style={styles.topBar}>
        <Button
          variant="ghost"
          icon="arrow-back"
          fullWidth={false}
          label="Quay lại"
          onPress={() => router.back()}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.skeletons}>
            <Skeleton height={120} />
            <Skeleton height={80} />
            <Skeleton height={56} />
            <Skeleton height={56} />
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.stateBox}>
            <EmptyState
              icon="cloud-off"
              title="Không tải được chủ đề"
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

        {!loading && !error && topic ? (
          <>
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <Text style={styles.title}>{topic.title}</Text>
                <LevelChip level={topic.level} />
              </View>
              {topic.description ? (
                <Text style={styles.description}>{topic.description}</Text>
              ) : null}
              {topic.teacherName ? (
                <View style={styles.teacherRow}>
                  <Icon name="person" size={16} color={colors.textMuted} />
                  <Text style={styles.teacher}>{topic.teacherName}</Text>
                </View>
              ) : null}
            </View>

            {/* Card tien do */}
            <View style={styles.progressCard}>
              <View style={styles.progressHead}>
                <Text style={styles.progressValue}>
                  {formatPercent(
                    progress?.progressPercent ?? topic.progressPercent,
                  )}
                </Text>
                <Text style={styles.progressMeta}>
                  {progress?.completedLessons ?? 0}/
                  {progress?.totalLessons ?? topic.lessonCount ?? 0} bài học
                </Text>
              </View>
              <ProgressBar
                value={progress?.progressPercent ?? topic.progressPercent}
                showLabel
              />
            </View>

            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Danh sách bài học</Text>
              <Text style={styles.sectionCount}>{lessons.length} bài</Text>
            </View>

            {lessons.length === 0 ? (
              <EmptyState
                icon="menu-book"
                title="Chưa có bài học"
                message="Chủ đề này chưa có bài học nào."
              />
            ) : (
              <View style={styles.lessonList}>
                {lessons.map((lesson, index) => (
                  <LessonRow
                    key={lesson.lessonId ?? index}
                    index={index}
                    lesson={lesson}
                    onPress={() => openLesson(lesson)}
                  />
                ))}
              </View>
            )}

            {enrolled ? (
              <View style={styles.joinedBox}>
                {nextLesson ? (
                  <Button
                    label={
                      lessons.some((lesson) => lesson.completed)
                        ? "Tiếp tục học"
                        : "Bắt đầu học"
                    }
                    icon="play-circle-outline"
                    onPress={() => openLesson(nextLesson)}
                  />
                ) : null}
                <View style={styles.joinedNote}>
                  <Icon name="check-circle" size={18} color={colors.secondary} />
                  <Text style={styles.joinedText}>Đã tham gia chủ đề</Text>
                </View>
                {confirmLeave ? (
                  <View style={styles.confirmRow}>
                    <Text style={styles.confirmText}>Rời chủ đề này?</Text>
                    <Button
                      label={leaving ? "Đang rời..." : "Rời"}
                      variant="outline"
                      fullWidth={false}
                      loading={leaving}
                      onPress={handleLeave}
                    />
                    <Button
                      label="Hủy"
                      variant="ghost"
                      fullWidth={false}
                      onPress={() => setConfirmLeave(false)}
                    />
                  </View>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Rời chủ đề"
                    hitSlop={8}
                    onPress={() => setConfirmLeave(true)}
                  >
                    <Text style={styles.leaveLink}>Rời chủ đề</Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <Button
                label={enrolling ? "Đang tham gia..." : "Tham gia chủ đề"}
                icon="add-circle-outline"
                loading={enrolling}
                onPress={handleEnroll}
              />
            )}

            {enrollError ? (
              <Text style={styles.enrollError}>{enrollError}</Text>
            ) : null}

            <CommentSection targetType="TOPIC" targetId={id} />
          </>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = themed((colors) => ({
  topBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  skeletons: { gap: spacing.md },
  stateBox: { gap: spacing.md },
  header: { gap: spacing.sm, paddingTop: spacing.xs },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: typography.bodyMd,
    lineHeight: 22,
    color: colors.textMuted,
  },
  teacherRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  teacher: {
    fontSize: typography.labelLg,
    color: colors.textMuted,
  },
  progressCard: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  progressHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  progressValue: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.secondary,
  },
  progressMeta: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  sectionCount: {
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
  lessonList: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  joinedNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  joinedBox: { gap: spacing.sm },
  confirmRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  confirmText: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  leaveLink: {
    textAlign: "center",
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.danger,
    paddingVertical: spacing.xs,
  },
  joinedText: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.secondary,
  },
  enrollError: {
    fontSize: typography.bodyMd,
    color: colors.danger,
  },
}));
