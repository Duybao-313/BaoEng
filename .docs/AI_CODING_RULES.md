# QUY TẮC CODE VỚI AI (AI CODING RULES)

**Áp dụng cho:** toàn bộ dự án BaoEng (Backend + Frontend + Mobile).
**Ngày cập nhật:** 22/08/2026
**Mục đích:** Đảm bảo AI code đúng chuẩn, nhất quán và không tự ý phá vỡ kiến trúc.

---

## 1. NGUYÊN TẮC CHUNG

1. **Đọc tài liệu trước khi code** — AI bắt buộc đọc các file trong `Docs/` trước khi viết bất kỳ đoạn code nào liên quan.
2. **Không tự bịa API, DB field, hay quy tắc** — mọi thứ phải bám theo `Docs/`. Nếu docs chưa có, phải hỏi người dùng trước khi tự quyết.
3. **Một thay đổi = một mục đích** — không trộn lẫn nhiều chức năng trong một lần sửa.
4. **Code phải chạy được** — sau khi sửa phải tự build/test để xác nhận không lỗi.
5. **Khi sửa docs** (BRD/DB/API), phải cập nhật đồng bộ các file liên quan khác.

---

## 2. TÀI LIỆU THAM CHIẾU BẮT BUỘC

| Tài liệu                                   | Dùng khi nào                                    |
| ------------------------------------------ | ----------------------------------------------- |
| `Docs/BRD_SRS_demo.md`                     | Code tính năng nghiệp vụ, hiểu yêu cầu (FR/NFR) |
| `Docs/Database_Design_Specification_v2.md` | Tạo entity, repository, truy vấn DB             |
| `Docs/API_Specification.md`                | Tạo controller, DTO, xử lý request/response     |
| `Docs/JWT_Authentication_Design.md`        | Code xác thực, tạo/validate JWT, refresh token  |
| `.docs/AI_CODING_RULES.md`                 | Quy ước code chung (file này)                   |

> **Quy tắc vàng:** Nếu thông tin nằm trong docs thì **không được phép suy đoán khác đi**.

---

## 3. TECH STACK

| Tầng         | Công nghệ                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| Backend      | Java + Spring Boot (Maven), `spring-boot-starter-validation`, Spring Security + **OAuth2 Resource Server (JWT)** |
| Database     | MySQL/PostgreSQL (quan hệ) + MongoDB (document) — Polyglot Persistence                                           |
| Frontend     | React + Vite (JavaScript/JSX)                                                                                    |
| Mobile       | Android (Kotlin)                                                                                                 |
| Tài liệu API | Springdoc/OpenAPI 3.0 (Swagger UI)                                                                               |

---

## 4. KIẾN TRÚC & CẤU TRÚC THƯ MỤC (BACKEND)

Áp dụng phân tầng **Controller → Service → Repository** (không viết logic trong Controller).

```
com.example.BaoEng
├── BaoEngApplication.java
├── controller/      # @RestController — chỉ nhận/trả request, gọi Service
├── service/         # Logic nghiệp vụ
├── repository/      # Spring Data JPA / MongoRepository
├── entity/          # @Entity (MySQL)
├── document/        # @Document (MongoDB)
├── dto/             # Request/Response DTO
├── config/          # Security, CORS, OpenAPI config
├── exception/       # ErrorCode, BusinessException, GlobalExceptionHandler
└── common/          # ApiResponse<T>, util, constants
```

---

## 5. QUY ƯỚC API

1. Base URL: `/api/v1`.
2. Response chuẩn **bắt buộc** dùng Envelope `ApiResponse<T>`:
   ```json
   { "success": true, "data": {}, "message": "OK", "timestamp": "..." }
   ```
3. Lỗi trả về `{ "success": false, "error": { "code", "message", "details" } }`.
4. Tài nguyên đặt tên **số nhiều** (`/topics`, `/lessons`, `/minigames`).
5. Phân trang: `page` (bắt đầu 0), `size` (mặc định 20), `sort`.
6. Mọi endpoint phải đúng với `Docs/API_Specification.md`.

---

## 6. BẢO MẬT & XÁC THỰC (JWT)

