/**
 * Design tokens cua app Mobile.
 * Nguon: bang mau Material 3 theo `Docs/Stitch_App_Description.md`.
 *
 * File nay vua chua token tinh (spacing/radius/typography) vua la runtime cua theme:
 * - `colors` la Proxy doc bang mau dang chon tai thoi diem render.
 * - `themed(factory)` tao style cho ca 3 giao dien (light/dark/gradient) va tra ve Proxy
 *   chon sheet tuong ung — nho vay cac man hinh khong phai sua tung StyleSheet.
 */

import { StyleSheet } from "react-native";

/**
 * Bang mau Material 3 goc (giao dien sang) — lay nguyen tu mockup thiet ke.
 */
export const palette = {
  primary: "#004AC6",
  onPrimary: "#FFFFFF",
  primaryContainer: "#2563EB",
  onPrimaryContainer: "#EEEFFF",
  primaryFixed: "#DBE1FF",
  onPrimaryFixed: "#00174B",
  secondary: "#006C49",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#6CF8BB",
  onSecondaryContainer: "#00714D",
  secondaryFixed: "#6FFBBE",
  onSecondaryFixed: "#002113",
  onSecondaryFixedVariant: "#005236",
  tertiary: "#784B00",
  tertiaryFixed: "#FFDDB8",
  onTertiaryFixed: "#2A1700",
  error: "#BA1A1A",
  errorContainer: "#FFDAD6",
  onErrorContainer: "#93000A",
  surface: "#FAF8FF",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F2F3FF",
  surfaceContainer: "#EAEDFF",
  surfaceContainerHigh: "#E2E7FF",
  surfaceContainerHighest: "#DAE2FD",
  onSurface: "#131B2E",
  onSurfaceVariant: "#434655",
  outline: "#737686",
  outlineVariant: "#C3C6D7",
};

/** Token ngu nghia — component chi nen dung nhom nay. */
const lightColors = {
  // Brand
  primary: palette.primary,
  primaryContainer: palette.primaryContainer,
  onPrimary: palette.onPrimary,
  primaryFixed: palette.primaryFixed,
  secondary: palette.secondary,
  onSecondary: palette.onSecondary,
  secondaryFixed: palette.secondaryFixed,
  onSecondaryFixed: palette.onSecondaryFixed,
  onSecondaryFixedVariant: palette.onSecondaryFixedVariant,
  tertiary: palette.tertiary,
  tertiaryFixed: palette.tertiaryFixed,
  onTertiaryFixed: palette.onTertiaryFixed,
  accent: "#FFB95F",
  // Trang thai
  danger: palette.error,
  errorContainer: palette.errorContainer,
  onErrorContainer: palette.onErrorContainer,
  success: palette.secondary,
  // Be mat
  surface: palette.surfaceContainerLowest,
  surfaceContainerLowest: palette.surfaceContainerLowest,
  surfaceContainerLow: palette.surfaceContainerLow,
  surfaceContainer: palette.surfaceContainer,
  surfaceContainerHigh: palette.surfaceContainerHigh,
  background: palette.surface,
  outline: palette.outline,
  border: palette.outlineVariant,
  // Chu
  text: palette.onSurface,
  textMuted: palette.onSurfaceVariant,
};

/** Giao dien toi (Material 3 dark). */
const darkColors = {
  primary: "#B4C5FF",
  primaryContainer: "#2F6BFF",
  onPrimary: "#FFFFFF",
  primaryFixed: "#1E2C4A",
  secondary: "#6FFBBE",
  onSecondary: "#00382A",
  secondaryFixed: "#0E3B2A",
  onSecondaryFixed: "#0B2A1E",
  onSecondaryFixedVariant: "#7DEBC0",
  tertiary: "#FFB95F",
  tertiaryFixed: "#3B2A08",
  onTertiaryFixed: "#FFDDB8",
  accent: "#FFB95F",
  danger: "#FFB4AB",
  errorContainer: "#5C1414",
  onErrorContainer: "#FFDAD6",
  success: "#6FFBBE",
  surface: "#141A24",
  surfaceContainerLowest: "#111722",
  surfaceContainerLow: "#1A2230",
  surfaceContainer: "#212A39",
  surfaceContainerHigh: "#2A3444",
  background: "#0B0F16",
  outline: "#7C8698",
  border: "#2E3848",
  text: "#E8ECF6",
  textMuted: "#A7B0C2",
};

