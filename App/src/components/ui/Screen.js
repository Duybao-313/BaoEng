import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BACKGROUND_GRADIENT, spacing, themed } from "../../constants/theme";
import { useSettings } from "../../providers";

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
  const { isGradient } = useSettings();

  return (
    <View style={[styles.flex, style]}>
      {isGradient ? (
        <LinearGradient
          colors={BACKGROUND_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}
      <SafeAreaView edges={edges} style={styles.safe}>
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
    </View>
  );
}

const styles = themed((colors) => ({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  padded: { padding: spacing.lg, gap: spacing.md },
  scrollContent: { flexGrow: 1 },
}));
