import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { BACKGROUND_GRADIENT, BACKGROUND_SOLID } from "../constants/theme";
import { AppProviders, useSettings } from "../providers";

export default function RootLayout() {
  return (
    <AppProviders>
      <ThemedNavigator />
    </AppProviders>
  );
}

/**
 * Boc navigator trong nen cua giao dien dang chon.
 * `key={themeMode}` dam bao toan bo cay man hinh duoc render lai khi doi giao dien
 * (style/mau duoc chon qua Proxy trong `constants/theme`).
 */
function ThemedNavigator() {
  const { themeMode, isDark, isGradient } = useSettings();

  return (
    <View style={[styles.root, { backgroundColor: BACKGROUND_SOLID[themeMode] }]}>
      {isGradient ? (
        <LinearGradient
          colors={BACKGROUND_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}
      <StatusBar style={isDark ? "light" : "dark"} />
      {/* Moi man hinh tu ve AppHeader rieng => tat header mac dinh cua Stack. */}
      <Stack
        key={themeMode}
        screenOptions={{
          headerShown: false,
          contentStyle: styles.transparent,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="topic/[id]" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="minigame/[id]" />
        <Stack.Screen name="minigame/result" />
        <Stack.Screen name="search" />
        <Stack.Screen name="settings" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  transparent: { backgroundColor: "transparent" },
});
