import { View } from "react-native";
import { Text } from "./Text";

import { spacing, themed, typography } from "../../constants/theme";

/**
 * Duong ke ngang kem nhan o giua (vi du: "Hoac dang nhap voi").
 *
 * @param {{ label?: string, style?: any }} props
 */
export function Divider({ label, style }) {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.line} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.line} />
    </View>
  );
}

const styles = themed((colors) => ({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  label: { fontSize: typography.labelSm, color: colors.textMuted },
}));
