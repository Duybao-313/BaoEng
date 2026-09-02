# TÀI LIỆU ĐẶC TẢ API (API SPECIFICATION)

## Nền tảng Học tiếng Anh Trực tuyến Đa nền tảng (Web & Mobile App)

**Phiên bản:** 1.0 (Định hướng — Design-First)
**Ngày cập nhật:** 22/08/2026
**Trạng thái:** Định hướng trước khi code. Sau khi Backend chạy, dùng Springdoc/OpenAPI để sinh chi tiết và đối chiếu.

---

## 1. QUY ƯỚC CHUNG (CONVENTIONS)

### 1.1. Thông tin cơ bản

| Mục                | Giá trị                                                  |
| ------------------ | -------------------------------------------------------- |
| Base URL           | `http://localhost:8080/api/v1`                           |
| Định dạng trao đổi | JSON (UTF-8)                                             |
| Chuẩn tài liệu     | OpenAPI 3.0 / Swagger UI                                 |
| Xác thực           | JWT Bearer Token (`Authorization: Bearer <accessToken>`) |

> **Quy tắc JWT bắt buộc:**
>
> - Mọi API cần xác định **user ID** hoặc **vai trò (role)** đều **phải** gửi kèm header `Authorization: Bearer <accessToken>`.
> - `userId` và `role` được lấy từ **claim bên trong JWT** — **không** truyền qua request body hay URL.
> - Chỉ các API Auth công khai (register, login, forgot-password, reset-password) là **không** cần JWT.
> - Chi tiết claims, thuật toán, thời hạn token xem **`Docs/JWT_Authentication_Design.md`**.

### 1.2. Quy tắc đặt tên

- **Tài nguyên**: danh từ số nhiều (`/topics`, `/lessons`, `/minigames`).
- **Method**:
  - `GET` — đọc dữ liệu (không thay đổi trạng thái).
  - `POST` — tạo mới.
  - `PUT` — cập nhật toàn phần.
  - `DELETE` — xóa.
- **Phân trang**: tham số `page` (bắt đầu từ 0) và `size` (mặc định 20, tối đa 100).
- **Sắp xếp**: tham số `sort` theo dạng `field,asc|desc`.

### 1.3. Cấu trúc phản hồi chuẩn (Envelope)

```json
// Thành công (dữ liệu trả về trong trường `data`)
{
  "success": true,
  "data": {},
  "message": "OK",
  "timestamp": "2026-08-22T10:00:00Z"
}
```

```json
// Lỗi (mã lỗi cụ thể trong trường `error`)
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email hoặc mật khẩu không chính xác",
    "details": null
  },
  "timestamp": "2026-08-22T10:00:00Z"
}
```

### 1.4. Mã lỗi HTTP & mã lỗi nghiệp vụ

| HTTP Status | Ý nghĩa                       | Ví dụ mã lỗi nghiệp vụ                   |
| ----------- | ----------------------------- | ---------------------------------------- |
| 400         | Dữ liệu đầu vào không hợp lệ  | `VALIDATION_ERROR`, `CSV_INVALID_FORMAT` |
| 401         | Chưa xác thực / token hết hạn | `UNAUTHORIZED`, `TOKEN_EXPIRED`          |
| 403         | Không đủ quyền (RBAC)         | `FORBIDDEN`                              |
| 404         | Không tìm thấy tài nguyên     | `TOPIC_NOT_FOUND`, `LESSON_NOT_FOUND`    |
| 409         | Xung đột dữ liệu              | `EMAIL_ALREADY_EXISTS`                   |
| 413         | File vượt quá dung lượng      | `FILE_TOO_LARGE`                         |
| 429         | Vượt giới hạn tần suất        | `RATE_LIMITED`                           |
| 500         | Lỗi hệ thống                  | `INTERNAL_ERROR`                         |

---

## 2. NHÓM API XÁC THỰC & PHÂN QUYỀN (AUTH)

> Tương ứng: FR-AUTH-01 → FR-AUTH-05

| Endpoint                     | Auth (JWT)                 |
| ---------------------------- | -------------------------- |
| `POST /auth/register`        | Không (Public)             |
| `POST /auth/login`           | Không (Public)             |
| `POST /auth/refresh`         | Không (dùng Refresh Token) |
| `POST /auth/logout`          | 🔒 Yêu cầu JWT             |
| `POST /auth/forgot-password` | Không (Public)             |
| `POST /auth/reset-password`  | Không (Public)             |
| `POST /auth/verify-email`    | Không (Public)             |

