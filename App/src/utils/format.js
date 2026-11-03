/**
 * Cac ham thuan (pure function) ve dinh dang du lieu.
 * Khong import React, khong goi API — de test va tai su dung de dang.
 */

/** @param {number} value @param {number} [digits] */
export function formatScore(value, digits = 0) {
  if (typeof value !== "number" || Number.isNaN(value)) return "--";
  return value.toFixed(digits);
}

/** @param {number} value 0..100 */
export function formatPercent(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "--";
  return `${Math.round(value)}%`;
}

/** @param {string} text @param {number} [max] */
export function truncate(text, max = 80) {
  if (!text) return "";
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

/** Dinh dang thoi luong giay -> mm:ss. @param {number} seconds */
export function formatDuration(seconds) {
  if (typeof seconds !== "number" || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

/**
 * Dinh dang so phut -> "3 giờ 40 phút" / "45 phút" / "0 phút".
 * @param {number} minutes
 */
export function formatMinutes(minutes) {
  const total = Math.max(0, Math.round(Number(minutes) || 0));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (hours === 0) return `${rest} phút`;
  if (rest === 0) return `${hours} giờ`;
  return `${hours} giờ ${rest} phút`;
}
