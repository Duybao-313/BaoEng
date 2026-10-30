import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getLesson, getLessonVocab } from "../../api";
import { CommentSection } from "../../components/CommentSection";
import {
  Button,
  EmptyState,
  Icon,
  Screen,
  Skeleton,
} from "../../components/ui";
import { colors, radius, shadows, spacing, typography } from "../../constants/theme";
import { useAsync } from "../../hooks";

const MATERIAL_TABS = [
  { key: "VIDEO", label: "Video", icon: "play-circle-outline" },
  { key: "PDF", label: "Tài liệu PDF", icon: "picture-as-pdf" },
  { key: "WORD", label: "Word", icon: "description" },
];

export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [materialTab, setMaterialTab] = useState("VIDEO");
  const [showVocab, setShowVocab] = useState(false);

  const { data, loading, error, run } = useAsync(async () => {
    const [lesson, vocab] = await Promise.all([
      getLesson(id),
      getLessonVocab(id),
    ]);
    const vocabList = Array.isArray(vocab)
      ? vocab
      : vocab?.content ?? [];
    return { lesson, vocab: vocabList };
  }, { deps: [id] });

  const lesson = data?.lesson;
  const vocab = data?.vocab ?? [];
  const materials = lesson?.materials ?? [];
  const activeMaterials = materials.filter((m) => m.type === materialTab);
  const publishedMinigame = (lesson?.minigames ?? []).find(
    (m) => m.status === "PUBLISHED",
  );

  const openMaterial = (url) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <Screen padded={false}>
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
            <Skeleton height={24} width="70%" />
            <Skeleton height={180} />
            <Skeleton height={100} />
            <Skeleton height={100} />
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.stateBox}>
            <EmptyState
              icon="cloud-off"
              title="Không tải được bài học"
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

        {!loading && !error && lesson ? (
          <>
            <Text style={styles.title}>{lesson.title}</Text>

            {/* Tab chuyen hoc lieu */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabs}
            >
              {MATERIAL_TABS.map((tab) => {
                const active = materialTab === tab.key;
                return (
                  <Pressable
                    key={tab.key}
                    accessibilityRole="button"
                    onPress={() => setMaterialTab(tab.key)}
                    style={[styles.tab, active ? styles.tabActive : null]}
                  >
                    <Icon
                      name={tab.icon}
                      size={18}
                      color={active ? colors.onPrimary : colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.tabLabel,
                        active ? styles.tabLabelActive : null,
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Vung player / hoc lieu */}
            {activeMaterials.length === 0 ? (
              <View style={styles.playerPlaceholder}>
                <Icon name="ondemand-video" size={40} color={colors.textMuted} />
                <Text style={styles.playerPlaceholderText}>
                  Chưa có học liệu {MATERIAL_TABS.find((t) => t.key === materialTab)?.label}
                </Text>
              </View>
            ) : (
              activeMaterials.map((material) => (
                <Pressable
                  key={material.materialId}
                  accessibilityRole="button"
                  onPress={() => openMaterial(material.fileUrl)}
                  style={styles.playerPlaceholder}
                >
                  <Icon
                    name={
                      materialTab === "VIDEO"
                        ? "play-circle-outline"
                        : materialTab === "PDF"
                          ? "picture-as-pdf"
                          : "description"
                    }
                    size={40}
                    color={colors.primary}
                  />
                  <Text style={styles.playerText}>
                    {material.type === "VIDEO"
                      ? "Mở video bài học"
                      : "Mở tài liệu bài học"}
                  </Text>
                </Pressable>
              ))
            )}

            {/* Card noi bat minigame */}
            {publishedMinigame ? (
              <View style={styles.minigameCard}>
                <View style={styles.minigameIcon}>
                  <Icon name="bolt" size={24} color={colors.onPrimary} />
                </View>
                <View style={styles.minigameBody}>
                  <Text style={styles.minigameTitle}>Ôn tập từ vựng</Text>
                  <Text style={styles.minigameSub}>
                    Kiểm tra vốn từ của bạn với trắc nghiệm nhanh.
                  </Text>
                </View>
                <Button
                  label="Bắt đầu"
                  icon="arrow-forward"
                  fullWidth={false}
                  onPress={() =>
                    router.push({
                      pathname: "/minigame/[id]",
                      params: {
                        id: publishedMinigame.minigameId,
                        lessonId: lesson.lessonId,
                      },
                    })
                  }
                />
              </View>
            ) : null}

            {/* Tu vung (thu gon) */}
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Từ vựng ({vocab.length})</Text>
              <Button
                label={showVocab ? "Thu gọn" : "Xem tất cả"}
                variant="ghost"
                fullWidth={false}
                icon={showVocab ? "expand-less" : "expand-more"}
                onPress={() => setShowVocab((prev) => !prev)}
              />
            </View>

            {showVocab ? (
              vocab.length === 0 ? (
                <EmptyState
                  icon="book"
                  title="Chưa có từ vựng"
                  message="Bài học này chưa có danh sách từ vựng."
                />
              ) : (
                <View style={styles.vocabList}>
                  {vocab.map((item) => (
                    <View key={item.vocabId} style={styles.vocabItem}>
                      <View style={styles.vocabHead}>
                        <Text style={styles.vocabWord}>{item.word}</Text>
                        {item.pronunciation ? (
                          <Text style={styles.vocabPronounce}>
                            {item.pronunciation}
                          </Text>
                        ) : null}
                      </View>
                      <Text style={styles.vocabMeaning}>{item.meaning}</Text>
                      {item.example ? (
                        <Text style={styles.vocabExample}>{item.example}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              )
            ) : null}

            <CommentSection targetType="LESSON" targetId={id} />
          </>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.text,
  },
  tabs: { gap: spacing.sm, paddingVertical: spacing.xs },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  tabLabel: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.textMuted,
  },
  tabLabelActive: { color: colors.onPrimary },
  playerPlaceholder: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLow,
    ...shadows.sm,
  },
  playerPlaceholderText: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  playerText: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.primary,
  },
  minigameCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.secondaryFixed,
  },
  minigameIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  minigameBody: { flex: 1, gap: 2 },
  minigameTitle: {
    fontSize: typography.headlineSm,
    fontWeight: "700",
    color: colors.onSecondaryFixed,
  },
  minigameSub: {
    fontSize: typography.bodyMd,
    color: colors.onSecondaryFixedVariant,
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
  vocabList: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  vocabItem: { gap: spacing.xs },
  vocabHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  vocabWord: {
    fontSize: typography.bodyLg,
    fontWeight: "700",
    color: colors.primary,
  },
  vocabPronounce: {
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
  vocabMeaning: {
    fontSize: typography.bodyMd,
    color: colors.text,
  },
  vocabExample: {
    fontSize: typography.bodyMd,
    fontStyle: "italic",
    color: colors.textMuted,
  },
});
