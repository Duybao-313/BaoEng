import { useEffect, useState } from "react";

/**
 * Tra ve gia tri chi cap nhat sau khi khong co thay doi trong `delay` ms.
 * Dung cho o tim kiem de tranh goi API o moi lan go phim.
 *
 * @template T
 * @param {T} value
 * @param {number} [delay]
 * @returns {T}
 */
export function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