1. Mọi API cần `userId` hoặc `role` **phải** yêu cầu header `Authorization: Bearer <accessToken>`.
2. `userId` và `role` **chỉ lấy từ claim trong JWT** — **không bao giờ** đọc từ request body hay URL (chống IDOR).
3. Mật khẩu: **BCrypt** (cost ≥ 12) hoặc **Argon2id**. Không lưu mật khẩu thô.
4. Phân quyền theo `@PreAuthorize("hasRole('TEACHER')")` hoặc cấu hình Security (Spring Security + **OAuth2 Resource Server**).
5. Đăng nhập hỗ trợ **email hoặc username** (field `login`).
6. JWT dùng thuật toán **HS256**; secret lấy từ env `JWT_SECRET`, nếu thiếu dùng giá trị mặc định (chỉ dev).
7. Claims bắt buộc: `userId`, `role`, `email`, `username`, `exp`, `iat` — theo `Docs/JWT_Authentication_Design.md`.
8. **Access Token**: hết hạn **3 giờ**. **Refresh Token**: hết hạn **7 ngày**, lưu **HttpOnly Secure cookie**.
9. Access Token hết hạn → gọi `/auth/refresh` (đọc refresh từ cookie) để cấp Access Token mới.

---

## 7. XỬ LÝ LỖI (CHỐNG BÙNG NỔ ERROR CODE)

1. **Chỉ tạo ErrorCode enum cho quy tắc nghiệp vụ** (~20–40 mã). Không tạo code riêng cho từng lỗi validate field.
2. Lỗi validate field dùng **Bean Validation** (`@NotBlank`, `@Email`, `@Size`) — gộp vào code `VALIDATION_ERROR`, chi tiết nằm trong mảng `details`.
3. Xử lý lỗi tập trung tại `@RestControllerAdvice` (`GlobalExceptionHandler`).
4. Cấu trúc lỗi chuẩn: `{ "code", "message", "details": [ { "field", "message" } ] }`.
5. nếu có thêm bớt xử lý lỗi tập trung thì phải cập nhật Docs

---

## 8. QUY ƯỚC ĐẶT TÊN

| Đối tượng          | Quy ước              | Ví dụ                        |
| ------------------ | -------------------- | ---------------------------- |
| Class (Java)       | PascalCase           | `TopicService`               |
| Method/biến (Java) | camelCase            | `getLessonProgress`          |
| Package            | chữ thường           | `com.example.BaoEng.service` |
| Bảng SQL           | snake_case, số nhiều | `lesson_progress`            |
| Cột SQL            | snake_case           | `completion_threshold`       |
| Collection MongoDB | snake_case, số nhiều | `minigame_questions`         |
| REST endpoint      | kebab-case/số nhiều  | `/lesson-materials`          |
| Component React    | PascalCase           | `TopicCard.jsx`              |

---

## 9. DATABASE

1. SQL: 8 bảng theo `Docs/Database_Design_Specification_v2.md` (users, topics, lessons, lesson_materials, vocabulary_items, minigames, minigame_attempts, lesson_progress).
2. MongoDB: 5 collections (minigame_questions, comments, audit_logs, activity_logs, system_error_logs).
3. Khóa chính: `BIGINT AUTO_INCREMENT` (SQL), `ObjectId` (MongoDB).
4. Liên kết chéo SQL↔MongoDB quản lý logic ở **Service Layer** (không có FK vật lý).
5. Bảng `users` có `username` UNIQUE — đăng nhập bằng email **hoặc** username.

---

## 10. QUY TRÌNH LÀM VIỆC VỚI AI

Khi nhờ AI code 1 tính năng, hãy đưa đủ ngữ cảnh theo thứ tự:

1. **Yêu cầu:** mô tả tính năng cần làm.
2. **Tài liệu:** trỏ tới file docs liên quan (BRD → DB → API).
3. **Phạm vi:** chỉ rõ file/tầng được phép sửa.
4. **Ràng buộc:** chuẩn response, JWT, xử lý lỗi (đã nêu ở trên).

AI phải:

- Đọc docs trước, hỏi khi thiếu thông tin.
- Chỉ sửa đúng phạm vi được yêu cầu.
- Tự build/test để xác nhận không phá vỡ code cũ.
  -nếu task k hợp lý cần phải làm ngoài phạm vi thì phải đề xuất trước
  -nếu làm task ngoài phạm vi mà tôi đã đồng ý thì phải sửa docs trước khi làm

---

## 11. CHECKLIST TRƯỚC KHI GIAO CODE

- [ ] Đúng phân tầng Controller → Service → Repository.
- [ ] Response đúng Envelope `ApiResponse<T>`.
- [ ] Lỗi xử lý qua `GlobalExceptionHandler`, không try-catch rải rác.
- [ ] `userId`/`role` lấy từ JWT (không từ body/URL).
- [ ] Không tạo error code mới cho lỗi validate field.
- [ ] Entity/field khớp `Database_Design_Specification_v2.md`.
- [ ] Endpoint khớp `API_Specification.md`.
- [ ] Đã build/test thành công.
