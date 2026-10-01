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
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AppProviders>
  );
}