### 2.1. `POST /auth/register` — Đăng ký tài khoản Student

- **Actor**: Khách (Public)
- **Mô tả**: Tạo tài khoản Student mới bằng email + mật khẩu.

**Request:**

```json
{
  "username": "nguyenvana",
  "fullName": "Nguyễn Văn A",
  "email": "student@example.com",
  "password": "MatKhau@123"
}
```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "userId": 1002,
    "username": "nguyenvana",
    "email": "student@example.com",
    "status": "PENDING"
  },
  "message": "Đăng ký thành công. Tài khoản đang chờ xác thực email — vui lòng bấm liên kết xác nhận đã gửi trong email."
}
```

**Lỗi**: `409 EMAIL_ALREADY_EXISTS` | `400 VALIDATION_ERROR`

---

### 2.2. `POST /auth/login` — Đăng nhập

- **Actor**: Student, Teacher, Admin
- **Mô tả**: Xác thực bằng **email hoặc tên tài khoản (username)** và trả về cặp Access Token + Refresh Token.

**Request:**

```json
{
  "login": "student@example.com",
  "password": "MatKhau@123"
}
```

> **`login`** nhận một trong hai giá trị: **email** hoặc **username**. Ví dụ: `"student@example.com"` hoặc `"nguyenvana"`.

**Response 200:**

```json
{
  "success": true,
  "data": {
    "accessToken": "<jwt>",
    "tokenType": "Bearer",
    "expiresIn": 10800,
    "user": {
      "userId": 1002,
      "username": "nguyenvana",
      "fullName": "Nguyễn Văn A",
      "email": "student@example.com",
      "role": "STUDENT"
    }
  }
}
```

> **Refresh Token:** được set vào **HttpOnly Secure cookie** `refresh_token` (thời hạn 7 ngày), **không** trả trong JSON body. Chi tiết xem `Docs/JWT_Authentication_Design.md`.

**Lỗi**: `401 INVALID_CREDENTIALS` | `403 ACCOUNT_PENDING` | `403 ACCOUNT_LOCKED`

---

### 2.3. `POST /auth/refresh` — Làm mới Access Token

- **Actor**: Người dùng đã đăng nhập
- **Mô tả**: Dùng Refresh Token (đọc từ cookie) để cấp Access Token mới khi Access Token hết hạn.

**Request:** Không cần body — hệ thống đọc Refresh Token từ cookie `refresh_token`.

**Response 200:**

```json
{
  "success": true,
  "data": {
    "accessToken": "<jwt>",
    "tokenType": "Bearer",
    "expiresIn": 10800
  }
}
```

> **Lưu ý:** Có thể xoay vòng (rotation) Refresh Token — trả lại cookie `refresh_token` mới. Chi tiết xem `Docs/JWT_Authentication_Design.md`.

**Lỗi**: `401 INVALID_REFRESH_TOKEN` | `401 REFRESH_TOKEN_EXPIRED`

---

### 2.4. `POST /auth/logout` — Đăng xuất

- **Actor**: Người dùng đã đăng nhập
- **Mô tả**: Vô hiệu hóa Refresh Token hiện tại.

**Response 200:**

```json
{ "success": true, "message": "Đăng xuất thành công" }
```

---

### 2.5. `POST /auth/forgot-password` — Yêu cầu đặt lại mật khẩu

- **Actor**: Khách (Public)
- **Mô tả**: Gửi liên kết đặt lại mật khẩu (hiệu lực 15 phút) qua email.

**Request:**

```json
{ "email": "student@example.com" }
```

**Response 200:**

```json
{
  "success": true,
  "message": "Nếu email tồn tại, liên kết đặt lại đã được gửi."
}
```

---

### 2.6. `POST /auth/reset-password` — Đặt lại mật khẩu

- **Actor**: Khách (Public)
- **Mô tả**: Đặt lại mật khẩu bằng token nhận qua email.

**Request:**

```json
{
  "token": "<reset-token>",
  "newPassword": "MatKhauMoi@456"
}
```

**Response 200:**

```json
{ "success": true, "message": "Đặt lại mật khẩu thành công" }
```

---

### 2.7. `POST /auth/verify-email` — Xác thực email

- **Actor**: Khách (Public) — người dùng bấm liên kết trong email kích hoạt.
- **Mô tả**: Xác thực email bằng token một lần (hiệu lực 24 giờ) → chuyển `users.status` từ `PENDING` → `ACTIVE`.

**Request:**

```json
{ "token": "<verify-email-token>" }
```

**Response 200:**

```json
{ "success": true, "message": "Xác thực email thành công." }
```

**Lỗi**: `400 INVALID_VERIFY_TOKEN` | `400 VERIFY_TOKEN_EXPIRED`

---

## 3. NHÓM API HỒ SƠ NGƯỜI DÙNG (USER PROFILE)

> Tương ứng: FR-STUDENT-05

> **Yêu cầu JWT (🔒):** Tất cả API nhóm này đều cần `Authorization: Bearer <accessToken>`. `userId` được lấy từ JWT, **không** truyền qua body/URL.

### 3.1. `GET /users/me` — Xem thông tin cá nhân

- **Actor**: Student, Teacher, Admin
- **Mô tả**: Trả về thông tin tài khoản đang đăng nhập.

**Response 200:**

```json
{
  "success": true,
  "data": {
    "userId": 1002,
    "username": "nguyenvana",
    "fullName": "Nguyễn Văn A",
    "email": "student@example.com",
    "avatarUrl": "https://cdn.example.com/avatars/user_1002.png",
    "role": "STUDENT",
    "status": "ACTIVE",
    "createdAt": "2026-08-01T08:00:00Z"
  }
}
```

### 3.2. `PUT /users/me` — Cập nhật hồ sơ

- **Actor**: Student, Teacher, Admin
- **Request:** `fullName`, `avatarUrl` (tùy chọn)
- **Response 200:** đối tượng user đã cập nhật.

### 3.3. `PUT /users/me/password` — Đổi mật khẩu

- **Actor**: Student, Teacher, Admin
- **Request:** `oldPassword`, `newPassword`
- **Response 200:** thông báo thành công.

---

## 4. NHÓM API CHỦ ĐỀ HỌC TẬP (TOPICS)

> Tương ứng: FR-STUDENT-01, FR-TEACHER-01, FR-CONTENT-02, FR-CONTENT-03

| Method   | Endpoint            | Actor                   | Mô tả                                                    | Auth (JWT) |
| -------- | ------------------- | ----------------------- | -------------------------------------------------------- | :--------: |
| `GET`    | `/topics`           | Student, Teacher, Admin | Danh sách chủ đề (lọc `level`, tìm kiếm `q`, phân trang) |     🔒     |
| `GET`    | `/topics/{topicId}` | Student, Teacher, Admin | Chi tiết chủ đề kèm % tiến độ (nếu là Student)           |     🔒     |
| `POST`   | `/topics`           | Teacher                 | Tạo chủ đề mới                                           |     🔒     |
| `PUT`    | `/topics/{topicId}` | Teacher                 | Cập nhật chủ đề                                          |     🔒     |
| `DELETE` | `/topics/{topicId}` | Teacher                 | Xóa chủ đề (cascade xóa bài học)                         |     🔒     |
| `POST`   | `/topics/{topicId}/enroll` | Student                 | Đăng ký/tham gia chủ đề                                   |     🔒     |
| `DELETE` | `/topics/{topicId}/enroll` | Student                 | Hủy đăng ký / rời chủ đề                                  |     🔒     |

### 4.1. `GET /topics` — Danh sách chủ đề

**Query params:** `level=BEGINNER|INTERMEDIATE|ADVANCED`, `q=<từ khóa>`, `page`, `size`, `sort=createdAt,desc`

**Response 200:**

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "topicId": 3,
        "title": "Tiếng Anh giao tiếp cơ bản",
        "description": "Khóa học giao tiếp cho người mới bắt đầu",
        "level": "BEGINNER",
        "teacherName": "Teacher John",
        "lessonCount": 10,
        "progressPercent": 40.0
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 1,
    "totalPages": 1
  }
}
```

