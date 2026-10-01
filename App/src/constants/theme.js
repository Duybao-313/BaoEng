/**
 * Design tokens cua app Mobile.
 * Nguon: bang mau Material 3 theo `Docs/Stitch_App_Description.md`.
 */

/**
 * Bang mau Material 3 — lay nguyen tu mockup thiet ke.
 * Day la nguon DUY NHAT ve mau sac; UI khong duoc hardcode ma mau.
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
export const colors = {
  // Brand
  primary: palette.primary,
  primaryContainer: palette.primaryContainer,
  onPrimary: palette.onPrimary,
  secondary: palette.secondary,
  secondaryFixed: palette.secondaryFixed,
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
