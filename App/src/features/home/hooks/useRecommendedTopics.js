import { useCallback } from "react";

import { listRecommendedTopics } from "../../../api";
import { useAsync } from "../../../hooks";

/** Chu de de xuat cho student (khoi "Chu de de xuat cho ban" o Trang chu). */
export function useRecommendedTopics(limit = 6) {
  const { data, loading, error, run } = useAsync(
    () => listRecommendedTopics(limit),
    { deps: [limit] },
  );

  const reload = useCallback(() => run().catch(() => {}), [run]);

  return {
    topics: Array.isArray(data) ? data : [],
    loading,
    error,
    reload,
  };
}
