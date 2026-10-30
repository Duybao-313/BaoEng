import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { listTopics } from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import { TopicCard } from "../../components/TopicCard";
import {
  Button,
  EmptyState,
  Icon,
  Screen,
  Skeleton,
} from "../../components/ui";
import { colors, radius, spacing, typography } from "../../constants/theme";
import { useAsync } from "../../hooks";

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
  const [query, setQuery] = useState("");

  const { data, loading, error, run } = useAsync(
    () => listTopics({ level: level ?? undefined, q: query || undefined }),
    { deps: [level, query] },
  );

  const topics = data?.content ?? [];

  return (
    <Screen padded={false}>
      <AppHeader
        title="Trang chủ"
        onPressAvatar={() => router.push("/(tabs)/profile")}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.heading}>Khám phá chủ đề</Text>
          <Text style={styles.subheading}>
            Chọn chủ đề bạn yêu thích và bắt đầu học ngay hôm nay.
          </Text>
        </View>

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
            onSubmitEditing={() => setQuery(q.trim())}
            returnKeyType="search"
            autoCorrect={false}
          />
          {q ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Xóa tìm kiếm"
              hitSlop={8}
              onPress={() => {
                setQ("");
                setQuery("");
              }}
            >
              <Icon name="close" size={18} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>

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

        {loading ? (
          <View style={styles.list}>
            {[0, 1, 2].map((item) => (
              <View key={item} style={styles.skeletonCard}>
                <Skeleton height={20} width="60%" />
                <Skeleton height={14} />
                <Skeleton height={14} width="80%" />
                <Skeleton height={8} />
              </View>
            ))}
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.stateBox}>
            <EmptyState
              icon="cloud-off"
              title="Không tải được chủ đề"
              message={error?.message ?? "Vui lòng kiểm tra kết nối mạng."}
            />
            <Button
              label="Thử lại"
              variant="outline"
              icon="refresh"
              onPress={() => run().catch(() => {})}
            />
          </View>
        ) : null}

        {!loading && !error && topics.length === 0 ? (
          <EmptyState
            icon="school"
            title="Chưa có chủ đề nào"
            message="Hãy quay lại sau khi giáo viên đăng tải nội dung mới nhé."
          />
        ) : null}

        {!loading && !error && topics.length > 0 ? (
          <View style={styles.list}>
            {topics.map((topic) => (
              <TopicCard
                key={topic.topicId}
                topic={topic}
                onPress={() =>
                  router.push({
                    pathname: "/topic/[id]",
                    params: { id: topic.topicId },
                  })
                }
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  list: { gap: spacing.md },
  skeletonCard: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  stateBox: { gap: spacing.md },
});