### 4.2. `POST /topics` — Tạo chủ đề (Teacher)

**Request:**

```json
{
  "title": "Tiếng Anh giao tiếp cơ bản",
  "description": "Khóa học giao tiếp cho người mới bắt đầu",
  "level": "BEGINNER"
}
```

**Response 201:** đối tượng topic đã tạo (kèm `topicId`, `teacherId`, `createdAt`, `status`).

### 4.3. `POST /topics/{topicId}/enroll` — Đăng ký tham gia chủ đề (Student)

- **Actor**: Student
- **Mô tả**: Tạo hoặc tái kích hoạt bản ghi `topics_enrollment` (idempotent nhờ `UNIQUE(student_id, topic_id)`). Hệ thống có thể tự gọi (auto-join) khi học sinh mở bài học đầu tiên của chủ đề.

**Response 200/201:**

```json
{
  "success": true,
  "data": { "enrollmentId": 301, "topicId": 3, "status": "ENROLLED" },
  "message": "Đã đăng ký tham gia chủ đề."
}
```

**Lỗi**: `404 TOPIC_NOT_FOUND` | `409 ALREADY_ENROLLED`

### 4.4. `DELETE /topics/{topicId}/enroll` — Hủy đăng ký / rời chủ đề (Student)

- **Actor**: Student
- **Mô tả**: Chuyển `topics_enrollment.status` sang `DROPPED` (giữ nguyên lịch sử tiến độ).

