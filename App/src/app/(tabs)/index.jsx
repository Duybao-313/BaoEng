import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Pressable, RefreshControl, ScrollView, TextInput, View } from "react-native";
import { Text } from "../../components/ui/Text";

import { AppHeader } from "../../components/layout/AppHeader";
import { Icon, Screen } from "../../components/ui";
import { colors, radius, spacing, themed, typography } from "../../constants/theme";
import {
  FeaturedTopicsSection,
  RecommendedTopicsSection,
  TodayProgressCard,
  useFeaturedTopics,
  useRecentSearches,
  useRecommendedTopics,
  useTodayProgress,
} from "../../features/home";
import { useDebouncedValue } from "../../hooks";

const LEVELS = [
  { key: null, label: "Tất cả" },
  { key: "BEGINNER", label: "Beginner" },
  { key: "INTERMEDIATE", label: "Intermediate" },
  { key: "ADVANCED", label: "Advanced" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [level, setLevel] = useState(null);
  const [q, setQ] = useState("");
  // Chi goi API sau khi nguoi dung ngung go 350ms.
  const query = useDebouncedValue(q.trim(), 350);
  const hasFilter = Boolean(query) || level !== null;

  const todayProgress = useTodayProgress();
  const recentSearches = useRecentSearches();
  const recommended = useRecommendedTopics(6);
  const featured = useFeaturedTopics({ level, query, limit: 10 });
  const [refreshing, setRefreshing] = useState(false);
  const reloadToday = todayProgress.reload;
  const reloadRecommended = recommended.reload;
  const reloadFeatured = featured.reload;
  const isFirstFocus = useRef(true);

  // Quay lai Trang chu sau khi hoc xong => cap nhat lai cac khoi du lieu.
  // Lan focus dau tien bo qua vi cac hook da tu tai khi mount.
  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }
      reloadToday();
      reloadRecommended();
      reloadFeatured();
    }, [reloadToday, reloadRecommended, reloadFeatured]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.allSettled([reloadToday(), reloadRecommended(), reloadFeatured()]);
    setRefreshing(false);
  }, [reloadToday, reloadRecommended, reloadFeatured]);

  const openTopic = useCallback(
    (topic) =>
      router.push({ pathname: "/topic/[id]", params: { id: topic.topicId } }),
    [router],
  );

  const resetFilters = () => {
    setQ("");
    setLevel(null);
  };

  /** Mo man tim kiem day du (chu de + bai hoc) va luu tu khoa vao lich su. */
  const openFullSearch = (keyword) => {
    const value = String(keyword ?? "").trim();
    if (!value) return;
    recentSearches.remember(value);
    router.push({ pathname: "/search", params: { q: value } });
  };

  return (
    <Screen padded={false}>
      <AppHeader
        title="Trang chủ"
        onPressAvatar={() => router.push("/(tabs)/profile")}
        onPressSearch={() => router.push("/search")}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.intro}>
          <Text style={styles.heading}>Khám phá chủ đề</Text>
          <Text style={styles.subheading}>
            Chọn chủ đề bạn yêu thích và bắt đầu học ngay hôm nay.
          </Text>
        </View>

        {/* Khoi 1: Tien do hom nay */}
        <TodayProgressCard
          loading={todayProgress.loading}
          error={todayProgress.error}
          onRetry={todayProgress.reload}
          minutes={todayProgress.minutes}
          goalMinutes={todayProgress.goalMinutes}
          goalPercent={todayProgress.goalPercent}
          remainingMinutes={todayProgress.remainingMinutes}
          streakDays={todayProgress.streakDays}
          lessonsCompletedToday={todayProgress.lessonsCompletedToday}
          studiedToday={todayProgress.studiedToday}
          currentTopicId={todayProgress.currentTopicId}
          currentTopicTitle={todayProgress.currentTopicTitle}
          currentTopicProgressPercent={todayProgress.currentTopicProgressPercent}
          onContinueLearning={(topicId) =>
            router.push({ pathname: "/topic/[id]", params: { id: topicId } })
          }
        />

        {/* O tim kiem chu de */}
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color={colors.textMuted} />
          <TextInput
            accessibilityLabel="Tìm kiếm chủ đề"
            style={styles.searchInput}
            placeholder="Tìm kiếm chủ đề..."
            placeholderTextColor={colors.outline}
            value={q}
            onChangeText={setQ}
            onSubmitEditing={() => openFullSearch(q)}
            returnKeyType="search"
            autoCorrect={false}
          />
          {q ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Xóa tìm kiếm"
              hitSlop={8}
              onPress={() => setQ("")}
            >
              <Icon name="close" size={18} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>

        {/* Tim kiem gan day */}
        {!q && recentSearches.items.length > 0 ? (
          <View style={styles.recentWrap}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Tìm gần đây</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Xóa lịch sử tìm kiếm"
                hitSlop={8}
                onPress={() => recentSearches.clear()}
              >
                <Text style={styles.recentClear}>Xóa</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              {recentSearches.items.map((keyword) => (
                <Pressable
                  key={keyword}
                  accessibilityRole="button"
                  accessibilityLabel={`Tìm lại ${keyword}`}
                  onPress={() => setQ(keyword)}
                  style={styles.recentChip}
                >
                  <Icon name="history" size={16} color={colors.textMuted} />
                  <Text style={styles.recentChipLabel} numberOfLines={1}>
                    {keyword}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {/* Bo loc level */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {LEVELS.map((item) => {
            const active = level === item.key;
            return (
              <Pressable
                key={item.key ?? "all"}
                accessibilityRole="button"
                onPress={() => setLevel(item.key)}
                style={[styles.chip, active ? styles.chipActive : null]}
              >
                <Text
                  style={[
                    styles.chipLabel,
                    active ? styles.chipLabelActive : null,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Khoi 3: Chu de de xuat cho ban */}
        {!hasFilter ? (
          <RecommendedTopicsSection
            topics={recommended.topics}
            loading={recommended.loading}
            error={recommended.error}
            onRetry={recommended.reload}
            onPressTopic={openTopic}
          />
        ) : null}

        {/* Khoi 4: Tat ca chu de noi bat (hoac ket qua tim kiem) */}
        <FeaturedTopicsSection
          topics={featured.topics}
          loading={featured.loading}
          error={featured.error}
          filtered={hasFilter}
          query={query}
          onRetry={featured.reload}
          onResetFilters={resetFilters}
          onPressTopic={openTopic}
          onOpenFullSearch={openFullSearch}
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
  intro: { gap: spacing.xs, paddingTop: spacing.md },
  heading: {
    fontSize: typography.headlineLgMobile,
    fontWeight: "700",
    color: colors.text,
  },
  subheading: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.bodyMd,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  chips: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  recentWrap: { gap: spacing.xs },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recentTitle: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.textMuted,
  },
  recentClear: {
    fontSize: typography.labelSm,
    fontWeight: "700",
    color: colors.primary,
  },
  recentChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    maxWidth: 200,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  recentChipLabel: {
    fontSize: typography.labelLg,
    color: colors.text,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  chipLabel: {
    fontSize: typography.labelLg,
    fontWeight: "600",
    color: colors.text,
  },
  chipLabelActive: { color: colors.onPrimary },
}));
