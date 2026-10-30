import { ApiError } from "../../api";

/**
 * Chuyen loi tu tang API thanh thong bao tieng Viet hien thi cho nguoi dung.
 * @param {unknown} error
 * @returns {string}
 */
export function toAuthMessage(error) {
  if (error instanceof ApiError) {
    // Backend tra ve: { success:false, error:{ code, message } }
    const code = error.body?.error?.code;

    if (code === "ACCOUNT_PENDING") {
      return "Tài khoản chưa được xác thực email. Vui lòng kiểm tra hộp thư để kích hoạt.";
    }
    if (code === "ACCOUNT_LOCKED") {
      return "Tài khoản đã bị khóa. Vui lòng liên hệ bộ phận hỗ trợ BaoEng.";
    }
    if (code === "EMAIL_ALREADY_EXISTS") {
      return "Email này đã được sử dụng. Vui lòng dùng email khác.";
    }
    if (code === "USERNAME_ALREADY_EXISTS") {
      return "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.";
    }
    if (error.status === 401 || error.status === 403) {
      return "Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.";
    }
    if (code === "VALIDATION_ERROR") {
      return "Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại.";
    }
    if (error.status === 429) {
      return "Bạn đã thử quá nhiều lần. Vui lòng chờ một lát rồi thử lại.";
    }
    if (error.status >= 500) {
      return "Máy chủ đang bận. Vui lòng thử lại sau.";
    }
    // Loi mang / het thoi gian cho khong co status.
    if (!error.status) {
      return "Không kết nối được máy chủ. Vui lòng kiểm tra kết nối mạng.";
    }
    return error.message;
  }
  return "Đã có lỗi xảy ra. Vui lòng thử lại.";
}
