import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";

const DEFAULT_EDGES = ["top", "right", "bottom", "left"];

/**
 * Khung man hinh chuan: safe area + keyboard avoiding (+ scroll / padding tuy chon).
 * Dat `padded={false}` khi man hinh tu quan ly padding (vi du: co AppHeader rieng).
 *
 * @param {{
 *   children: import('react').ReactNode,
 *   scroll?: boolean,
 *   padded?: boolean,
 *   edges?: Array<'top'|'right'|'bottom'|'left'>,
 *   style?: any,
 *   contentContainerStyle?: any,
 * }} props
 */
export function Screen({
  children,
  scroll = false,
  padded = true,
  edges = DEFAULT_EDGES,
  style,
  contentContainerStyle,
}) {
  const padding = padded ? styles.padded : null;

  return (
    <SafeAreaView edges={edges} style={[styles.safe, style]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {scroll ? (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              padding,
              contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, padding, contentContainerStyle]}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  padded: { padding: spacing.lg, gap: spacing.md },
  scrollContent: { flexGrow: 1 },
});
