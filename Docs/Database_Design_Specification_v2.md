# TÀI LIỆU THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE DESIGN SPECIFICATION)

## Nền tảng Học tiếng Anh Trực tuyến Đa nền tảng (Web & Mobile App)

**Kiến trúc:** Polyglot Persistence (Relational Database MySQL/PostgreSQL + NoSQL MongoDB)  
**Phiên bản:** 2.1  
**Ngày cập nhật:** 22/08/2026

---

## 1. TỔNG QUAN KIẾN TRÚC LƯU TRỮ (HYBRID ARCHITECTURE)

Hệ thống áp dụng mô hình lưu trữ đa cơ sở dữ liệu (**Polyglot Persistence**) nhằm cân bằng giữa tính toàn vẹn dữ liệu (ACID) của các nghiệp vụ cốt lõi và sự linh hoạt, tốc độ đọc ghi cao của NoSQL:

1. **Relational Database (MySQL / PostgreSQL - 8 Bảng):**
   - Đảm nhiệm nghiệp vụ có cấu trúc cố định, quan hệ ràng buộc chặt chẽ và yêu cầu giao dịch ACID cao.
   - Bao gồm: Quản lý người dùng, phân quyền (RBAC), danh mục chủ đề, bài học, tài liệu học tập, từ vựng chuẩn hóa, tiến độ học tập và quản lý minigame.

2. **NoSQL Database (MongoDB - 5 Collections):**
   - **Nghiệp vụ linh hoạt & Phân cấp (2 Collections):**
     - `minigame_questions`: Lưu trữ cấu trúc câu hỏi đa dạng (trắc nghiệm, nối từ, điền từ) dưới dạng JSON đa hình (polymorphic).
     - `comments`: Lưu trữ cây bình luận lồng nhau đa cấp (Nested/Embedded Replies) có hiệu năng đọc cao.
   - **Nhật ký & Giám sát Hệ thống (3 Collections Logging):**
     - `audit_logs`: Nhật ký kiểm toán các thao tác quản trị nhạy cảm (phân quyền, xóa nội dung).
     - `activity_logs`: Nhật ký tương tác học tập của học viên (mở video, tải PDF, click bài giảng).
     - `system_error_logs`: Nhật ký lỗi runtime, ngoại lệ (Exceptions) từ API/Worker backend phục vụ giám sát và khắc phục sự cố.

---

## 2. MÔ HÌNH QUAN HỆ CƠ SỞ DỮ LIỆU (RELATIONSHIP MODEL & ERD)

### 2.1. Sơ đồ Quan hệ Thực thể Toàn diện (Full ERD Diagram)

