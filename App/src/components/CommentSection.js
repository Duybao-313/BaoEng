import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { createComment, listComments } from "../api";
import { colors, radius, spacing, typography } from "../constants/theme";
import { useAsync } from "../hooks";
import { Alert, Button, Skeleton } from "./ui";

/**
 * Khu binh luan dung chung cho Chu de (TOPIC) va Bai hoc (LESSON).
 * @param {{ targetType: 'TOPIC' | 'LESSON', targetId: string | number }} props
 */
export function CommentSection({ targetType, targetId }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data, loading, error, run } = useAsync(
    () => listComments({ targetType, targetId }),
    { deps: [targetType, targetId] },
  );

  const comments = data?.content ?? [];

  const handleSend = async () => {
    const trimmed = content.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    try {
      await createComment({ targetType, targetId, content: trimmed });
      setContent("");
      run().catch(() => {});
    } catch {
      // Loi duoc hien thi qua state cua composer (giu input de nguoi dung thu lai).
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Bình luận & Hỏi giáo viên</Text>

      <View style={styles.composer}>
        <TextInput
          accessibilityLabel="Nội dung bình luận"
          style={styles.input}
          placeholder="Đặt câu hỏi cho giáo viên..."
          placeholderTextColor={colors.outline}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button
          label="Gửi"
          icon="send"
          fullWidth={false}
          loading={submitting}
          disabled={!content.trim()}
          onPress={handleSend}
        />
      </View>

      {loading ? (
        <View style={styles.skeletons}>
          <Skeleton height={14} />
          <Skeleton height={14} width="80%" />
          <Skeleton height={14} width="60%" />
        </View>
      ) : null}

      {!loading && error ? (
        <Alert
          title="Không tải được bình luận"
          message={error?.message ?? "Vui lòng thử lại sau."}
        />
      ) : null}

      {!loading && !error && comments.length === 0 ? (
        <Text style={styles.empty}>Chưa có bình luận nào.</Text>
      ) : null}

      {comments.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
    </View>
  );
}

function CommentItem({ comment }) {
  return (
    <View style={styles.comment}>
      <View style={styles.commentHead}>
        <Text style={styles.author} numberOfLines={1}>
          {comment.author?.fullName ?? "Người dùng"}
        </Text>
        <Text style={styles.time}>{formatTime(comment.createdAt)}</Text>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>

      {(comment.replies ?? []).map((reply) => (
        <View key={reply.replyId} style={styles.reply}>
          <Text style={styles.replyAuthor} numberOfLines={1}>
            {reply.author?.fullName ?? "Giáo viên"}
          </Text>
          <Text style={styles.commentContent}>{reply.content}</Text>
        </View>
      ))}
    </View>
  );
}

/** @param {string} iso */
function formatTime(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.md },
  heading: {
    fontSize: typography.heading,
    fontWeight: "600",
    color: colors.text,
  },
  composer: { gap: spacing.sm },
  input: {
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLow,
    fontSize: typography.bodyMd,
    color: colors.text,
    textAlignVertical: "top",
  },
  skeletons: { gap: spacing.sm },
  empty: {
    fontSize: typography.bodyMd,
    color: colors.textMuted,
  },
  comment: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLow,
  },
  commentHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  author: {
    flex: 1,
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.text,
  },
  time: {
    fontSize: typography.labelSm,
    color: colors.textMuted,
  },
  commentContent: {
    fontSize: typography.bodyMd,
    lineHeight: 20,
    color: colors.text,
  },
  reply: {
    marginTop: spacing.sm,
    paddingLeft: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    gap: 2,
  },
  replyAuthor: {
    fontSize: typography.labelLg,
    fontWeight: "700",
    color: colors.primaryContainer,
  },
});
