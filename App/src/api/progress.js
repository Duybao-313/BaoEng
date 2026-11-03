import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** Tien do tong the cua Student (theo tung chu de). */
export async function getProgress() {
  return unwrap(await request(ENDPOINTS.progress.overview));
}

/** Tien do hoc trong ngay: phut hoc, bai hoan thanh, streak, chu de dang hoc do. */
export async function getTodayProgress() {
  return unwrap(await request(ENDPOINTS.progress.today));
}

/**
 * Bao thoi gian hoc cua mot phien (goi khi roi man Bai hoc).
 * Tra ve tien do hom nay moi nhat.
 * @param {{ lessonId?: string | number, minutes: number }} params
 */
export async function reportStudyTime({ lessonId, minutes }) {
  return unwrap(
    await request(ENDPOINTS.progress.activity, {
      method: "POST",
      body: {
        lessonId: lessonId === undefined ? undefined : Number(lessonId),
        minutes,
      },
    }),
  );
}
