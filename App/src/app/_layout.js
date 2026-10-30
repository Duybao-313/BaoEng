import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "../constants/theme";
import { AppProviders } from "../providers";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      {/* Moi man hinh tu ve AppHeader rieng => tat header mac dinh cua Stack. */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="topic/[id]" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="minigame/[id]" />
        <Stack.Screen name="minigame/result" />
        <Stack.Screen name="search" />
      </Stack>
    </AppProviders>
  );
}
