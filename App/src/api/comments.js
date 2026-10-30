import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/**
 * Danh sach binh luan cua mot chu de hoac bai hoc.
 * @param {{ targetType: string, targetId: string | number, page?: number, size?: number }} params
 */
export async function listComments({ targetType, targetId, page, size }) {
  const query = new URLSearchParams({
    targetType,
    targetId: String(targetId),
    ...(page !== undefined ? { page: String(page) } : null),
    ...(size !== undefined ? { size: String(size) } : null),
  }).toString();

  return unwrap(await request(`${ENDPOINTS.comments.list}?${query}`));
}

/** @param {{ targetType: string, targetId: string | number, content: string }} payload */
export async function createComment(payload) {
  return unwrap(
    await request(ENDPOINTS.comments.create, {
      method: "POST",
      body: payload,
    }),
  );
}