**Response 200:**

```json
{ "success": true, "message": "Đã rời chủ đề." }
```

**Lỗi**: `404 ENROLLMENT_NOT_FOUND`

---

## 5. NHÓM API BÀI HỌC (LESSONS)

> Tương ứng: FR-TEACHER-02, FR-STUDENT-02

| Method   | Endpoint                    | Actor                   | Mô tả                                     | Auth (JWT) |
| -------- | --------------------------- | ----------------------- | ----------------------------------------- | :--------: |
| `GET`    | `/topics/{topicId}/lessons` | Student, Teacher, Admin | Danh sách bài học theo chủ đề             |     🔒     |
| `GET`    | `/lessons/{lessonId}`       | Student, Teacher, Admin | Chi tiết bài học (kèm tài liệu, minigame) |     🔒     |
| `POST`   | `/topics/{topicId}/lessons` | Teacher                 | Thêm bài học                              |     🔒     |
| `PUT`    | `/lessons/{lessonId}`       | Teacher                 | Cập nhật bài học                          |     🔒     |
| `DELETE` | `/lessons/{lessonId}`       | Teacher                 | Xóa bài học                               |     🔒     |

### 5.1. `POST /topics/{topicId}/lessons` — Tạo bài học (Teacher)

**Request:**

```json
{
  "title": "Bài 1: Chào hỏi (Greetings)",
  "orderIndex": 1,
  "completionThreshold": 80.0
}
```

**Response 201:** đối tượng lesson đã tạo (kèm `lessonId`, `topicId`).

### 5.2. `GET /lessons/{lessonId}` — Chi tiết bài học

**Response 200:**

```json
{
  "success": true,
  "data": {
    "lessonId": 15,
    "topicId": 3,
    "title": "Bài 1: Chào hỏi (Greetings)",
    "orderIndex": 1,
    "completionThreshold": 80.0,
    "materials": [
      { "materialId": 42, "type": "VIDEO", "fileUrl": "<signed-url>" },
      { "materialId": 43, "type": "PDF", "fileUrl": "<signed-url>" }
    ],
    "minigames": [
      {
        "minigameId": 101,
        "title": "Ôn tập từ vựng Bài 1",
        "status": "PUBLISHED"
      }
    ]
  }
}
```

---

## 6. NHÓM API HỌC LIỆU ĐA PHƯƠNG TIỆN (MATERIALS)

> Tương ứng: FR-TEACHER-03, FR-CONTENT-01

| Method   | Endpoint                        | Actor                   | Mô tả                                 | Auth (JWT) |
| -------- | ------------------------------- | ----------------------- | ------------------------------------- | :--------: |
| `GET`    | `/lessons/{lessonId}/materials` | Student, Teacher, Admin | Danh sách học liệu                    |     🔒     |
| `POST`   | `/lessons/{lessonId}/materials` | Teacher                 | Upload học liệu (multipart/form-data) |     🔒     |
| `DELETE` | `/materials/{materialId}`       | Teacher                 | Xóa học liệu                          |     🔒     |

### 6.1. `POST /lessons/{lessonId}/materials` — Upload học liệu

- **Content-Type:** `multipart/form-data`
- **Form fields:** `file` (file), `type` (`VIDEO` | `PDF` | `WORD`)
- **Giới hạn:** PDF/Word ≤ 25MB, Video ≤ 200MB (theo NFR-SEC-07)

**Response 201:**

```json
{
  "success": true,
  "data": {
    "materialId": 42,
    "lessonId": 15,
    "type": "VIDEO",
    "fileUrl": "<signed-url>"
  }
}
```

**Lỗi**: `413 FILE_TOO_LARGE` | `400 INVALID_FILE_TYPE`

