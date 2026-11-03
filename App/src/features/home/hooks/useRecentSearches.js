import { useCallback, useEffect, useState } from "react";

import {
  addRecentSearch,
  clearRecentSearches,
  loadRecentSearches,
} from "../../../utils";

/** Quan ly danh sach 5 tu khoa tim kiem gan nhat (luu local). */
export function useRecentSearches() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadRecentSearches().then((list) => {
      if (cancelled) return;
      setItems(list);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const remember = useCallback(async (keyword) => {
    const next = await addRecentSearch(keyword);
    setItems(next);
    return next;
  }, []);

  const clear = useCallback(async () => {
    const next = await clearRecentSearches();
    setItems(next);
    return next;
  }, []);

  return { items, loading, remember, clear };
}
