import { useCallback } from "react";

import { listFeaturedTopics } from "../../../api";
import { useAsync } from "../../../hooks";

/**
 * Chu de noi bat (khoi "Tat ca chu de noi bat"), ho tro loc level + tu khoa.
 * @param {{ level?: string | null, query?: string, limit?: number }} options
 */
export function useFeaturedTopics({ level = null, query = "", limit = 10 }) {
  const { data, loading, error, run } = useAsync(
    () =>
      listFeaturedTopics({
        level: level ?? undefined,
        q: query || undefined,
        limit,
      }),
    { deps: [level, query, limit] },
  );

  const reload = useCallback(() => run().catch(() => {}), [run]);

  return {
    topics: Array.isArray(data) ? data : [],
    loading,
    error,
    reload,
  };
}