---

## 7. NHÓM API TỪ VỰNG & CSV (VOCABULARY / CSV)

> Tương ứng: FR-TEACHER-04, FR-TEACHER-05, NFR-PERF-01

> **Yêu cầu JWT (🔒):** Tất cả API nhóm này đều cần JWT. `POST` chỉ dành cho Teacher — `role` lấy từ JWT.

### 7.1. `POST /lessons/{lessonId}/vocab/csv` — Upload CSV từ vựng

- **Actor**: Teacher
- **Content-Type:** `multipart/form-data` (trường `file`)
- **Giới hạn:** CSV ≤ 5MB, tối đa 2000 dòng

**Định dạng CSV chuẩn (header bắt buộc):**

| Cột | Tên header      | Bắt buộc | Ví dụ                                       |
| --- | --------------- | -------- | ------------------------------------------- |
| 1   | `word`          | ✅       | resilient                                   |
| 2   | `meaning`       | ✅       | kiên cường, bền bỉ                          |
| 3   | `pronunciation` | ❌       | /rɪˈzɪl.jənt/                               |
| 4   | `example`       | ❌       | She is resilient in the face of difficulty. |

- Encoding: UTF-8 (có BOM hoặc không BOM).
- Dấu phân tách: dấu phẩy `,`.

**Response 200 (thành công):**

```json
{
  "success": true,
  "data": {
    "importedCount": 48,
    "failedRows": [],
    "minigame": {
      "minigameId": 101,
      "title": "Ôn tập từ vựng Bài 1",
      "status": "DRAFT"
    }
  }
}
```

**Response 400 (file lỗi — trả về danh sách lỗi theo dòng):**

```json
{
  "success": false,
  "error": {
    "code": "CSV_INVALID_FORMAT",
    "message": "File CSV có lỗi định dạng",
    "details": {
      "errors": [
        { "line": 3, "error": "Thiếu cột 'meaning'" },
        { "line": 14, "error": "Cột 'word' bị trống" },
        { "line": 27, "error": "Encoding không phải UTF-8" }
      ]
    }
  }
}
```

### 7.2. `GET /lessons/{lessonId}/vocab` — Danh sách từ vựng

- **Actor**: Student, Teacher, Admin
- **Query params:** `page`, `size`, `q` (tìm theo từ)

**Response 200:**

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "vocabId": 502,
        "word": "resilient",
        "meaning": "kiên cường, bền bỉ",
        "pronunciation": "/rɪˈzɪl.jənt/",
        "example": "She is resilient in the face of difficulty."
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 48,
    "totalPages": 3
  }
}
```

---

## 8. NHÓM API MINIGAME (ÔN TẬP TỪ VỰNG)

> Tương ứng: FR-MINIGAME-01 → FR-MINIGAME-04

| Method | Endpoint                           | Actor                   | Mô tả                                    | Auth (JWT) |
| ------ | ---------------------------------- | ----------------------- | ---------------------------------------- | :--------: |
| `GET`  | `/lessons/{lessonId}/minigames`    | Student, Teacher, Admin | Danh sách minigame theo bài học          |     🔒     |
| `GET`  | `/minigames/{minigameId}`          | Student, Teacher        | Lấy câu hỏi (Teacher = chế độ xem trước) |     🔒     |
| `POST` | `/minigames/{minigameId}/publish`  | Teacher                 | Xuất bản minigame                        |     🔒     |
| `POST` | `/minigames/{minigameId}/attempts` | Student                 | Nộp bài làm                              |     🔒     |
| `GET`  | `/minigames/{minigameId}/attempts` | Student                 | Lịch sử làm bài                          |     🔒     |

### 8.1. `GET /minigames/{minigameId}` — Lấy câu hỏi

**Response 200 (Student — không kèm đáp án đúng):**

```json
{
  "success": true,
  "data": {
    "minigameId": 101,
    "title": "Ôn tập từ vựng Bài 1",
    "status": "PUBLISHED",
    "questions": [
      {
        "questionId": 1,
        "questionType": "MULTIPLE_CHOICE",
        "orderIndex": 1,
        "payload": {
          "questionText": "Nghĩa của từ 'Resilient' là gì?",
          "options": [
            { "key": "A", "text": "Kiên cường, bền bỉ" },
            { "key": "B", "text": "Yếu ớt, dễ vỡ" },
            { "key": "C", "text": "Hài hước, vui vẻ" },
            { "key": "D", "text": "Nghiêm khắc" }
          ]
        }
      }
    ]
  }
}
```

> **Lưu ý:** Teacher ở chế độ xem trước sẽ thấy thêm trường `is_correct` trong options (FR-MINIGAME-03).
> **Loại câu hỏi (`questionType`):** `MULTIPLE_CHOICE` dùng `payload.options` + `is_correct`; `MATCHING` (ghép từ — mở rộng giai đoạn sau) dùng `payload.pairs`, ví dụ `[{"left":"apple","right":"quả táo"}]`.

### 8.2. `POST /minigames/{minigameId}/attempts` — Nộp bài

**Request:**

```json
{
  "answers": [
    { "questionId": 1, "selectedKey": "A" },
    { "questionId": 2, "selectedKey": "B" }
  ]
}
```

**Response 200:**

```json
{
  "success": true,
  "data": {
    "attemptId": 9001,
    "score": 90.0,
    "totalQuestions": 10,
    "correctAnswers": 9,
    "isPassed": true,
    "lessonCompleted": true,
    "topicProgressPercent": 60.0
  }
}
```

> **Lưu ý (lấy bản ghi mới nhất):** Khi 1 bài học có nhiều minigame đã **PUBLISHED**, bài học chỉ được tính là **hoàn thành** khi học sinh đạt ngưỡng `completion_threshold` ở **tất cả** các minigame đó. Trạng thái/điểm tiến độ luôn lấy từ **bản ghi mới nhất** (`attempt_number` cao nhất / `created_at` mới nhất) — học sinh làm lại sẽ tạo bản ghi mới, không ghi đè lịch sử cũ.

### 8.3. `GET /minigames/{minigameId}/attempts` — Lịch sử làm bài

**Response 200:**

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "attemptId": 9001,
        "score": 90.0,
        "isPassed": true,
        "attemptedAt": "2026-08-22T14:20:10Z"
      }
    ]
  }
}
```

