/** Kiem tra du lieu dau vao o phia client (khong thay the validate o Backend). */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @param {string} value */
export function isEmail(value) {
  return typeof value === "string" && EMAIL_PATTERN.test(value.trim());
}

/** @param {string} value @param {number} [min] */
export function isStrongPassword(value, min = 8) {
  return typeof value === "string" && value.length >= min;
}

/** @param {string} value */
export function isNotEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validate form dang nhap (chi dung username, khong dung email).
 * @param {{ username?: string, password?: string }} values
 * @returns {Record<string, string>} map field -> thong bao loi (rong neu hop le)
 */
export function validateSignIn(values = {}) {
  /** @type {Record<string, string>} */
  const errors = {};
  const username = (values.username ?? "").trim();

  if (!isNotEmpty(username)) {
    errors.username = "Vui lòng nhập tên đăng nhập.";
  } else if (/\s/.test(username)) {
    errors.username = "Tên đăng nhập không được chứa khoảng trắng.";
  } else if (username.length > 50) {
    errors.username = "Tên đăng nhập tối đa 50 ký tự.";
  }

  if (!isNotEmpty(values.password ?? "")) {
    errors.password = "Vui lòng nhập mật khẩu.";
  } else if (!isStrongPassword(values.password ?? "")) {
    errors.password = "Mật khẩu tối thiểu 8 ký tự.";
  }

  return errors;
}

/**
 * Validate form dang ky.
 * @param {{ name?: string, email?: string, password?: string }} values
 * @returns {Record<string, string>}
 */
export function validateSignUp(values = {}) {
  /** @type {Record<string, string>} */
  const errors = {};

  if (!isNotEmpty(values.name ?? "")) {
    errors.name = "Vui lòng nhập họ tên.";
  }

  if (!isEmail(values.email ?? "")) {
    errors.email = "Email không hợp lệ.";
  }

  if (!isNotEmpty(values.password ?? "")) {
    errors.password = "Vui lòng nhập mật khẩu.";
  } else if (!isStrongPassword(values.password ?? "")) {
    errors.password = "Mật khẩu tối thiểu 8 ký tự.";
  }

  return errors;
}
