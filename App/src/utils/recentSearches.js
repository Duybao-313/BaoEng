import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "baoeng.recentSearches";
const MAX_ITEMS = 5;

/**
 * 5 tu khoa tim kiem gan nhat (moi nhat dung dau).
 * Luu local bang AsyncStorage — hoat dong ca iOS/Android/Web.
 */
export async function loadRecentSearches() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => typeof item === "string" && item.trim())
      .slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

/** Them tu khoa vao dau danh sach (khong trung lap, toi da 5) va tra ve danh sach moi. */
export async function addRecentSearch(keyword) {
  const value = String(keyword ?? "").trim();
  if (!value) return loadRecentSearches();

  const current = await loadRecentSearches();
  const next = [
    value,
    ...current.filter((item) => item.toLowerCase() !== value.toLowerCase()),
  ].slice(0, MAX_ITEMS);

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Bo qua loi luu tru — khong lam hong luong tim kiem.
  }
  return next;
}

export async function clearRecentSearches() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // Bo qua loi luu tru.
  }
  return [];
}
