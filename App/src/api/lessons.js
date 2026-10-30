import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** @param {string | number} id */
export async function getLesson(id) {
  return unwrap(await request(ENDPOINTS.lessons.detail(id)));
}

/** @param {string | number} id */
export async function getLessonMaterials(id) {
  return unwrap(await request(ENDPOINTS.lessons.materials(id)));
}

/**
 * Danh sach tu vung cua bai hoc.
 * @param {string | number} id
 * @param {{ page?: number, size?: number, q?: string }} [params]
 */
export async function getLessonVocab(id, params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ).toString();

  return unwrap(
    await request(
      `${ENDPOINTS.lessons.vocab(id)}${query ? `?${query}` : ""}`,
    ),
  );
}

/** @param {string | number} id */
export async function listLessonMinigames(id) {
  return unwrap(await request(ENDPOINTS.lessons.minigames(id)));
}
