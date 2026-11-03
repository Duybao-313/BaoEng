import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** Lay thong tin ca nhan cua nguoi dang nhap. */
export async function getMe() {
  return unwrap(await request(ENDPOINTS.users.me));
}

/** @param {{ fullName?: string, avatarUrl?: string }} payload */
export async function updateMe(payload) {
  return unwrap(
    await request(ENDPOINTS.users.me, { method: "PUT", body: payload }),
  );
}

/** @param {{ oldPassword: string, newPassword: string }} payload */
export async function changePassword(payload) {
  return unwrap(
    await request(ENDPOINTS.users.password, {
      method: "PUT",
      body: payload,
    }),
  );
}

/**
 * Cap nhat anh dai dien (multipart). Tra ve user moi nhat kem `avatarUrl`.
 *
 * Tren web, `expo-image-picker` tra ve `file` (Blob/File) nen phai gui blob that;
 * tren native chi co `uri` nen gui object `{ uri, name, type }` (React Native FormData).
 *
 * @param {{ uri: string, name?: string, type?: string, file?: Blob }} image
 */
export async function uploadAvatar(image) {
  const form = new FormData();
  const filename = image.name ?? "avatar.jpg";
  if (image.file) {
    form.append("file", image.file, filename);
  } else {
    form.append("file", {
      uri: image.uri,
      name: filename,
      type: image.type ?? "image/jpeg",
    });
  }
  return unwrap(
    await request(ENDPOINTS.users.avatar, { method: "POST", body: form }),
  );
}