/** Giao dien gradient: nen trong suot de gradient phia sau hien qua, card trang mo. */
const gradientColors = {
  ...lightColors,
  surface: "rgba(255, 255, 255, 0.82)",
  surfaceContainerLowest: "rgba(255, 255, 255, 0.9)",
  surfaceContainerLow: "rgba(255, 255, 255, 0.58)",
  surfaceContainer: "rgba(255, 255, 255, 0.48)",
  surfaceContainerHigh: "rgba(255, 255, 255, 0.38)",
  background: "transparent",
  border: "rgba(255, 255, 255, 0.75)",
  outline: "rgba(67, 70, 85, 0.55)",
  primaryFixed: "rgba(219, 225, 255, 0.85)",
  text: "#0F172A",
  textMuted: "#33405A",
};

export const THEME_KEYS = ["light", "dark", "gradient"];

const THEMES = {
  light: lightColors,
  dark: darkColors,
  gradient: gradientColors,
};

/** Mau nen gradient (chi dung o che do gradient). */
export const BACKGROUND_GRADIENT = ["#C9DCFF", "#EAD9FF", "#CCF3E3"];
export const BACKGROUND_SOLID = {
  light: lightColors.background,
  dark: darkColors.background,
  gradient: "#EFF3FF",
};

let activeThemeKey = "light";

/** Doi giao dien dang dung (SettingsProvider goi truoc khi render children). */
export function setActiveTheme(key) {
  if (THEMES[key] && key !== activeThemeKey) {
    activeThemeKey = key;
  }
}

export function getActiveThemeKey() {
  return activeThemeKey;
}

/**
 * Token mau dang dung. Doc tai thoi diem render nen component chi can render lai
 * la se nhan mau moi.
 */
export const colors = new Proxy(
  {},
  {
    get: (_target, prop) => THEMES[activeThemeKey][prop],
    has: () => true,
    ownKeys: () => Reflect.ownKeys(lightColors),
    getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
  },
);

/**
 * Tao style cho ca 3 giao dien ngay khi import, tra ve Proxy chon sheet theo giao dien
 * dang dung. Khi nguoi dung doi giao dien, navigator duoc remount (`key`) nen moi
 * component render lai va nhan style cua giao dien moi.
 *
 * @param {(colors: typeof lightColors) => Record<string, any>} factory
 */
export function themed(factory) {
  const sheets = {};
  for (const key of THEME_KEYS) {
    sheets[key] = StyleSheet.create(factory(THEMES[key]));
  }
  return new Proxy(
    {},
    {
      get: (_target, prop) => sheets[activeThemeKey][prop],
      has: () => true,
      ownKeys: () => Reflect.ownKeys(sheets.light),
      getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
    },
  );
}

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  // Thang Material 3 (nguon: mockup)
  headlineLgMobile: 26,
  headlineSm: 18,
  bodyLg: 16,
  bodyMd: 14,
  labelLg: 14,
  labelSm: 11,
  // Alias tuong thich voi cac man hinh da co
  title: 24,
  heading: 18,
  body: 14,
  caption: 12,
};

/** Do nang: boxShadow cho iOS/Android (New Architecture) va web, elevation cho Android cu. */
export const shadows = {
  sm: {
    boxShadow: "0 1px 2px rgba(19, 27, 46, 0.08)",
    elevation: 1,
  },
  md: {
    boxShadow: "0 2px 6px rgba(19, 27, 46, 0.1)",
    elevation: 3,
  },
};
