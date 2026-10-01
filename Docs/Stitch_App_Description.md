# Mô tả đề tài & Prompt cho Stitch — App học tiếng Anh (chỉ dành cho người học)

> **Phạm vi:** chỉ phần **người học (Student)**. KHÔNG có màn hình quản lý của Teacher/Admin.
> Nguồn: `Docs/BRD_SRS_demo.md`, `Docs/API_Specification.md`, `Docs/JWT_Authentication_Design.md`

---

## 1. Tóm tắt đề tài (ngắn gọn)

**BaoEng** — Ứng dụng học tiếng Anh trực tuyến cho **người học** (Web + Mobile App React Native Expo).

- **Người dùng duy nhất:** Student (người học). Không có giao diện quản lý nào.
- **Mục tiêu:** giúp người học học tiếng Anh theo chủ đề → bài học gồm học liệu Video / PDF / Word,
  ôn tập bằng **minigame trắc nghiệm từ vựng**, và **theo dõi % tiến độ học tập** của bản thân.
- **Luồng học chính:**
  1. Đăng ký (username, họ tên, email) / đăng nhập (chỉ username) → xác thực email.
  2. Xem danh sách **chủ đề** (lọc theo level Beginner / Intermediate / Advanced, có tìm kiếm).
  3. **Tham gia (enroll) chủ đề** → xem danh sách **bài học** kèm trạng thái hoàn thành.
  4. **Học bài:** xem Video / PDF / Word, tra danh sách **từ vựng** của bài.
  5. **Chơi minigame** trắc nghiệm từ vựng (nội dung đã được hệ thống sinh sẵn từ CSV).
  6. **Nộp bài → xem điểm**; đạt ngưỡng (mặc định 80%) thì bài học được đánh dấu **hoàn thành**.
  7. **Xem % tiến độ** theo từng chủ đề và tổng thể.
  8. **Bình luận / hỏi giáo viên** ở cấp chủ đề hoặc bài học (chỉ gửi và xem, không quản lý).
  9. Quản lý **hồ sơ cá nhân**: họ tên, ảnh đại diện, đổi mật khẩu.
- **Điểm nhấn nghiệp vụ (phía người học):**
  1. **Tiến độ:** `% chủ đề = số bài hoàn thành / tổng bài × 100%`; bài học hoàn thành khi đạt
     `completionThreshold` (mặc định 80%) ở **tất cả** minigame đã publish của bài đó.
  2. **Làm lại minigame:** luôn tạo **lượt làm mới**, không ghi đè lịch sử; kết quả và tiến độ lấy theo
     **bản ghi mới nhất**, nhưng bài đã hoàn thành thì không bị huỷ.
  3. **Minigame** do hệ thống/giáo viên tạo từ CSV ở phía backend — người học **chỉ chơi**, không tạo/sửa.
- **Trạng thái hiện tại:** Frontend `frontend/` vẫn là React + Vite template mặc định (chưa có UI)
  → **đây chính là phần cần Stitch sinh ra**. Mobile app dựng bằng **React Native + Expo** (Expo Router), build/phát hành qua **EAS Build / EAS Update**.

---

## 2. Design system gợi ý (dán chung vào mọi prompt)

```
Style: modern, friendly education app, clean and airy
Colors: primary #2563EB (blue), secondary #10B981 (green progress/success),
        accent #F59E0B (warning), danger #EF4444, surface #FFFFFF, bg #F8FAFC, text #0F172A
Typography: Inter / Poppins, headings semibold, body regular
Shape: rounded-xl (12-16px), soft shadow, 1px border #E2E8F0
Layout: sticky top navbar on desktop, bottom tab bar on mobile
        (Trang chủ, Tiến độ, Thông báo, Hồ sơ)
Components: cards, progress bars with % label, chips for levels (Beginner/Intermediate/Advanced),
            skeleton loading, toast/snackbar, empty states
Language: Vietnamese UI, English learning content
Icons: outline style (Lucide/Heroicons)
```

