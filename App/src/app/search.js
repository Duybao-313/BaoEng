import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
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
  Icon,
  Screen,
  Skeleton,
} from "../components/ui";
import { colors, radius, spacing, typography } from "../constants/theme";
import { useAsync } from "../hooks";

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [q, setQ] = useState(params.q ?? "");
  const [query, setQuery] = useState(params.q ?? "");

  const { data, loading, error, run } = useAsync(
    () => (query.trim() ? search({ q: query.trim() }) : Promise.resolve(null)),
    { deps: [query] },
  );

  const topics = data?.topics ?? [];
  const lessons = data?.lessons ?? [];
  const hasQuery = Boolean(query.trim());

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
            onSubmitEditing={() => setQuery(q.trim())}
            returnKeyType="search"
            autoFocus={!q}
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

        {hasQuery &&
        !loading &&
        !error &&
        topics.length === 0 &&
        lessons.length === 0 ? (
          <EmptyState
            icon="search-off"
            title="Không tìm thấy kết quả"
            message={`Không có nội dung nào khớp với "${query}".`}
          />
        ) : null}

        {hasQuery && !loading && !error && topics.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chủ đề ({topics.length})</Text>
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
                <Text style={styles.lessonTitle} numberOfLines={1}>
                  {lesson.title}
                </Text>
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
