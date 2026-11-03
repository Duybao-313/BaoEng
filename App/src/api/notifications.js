import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** Danh sach thong bao cua nguoi dang dang nhap (moi nhat truoc). */
export async function listNotifications() {
  return unwrap(await request(ENDPOINTS.notifications.list));
}

/** So thong bao chua doc. */
export async function getUnreadNotificationCount() {
  return unwrap(await request(ENDPOINTS.notifications.unreadCount));
}

/** @param {string | number} id */
export async function markNotificationRead(id) {
  return unwrap(
    await request(ENDPOINTS.notifications.read(id), { method: "PUT" }),
  );
}

/** Danh dau tat ca thong bao da doc; tra ve so ban ghi duoc cap nhat. */
export async function markAllNotificationsRead() {
  return unwrap(
    await request(ENDPOINTS.notifications.readAll, { method: "PUT" }),
  );
}