---

## 9. NHÓM API TIẾN ĐỘ HỌC TẬP (PROGRESS)

> Tương ứng: FR-STUDENT-04

> **Yêu cầu JWT (🔒):** Chỉ Student. `userId` lấy từ JWT, **không** truyền qua body/URL.

### 9.1. `GET /progress` — Tiến độ tổng thể của Student

> **Ghi chú:** Các số liệu (`completedLessons`, `progressPercent`) được tính từ **bản ghi `LESSON_PROGRESS` mới nhất** của từng bài học (theo `attempt_number DESC`); các bản ghi cũ chỉ phục vụ lịch sử.

**Response 200:**

```json
{
  "success": true,
  "data": {
    "overallProgressPercent": 45.5,
    "topics": [
      {
        "topicId": 3,
        "title": "Tiếng Anh giao tiếp cơ bản",
        "completedLessons": 4,
        "totalLessons": 10,
        "progressPercent": 40.0
      }
    ]
  }
}
```

### 9.2. `GET /topics/{topicId}/progress` — Tiến độ theo chủ đề

**Response 200:** đối tượng topic kèm `progressPercent`, `completedLessons`, `totalLessons`.

---

## 10. NHÓM API BÌNH LUẬN (COMMENTS)

> Tương ứng: FR-STUDENT-06, FR-TEACHER-06, FR-ADMIN-04

> **Yêu cầu JWT (🔒):** Tất cả API nhóm này đều cần JWT. `author` (userId, fullName, role) được lấy từ JWT.

### 10.1. `GET /comments` — Danh sách bình luận

- **Query params:** `targetType=TOPIC|LESSON`, `targetId`, `page`, `size`