---

## 3. Danh sách màn hình cần sinh (chỉ Student)

### A. Vào app / Tài khoản (5)

1. **Splash / Onboarding** – 3 slide giới thiệu giá trị (Học liệu đa phương tiện, Minigame từ vựng, Theo dõi tiến độ) + nút "Bắt đầu"
2. **Đăng nhập** – username + mật khẩu, hiện/ẩn mật khẩu, "Quên mật khẩu?", link "Chưa có tài khoản?"
3. **Đăng ký** – username, họ tên, email, mật khẩu, xác nhận mật khẩu + ghi chú xác thực email
4. **Quên mật khẩu → Đặt lại mật khẩu** – nhập email → nhập mật khẩu mới
5. **Xác thực email** – trạng thái thành công / token hết hạn, nút "Về trang đăng nhập"

### B. Học tập (7)

6. **Trang chủ – Danh sách chủ đề** – ô tìm kiếm, filter chip level, grid card chủ đề (title, mô tả, level chip, teacherName, "10 bài học", progress bar %), empty state
7. **Chi tiết chủ đề** – header chủ đề + card tiến độ lớn ("40% — 4/10 bài học"), danh sách bài học (số thứ tự + dấu ✓ đã hoàn thành), nút "Tham gia chủ đề" nếu chưa enroll, khu bình luận cấp chủ đề
8. **Chi tiết bài học** – tab chuyển học liệu "Video / PDF / Word" + vùng player, danh sách **từ vựng** (word, phiên âm, nghĩa, ví dụ) dạng thu gọn, card nổi bật "Ôn tập từ vựng — Bắt đầu Minigame", khu bình luận cấp bài học
9. **Chơi Minigame** – thanh tiến độ "Câu 3/10", câu hỏi trắc nghiệm lớn, 4 đáp án dạng card chọn được (A/B/C/D), nút "Nộp bài"
10. **Kết quả Minigame** – vòng tròn điểm lớn, "9/10 câu đúng", badge Đạt/Chưa đạt, ghi chú "Bài học đã hoàn thành — Tiến độ chủ đề: 60%", nút "Làm lại" / "Bài tiếp theo"
11. **Tiến độ của tôi** – donut % tổng thể, danh sách chủ đề kèm progress bar ("4/10 bài học"), empty state khi chưa học gì
12. **Hồ sơ cá nhân** – avatar + nút đổi ảnh, form họ tên / email (read-only), mục "Đổi mật khẩu", nút "Lưu thay đổi"

### C. Phụ trợ (2, tùy chọn)

13. **Kết quả tìm kiếm** – kết quả gộp chủ đề + bài học theo từ khóa, empty state
14. **Thông báo** – danh sách thông báo (ví dụ giáo viên trả lời bình luận), chấm chưa đọc

---

## 4. Prompt dán vào Stitch

### 4.1. Master prompt (dùng trước để set tổng thể)

```
Design a mobile-first English learning app called "BaoEng" for Vietnamese learners.
IMPORTANT: this is a LEARNER-ONLY app. There is NO teacher or admin interface — no management
screens, no content uploads, no dashboards, no user administration. Only the student experience.

What the learner does: sign up / log in, browse English topics by level, join a topic, open
lessons that contain video / PDF / Word materials and a vocabulary list, play an auto-generated
multiple-choice vocabulary quiz minigame, submit it and see the score, track per-topic and
overall learning progress, comment to ask the teacher, and edit their profile.

Design style: modern, friendly, clean education product. Primary blue #2563EB,
success green #10B981 for progress, warning amber #F59E0B, red #EF4444 for errors.
White cards on light gray #F8FAFC background, rounded 12-16px corners, soft shadows,
Inter font, outline icons. All UI text in Vietnamese.

Responsive: desktop web with a sticky top navbar; mobile with a bottom tab bar
(Trang chủ, Tiến độ, Thông báo, Hồ sơ). Every screen must have loading (skeleton),
empty and error states.
```

