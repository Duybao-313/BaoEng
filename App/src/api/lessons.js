import { request } from "./client";
import { ENDPOINTS } from "./endpoints";

/** @param {{ page?: number, limit?: number, level?: string }} [params] */
export function listLessons(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ).toString();
  return request(`${ENDPOINTS.lessons.list}${query ? `?${query}` : ""}`);
}

/** @param {string | number} id */
export function getLesson(id) {
  return request(ENDPOINTS.lessons.detail(id));
}

/** @param {string | number} id @param {{ score: number }} payload */
export function completeLesson(id, payload) {
  return request(ENDPOINTS.lessons.complete(id), {
    method: "POST",
    body: payload,
  });
}
