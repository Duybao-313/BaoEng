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
