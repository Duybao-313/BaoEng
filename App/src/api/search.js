import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/**
 * Tim kiem chu de + bai hoc theo tu khoa.
 * @param {{ q: string, page?: number, size?: number }} params
 */
export async function search(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  return unwrap(await request(`${ENDPOINTS.search.list}?${query}`));
}