```mermaid
erDiagram
    %% SQL Relational Tables
    USERS ||--o{ TOPICS : "teaches/creates"
    USERS ||--o{ MINIGAME_ATTEMPTS : "takes"
    USERS ||--o{ LESSON_PROGRESS : "tracks"

    TOPICS ||--|{ LESSONS : "contains"

    LESSONS ||--o{ LESSON_MATERIALS : "has"
    LESSONS ||--o{ VOCABULARY_ITEMS : "parsed_into"
    LESSONS ||--o{ MINIGAMES : "includes"
    LESSONS ||--o{ LESSON_PROGRESS : "tracked_by"

    MINIGAMES ||--o{ MINIGAME_ATTEMPTS : "records"

    %% Cross-Database References (SQL to MongoDB)
    MINIGAMES ||--|{ MINIGAME_QUESTIONS_COLLECTION : "embeds_id_to"
    VOCABULARY_ITEMS ||--o{ MINIGAME_QUESTIONS_COLLECTION : "referenced_by"
    LESSONS ||--o{ COMMENTS_COLLECTION : "receives_target"
    TOPICS ||--o{ COMMENTS_COLLECTION : "receives_target"
    USERS ||--o{ COMMENTS_COLLECTION : "authors"
    USERS ||--o{ AUDIT_LOGS_COLLECTION : "performed_by"
    USERS ||--o{ ACTIVITY_LOGS_COLLECTION : "generates_event"

    %% SQL Entities
    USERS {
        bigint user_id PK
        varchar full_name
        varchar username UK
        varchar email UK
        varchar password_hash
        enum role "STUDENT, TEACHER, ADMIN"
        enum status "ACTIVE, LOCKED"
        datetime created_at
    }

    TOPICS {
        bigint topic_id PK
        bigint teacher_id FK
        varchar title
        text description
        varchar level
        datetime created_at
    }

    LESSONS {
        bigint lesson_id PK
        bigint topic_id FK
        varchar title
        int order_index
        decimal completion_threshold
        datetime created_at
    }

    LESSON_MATERIALS {
        bigint material_id PK
        bigint lesson_id FK
        enum type "VIDEO, PDF, WORD"
        varchar file_url
        datetime created_at
    }

    VOCABULARY_ITEMS {
        bigint vocab_id PK
        bigint lesson_id FK
        varchar word
        varchar meaning
        varchar pronunciation
        text example
    }

    MINIGAMES {
        bigint minigame_id PK
        bigint lesson_id FK
        varchar title
        enum status "DRAFT, PUBLISHED"
        datetime created_at
    }

    MINIGAME_ATTEMPTS {
        bigint attempt_id PK
        bigint minigame_id FK
        bigint student_id FK
        decimal score
        boolean is_passed
        datetime attempted_at
    }

    LESSON_PROGRESS {
        bigint progress_id PK
        bigint student_id FK
        bigint lesson_id FK
        enum status "IN_PROGRESS, COMPLETED"
        datetime updated_at
    }

    %% MongoDB Collections
    MINIGAME_QUESTIONS_COLLECTION {
        ObjectId _id PK
        int64 minigame_id FK_SQL
        int64 vocab_id FK_SQL_opt
        string question_type
        json payload
    }

    COMMENTS_COLLECTION {
        ObjectId _id PK
        json target "type: TOPIC/LESSON, id: SQL_ID"
        json author "user_id, name, role"
        string content
        array replies "Nested embedded replies"
    }

    AUDIT_LOGS_COLLECTION {
        ObjectId _id PK
        json actor "user_id, email, role"
        string action
        json details
    }

    ACTIVITY_LOGS_COLLECTION {
        ObjectId _id PK
        int64 student_id FK_SQL
        string event_type
        json context
    }
```

---

### 2.2. Bảng Ma trận Quan hệ Chi tiết (Relationship Matrix)

| Bảng nguồn (Parent / Source) | Bảng đích (Child / Target) | Loại quan hệ | Khóa ngoại (Foreign Key)                                     | Quy tắc toàn vẹn (Cascade Rule) | Mô tả nghiệp vụ                                                                            |
| ---------------------------- | -------------------------- | :----------: | ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------ |
| `USERS`                      | `TOPICS`                   |  **1 – N**   | `TOPICS.teacher_id` $ o$ `USERS.user_id`                     | `ON DELETE RESTRICT`            | Một giáo viên phụ trách nhiều chủ đề; không thể xóa user nếu đang là chủ nhiệm của chủ đề. |
| `TOPICS`                     | `LESSONS`                  |  **1 – N**   | `LESSONS.topic_id` $ o$ `TOPICS.topic_id`                    | `ON DELETE CASCADE`             | Một chủ đề chứa nhiều bài học tuần tự; xóa chủ đề sẽ xóa toàn bộ bài học bên trong.        |
| `LESSONS`                    | `LESSON_MATERIALS`         |  **1 – N**   | `LESSON_MATERIALS.lesson_id` $ o$ `LESSONS.lesson_id`        | `ON DELETE CASCADE`             | Một bài học chứa nhiều tài liệu đa phương tiện (Video, PDF, Word).                         |
| `LESSONS`                    | `VOCABULARY_ITEMS`         |  **1 – N**   | `VOCABULARY_ITEMS.lesson_id` $ o$ `LESSONS.lesson_id`        | `ON DELETE CASCADE`             | Một bài học chứa nhiều từ vựng được parse từ file CSV.                                     |
| `LESSONS`                    | `MINIGAMES`                |  **1 – N**   | `MINIGAMES.lesson_id` $ o$ `LESSONS.lesson_id`               | `ON DELETE CASCADE`             | Một bài học có thể gắn kèm 1 hoặc nhiều bài tập minigame ôn tập.                           |
| `MINIGAMES`                  | `MINIGAME_ATTEMPTS`        |  **1 – N**   | `MINIGAME_ATTEMPTS.minigame_id` $ o$ `MINIGAMES.minigame_id` | `ON DELETE CASCADE`             | Một minigame ghi nhận nhiều lượt nộp bài từ học sinh.                                      |
| `USERS`                      | `MINIGAME_ATTEMPTS`        |  **1 – N**   | `MINIGAME_ATTEMPTS.student_id` $ o$ `USERS.user_id`          | `ON DELETE CASCADE`             | Một học sinh có thể làm minigame nhiều lần để cải thiện điểm số.                           |
| `USERS`                      | `LESSON_PROGRESS`          |  **1 – N**   | `LESSON_PROGRESS.student_id` $ o$ `USERS.user_id`            | `ON DELETE CASCADE`             | Một học sinh có bản ghi theo dõi tiến độ riêng cho từng bài học.                           |
| `LESSONS`                    | `LESSON_PROGRESS`          |  **1 – N**   | `LESSON_PROGRESS.lesson_id` $ o$ `LESSONS.lesson_id`         | `ON DELETE CASCADE`             | Một bài học được theo dõi tiến độ độc lập bởi nhiều học sinh.                              |

