import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { THEME_KEYS, setActiveTheme } from "../constants/theme";
import { setActiveLanguage, translate } from "../i18n";

const THEME_STORAGE_KEY = "baoeng.themeMode";
const LANGUAGE_STORAGE_KEY = "baoeng.language";

const SettingsContext = createContext(null);

/**
 * Quan ly giao dien (light/dark/gradient) va ngon ngu (vi/en) cua toan app.
 *
 * Theme/ngon ngu duoc ap vao runtime (Proxy trong `constants/theme` + i18n) ngay trong
 * buoc render de chuoi va style cua luot render hien tai da dung; RootLayout remount
 * navigator theo `themeMode` nen moi man hinh duoc ve lai voi mau moi.
 */
export function SettingsProvider({ children }) {
  const [themeMode, setThemeModeState] = useState("light");
  const [language, setLanguageState] = useState("vi");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.multiGet([THEME_STORAGE_KEY, LANGUAGE_STORAGE_KEY])
      .then((pairs) => {
        if (!mounted) return;
        const stored = Object.fromEntries(pairs);
        if (THEME_KEYS.includes(stored[THEME_STORAGE_KEY])) {
          setThemeModeState(stored[THEME_STORAGE_KEY]);
        }
        if (stored[LANGUAGE_STORAGE_KEY] === "en" || stored[LANGUAGE_STORAGE_KEY] === "vi") {
          setLanguageState(stored[LANGUAGE_STORAGE_KEY]);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.multiSet([
      [THEME_STORAGE_KEY, themeMode],
      [LANGUAGE_STORAGE_KEY, language],
    ]).catch(() => {});
  }, [ready, themeMode, language]);

  const setThemeMode = useCallback((next) => {
    setThemeModeState(THEME_KEYS.includes(next) ? next : "light");
  }, []);

  const setLanguage = useCallback((next) => {
    setLanguageState(next === "en" ? "en" : "vi");
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "vi" ? "en" : "vi"));
  }, []);

  // Ap runtime truoc khi children render.
  setActiveTheme(themeMode);
  setActiveLanguage(language);

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      language,
      setLanguage,
      toggleLanguage,
      isDark: themeMode === "dark",
      isGradient: themeMode === "gradient",
      ready,
      t: translate,
    }),
    [themeMode, setThemeMode, language, setLanguage, toggleLanguage, ready],
  );

  // Cho den khi doc xong cau hinh da luu de lan render dau tien da dung theme/ngon ngu.
  if (!ready) return null;

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/** Doc cau hinh giao dien/ngon ngu hien tai. */
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings phai duoc dung ben trong <SettingsProvider>.");
  }
  return context;
}
