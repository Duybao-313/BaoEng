# .docs — Bộ quy tắc cá nhân khi code với AI

Thư mục này chứa các quy tắc và chuẩn mực **dành riêng cho bạn** để AI (Copilot/DeepSeek...) code đúng ý, nhất quán và không phá vỡ kiến trúc dự án.

## Cấu trúc thư mục

| File                 | Mục đích                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `AI_CODING_RULES.md` | Quy tắc code bắt buộc khi làm việc với AI (tech stack, API, bảo mật, xử lý lỗi, quy trình) |
| `README.md`          | File này — hướng dẫn cách dùng                                                             |

## Cách dùng

1. **Trước mỗi phiên code mới**, dán nội dung `AI_CODING_RULES.md` vào prompt đầu tiên cho AI (hoặc trỏ AI đọc file này).
2. **Khi AI hỏi** về chuẩn API/DB/lỗi, chỉ cần trả lời: _"Làm theo `Docs/API_Specification.md`, `Docs/Database_Design_Specification_v2.md` và `.docs/AI_CODING_RULES.md`."_
3. **Khi có thay đổi** về quy ước, cập nhật lại file tương ứng để lần sau AI không lặp lỗi cũ.

## Liên kết tài liệu gốc (bắt buộc đọc)

- `../Docs/BRD_SRS_demo.md` — Yêu cầu nghiệp vụ & chức năng.
- `../Docs/Database_Design_Specification_v2.md` — Thiết kế CSDL.
- `../Docs/API_Specification.md` — Đặc tả API.
- `../Docs/JWT_Authentication_Design.md` — Thiết kế xác thực JWT.