**Response 200:**

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "commentId": 121,
        "target": { "type": "LESSON", "id": 15 },
        "author": {
          "userId": 1002,
          "fullName": "Nguyễn Văn A",
          "avatarUrl": "https://cdn.example.com/avatars/user_1002.png",
          "role": "STUDENT"
        },
        "content": "Thầy ơi cho em hỏi cách phát âm từ 'Resilient' ạ?",
        "replyCount": 1,
        "replies": [
          {
            "replyId": 122,
            "author": {
              "userId": 501,
              "fullName": "Teacher John",
              "role": "TEACHER"
            },
            "content": "Em nhấn trọng âm rơi vào âm tiết thứ hai nhé.",
            "createdAt": "2026-08-20T10:35:00Z"
          }
        ],
        "createdAt": "2026-08-20T10:30:00Z"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 12
  }
}
```

### 10.2. `POST /comments` — Tạo bình luận

**Request:**

```json
{
  "targetType": "LESSON",
  "targetId": 15,
  "content": "Thầy ơi cho em hỏi cách phát âm từ 'Resilient' ạ?"
}
```

**Response 201:** đối tượng comment đã tạo.

### 10.3. `POST /comments/{commentId}/replies` — Phản hồi bình luận (Teacher)

**Request:**

```json
{ "content": "Em nhấn trọng âm rơi vào âm tiết thứ hai nhé." }
```

**Response 201:** đối tượng reply đã tạo.

---

## 11. NHÓM API TÌM KIẾM (SEARCH)

> Tương ứng: FR-CONTENT-03

> **Yêu cầu JWT (🔒):** Cần JWT để xác thực người dùng.

### 11.1. `GET /search` — Tìm kiếm chủ đề/bài học

- **Query params:** `q` (từ khóa bắt buộc), `page`, `size`
- **Mô tả:** Tìm kiếm theo tên chủ đề và bài học, thời gian phản hồi ≤ 2 giây.

**Response 200:**

```json
{
  "success": true,
  "data": {
    "topics": [
      {
        "topicId": 3,
        "title": "Tiếng Anh giao tiếp cơ bản",
        "level": "BEGINNER"
      }
    ],
    "lessons": [{ "lessonId": 15, "title": "Bài 1: Chào hỏi", "topicId": 3 }]
  }
}
```

---

## 12. NHÓM API QUẢN TRỊ (ADMIN)

> Tương ứng: FR-ADMIN-01 → FR-ADMIN-04

| Method | Endpoint                       | Actor | Mô tả                                       | Auth (JWT) |
| ------ | ------------------------------ | ----- | ------------------------------------------- | :--------: |
| `POST` | `/admin/teachers`              | Admin | Cấp tài khoản Teacher                       |     🔒     |
| `GET`  | `/admin/users`                 | Admin | Danh sách người dùng (lọc `role`, `status`) |     🔒     |
| `PUT`  | `/admin/users/{userId}/status` | Admin | Khóa/mở khóa tài khoản                      |     🔒     |
| `GET`  | `/admin/dashboard`             | Admin | Dữ liệu Dashboard phân tích                 |     🔒     |

### 12.1. `POST /admin/teachers` — Cấp tài khoản Teacher

**Request:**

```json
{
  "fullName": "Teacher John",
  "email": "teacher@example.com"
}
```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "userId": 501,
    "email": "teacher@example.com",
    "role": "TEACHER",
    "status": "PENDING"
  },
  "message": "Đã tạo tài khoản. Teacher cần xác thực email (liên kết kích hoạt) trước khi đăng nhập."
}
```

**Lỗi**: `409 EMAIL_ALREADY_EXISTS`

### 12.2. `PUT /admin/users/{userId}/status` — Khóa/mở khóa tài khoản

**Request:**

```json
{ "status": "LOCKED" }
```

**Response 200:** đối tượng user đã cập nhật trạng thái.

### 12.3. `GET /admin/dashboard` — Dashboard phân tích

- **Query params:** `from` (ngày bắt đầu), `to` (ngày kết thúc)

**Response 200:**

```json
{
  "success": true,
  "data": {
    "userGrowth": { "totalStudents": 1200, "newStudentsThisMonth": 85 },
    "completionRate": { "averagePercent": 42.3 },
    "contentMetrics": {
      "totalTopics": 15,
      "totalLessons": 120,
      "totalMinigames": 95,
      "totalComments": 340
    }
  }
}
```

---

## 13. NHÓM API CHỨNG CHỈ GIÁO VIÊN (TEACHER CERTIFICATES)

> Tương ứng: bảng `teacher_certificates` (Database Design) — Teacher quản lý chứng chỉ của mình; Admin duyệt (verify). Trạng thái: `PENDING | VERIFIED | REJECTED`.

> **Yêu cầu JWT (🔒):** `userId` lấy từ JWT → map sang `teacherId`.

