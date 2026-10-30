import { StyleSheet, View } from "react-native";

import { AppHeader } from "../../components/layout/AppHeader";
import { EmptyState, Screen } from "../../components/ui";
import { spacing } from "../../constants/theme";

/**
 * Thong bao cua nguoi hoc (vi du giao vien tra loi binh luan).
 * Backend hien chua co API thong bao rieng => tam hien thi empty state.
 */
export default function NotificationsScreen() {
  return (
    <Screen padded={false}>
      <AppHeader title="Thông báo" showAvatar={false} />
      <View style={styles.body}>
        <EmptyState
          icon="notifications-none"
          title="Chưa có thông báo nào"
          message="Khi giáo viên trả lời câu hỏi của bạn, thông báo sẽ xuất hiện tại đây."
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
});
