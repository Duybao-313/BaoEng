import { Stack } from "expo-router";

/** Nen trong suot de mau/gradient cua RootLayout hien qua. */
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }} />;
}
