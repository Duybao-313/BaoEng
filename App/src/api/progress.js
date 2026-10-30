import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** Tien do tong the cua Student (theo tung chu de). */
export async function getProgress() {
  return unwrap(await request(ENDPOINTS.progress.overview));
}