---

### 2.3. Ma trận Tham chiếu Chéo Cơ sở dữ liệu (Cross-Database References: SQL $\leftrightarrow$ MongoDB)

Do hệ thống sử dụng kiến trúc lai, việc liên kết giữa các bảng SQL và MongoDB Collections được quản lý logic tại **Application Service Layer**:

| SQL Entity (Source)                     | MongoDB Collection (Target) | Khóa liên kết Logic                           | Hướng truy xuất & Tối ưu hóa                                                                                                                         |
| --------------------------------------- | --------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MINIGAMES.minigame_id`                 | `minigame_questions`        | `minigame_questions.minigame_id`              | **1 – N**: Khi học sinh bắt đầu làm quiz, backend query MongoDB theo `minigame_id` để lấy toàn bộ câu hỏi và danh sách options JSON.                 |
| `VOCABULARY_ITEMS.vocab_id`             | `minigame_questions`        | `minigame_questions.vocab_id` (nullable)      | **1 – N**: Truy vết câu hỏi bắt nguồn từ từ vựng nào để phục vụ phân tích câu hỏi hay bị làm sai.                                                    |
| `LESSONS.lesson_id` / `TOPICS.topic_id` | `comments`                  | `comments.target.id` & `comments.target.type` | **1 – N**: Lấy cây thảo luận của bài học/chủ đề bằng 1 query duy nhất kết hợp phân trang `skip/limit`.                                               |
| `USERS.user_id`                         | `comments`                  | `comments.author.user_id`                     | **Snapshot Pattern**: Lưu trực tiếp `full_name`, `avatar_url`, `role` vào MongoDB Document để tránh phải query JOIN sang SQL khi hiển thị bình luận. |
| `USERS.user_id`                         | `audit_logs`                | `audit_logs.actor.user_id`                    | **1 – N**: Truy vết lịch sử thao tác của Admin/Teacher khi kiểm toán bảo mật.                                                                        |
| `USERS.user_id`                         | `activity_logs`             | `activity_logs.student_id`                    | **1 – N**: Thu thập log tương tác thời gian thực của học sinh trên Web và Mobile App.                                                                |

---

## 3. THIẾT KẾ CHI TIẾT CSDL QUAN HỆ (RDBMS - 8 BẢNG)

### 3.1. Chi tiết Đặc tả 8 Bảng SQL

#### 1. Bảng `USERS` (Tài khoản & Phân quyền)

| Tên trường      | Kiểu dữ liệu |  Khóa  | Ràng buộc                           | Mô tả & Ý nghĩa nghiệp vụ                       |
| --------------- | ------------ | :----: | ----------------------------------- | ----------------------------------------------- |
| `user_id`       | BIGINT       | **PK** | AUTO_INCREMENT                      | Khóa chính định danh tài khoản                  |
| `full_name`     | VARCHAR(255) |        | NOT NULL                            | Họ và tên hiển thị trên hệ thống                |
| `username`      | VARCHAR(50)  | **UQ** | NOT NULL, UNIQUE                    | Tên tài khoản đăng nhập (dùng thay email)       |
| `email`         | VARCHAR(255) | **UQ** | NOT NULL, UNIQUE                    | Địa chỉ email đăng nhập và nhận thông báo       |
| `password_hash` | VARCHAR(255) |        | NOT NULL                            | Mật khẩu băm (Bcrypt cost 12 hoặc Argon2id)     |
| `role`          | VARCHAR(20)  |        | NOT NULL, DEFAULT 'STUDENT'         | Phân quyền: `'STUDENT'`, `'TEACHER'`, `'ADMIN'` |
| `status`        | VARCHAR(20)  |        | NOT NULL, DEFAULT 'ACTIVE'          | Trạng thái: `'ACTIVE'`, `'LOCKED'`              |
| `created_at`    | DATETIME     |        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo tài khoản                         |

#### 2. Bảng `TOPICS` (Chủ đề học tập)

| Tên trường    | Kiểu dữ liệu |  Khóa  | Ràng buộc                           | Mô tả & Ý nghĩa nghiệp vụ                            |
| ------------- | ------------ | :----: | ----------------------------------- | ---------------------------------------------------- |
| `topic_id`    | BIGINT       | **PK** | AUTO_INCREMENT                      | Khóa chính của chủ đề                                |
| `teacher_id`  | BIGINT       | **FK** | NOT NULL, REFERENCES USERS(user_id) | Giảng viên phụ trách/tạo chủ đề                      |
| `title`       | VARCHAR(255) |        | NOT NULL                            | Tiêu đề của chủ đề                                   |
| `description` | TEXT         |        | NULL                                | Mô tả chi tiết mục tiêu khóa học                     |
| `level`       | VARCHAR(50)  |        | NOT NULL                            | Cấp độ: `'BEGINNER'`, `'INTERMEDIATE'`, `'ADVANCED'` |
| `created_at`  | DATETIME     |        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Ngày tạo chủ đề                                      |

#### 3. Bảng `LESSONS` (Bài học trong chủ đề)

| Tên trường             | Kiểu dữ liệu |  Khóa  | Ràng buộc                             | Mô tả & Ý nghĩa nghiệp vụ                      |
| ---------------------- | ------------ | :----: | ------------------------------------- | ---------------------------------------------- |
| `lesson_id`            | BIGINT       | **PK** | AUTO_INCREMENT                        | Khóa chính bài học                             |
| `topic_id`             | BIGINT       | **FK** | NOT NULL, REFERENCES TOPICS(topic_id) | Chủ đề chứa bài học này                        |
| `title`                | VARCHAR(255) |        | NOT NULL                              | Tiêu đề bài học                                |
| `order_index`          | INT          |        | NOT NULL, DEFAULT 1                   | Thứ tự sắp xếp hiển thị trong chủ đề           |
| `completion_threshold` | DECIMAL(5,2) |        | NOT NULL, DEFAULT 80.00               | Ngưỡng điểm % tối thiểu để tính hoàn thành bài |
| `created_at`           | DATETIME     |        | NOT NULL, DEFAULT CURRENT_TIMESTAMP   | Thời điểm tạo bài học                          |

#### 4. Bảng `LESSON_MATERIALS` (Học liệu đa phương tiện)

| Tên trường    | Kiểu dữ liệu |  Khóa  | Ràng buộc                               | Mô tả & Ý nghĩa nghiệp vụ                             |
| ------------- | ------------ | :----: | --------------------------------------- | ----------------------------------------------------- |
| `material_id` | BIGINT       | **PK** | AUTO_INCREMENT                          | Khóa chính tài liệu                                   |
| `lesson_id`   | BIGINT       | **FK** | NOT NULL, REFERENCES LESSONS(lesson_id) | Bài học gắn liền tài liệu                             |
| `type`        | VARCHAR(20)  |        | NOT NULL                                | Định dạng file: `'VIDEO'`, `'PDF'`, `'WORD'`          |
| `file_url`    | VARCHAR(500) |        | NOT NULL                                | Đường dẫn lưu trữ an toàn (Signed URL/Pre-signed URL) |
| `created_at`  | DATETIME     |        | NOT NULL, DEFAULT CURRENT_TIMESTAMP     | Thời điểm tải tài liệu lên                            |

#### 5. Bảng `VOCABULARY_ITEMS` (Từ vựng bóc tách từ CSV)

| Tên trường      | Kiểu dữ liệu |  Khóa  | Ràng buộc                               | Mô tả & Ý nghĩa nghiệp vụ    |
| --------------- | ------------ | :----: | --------------------------------------- | ---------------------------- |
| `vocab_id`      | BIGINT       | **PK** | AUTO_INCREMENT                          | Khóa chính mục từ vựng       |
| `lesson_id`     | BIGINT       | **FK** | NOT NULL, REFERENCES LESSONS(lesson_id) | Bài học chứa từ vựng này     |
| `word`          | VARCHAR(255) |        | NOT NULL                                | Từ vựng tiếng Anh gốc        |
| `meaning`       | VARCHAR(500) |        | NOT NULL                                | Nghĩa tiếng Việt của từ      |
| `pronunciation` | VARCHAR(255) |        | NULL                                    | Ký hiệu phiên âm quốc tế IPA |
| `example`       | TEXT         |        | NULL                                    | Câu ví dụ minh họa ngữ cảnh  |

#### 6. Bảng `MINIGAMES` (Trò chơi ôn tập bài học)

| Tên trường    | Kiểu dữ liệu |  Khóa  | Ràng buộc                               | Mô tả & Ý nghĩa nghiệp vụ                                    |
| ------------- | ------------ | :----: | --------------------------------------- | ------------------------------------------------------------ |
| `minigame_id` | BIGINT       | **PK** | AUTO_INCREMENT                          | Khóa chính minigame (Ref sang MongoDB questions)             |
| `lesson_id`   | BIGINT       | **FK** | NOT NULL, REFERENCES LESSONS(lesson_id) | Gắn với bài học tương ứng                                    |
| `title`       | VARCHAR(255) |        | NOT NULL                                | Tiêu đề minigame                                             |
| `status`      | VARCHAR(20)  |        | NOT NULL, DEFAULT 'DRAFT'               | Trạng thái: `'DRAFT'` (xem trước), `'PUBLISHED'` (công khai) |
| `created_at`  | DATETIME     |        | NOT NULL, DEFAULT CURRENT_TIMESTAMP     | Thời điểm khởi tạo minigame                                  |

#### 7. Bảng `MINIGAME_ATTEMPTS` (Lịch sử làm bài tập)

| Tên trường     | Kiểu dữ liệu |  Khóa  | Ràng buộc                                   | Mô tả & Ý nghĩa nghiệp vụ                      |
| -------------- | ------------ | :----: | ------------------------------------------- | ---------------------------------------------- |
| `attempt_id`   | BIGINT       | **PK** | AUTO_INCREMENT                              | Khóa chính lượt làm bài                        |
| `minigame_id`  | BIGINT       | **FK** | NOT NULL, REFERENCES MINIGAMES(minigame_id) | Minigame đã làm                                |
| `student_id`   | BIGINT       | **FK** | NOT NULL, REFERENCES USERS(user_id)         | Học sinh thực hiện nộp bài                     |
| `score`        | DECIMAL(5,2) |        | NOT NULL                                    | Điểm số đạt được (thang điểm 100)              |
| `is_passed`    | BOOLEAN      |        | NOT NULL, DEFAULT FALSE                     | Cờ đánh dấu đạt điểm `>= completion_threshold` |
| `attempted_at` | DATETIME     |        | NOT NULL, DEFAULT CURRENT_TIMESTAMP         | Thời điểm hoàn thành và nộp bài                |

#### 8. Bảng `LESSON_PROGRESS` (Tiến độ học tập theo bài học)

| Tên trường    | Kiểu dữ liệu |  Khóa  | Ràng buộc                                                       | Mô tả & Ý nghĩa nghiệp vụ                  |
| ------------- | ------------ | :----: | --------------------------------------------------------------- | ------------------------------------------ |
| `progress_id` | BIGINT       | **PK** | AUTO_INCREMENT                                                  | Khóa chính bản ghi tiến độ                 |
| `student_id`  | BIGINT       | **FK** | NOT NULL, REFERENCES USERS(user_id)                             | Học sinh                                   |
| `lesson_id`   | BIGINT       | **FK** | NOT NULL, REFERENCES LESSONS(lesson_id)                         | Bài học                                    |
| `status`      | VARCHAR(20)  |        | NOT NULL, DEFAULT 'IN_PROGRESS'                                 | Trạng thái: `'IN_PROGRESS'`, `'COMPLETED'` |
| `updated_at`  | DATETIME     |        | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Thời điểm cập nhật trạng thái gần nhất     |

> **Ràng buộc duy nhất:** `UNIQUE(student_id, lesson_id)` đảm bảo mỗi học sinh chỉ có 1 bản ghi tiến độ duy nhất cho mỗi bài học.

---

### 3.2. Mã SQL DDL Khởi tạo CSDL (MySQL / PostgreSQL Compatible)

```sql
-- 1. Bảng USERS
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    status ENUM('ACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng TOPICS
CREATE TABLE topics (
    topic_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    level VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_topics_teacher FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE RESTRICT
);

-- 3. Bảng LESSONS
CREATE TABLE lessons (
    lesson_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL DEFAULT 1,
    completion_threshold DECIMAL(5,2) NOT NULL DEFAULT 80.00,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lessons_topic FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
);

-- 4. Bảng LESSON_MATERIALS
CREATE TABLE lesson_materials (
    material_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    type ENUM('VIDEO', 'PDF', 'WORD') NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_materials_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- 5. Bảng VOCABULARY_ITEMS
CREATE TABLE vocabulary_items (
    vocab_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    word VARCHAR(255) NOT NULL,
    meaning VARCHAR(500) NOT NULL,
    pronunciation VARCHAR(255) NULL,
    example TEXT NULL,
    CONSTRAINT fk_vocab_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- 6. Bảng MINIGAMES
CREATE TABLE minigames (
    minigame_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    status ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_minigames_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- 7. Bảng MINIGAME_ATTEMPTS
CREATE TABLE minigame_attempts (
    attempt_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    minigame_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    is_passed BOOLEAN NOT NULL DEFAULT FALSE,
    attempted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attempts_minigame FOREIGN KEY (minigame_id) REFERENCES minigames(minigame_id) ON DELETE CASCADE,
    CONSTRAINT fk_attempts_student FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 8. Bảng LESSON_PROGRESS
CREATE TABLE lesson_progress (
    progress_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    status ENUM('IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'IN_PROGRESS',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_lesson UNIQUE (student_id, lesson_id),
    CONSTRAINT fk_progress_student FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- Tạo Indexes tối ưu hóa hiệu năng truy vấn
CREATE INDEX idx_topics_teacher ON topics(teacher_id);
CREATE INDEX idx_lessons_topic ON lessons(topic_id, order_index);
CREATE INDEX idx_materials_lesson ON lesson_materials(lesson_id);
CREATE INDEX idx_vocab_lesson ON vocabulary_items(lesson_id);
CREATE INDEX idx_attempts_student_game ON minigame_attempts(student_id, minigame_id, attempted_at DESC);
CREATE INDEX idx_progress_student_status ON lesson_progress(student_id, status);
```

---

## 4. THIẾT KẾ CSDL NOSQL (MONGODB COLLECTIONS)

### 4.1. Nhóm Collections Nghiệp vụ (Core Business)

#### 1. Collection: `minigame_questions`

- **Mục đích:** Lưu trữ danh sách câu hỏi với định dạng dữ liệu đa hình (trắc nghiệm, ghép nối, điền từ) sinh ra từ bộ từ vựng CSV.
- **Quan hệ:** Tham chiếu tới SQL qua trường `minigame_id`.

```json
{
  "_id": ObjectId("665b123456789abcdef01234"),
  "minigame_id": 101,
  "vocab_id": 502,
  "question_type": "MULTIPLE_CHOICE",
  "order_index": 1,
  "payload": {
    "question_text": "Nghĩa của từ 'Resilient' là gì?",
    "audio_url": "https://cdn.example.com/audio/resilient.mp3",
    "options": [
      { "key": "A", "text": "Kiên cường, bền bỉ", "is_correct": true },
      { "key": "B", "text": "Yếu ớt, dễ vỡ", "is_correct": false },
      { "key": "C", "text": "Hài hước, vui vẻ", "is_correct": false },
      { "key": "D", "text": "Nghiêm khắc", "is_correct": false }
    ],
    "explanation": "'Resilient' là tính từ chỉ khả năng phục hồi nhanh chóng sau khó khăn."
  },
  "created_at": ISODate("2026-08-20T10:00:00Z")
}
```

_Index:_

```javascript
db.minigame_questions.createIndex({ minigame_id: 1, order_index: 1 });
```

---

#### 2. Collection: `comments`

- **Mục đích:** Lưu trữ bình luận phân cấp (Threaded / Embedded Replies) cho cả cấp Topic và Lesson, tối ưu đọc trong 1 truy vấn.

```json
{
  "_id": ObjectId("665b987654321fedcba98765"),
  "target": {
    "type": "LESSON",
    "id": 15
  },
  "author": {
    "user_id": 1002,
    "full_name": "Nguyễn Văn A",
    "avatar_url": "https://cdn.example.com/avatars/user_1002.png",
    "role": "STUDENT"
  },
  "content": "Thầy ơi cho em hỏi câu ví dụ của từ 'Resilient' ở phút 03:15 phát âm như thế nào ạ?",
  "reply_count": 1,
  "replies": [
    {
      "reply_id": ObjectId("665b987654321fedcba98766"),
      "author": {
        "user_id": 501,
        "full_name": "Teacher John",
        "avatar_url": "https://cdn.example.com/avatars/teacher_john.png",
        "role": "TEACHER"
      },
      "content": "Em nhấn trọng âm rơi vào âm tiết thứ hai nhé: /rɪˈzɪl.jənt/.",
      "created_at": ISODate("2026-08-20T10:35:00Z")
    }
  ],
  "is_pinned": false,
  "created_at": ISODate("2026-08-20T10:30:00Z"),
  "updated_at": ISODate("2026-08-20T10:35:00Z")
}
```

_Indexes:_

```javascript
db.comments.createIndex({ "target.type": 1, "target.id": 1, created_at: -1 });
db.comments.createIndex({ "author.user_id": 1 });
```

---

### 4.2. Nhóm Collections Nhật ký Hệ thống (Logging & Auditing)

#### 3. Collection: `audit_logs` (Nhật ký Kiểm toán & Quản trị)

- **Mục đích:** Đáp ứng yêu cầu **NFR-SEC-08**, ghi lại các hành động nhạy cảm hoặc thay đổi quyền hạn từ Admin/Teacher (cấp tài khoản, khóa người dùng, chỉnh sửa điểm số, xóa bài học).

```json
{
  "_id": ObjectId("665ba1112223334445556667"),
  "actor": {
    "user_id": 1,
    "email": "admin@platform.edu.vn",
    "role": "ADMIN"
  },
  "action": "LOCK_USER_ACCOUNT",
  "target_entity": "USERS",
  "target_id": "1005",
  "details": {
    "reason": "Phát hiện spam bình luận quảng cáo",
    "old_state": { "status": "ACTIVE" },
    "new_state": { "status": "LOCKED" }
  },
  "client_info": {
    "ip_address": "118.69.15.22",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
  },
  "created_at": ISODate("2026-08-22T08:15:30Z")
}
```

_Indexes:_

```javascript
db.audit_logs.createIndex({ created_at: -1 });
db.audit_logs.createIndex({ "actor.user_id": 1, created_at: -1 });
db.audit_logs.createIndex({ action: 1, created_at: -1 });
```

---

#### 4. Collection: `activity_logs` (Nhật ký Hoạt động Học tập)

- **Mục đích:** Ghi nhận chuỗi hành vi học tập chi tiết của học sinh (xem video, thời lượng xem, tải tài liệu, bắt đầu làm quiz) nhằm phục vụ phân tích hành vi và gợi ý bài học.
- **Đặc điểm:** Tần suất ghi rất cao (High Write Throughput). Sử dụng tính năng **TTL Index** để tự động dọn dẹp log cũ sau 90 ngày.

```json
{
  "_id": ObjectId("665ba2223334445556667778"),
  "student_id": 1002,
  "event_type": "VIDEO_PLAYBACK",
  "context": {
    "topic_id": 3,
    "lesson_id": 15,
    "material_id": 42
  },
  "event_data": {
    "playback_time_seconds": 185,
    "video_duration_seconds": 420,
    "is_completed_view": false,
    "device": "ANDROID_APP",
    "app_version": "1.2.0"
  },
  "created_at": ISODate("2026-08-22T14:20:10Z")
}
```

_Indexes:_

```javascript
db.activity_logs.createIndex({ student_id: 1, created_at: -1 });
db.activity_logs.createIndex({ "context.lesson_id": 1, event_type: 1 });
// TTL Index: Tự động xóa log sau 90 ngày (7,776,000 giây)
db.activity_logs.createIndex(
  { created_at: 1 },
  { expireAfterSeconds: 7776000 },
);
```

---

#### 5. Collection: `system_error_logs` (Nhật ký Lỗi Kỹ thuật & Exception)

- **Mục đích:** Bắt trọn vẹn các lỗi runtime từ backend API, worker ngầm (như parse file CSV thất bại, lỗi kết nối mạng tới S3/Mail Server), phục vụ giám sát và cảnh báo sự cố kỹ thuật.

```json
{
  "_id": ObjectId("665ba3334445556667778889"),
  "service_name": "CSV_PARSER_WORKER",
  "error_level": "ERROR",
  "error_code": "ERR_CSV_INVALID_FORMAT",
  "message": "Column 'meaning' is missing at line 24",
  "stack_trace": "CsvParseException: Missing column 'meaning' at Line 24: Col 3\n  at CsvParserService.parse(CsvParserService.java:88)...",
  "request_context": {
    "request_id": "req-8f92a10c-3b71",
    "endpoint": "/api/v1/lessons/15/vocab/csv",
    "http_method": "POST",
    "teacher_id": 501
  },
  "file_metadata": {
    "file_name": "Unit1_Vocabulary_Draft.csv",
    "file_size_bytes": 14200,
    "encoding": "UTF-8"
  },
  "created_at": ISODate("2026-08-22T15:10:05Z")
}
```

_Indexes:_

```javascript
db.system_error_logs.createIndex({ error_level: 1, created_at: -1 });
db.system_error_logs.createIndex({ "request_context.request_id": 1 });
// TTL Index: Tự động dọn dẹp log lỗi sau 30 ngày (2,592,000 giây)
db.system_error_logs.createIndex(
  { created_at: 1 },
  { expireAfterSeconds: 2592000 },
);
```

---

## 5. MA TRẬN ÁNH XẠ KIẾN TRÚC LƯU TRỮ (STORAGE MAPPING)

| Thực thể / Chức năng           |     Cơ sở dữ liệu      | Lý do lựa chọn giải pháp lưu trữ                                                                                                             |
| ------------------------------ | :--------------------: | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Users / Auth**               | **MySQL / PostgreSQL** | Quan hệ phân quyền RBAC rõ ràng, yêu cầu kiểm tra tính duy nhất (Unique Email & Username) và ràng buộc khóa ngoại an toàn.                   |
| **Topics & Lessons**           | **MySQL / PostgreSQL** | Dữ liệu quan hệ chặt chẽ $1 - N$, có thứ tự `order_index` cố định, tần suất đọc cao qua Index.                                               |
| **Materials & Vocab**          | **MySQL / PostgreSQL** | Cấu trúc bảng cố định, quản lý vòng đời xoá cascade theo bài học (`ON DELETE CASCADE`).                                                      |
| **Lesson Progress & Attempts** | **MySQL / PostgreSQL** | Cần tính chất ACID cao khi ghi nhận điểm số, tránh sai lệch tiến độ học tập và tranh chấp đồng thời (Concurrency).                           |
| **Minigame Questions**         |      **MongoDB**       | Cấu trúc JSON đa dạng theo từng dạng câu hỏi (trắc nghiệm, ghép cặp, điền từ), dễ mở rộng thêm dạng câu hỏi mới mà không cần migration bảng. |
| **Comments & Replies**         |      **MongoDB**       | Dữ liệu dạng cây (Nested Tree), tối ưu hóa lấy toàn bộ chuỗi thảo luận trong 1 query duy nhất, nhúng snapshot tác giả.                       |
| **Audit Logs**                 |      **MongoDB**       | Dữ liệu kiểm toán dạng Document động (lưu `old_state`, `new_state`), cấu trúc tùy biến theo từng hành vi quản trị.                           |
| **Activity Logs**              |      **MongoDB**       | Băng thông ghi lớn (High Throughput), hỗ trợ TTL Index tự động hết hạn và giải phóng dung lượng ổ đĩa.                                       |
| **System Error Logs**          |      **MongoDB**       | Lưu trữ chuỗi Stack Trace dài và chi tiết context lỗi một cách linh hoạt mà không làm phình schema CSDL chính.                               |

---

_Tài liệu được thiết kế tối ưu cho nền tảng Backend Spring Boot / Node.js Express kết nối MySQL + MongoDB._
