import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { search } from "../api";
import { TopicCard } from "../components/TopicCard";
import {
  Button,
  EmptyState,
  HighlightedText,
  Icon,
  Screen,
  Skeleton,
} from "../components/ui";
import { colors, radius, spacing, typography } from "../constants/theme";
import { useAsync, useDebouncedValue } from "../hooks";
import { addRecentSearch } from "../utils";

const LEVELS = [
  { key: null, label: "Tất cả" },
  { key: "BEGINNER", label: "Beginner" },
  { key: "INTERMEDIATE", label: "Intermediate" },
  { key: "ADVANCED", label: "Advanced" },
];

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [q, setQ] = useState(params.q ?? "");
  const [level, setLevel] = useState(null);
  // Chi goi API sau khi nguoi dung ngung go 350ms.
  const query = useDebouncedValue(q.trim(), 350);
  const lastQueryRef = useRef("");

  const { data, loading, error, run } = useAsync(
    () =>
      query
        ? search({ q: query, level: level ?? undefined })
        : Promise.resolve(null),
    { deps: [query, level] },
  );

  // Roi man tim kiem => luu tu khoa cuoi cung vao lich su tim gan day.
  useEffect(() => {
    if (query) lastQueryRef.current = query;
  }, [query]);

  useEffect(
    () => () => {
      if (lastQueryRef.current) addRecentSearch(lastQueryRef.current);
    },
    [],
  );

  const topics = data?.topics ?? [];
  const lessons = data?.lessons ?? [];
  const hasQuery = Boolean(query);
  const hasFilter = Boolean(level);
  const noResults = topics.length === 0 && lessons.length === 0;

  const resetFilters = () => {
    setQ("");
    setLevel(null);
  };

  return (
    <Screen padded={false}>
      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color={colors.textMuted} />
          <TextInput
            accessibilityLabel="Tìm kiếm"
            style={styles.searchInput}
            placeholder="Tìm kiếm chủ đề, bài học..."
            placeholderTextColor={colors.outline}
            value={q}
            onChangeText={setQ}
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="search"
            autoFocus={!q}
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
        <Button
          variant="ghost"
          fullWidth={false}
          label="Hủy"
          onPress={() => router.back()}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Bo loc level cho ket qua */}
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
                accessibilityLabel={`Lọc ${item.label}`}
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

        {!hasQuery ? (
          <EmptyState
            icon="search"
            title="Tìm kiếm nội dung học"
            message="Nhập từ khóa để tìm chủ đề và bài học."
          />
        ) : null}

        {hasQuery && loading ? (
          <View style={styles.skeletons}>
            <Skeleton height={20} width="40%" />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </View>
        ) : null}

        {hasQuery && !loading && error ? (
          <View style={styles.stateBox}>
            <EmptyState
              icon="cloud-off"
              title="Không tìm được kết quả"
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

        {hasQuery && !loading && !error && noResults ? (
          <View style={styles.stateBox}>
            <EmptyState
              icon="search"
              title="Không tìm thấy kết quả"
              message={
                hasFilter
                  ? `Không có nội dung nào khớp với "${query}" ở cấp độ đã chọn.`
                  : `Không có nội dung nào khớp với "${query}".`
              }
            />
            {hasFilter ? (
              <Button
                label="Bỏ lọc cấp độ"
                variant="outline"
                icon="close"
                onPress={() => setLevel(null)}
              />
            ) : (
              <Button
                label="Xóa từ khóa"
                variant="outline"
                icon="close"
                onPress={resetFilters}
              />
            )}
          </View>
        ) : null}

        {hasQuery && !loading && !error && topics.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chủ đề ({topics.length})</Text>
            {topics.map((topic) => (
              <TopicCard
                key={topic.topicId}
                topic={topic}
                highlight={query}
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

        {hasQuery && !loading && !error && lessons.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bài học ({lessons.length})</Text>
            {lessons.map((lesson) => (
              <Pressable
                key={lesson.lessonId}
                accessibilityRole="button"
                onPress={() =>
                  router.push({
                    pathname: "/lesson/[id]",
                    params: { id: lesson.lessonId },
                  })
                }
                style={styles.lessonRow}
              >
                <Icon name="menu-book" size={20} color={colors.primary} />
                <HighlightedText
                  text={lesson.title}
                  keyword={query}
                  style={styles.lessonTitle}
                  numberOfLines={1}
                />
                <Icon name="chevron-right" size={20} color={colors.textMuted} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 44,
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
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
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
  skeletons: { gap: spacing.md },
  stateBox: { gap: spacing.md },
  section: { gap: spacing.md },
  sectionTitle: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 56,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  lessonTitle: {
    flex: 1,
    fontSize: typography.bodyLg,
    color: colors.text,
  },
});
