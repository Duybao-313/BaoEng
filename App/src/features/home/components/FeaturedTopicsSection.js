import { StyleSheet, Text, View } from "react-native";

import { TopicCard } from "../../../components/TopicCard";
import { Button, EmptyState, Skeleton } from "../../../components/ui";
import { colors, spacing, typography } from "../../../constants/theme";

/**
 * Khoi "Tat ca chu de noi bat": danh sach doc cac TopicCard day du.
 * Khi nguoi dung dang tim kiem/loc thi tieu de doi thanh so ket qua.
 */
export function FeaturedTopicsSection({
  topics = [],
  loading = false,
  error = null,
  filtered = false,
  query = "",
  onRetry,
  onResetFilters,
  onPressTopic,
  onOpenFullSearch,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        {filtered ? `${topics.length} chủ đề phù hợp` : "Tất cả chủ đề nổi bật"}
      </Text>

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
          {onRetry ? (
            <Button
              label="Thử lại"
              variant="outline"
              icon="refresh"
              onPress={onRetry}
            />
          ) : null}
        </View>
      ) : null}

      {!loading && !error && topics.length === 0 ? (
        <View style={styles.stateBox}>
          <EmptyState
            icon={filtered ? "search" : "school"}
            title={filtered ? "Không tìm thấy chủ đề" : "Chưa có chủ đề nào"}
            message={
              filtered
                ? "Thử từ khóa khác hoặc bỏ bớt bộ lọc để xem toàn bộ chủ đề."
                : "Hãy quay lại sau khi giáo viên đăng tải nội dung mới nhé."
            }
          />
          {filtered && onResetFilters ? (
            <Button
              label="Xóa bộ lọc"
              variant="outline"
              icon="close"
              onPress={onResetFilters}
            />
          ) : null}
        </View>
      ) : null}

      {!loading && !error && topics.length > 0 ? (
        <View style={styles.list}>
          {topics.map((topic) => (
            <TopicCard
              key={topic.topicId}
              topic={topic}
              onPress={() => onPressTopic?.(topic)}
            />
          ))}
        </View>
      ) : null}

      {!loading && !error && filtered && query ? (
        <Button
          label={`Xem tất cả kết quả cho "${query}"`}
          variant="outline"
          icon="search"
          onPress={() => onOpenFullSearch?.(query)}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  title: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  list: { gap: spacing.md },
  skeletonCard: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  stateBox: { gap: spacing.md },
});