| Method   | Endpoint                                                          | Actor   | Mô tả                               | Auth (JWT) |
| -------- | ----------------------------------------------------------------- | ------- | ----------------------------------- | :--------: |
| `GET`    | `/teachers/me/certificates`                                       | Teacher | Danh sách chứng chỉ của giáo viên   |     🔒     |
| `POST`   | `/teachers/me/certificates`                                       | Teacher | Thêm chứng chỉ (mặc định `PENDING`) |     🔒     |
| `PUT`    | `/teachers/me/certificates/{certificateId}`                       | Teacher | Cập nhật chứng chỉ                  |     🔒     |
| `DELETE` | `/teachers/me/certificates/{certificateId}`                       | Teacher | Xóa chứng chỉ                       |     🔒     |
| `POST`   | `/admin/teachers/{teacherId}/certificates/{certificateId}/verify` | Admin   | Duyệt: `VERIFIED` / `REJECTED`      |     🔒     |

### 13.1. `POST /teachers/me/certificates` — Thêm chứng chỉ

**Request:**

```json
{
  "name": "IELTS",
  "score": "8.5",
  "issuingBody": "IDP",
  "imageUrl": "https://example.com/certs/ielts.jpg"
}
```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "certificateId": 201,
    "name": "IELTS",
    "score": "8.5",
    "issuingBody": "IDP",
    "status": "PENDING",
    "imageUrl": "https://example.com/certs/ielts.jpg"
  },
  "message": "Đã thêm chứng chỉ, chờ Admin xác minh."
}
```

### 13.2. `POST /admin/teachers/{teacherId}/certificates/{certificateId}/verify` — Duyệt chứng chỉ

**Request:**

```json
{ "status": "VERIFIED" }
```

**Response 200:** đối tượng certificate với `status` đã cập nhật.

---

## 14. PHÂN QUYỀN TRUY CẬP (RBAC MAP)

| Nhóm API                       | Public | Student | Teacher | Admin |
| ------------------------------ | :----: | :-----: | :-----: | :---: |
| Auth (register, login, verify, forgot) |   ✅   |   ✅    |   ✅    |  ✅   |
| Profile (`/users/me`)          |   ❌   |   ✅    |   ✅    |  ✅   |
| Topics (GET)                   |   ❌   |   ✅    |   ✅    |  ✅   |
| Topics (POST/PUT/DELETE)       |   ❌   |   ❌    |   ✅    |  ❌   |
| Topics (enroll/unenroll)       |   ❌   |   ✅    |   ❌    |  ❌   |
| Lessons (GET)                  |   ❌   |   ✅    |   ✅    |  ✅   |
| Lessons (POST/PUT/DELETE)      |   ❌   |   ❌    |   ✅    |  ❌   |
| Materials (GET)                |   ❌   |   ✅    |   ✅    |  ✅   |
| Materials (POST/DELETE)        |   ❌   |   ❌    |   ✅    |  ❌   |
| Vocab CSV (POST)               |   ❌   |   ❌    |   ✅    |  ❌   |
| Minigame (play/submit)         |   ❌   |   ✅    |   ❌    |  ❌   |
| Minigame (publish)             |   ❌   |   ❌    |   ✅    |  ❌   |
| Progress                       |   ❌   |   ✅    |   ❌    |  ❌   |
| Comments (GET/POST)            |   ❌   |   ✅    |   ✅    |  ❌   |
| Teacher Certificates (CRUD)    |   ❌   |   ❌    |   ✅    |  ❌   |
| Teacher Certificates (verify)  |   ❌   |   ❌    |   ❌    |  ✅   |
| Admin (`/admin/*`)             |   ❌   |   ❌    |   ❌    |  ✅   |

---

## 15. GHI CHÚ TRIỂN KHAI (BACKEND IMPLEMENTATION NOTES)

1. **Sinh OpenAPI tự động:** Thêm dependency `springdoc-openapi-starter-webmvc-ui` vào `pom.xml`, sau đó truy cập `http://localhost:8080/swagger-ui.html` để xem và đối chiếu.
2. **Chuẩn hóa Envelope:** Dùng 1 lớp `ApiResponse<T>` chung (fields: `success`, `data`, `message`, `timestamp`) cho mọi response.
3. **Xử lý lỗi tập trung:** Dùng `@RestControllerAdvice` + `@ExceptionHandler` để trả về cấu trúc lỗi chuẩn ở mục 1.4.
4. **Media & file:** File được lưu ở object storage (S3/MinIO), trả về Signed URL có thời hạn 30–60 phút (theo NFR-SEC-04).
5. **Parse CSV bất đồng bộ:** Với file > 500 dòng, đưa vào Message Queue để xử lý nền (theo NFR-SCALE-03).

---

_Tài liệu định hướng. Được sinh từ BRD/SRS và Database Design hiện có — cập nhật khi Backend có API thực tế._
