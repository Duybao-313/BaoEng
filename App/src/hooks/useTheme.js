import { colors, radius, spacing, typography } from "../constants/theme";
import { useSettings } from "../providers";

/**
 * Tra ve design tokens cua app + giao dien dang chon.
 * `colors` la Proxy nen gia tri luon la mau cua giao dien hien tai
 * (light / dark / gradient).
 */
export function useTheme() {
  const { themeMode, isDark, isGradient, language } = useSettings();
  return { colors, radius, spacing, typography, themeMode, isDark, isGradient, language };
}