### 4.2. Prompt theo màn hình (chạy lần lượt)

```
1) Splash / Onboarding: app logo "BaoEng" centered, 3 intro slides with illustration and the
   value props "Học liệu đa phương tiện", "Minigame từ vựng", "Theo dõi tiến độ",
   dots pagination, primary button "Bắt đầu".

2) Login: centered card, logo, input "Tên đăng nhập", password with show/hide
   toggle, "Quên mật khẩu?" link, primary "Đăng nhập" button, link "Chưa có tài khoản? Đăng ký".
   Show inline error state "Tên đăng nhập hoặc mật khẩu không chính xác".

3) Register: fields username, họ tên, email, mật khẩu, xác nhận mật khẩu, password strength
   hint, note "Sau khi đăng ký vui lòng xác thực email", primary "Đăng ký".

4) Home – topic list: header with avatar and search bar, filter chips
   "Tất cả / Beginner / Intermediate / Advanced", grid of topic cards showing title,
   description, level chip, teacher name, "10 bài học" and a horizontal progress bar "40%".
   Include an empty state.

5) Topic detail: topic header (title, description, level chip, teacher), large progress card
   "Tiến độ 40% — 4/10 bài học", numbered lesson list with a green check on completed lessons,
   "Tham gia chủ đề" button when not joined, comment section at the bottom.

6) Lesson detail: back link, lesson title, tabs "Video / Tài liệu PDF / Word" with a media
   player area, collapsible vocabulary list (word, pronunciation, meaning, example),
   highlighted card "Ôn tập từ vựng — Bắt đầu Minigame", comment section below.

7) Minigame play: top bar "Câu 3/10" with a segmented progress bar, large centered question
   text, 4 answer options as selectable cards (A/B/C/D), sticky primary button "Nộp bài",
   subtle timer top-right.

8) Minigame result: large score circle "90 điểm", "9/10 câu đúng", green badge "Đạt",
   note "Bài học đã hoàn thành — Tiến độ chủ đề: 60%", buttons "Làm lại" and "Bài tiếp theo",
   plus a review list of questions with correct/incorrect marks.

9) My Progress: big donut chart for overall progress, per-topic rows with title,
   "4/10 bài học" and progress bars, empty state when nothing has been started yet.

10) Profile: avatar with change-photo button, form họ tên / email (read-only),
    section "Đổi mật khẩu" with old + new + confirm, "Lưu thay đổi" button.

11) Search results: search input at top, results grouped into "Chủ đề" and "Bài học",
    empty state "Không tìm thấy kết quả".

12) Notifications: list of notifications such as teacher replies to comments, unread dot,
    empty state.
```

---

## 5. Ghi chú khi dùng kết quả Stitch

- Chỉ dùng các nhóm API phía **người học** trong `Docs/API_Specification.md`:
  `auth` (register / login / refresh / logout / forgot-password / reset-password / verify-email),
  `users/me`, `topics` (list / detail / enroll / unenroll), `lessons`, `materials` (chỉ GET),
  `vocab` (chỉ GET), `minigames` (GET câu hỏi, POST attempts, GET attempts), `progress`,
  `comments` (GET + POST), `search`.
  **KHÔNG** gọi nhóm `/admin/*` và **KHÔNG** cần các API POST/PUT/DELETE của Teacher
  (tạo topic/lesson, upload material, upload CSV, publish minigame).
- Envelope thống nhất `{ success, data, message }`, base URL `http://localhost:8080/api/v1`.
- Đăng nhập dùng JWT Bearer; refresh token nằm trong HttpOnly cookie → **không** lưu token vào localStorage.
- `userId` lấy từ JWT, không truyền qua URL/body.
- Mọi màn hình cần 3 trạng thái: loading (skeleton), empty, error.
