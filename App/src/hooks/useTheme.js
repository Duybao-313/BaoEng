import { colors, radius, spacing, typography } from "../constants/theme";

/**
 * Tra ve design tokens cua app.
 * Khi nao them dark mode / ThemeProvider, chi can doi noi bo hook nay.
 */
export function useTheme() {
  return { colors, radius, spacing, typography };
}
