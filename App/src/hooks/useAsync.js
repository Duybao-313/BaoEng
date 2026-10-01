import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Chay mot ham async va theo doi trang thai loading/error/data.
 * Tu dong bo qua ket qua neu component da unmount.
 *
 * @template T
 * @param {(...args: any[]) => Promise<T>} asyncFn
 * @param {{ immediate?: boolean, deps?: unknown[] }} [options]
 */
export function useAsync(asyncFn, { immediate = true, deps = [] } = {}) {
  const [state, setState] = useState({
    data: /** @type {T | null} */ (null),
    error: /** @type {Error | null} */ (null),
    loading: immediate,
  });

  const mountedRef = useRef(true);
  const fnRef = useRef(asyncFn);

  // Giu tham chieu moi nhat toi asyncFn ma khong gay re-render.
  useEffect(() => {
    fnRef.current = asyncFn;
  });

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const run = useCallback(async (...args) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fnRef.current(...args);
      if (mountedRef.current) setState({ data, error: null, loading: false });
      return data;
    } catch (error) {
      if (mountedRef.current) setState({ data: null, error, loading: false });
      throw error;
    }
  }, []);

  useEffect(() => {
    if (!immediate) return undefined;

    let cancelled = false;

    Promise.resolve()
      .then(async () => {
        if (cancelled || !mountedRef.current) return { skipped: true };
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
          return { data: await fnRef.current() };
        } catch (error) {
          return { error };
        }
      })
      .then((result) => {
        if (cancelled || !mountedRef.current || result.skipped) return;
        if (result.error) {
          setState({ data: null, error: result.error, loading: false });
        } else {
          setState({ data: result.data, error: null, loading: false });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, run };
}
