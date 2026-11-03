import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, View } from "react-native";
import { Text } from "../../components/ui/Text";

import {
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../api";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  Alert,
  Button,
  EmptyState,
  Icon,
  Screen,
  Skeleton,
} from "../../components/ui";
import { colors, radius, shadows, spacing, themed, typography } from "../../constants/theme";
import { useAsync } from "../../hooks";
import { formatDateTime } from "../../utils";

const TYPE_ICONS = {
  COMMENT_REPLY: "forum",
};

/**
 * Thong bao cua nguoi hoc (vi du giao vien tra loi binh luan).
 * Bam vao thong bao => danh dau da doc + mo dung chu de/bai hoc lien quan.
 */
export default function NotificationsScreen() {
  const router = useRouter();
  const { data, loading, error, run } = useAsync(listNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const [actionError, setActionError] = useState(null);

  const items = Array.isArray(data) ? data : [];
  const unreadCount = items.filter((item) => !item.isRead).length;

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await run();
      setActionError(null);
    } catch (err) {
      setActionError(err?.message ?? "Không tải được thông báo.");
    } finally {
      setRefreshing(false);
    }
  }, [run]);

  const openTarget = (item) => {
    if (item.referenceType === "TOPIC" && item.referenceId) {
      router.push(`/topic/${item.referenceId}`);
    } else if (item.referenceType === "LESSON" && item.referenceId) {
      router.push({
        pathname: "/lesson/[id]",
        params: { id: String(item.referenceId) },
      });
    }
  };

  const handlePressItem = async (item) => {
    setActionError(null);
    if (!item.isRead) {
      try {
        await markNotificationRead(item.notificationId);
        await run();
      } catch (err) {
        setActionError(err?.message ?? "Không cập nhật được thông báo.");
        return;
      }
    }
    openTarget(item);
  };

  const handleMarkAll = async () => {
    setMarkingAll(true);
    setActionError(null);
    try {
      await markAllNotificationsRead();
      await run();
    } catch (err) {
      setActionError(err?.message ?? "Không đánh dấu được thông báo.");
    } finally {
      setMarkingAll(false);
    }
  };

  return (
    <Screen padded={false}>
      <AppHeader title="Thông báo" showAvatar={false} />

      {actionError ? (
        <View style={styles.alertWrap}>
          <Alert title="Lỗi" message={actionError} />
        </View>
      ) : null}

      {!loading && unreadCount > 0 ? (
        <View style={styles.toolbar}>
          <Text style={styles.unreadLabel}>
            {unreadCount} thông báo chưa đọc
          </Text>
          <Button
            label={markingAll ? "Đang xử lý..." : "Đọc tất cả"}
            variant="ghost"
            fullWidth={false}
            icon="done-all"
            loading={markingAll}
            onPress={handleMarkAll}
          />
        </View>
      ) : null}

      {loading ? (
        <View style={styles.skeletonWrap}>
          {[0, 1, 2].map((key) => (
            <Skeleton key={key} height={76} style={styles.skeletonItem} />
          ))}
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.notificationId)}
          contentContainerStyle={
            items.length === 0 ? styles.emptyContent : styles.listContent
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${item.title}. ${item.message}`}
              onPress={() => handlePressItem(item)}
              style={({ pressed }) => [
                styles.item,
                item.isRead ? styles.itemRead : styles.itemUnread,
                pressed ? styles.pressed : null,
              ]}
            >
              <View
                style={[
                  styles.iconBox,
                  item.isRead ? null : styles.iconBoxUnread,
                ]}
              >
                <Icon
                  name={TYPE_ICONS[item.type] ?? "notifications"}
                  size={20}
                  color={item.isRead ? colors.textMuted : colors.primary}
                />
              </View>
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.itemMessage} numberOfLines={3}>
                  {item.message}
                </Text>
                <Text style={styles.itemTime}>
                  {formatDateTime(item.createdAt)}
                </Text>
              </View>
              {item.isRead ? null : <View style={styles.dot} />}
            </Pressable>
          )}
          ListEmptyComponent={
            <EmptyState
              icon="notifications-none"
              title="Chưa có thông báo nào"
              message="Khi giáo viên trả lời câu hỏi của bạn, thông báo sẽ xuất hiện tại đây."
            />
          }
          ListFooterComponent={
            error ? (
              <View style={styles.errorWrap}>
                <Alert title="Không tải được thông báo" message={error.message} />
                <Button
                  label="Thử lại"
                  icon="refresh"
                  variant="outline"
                  onPress={handleRefresh}
                />
              </View>
            ) : null
          }
        />
      )}
    </Screen>
  );
}

const styles = themed((colors) => ({
  alertWrap: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  unreadLabel: {
    fontSize: typography.labelMd,
    fontWeight: "600",
    color: colors.textMuted,
  },
  listContent: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  emptyContent: { flexGrow: 1, justifyContent: "center", padding: spacing.lg },
  skeletonWrap: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  skeletonItem: { borderRadius: radius.lg },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    ...shadows.sm,
  },
  itemUnread: {
    backgroundColor: colors.surface,
    borderColor: colors.primaryFixed,
  },
  itemRead: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerHigh,
  },
  iconBoxUnread: { backgroundColor: colors.primaryFixed },
  itemBody: { flex: 1, gap: 2 },
  itemTitle: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.text,
  },
  itemMessage: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    color: colors.textMuted,
  },
  itemTime: {
    marginTop: 2,
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    marginTop: 6,
    backgroundColor: colors.primary,
  },
  errorWrap: { gap: spacing.sm, paddingTop: spacing.md },
  pressed: { opacity: 0.85 },
}));
