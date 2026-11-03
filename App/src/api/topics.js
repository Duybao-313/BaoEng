import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** @param {Record<string, any>} params */
function toQuery(params) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ).toString();
  return query ? `?${query}` : "";
}

/**
 * Danh sach chu de (loc theo level + tim kiem + phan trang).
 * @param {{ level?: string, q?: string, page?: number, size?: number, sort?: string }} [params]
 */
export async function listTopics(params = {}) {
  return unwrap(await request(`${ENDPOINTS.topics.list}${toQuery(params)}`));
}

/** @param {string | number} id */
export async function getTopic(id) {
  return unwrap(await request(ENDPOINTS.topics.detail(id)));
}

/**
 * Chu de de xuat cho student (da loc theo level dang hoc, bo chu de da xong 100%).
 * @param {number} [limit]
 */
export async function listRecommendedTopics(limit = 6) {
  return unwrap(
    await request(`${ENDPOINTS.topics.recommended}${toQuery({ limit })}`),
  );
}

/**
 * Chu de noi bat (nhieu luot dang ky nhat), ho tro loc level + tim kiem.
 * @param {{ level?: string, q?: string, limit?: number }} [params]
 */
export async function listFeaturedTopics(params = {}) {
  return unwrap(
    await request(`${ENDPOINTS.topics.featured}${toQuery(params)}`),
  );
}

/** @param {string | number} id */
export async function enrollTopic(id) {
  return unwrap(
    await request(ENDPOINTS.topics.enroll(id), { method: "POST" }),
  );
}

/** @param {string | number} id */
export async function unenrollTopic(id) {
  return unwrap(
    await request(ENDPOINTS.topics.unenroll(id), { method: "DELETE" }),
  );
}

/** @param {string | number} id */
export async function listTopicLessons(id) {
  return unwrap(await request(ENDPOINTS.topics.lessons(id)));
}

/** @param {string | number} id */
export async function getTopicProgress(id) {
  return unwrap(await request(ENDPOINTS.topics.progress(id)));
}
