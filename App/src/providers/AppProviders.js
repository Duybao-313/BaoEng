import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "../store/auth";
import { SettingsProvider } from "./SettingsProvider";

/**
 * Gom tat ca Provider toan cuc vao mot cho.
 *
 * Thu tu: SafeArea (layout) -> Settings (theme + ngon ngu) -> Auth.
 * SettingsProvider nam ngoai AuthProvider de moi man hinh (ke ca dang nhap) doi duoc
 * giao dien/ngon ngu.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function AppProviders({ children }) {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AuthProvider>{children}</AuthProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
