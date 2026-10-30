import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** @param {string | number} id */
export async function getMinigame(id) {
  return unwrap(await request(ENDPOINTS.minigames.detail(id)));
}

/**
 * Nop bai lam.
 * @param {string | number} id
 * @param {Array<{ questionId: number, selectedKey: string }>} answers
 */
export async function submitMinigameAttempt(id, answers) {
  return unwrap(
    await request(ENDPOINTS.minigames.attempts(id), {
      method: "POST",
      body: { answers },
    }),
  );
}

/** @param {string | number} id */
export async function listMinigameAttempts(id) {
  return unwrap(await request(ENDPOINTS.minigames.attempts(id)));
}
