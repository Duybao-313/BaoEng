# TÀI LIỆU PHÂN TÍCH NGHIỆP VỤ VÀ YÊU CẦU PHẦN MỀM

## Nền tảng Học tiếng Anh Trực tuyến Đa nền tảng (Web & Mobile App)

**Phiên bản:** 1.0  
**Loại tài liệu:** Business Requirements Document (BRD) & Software Requirements Specification (SRS)

---

# PHẦN I: BUSINESS REQUIREMENTS DOCUMENT (BRD)

## 1. Tổng quan & Mục tiêu Nghiệp vụ (Business Objectives)

### 1.1. Vấn đề cần giải quyết & Giá trị mang lại

Việc học tiếng Anh trực tuyến hiện nay thường gặp ba nhóm vấn đề chính:

- **Nội dung học rời rạc, thiếu tương tác:** Tài liệu học (video, PDF, Word) được cung cấp một chiều, không có cơ chế ôn tập chủ động, khiến người học khó ghi nhớ từ vựng và dễ mất động lực.
- **Giáo viên tốn nhiều thời gian biên soạn bài tập ôn tập:** Việc tạo minigame/quiz từ vựng thủ công cho từng bài học là công việc lặp lại, tốn thời gian, không tận dụng được dữ liệu từ vựng đã có sẵn dưới dạng file.
- **Thiếu cơ chế theo dõi và đo lường tiến độ học tập:** Học sinh không biết mình đã hoàn thành bao nhiêu phần trăm khóa học; nhà quản lý (Admin) không có công cụ để đánh giá hiệu quả vận hành của nền tảng.

Nền tảng đề xuất giải quyết các vấn đề trên bằng cách:

- Tích hợp học liệu đa phương tiện (Video, PDF, Word) trong một môi trường thống nhất, hỗ trợ cả Web và Mobile.
- Tự động hóa việc sinh minigame ôn tập từ vựng thông qua cơ chế parse file CSV do giáo viên tải lên, giảm tải công việc thủ công.
- Cung cấp cơ chế theo dõi % tiến độ học tập theo thời gian thực cho học sinh và dashboard phân tích cho Admin.
- Xây dựng kênh tương tác đa chiều (bình luận cấp chủ đề và cấp bài học) giữa học sinh và giáo viên, tăng mức độ gắn kết học tập.

### 1.2. Các chỉ số đo lường hiệu quả cốt lõi (KPIs/Success Metrics)

| Mã KPI | Tên chỉ số                                  | Mô tả cách đo                                                                            | Mục tiêu đề xuất (giai đoạn đầu)   |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------- |
| KPI-01 | Tỷ lệ hoàn thành khóa học (Completion Rate) | % học sinh hoàn thành ≥ 80% nội dung một chủ đề trong tổng số học sinh đăng ký chủ đề đó | ≥ 40% trong 3 tháng đầu            |
| KPI-02 | Thời gian tạo minigame trung bình           | Thời gian trung bình từ lúc giáo viên upload CSV đến khi minigame sẵn sàng sử dụng       | ≤ 5 giây/file (≤ 500 dòng từ vựng) |
| KPI-03 | Tỷ lệ tương tác bình luận                   | Số lượng bình luận trung bình/bài học/tháng                                              | Tăng trưởng ≥ 15%/tháng            |
| KPI-04 | Tỷ lệ tăng trưởng người dùng (User Growth)  | Số tài khoản Student mới đăng ký theo tháng                                              | Theo dõi qua Dashboard Admin       |
| KPI-05 | Tỷ lệ lỗi khi parse CSV                     | Số file CSV lỗi định dạng / tổng số file upload                                          | ≤ 5%                               |
| KPI-06 | Điểm hài lòng người dùng (CSAT)             | Khảo sát định kỳ học sinh/giáo viên                                                      | ≥ 4/5                              |

---

## 2. Phạm vi Dự án (Project Scope)

### 2.1. In-Scope (Tính năng thuộc phạm vi phát triển)

| Nhóm                  | Tính năng trong phạm vi                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| Xác thực & Phân quyền | Đăng ký, đăng nhập, phân quyền theo vai trò (Student/Teacher/Admin), quản lý phiên đăng nhập trên Web & Mobile  |
| Quản lý nội dung học  | Tạo/sửa/xóa chủ đề (Topic), tạo/sửa/xóa bài học (Lesson), upload tài liệu Video/PDF/Word                        |
| Minigame từ vựng      | Upload file CSV từ vựng, hệ thống tự động parse và sinh minigame ôn tập (trắc nghiệm/ghép từ)                   |
| Theo dõi tiến độ      | Tính toán và hiển thị % tiến độ hoàn thành theo chủ đề và tổng thể                                              |
| Tương tác             | Bình luận cấp chủ đề, bình luận cấp bài học, giáo viên phản hồi bình luận                                       |
| Quản trị hệ thống     | Cấp tài khoản giáo viên, quản lý phân quyền, Dashboard thống kê (User growth, Completion rate, Content metrics) |
| Đa nền tảng           | Ứng dụng Web (Responsive), ứng dụng Mobile Android (Kotlin)                                                     |

### 2.2. Out-of-Scope (Các tính năng tạm hoãn hoặc phát triển ở giai đoạn sau)

| Tính năng                                                  | Lý do tạm hoãn                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Ứng dụng iOS                                               | Giai đoạn 1 chỉ tập trung Android theo yêu cầu; iOS đưa vào roadmap giai đoạn 2 |
| Chấm điểm phát âm bằng AI (Speech Recognition)             | Yêu cầu tích hợp mô hình AI phức tạp, chưa đủ dữ liệu huấn luyện                |
| Thanh toán/học phí trực tuyến                              | Ngoài phạm vi mô hình vận hành hiện tại (miễn phí/nội bộ)                       |
| Lớp học trực tuyến thời gian thực (Live class, video call) | Yêu cầu hạ tầng streaming realtime riêng, không thuộc phạm vi MVP               |
| Chatbot hỗ trợ học tập bằng AI                             | Cân nhắc bổ sung ở giai đoạn mở rộng sau khi có dữ liệu người dùng              |
| Chứng chỉ hoàn thành khóa học (Certificate)                | Phát triển sau khi mô hình đánh giá tiến độ ổn định                             |

---

## 3. Mô tả Tác nhân (Stakeholder & Actor Profiles)

### 3.1. Ma trận quyền hạn (Permission Matrix)

| Chức năng                             | Student |           Teacher           | Admin |
| ------------------------------------- | :-----: | :-------------------------: | :---: |
| Đăng ký/Đăng nhập                     |   ✅    |   ✅ (được cấp bởi Admin)   |  ✅   |
| Xem danh sách chủ đề/bài học          |   ✅    |             ✅              |  ✅   |
| Học bài (xem Video/PDF/Word)          |   ✅    |             ❌              |  ❌   |
| Chơi minigame                         |   ✅    | ❌ (chỉ xem trước/kiểm thử) |  ❌   |
| Xem % tiến độ cá nhân                 |   ✅    |             ❌              |  ❌   |
| Quản lý thông tin cá nhân             |   ✅    |             ✅              |  ✅   |
| Bình luận (Topic/Lesson)              |   ✅    |        ✅ (phản hồi)        |  ❌   |
| Tạo/quản lý chủ đề                    |   ❌    |             ✅              |  ❌   |
| Upload bài giảng (Video/PDF/Word/CSV) |   ❌    |             ✅              |  ❌   |
| Cấp tài khoản Teacher                 |   ❌    |             ❌              |  ✅   |
| Quản lý phân quyền hệ thống           |   ❌    |             ❌              |  ✅   |
| Xem Dashboard phân tích hệ thống      |   ❌    |             ❌              |  ✅   |

### 3.2. Mục tiêu sử dụng của từng Actor

| Actor   | Mục tiêu sử dụng chính                                                                                                                 |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Student | Học từ vựng và kiến thức tiếng Anh một cách trực quan, ôn tập qua minigame, theo dõi tiến độ bản thân, trao đổi thắc mắc với giáo viên |
| Teacher | Xây dựng và quản lý nội dung giảng dạy hiệu quả, tiết kiệm thời gian tạo bài tập ôn tập, hỗ trợ học sinh qua kênh bình luận            |
| Admin   | Vận hành hệ thống ổn định, kiểm soát việc cấp quyền giáo viên, giám sát hiệu quả hoạt động của nền tảng qua số liệu thống kê           |

---

## 4. Quy trình Nghiệp vụ Cốt lõi (Business Process Flows)

### 4.1. Quy trình nạp và xử lý tự động bộ từ vựng CSV để sinh Minigame

1. Giáo viên đăng nhập, chọn bài học cần gắn minigame.
2. Giáo viên tải lên file CSV theo định dạng chuẩn (cột: từ vựng, nghĩa, phiên âm, ví dụ).
3. Hệ thống kiểm tra định dạng file (đuôi .csv, encoding UTF-8, số cột hợp lệ).
4. Nếu hợp lệ: hệ thống parse từng dòng thành bản ghi từ vựng, lưu vào cơ sở dữ liệu, đồng thời sinh cấu trúc minigame (câu hỏi trắc nghiệm/ghép từ) từ bộ từ vựng.
5. Nếu không hợp lệ: hệ thống trả về danh sách lỗi cụ thể theo từng dòng (số dòng, loại lỗi) để giáo viên chỉnh sửa và tải lại.
6. Hệ thống thông báo kết quả xử lý và hiển thị minigame ở trạng thái "chờ duyệt/sẵn sàng" để giáo viên xem trước.
7. Giáo viên xác nhận xuất bản; minigame trở nên khả dụng với học sinh trong bài học tương ứng.

### 4.2. Quy trình tính toán % tiến độ hoàn thành khóa học của học sinh

1. Học sinh thực hiện các hoạt động học tập: xem tài liệu bài học, hoàn thành minigame.
2. Hệ thống ghi nhận sự kiện hoàn thành ở cấp bài học (ví dụ: đã xem hết Video, đã đạt điểm tối thiểu ở minigame).
3. Hệ thống cập nhật trạng thái hoàn thành bài học (Lesson Progress) trong bảng theo dõi tiến độ của học sinh.
4. Hệ thống tính % tiến độ chủ đề = (số bài học đã hoàn thành / tổng số bài học của chủ đề) × 100%.
5. Hệ thống tính % tiến độ tổng thể = trung bình có trọng số % tiến độ của tất cả chủ đề học sinh đã đăng ký/tham gia.
6. Giá trị % tiến độ được cập nhật realtime (hoặc gần realtime) và hiển thị trên giao diện Student (Web & Mobile).
7. Dữ liệu tiến độ tổng hợp được đẩy vào các chỉ số Completion Rate phục vụ Dashboard Admin.

### 4.3. Quy trình tương tác/bình luận đa cấp (Topic level vs Lesson level)

1. Học sinh chọn vị trí bình luận: cấp Chủ đề (Topic) hoặc cấp Bài học (Lesson) cụ thể.
2. Học sinh nhập nội dung bình luận; hệ thống kiểm tra ràng buộc cơ bản (độ dài, nội dung không rỗng).
3. Bình luận được lưu và gắn với `topic_id` hoặc `lesson_id` tương ứng, hiển thị theo thứ tự thời gian.
4. Giáo viên phụ trách chủ đề/bài học nhận thông báo có bình luận mới.
5. Giáo viên phản hồi bình luận; phản hồi được lưu như một bình luận con (reply) gắn với bình luận gốc.
6. Học sinh khác trong cùng chủ đề/bài học có thể xem toàn bộ luồng bình luận và phản hồi liên quan.
7. Admin có quyền giám sát nội dung tương tác ở mức hệ thống thông qua các chỉ số nội dung (Content Metrics), phục vụ kiểm duyệt nếu cần.

---

# PHẦN II: SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## 1. Yêu cầu Chức năng (Functional Requirements - FR)

### 1.1. Nhóm FR-AUTH (Xác thực & Phân quyền)

| ID         | Tên chức năng                           | Actor                   | Mô tả chi tiết                                                                                                                       | Tiêu chí chấp nhận (Given/When/Then)                                                                                                                                                                          |
| ---------- | --------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-AUTH-01 | Đăng ký tài khoản Student               | Student                 | Người dùng đăng ký tài khoản mới bằng tên tài khoản (username), email và mật khẩu để sử dụng nền tảng                                | **Given** người dùng chưa có tài khoản, **When** nhập username, email, mật khẩu hợp lệ và xác nhận, **Then** hệ thống tạo tài khoản, gửi email xác thực và chuyển hướng đến trang đăng nhập trong vòng 3 giây |
| FR-AUTH-02 | Đăng nhập hệ thống                      | Student, Teacher, Admin | Người dùng đăng nhập bằng email hoặc tên tài khoản (username) kèm mật khẩu đã đăng ký, hệ thống trả về token phân quyền theo vai trò | **Given** tài khoản đã tồn tại và đã xác thực email, **When** nhập đúng email hoặc username và mật khẩu, **Then** hệ thống trả về JWT token hợp lệ và điều hướng vào giao diện tương ứng vai trò              |
| FR-AUTH-03 | Đăng nhập sai thông tin                 | Student, Teacher, Admin | Hệ thống từ chối đăng nhập và cảnh báo khi thông tin không chính xác                                                                 | **Given** người dùng nhập sai mật khẩu, **When** gửi yêu cầu đăng nhập, **Then** hệ thống trả về thông báo lỗi rõ ràng và không cấp token, đồng thời ghi log số lần thử sai                                   |
| FR-AUTH-04 | Quên mật khẩu / Đặt lại mật khẩu        | Student, Teacher, Admin | Người dùng có thể khôi phục mật khẩu qua email                                                                                       | **Given** người dùng nhấn "Quên mật khẩu", **When** nhập email hợp lệ đã đăng ký, **Then** hệ thống gửi liên kết đặt lại mật khẩu có hiệu lực trong 15 phút                                                   |
| FR-AUTH-05 | Phân quyền truy cập theo vai trò (RBAC) | Hệ thống                | Hệ thống giới hạn quyền truy cập API/màn hình dựa trên vai trò trong token                                                           | **Given** người dùng có vai trò Student, **When** cố truy cập chức năng dành cho Teacher/Admin, **Then** hệ thống trả về lỗi 403 Forbidden và không thực hiện thao tác                                        |

### 1.2. Nhóm FR-STUDENT

| ID            | Tên chức năng                | Actor   | Mô tả chi tiết                                           | Tiêu chí chấp nhận (Given/When/Then)                                                                                                                                                              |
| ------------- | ---------------------------- | ------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-STUDENT-01 | Xem danh sách chủ đề         | Student | Hiển thị danh sách các chủ đề học đang khả dụng          | **Given** học sinh đã đăng nhập, **When** truy cập trang chủ, **Then** hệ thống hiển thị danh sách chủ đề kèm % tiến độ tương ứng (nếu đã bắt đầu học)                                            |
| FR-STUDENT-02 | Xem/học nội dung bài học     | Student | Học sinh xem tài liệu Video/PDF/Word của một bài học     | **Given** học sinh chọn một bài học hợp lệ, **When** mở bài học, **Then** trình phát/tài liệu tương ứng hiển thị đúng định dạng gốc và ghi nhận sự kiện "đã mở bài học"                           |
| FR-STUDENT-03 | Chơi minigame ôn tập         | Student | Học sinh làm minigame từ vựng gắn với bài học            | **Given** minigame đã được giáo viên xuất bản, **When** học sinh hoàn thành minigame, **Then** hệ thống chấm điểm, lưu kết quả và cập nhật trạng thái hoàn thành bài học nếu đạt ngưỡng tối thiểu |
| FR-STUDENT-04 | Xem % tiến độ học tập        | Student | Hiển thị % tiến độ theo chủ đề và tổng thể               | **Given** học sinh đã hoàn thành ít nhất một bài học, **When** truy cập trang tiến độ cá nhân, **Then** hệ thống hiển thị đúng % tiến độ theo công thức đã định nghĩa, sai số ≤ 1%                |
| FR-STUDENT-05 | Quản lý thông tin cá nhân    | Student | Học sinh cập nhật họ tên, ảnh đại diện, đổi mật khẩu     | **Given** học sinh ở trang hồ sơ cá nhân, **When** cập nhật thông tin hợp lệ và lưu, **Then** hệ thống lưu thay đổi và hiển thị thông báo thành công                                              |
| FR-STUDENT-06 | Bình luận cấp Chủ đề/Bài học | Student | Học sinh gửi bình luận tại trang Topic hoặc trang Lesson | **Given** học sinh đang xem một chủ đề/bài học, **When** nhập bình luận hợp lệ (không rỗng, ≤ 1000 ký tự) và gửi, **Then** bình luận hiển thị ngay trong danh sách theo thời gian thực            |

### 1.3. Nhóm FR-TEACHER

| ID            | Tên chức năng                              | Actor   | Mô tả chi tiết                                              | Tiêu chí chấp nhận (Given/When/Then)                                                                                                                                                                                    |
| ------------- | ------------------------------------------ | ------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-TEACHER-01 | Tạo/sửa/xóa chủ đề học                     | Teacher | Giáo viên quản lý vòng đời của một chủ đề (Topic)           | **Given** giáo viên đã đăng nhập, **When** tạo chủ đề mới với tên và mô tả hợp lệ, **Then** chủ đề được lưu và hiển thị ngay trong danh sách quản lý của giáo viên                                                      |
| FR-TEACHER-02 | Tạo/sửa/xóa bài học trong chủ đề           | Teacher | Giáo viên thêm bài học vào chủ đề đã tạo                    | **Given** chủ đề đã tồn tại, **When** giáo viên thêm bài học mới, **Then** bài học được gắn đúng vào chủ đề và xuất hiện đúng thứ tự đã cấu hình                                                                        |
| FR-TEACHER-03 | Upload tài liệu bài giảng (Video/PDF/Word) | Teacher | Giáo viên tải học liệu đa phương tiện cho bài học           | **Given** giáo viên chọn bài học, **When** upload file đúng định dạng cho phép (mp4, pdf, docx) và dung lượng hợp lệ, **Then** hệ thống lưu trữ file, sinh đường dẫn truy cập an toàn và cập nhật trạng thái bài học    |
| FR-TEACHER-04 | Upload file CSV từ vựng                    | Teacher | Giáo viên tải file CSV để hệ thống tự động sinh minigame    | **Given** giáo viên chọn bài học và tải file .csv đúng cấu trúc cột quy định, **When** hệ thống parse thành công, **Then** minigame được sinh tự động ở trạng thái "chờ xuất bản" trong vòng 5 giây với file ≤ 500 dòng |
| FR-TEACHER-05 | Xử lý lỗi file CSV không hợp lệ            | Teacher | Hệ thống phản hồi rõ ràng khi file lỗi định dạng            | **Given** file CSV thiếu cột bắt buộc hoặc sai encoding, **When** giáo viên upload, **Then** hệ thống từ chối lưu và trả về danh sách lỗi theo từng dòng cụ thể                                                         |
| FR-TEACHER-06 | Phản hồi bình luận của học sinh            | Teacher | Giáo viên trả lời bình luận tại Topic/Lesson mình phụ trách | **Given** có bình luận mới từ học sinh, **When** giáo viên nhập nội dung phản hồi và gửi, **Then** phản hồi hiển thị dưới dạng reply gắn với bình luận gốc                                                              |

### 1.4. Nhóm FR-ADMIN

| ID          | Tên chức năng                    | Actor | Mô tả chi tiết                                                      | Tiêu chí chấp nhận (Given/When/Then)                                                                                                                                                   |
| ----------- | -------------------------------- | ----- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-ADMIN-01 | Cấp tài khoản Teacher            | Admin | Admin tạo tài khoản giáo viên mới trong hệ thống                    | **Given** Admin nhập thông tin email và họ tên giáo viên hợp lệ, **When** xác nhận cấp tài khoản, **Then** hệ thống tạo tài khoản vai trò Teacher và gửi thông tin đăng nhập qua email |
| FR-ADMIN-02 | Quản lý/thu hồi phân quyền       | Admin | Admin có thể khóa, mở khóa hoặc thay đổi vai trò tài khoản          | **Given** tài khoản Teacher/Student tồn tại, **When** Admin thực hiện khóa tài khoản, **Then** tài khoản không thể đăng nhập cho đến khi được mở khóa lại                              |
| FR-ADMIN-03 | Xem Dashboard phân tích hệ thống | Admin | Hiển thị các chỉ số User Growth, Completion Rate, Content Metrics   | **Given** Admin truy cập trang Dashboard, **When** chọn khoảng thời gian thống kê, **Then** hệ thống hiển thị biểu đồ/số liệu tương ứng, thời gian tải ≤ 3 giây với dữ liệu 12 tháng   |
| FR-ADMIN-04 | Giám sát nội dung tương tác      | Admin | Admin xem tổng quan số lượng bình luận, khả năng kiểm duyệt khi cần | **Given** hệ thống có dữ liệu bình luận, **When** Admin truy cập mục giám sát nội dung, **Then** hệ thống hiển thị số liệu tổng hợp và danh sách bình luận gần nhất                    |

### 1.5. Nhóm FR-CONTENT

| ID            | Tên chức năng                                | Actor    | Mô tả chi tiết                                                | Tiêu chí chấp nhận (Given/When/Then)                                                                                                                                                    |
| ------------- | -------------------------------------------- | -------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-CONTENT-01 | Lưu trữ và phân phối tài liệu đa phương tiện | Hệ thống | Hệ thống lưu file Video/PDF/Word và phục vụ truy xuất an toàn | **Given** file đã được upload thành công, **When** người dùng có quyền truy cập bài học, **Then** hệ thống trả về nội dung qua URL có kiểm soát quyền truy cập (không public trực tiếp) |
| FR-CONTENT-02 | Phân loại chủ đề/bài học theo cấp độ         | Teacher  | Gắn nhãn cấp độ (level) cho chủ đề để học sinh dễ lựa chọn    | **Given** giáo viên tạo/sửa chủ đề, **When** chọn cấp độ từ danh sách định nghĩa trước, **Then** thông tin cấp độ hiển thị trên danh sách chủ đề cho Student                            |
| FR-CONTENT-03 | Tìm kiếm chủ đề/bài học                      | Student  | Học sinh tìm kiếm nhanh theo từ khóa                          | **Given** học sinh nhập từ khóa vào ô tìm kiếm, **When** thực hiện tìm kiếm, **Then** hệ thống trả về kết quả liên quan trong ≤ 2 giây                                                  |

### 1.6. Nhóm FR-MINIGAME

| ID             | Tên chức năng                                   | Actor    | Mô tả chi tiết                                                       | Tiêu chí chấp nhận (Given/When/Then)                                                                                                                                                                                    |
| -------------- | ----------------------------------------------- | -------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-MINIGAME-01 | Tự động sinh câu hỏi từ file CSV                | Hệ thống | Hệ thống parse từng dòng CSV thành câu hỏi trắc nghiệm/ghép từ       | **Given** file CSV hợp lệ đã lưu vào cơ sở dữ liệu từ vựng, **When** hệ thống chạy tiến trình sinh minigame, **Then** số câu hỏi sinh ra bằng số dòng từ vựng hợp lệ, mỗi câu có đáp án đúng và các đáp án nhiễu hợp lý |
| FR-MINIGAME-02 | Chấm điểm minigame                              | Hệ thống | Hệ thống chấm và trả kết quả ngay sau khi học sinh nộp bài           | **Given** học sinh hoàn thành tất cả câu hỏi, **When** nhấn nộp bài, **Then** hệ thống trả về điểm số, số câu đúng/sai trong ≤ 1 giây                                                                                   |
| FR-MINIGAME-03 | Giáo viên xem trước minigame trước khi xuất bản | Teacher  | Giáo viên kiểm tra chất lượng câu hỏi trước khi cho học sinh sử dụng | **Given** minigame ở trạng thái "chờ xuất bản", **When** giáo viên mở chế độ xem trước, **Then** hệ thống hiển thị đầy đủ câu hỏi/đáp án như học sinh sẽ thấy, không ghi nhận vào lịch sử học tập                       |
| FR-MINIGAME-04 | Lưu lịch sử làm minigame                        | Hệ thống | Ghi nhận số lần làm, điểm cao nhất, thời gian làm gần nhất           | **Given** học sinh đã làm minigame ít nhất một lần, **When** truy vấn lịch sử, **Then** hệ thống trả về đầy đủ các lượt làm theo thứ tự thời gian giảm dần                                                              |

---

## 2. Đặc tả Use Case chi tiết (Use Case Specifications)

### UC-01: Giáo viên tải lên file CSV từ vựng và hệ thống parse tạo Minigame

| Thuộc tính        | Nội dung                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Actor chính**   | Teacher                                                                                                     |
| **Actor phụ**     | Hệ thống (Content Service, Minigame Generator)                                                              |
| **Preconditions** | Giáo viên đã đăng nhập với vai trò Teacher; bài học đích đã tồn tại và thuộc quyền quản lý của giáo viên đó |
| **Trigger**       | Giáo viên chọn chức năng "Upload từ vựng (CSV)" tại màn hình quản lý bài học                                |

**Main Flow:**

1. Giáo viên chọn bài học cần gắn minigame.
2. Giáo viên chọn file CSV từ thiết bị và nhấn "Tải lên".
3. Hệ thống kiểm tra định dạng file (đuôi mở rộng, dung lượng ≤ giới hạn cấu hình, encoding UTF-8).
4. Hệ thống đọc và parse từng dòng theo cấu trúc cột quy định (từ vựng, nghĩa, phiên âm, ví dụ).
5. Hệ thống lưu các bản ghi từ vựng hợp lệ vào cơ sở dữ liệu, liên kết với `lesson_id`.
6. Hệ thống sinh cấu trúc minigame (câu hỏi trắc nghiệm/ghép từ) dựa trên bộ từ vựng vừa lưu.
7. Hệ thống chuyển minigame sang trạng thái "Chờ xuất bản" và thông báo hoàn tất cho giáo viên.
8. Giáo viên xem trước minigame, sau đó xác nhận "Xuất bản".
9. Hệ thống chuyển trạng thái minigame sang "Đã xuất bản", minigame khả dụng với Student.

**Alternative Flows:**

- **A1 — File sai định dạng/cấu trúc cột:** Tại bước 3–4, nếu phát hiện lỗi (sai đuôi file, thiếu cột bắt buộc, dữ liệu trống ở cột bắt buộc), hệ thống dừng xử lý, trả về danh sách lỗi chi tiết theo số dòng, giáo viên chỉnh sửa và thực hiện lại từ bước 2.
- **A2 — File vượt quá dung lượng/số dòng cho phép:** Hệ thống từ chối ngay tại bước 3, hiển thị thông báo giới hạn cho phép.
- **A3 — Giáo viên hủy xuất bản sau khi xem trước:** Tại bước 8, nếu giáo viên chọn "Hủy", minigame và bộ từ vựng liên quan bị xóa khỏi trạng thái tạm, giáo viên có thể upload lại.

**Postconditions:**

- Thành công: Bộ từ vựng được lưu trữ, minigame ở trạng thái "Đã xuất bản" và hiển thị với Student trong bài học tương ứng.
- Thất bại: Không có dữ liệu từ vựng/minigame nào được lưu vào hệ thống; trạng thái bài học không thay đổi.

---

### UC-02: Học sinh làm Minigame và hệ thống cập nhật % tiến độ học tập

| Thuộc tính        | Nội dung                                                                   |
| ----------------- | -------------------------------------------------------------------------- |
| **Actor chính**   | Student                                                                    |
| **Actor phụ**     | Hệ thống (Progress Tracking Service)                                       |
| **Preconditions** | Học sinh đã đăng nhập; bài học chứa minigame đã ở trạng thái "Đã xuất bản" |
| **Trigger**       | Học sinh chọn "Bắt đầu Minigame" trong một bài học                         |

**Main Flow:**

1. Học sinh mở minigame gắn với bài học.
2. Hệ thống hiển thị lần lượt các câu hỏi trắc nghiệm/ghép từ.
3. Học sinh trả lời từng câu hỏi và nhấn "Nộp bài" khi hoàn tất.
4. Hệ thống chấm điểm, tính số câu đúng/tổng số câu.
5. Hệ thống so sánh điểm số với ngưỡng hoàn thành tối thiểu đã cấu hình cho bài học.
6. Nếu đạt ngưỡng: hệ thống đánh dấu bài học là "Đã hoàn thành" trong bảng tiến độ của học sinh.
7. Hệ thống tính lại % tiến độ chủ đề = (số bài học đã hoàn thành / tổng số bài học) × 100%.
8. Hệ thống tính lại % tiến độ tổng thể của học sinh trên toàn bộ các chủ đề đã tham gia.
9. Hệ thống trả kết quả (điểm số, trạng thái đạt/chưa đạt, % tiến độ mới) cho giao diện Student.

**Alternative Flows:**

- **A1 — Học sinh không đạt ngưỡng hoàn thành:** Tại bước 5–6, nếu điểm số dưới ngưỡng, bài học không được đánh dấu hoàn thành; hệ thống vẫn lưu lượt làm vào lịch sử và cho phép học sinh làm lại.
- **A2 — Học sinh thoát giữa chừng minigame:** Hệ thống không ghi nhận lượt làm là hoàn tất; không tính điểm và không cập nhật tiến độ.
- **A3 — Học sinh đã hoàn thành bài học trước đó, làm lại minigame để cải thiện điểm:** Hệ thống cập nhật điểm cao nhất trong lịch sử nhưng không làm thay đổi trạng thái "Đã hoàn thành" đã có.

**Postconditions:**

- Thành công (đạt ngưỡng): Trạng thái bài học chuyển "Đã hoàn thành"; % tiến độ chủ đề và tổng thể được cập nhật và phản ánh ngay trên giao diện.
- Không đạt ngưỡng: Lượt làm được lưu vào lịch sử; % tiến độ không thay đổi.

---

### UC-03: Admin cấp phát tài khoản Giáo viên và quản lý phân quyền

| Thuộc tính        | Nội dung                                                                        |
| ----------------- | ------------------------------------------------------------------------------- |
| **Actor chính**   | Admin                                                                           |
| **Actor phụ**     | Hệ thống (Account Service, Email Service)                                       |
| **Preconditions** | Admin đã đăng nhập với vai trò Admin                                            |
| **Trigger**       | Admin chọn chức năng "Cấp tài khoản Giáo viên" tại màn hình quản trị người dùng |

**Main Flow:**

1. Admin nhập thông tin giáo viên: họ tên, email, (tùy chọn) chuyên môn/chủ đề phụ trách.
2. Hệ thống kiểm tra email chưa tồn tại trong hệ thống.
3. Hệ thống tạo tài khoản với vai trò Teacher và mật khẩu tạm thời (hoặc liên kết kích hoạt).
4. Hệ thống gửi email thông báo thông tin đăng nhập/liên kết kích hoạt đến giáo viên.
5. Admin xem danh sách tài khoản Teacher hiện có, có thể lọc theo trạng thái (Hoạt động/Đã khóa).
6. Admin chọn một tài khoản và thực hiện thao tác quản lý phân quyền (khóa, mở khóa, thu hồi quyền).
7. Hệ thống cập nhật trạng thái tài khoản ngay lập tức; áp dụng cho các phiên đăng nhập hiện tại (nếu khóa, phiên bị vô hiệu hóa).

**Alternative Flows:**

- **A1 — Email đã tồn tại trong hệ thống:** Tại bước 2, hệ thống từ chối tạo tài khoản và thông báo email đã được sử dụng.
- **A2 — Gửi email thất bại (lỗi hạ tầng email):** Tại bước 4, hệ thống vẫn giữ tài khoản ở trạng thái "Đã tạo — chờ gửi lại", Admin có thể chọn "Gửi lại email kích hoạt".
- **A3 — Admin khóa tài khoản Teacher đang có bài học đã xuất bản:** Tại bước 6–7, hệ thống khóa tài khoản nhưng giữ nguyên nội dung đã xuất bản để không ảnh hưởng đến Student đang học.

**Postconditions:**

- Thành công: Tài khoản Teacher mới được tạo và ở trạng thái hoạt động (chờ kích hoạt lần đầu); hoặc trạng thái phân quyền của tài khoản đã chọn được cập nhật đúng theo thao tác của Admin.
- Thất bại: Không có tài khoản mới nào được tạo; trạng thái phân quyền hiện tại không thay đổi.

---

## 3. Yêu cầu Phi chức năng (Non-Functional Requirements - NFR)

### 3.1. Hiệu năng & Khả năng phản hồi (Performance & Latency)

| Mã              | Hạng mục                         | Mô tả chi tiết                                                                                             | Ngưỡng đo lường / Tiêu chuẩn                                                                       |
| --------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **NFR-PERF-01** | Thời gian xử lý file CSV         | Parse nội dung, validate dữ liệu, mapping từ vựng vào DB và sinh câu hỏi minigame tự động                  | • $\le 3\text{s}$ đối với file $\le 500$ dòng<br>• $\le 10\text{s}$ đối với file $500 - 2000$ dòng |
| **NFR-PERF-02** | Độ trễ khởi tạo Media Streaming  | Thời gian nạp khung hình đầu tiên (Time-to-First-Frame / Initial Buffering) cho Video bài giảng            | $\le 2\text{s}$ trên mạng 4G/Wifi băng thông $\ge 5\text{ Mbps}$                                   |
| **NFR-PERF-03** | Thời gian phản hồi API (Latency) | Thời gian phản hồi đo ở mức Percentile 95 (P95) và P99 cho các API đọc dữ liệu (Topics, Lessons, Comments) | • P95: $\le 300\text{ms}$<br>• P99: $\le 800\text{ms}$                                             |
| **NFR-PERF-04** | API ghi dữ liệu & Nộp bài        | Thời gian hoàn tất xử lý chấm điểm Minigame và ghi nhận tiến độ học tập                                    | $\le 500\text{ms}$                                                                                 |
| **NFR-PERF-05** | Tối ưu hóa tải ứng dụng Web      | Thời gian hiển thị nội dung đầu tiên có ý nghĩa (FCP) và Thời gian tương tác (TTI)                         | • FCP $\le 1.5\text{s}$<br>• TTI $\le 3.0\text{s}$                                                 |
| **NFR-PERF-06** | Khởi động ứng dụng Mobile        | Thời gian khởi động ứng dụng Android (Cold Start và Warm Start)                                            | • Cold start $\le 2.0\text{s}$<br>• Warm start $\le 1.0\text{s}$                                   |
| **NFR-PERF-07** | Tiêu thụ bộ nhớ Mobile Client    | Mức chiếm dụng RAM tối đa của ứng dụng Android khi xem tài liệu PDF/Video dung lượng lớn                   | Không vượt quá **250 MB RAM**; tỷ lệ khung hình đạt $\ge 55\text{ fps}$ không gây giật lag         |

### 3.2. Độ tin cậy & Tính sẵn sàng (Reliability & Availability)

| Mã             | Hạng mục                               | Mô tả chi tiết                                                                                         | Ngưỡng đo lường / Tiêu chuẩn                                                     |
| -------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **NFR-REL-01** | Tính sẵn sàng hệ thống (Uptime)        | Tỷ lệ thời gian hệ thống hoạt động liên tục, sẵn sàng phục vụ người dùng                               | Đạt tối thiểu **99.5% Uptime** hàng tháng (tối đa ~3.6 giờ downtime/tháng)       |
| **NFR-REL-02** | Xử lý sự cố mạng Mobile (Offline Mode) | Cơ chế lưu cache cục bộ (Room DB / SQLite) giúp học sinh không bị mất dữ liệu bài tập khi rớt mạng     | Tự động thử lại (Retry mechanism) với chiến lược Exponential Backoff khi có mạng |
| **NFR-REL-03** | Khả năng chịu lỗi (Fault Tolerance)    | Sự cố gián đoạn tại dịch vụ nền (như parse CSV, gửi mail) không được làm gián đoạn luồng học bài chính | Áp dụng mô hình **Circuit Breaker** và Async Message Queue                       |
| **NFR-REL-04** | Tỷ lệ lỗi giao dịch API (Error Rate)   | Tỷ lệ các phản hồi lỗi HTTP 5xx trên tổng số lượng request hệ thống nhận được                          | $\le 0.1\%$ trong điều kiện tải bình thường                                      |

### 3.3. An toàn thông tin & Bảo mật (Security & Privacy)

| Mã             | Hạng mục                                  | Mô tả chi tiết                                                                                       | Tiêu chuẩn kỹ thuật                                                                                         |
| -------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **NFR-SEC-01** | Mã hóa đường truyền (In-Transit)          | Mọi kết nối giữa Web/Mobile App và Backend bắt buộc phải được mã hóa                                 | Giao thức **HTTPS/TLS 1.3**; hỗ trợ HSTS                                                                    |
| **NFR-SEC-02** | Mã hóa lưu trữ (At-Rest)                  | Dữ liệu nhạy cảm của người dùng và thông tin mật khẩu được mã hóa an toàn                            | • Mật khẩu: **Argon2id** hoặc **Bcrypt** (cost factor $\ge 12$)<br>• CSDL: Mã hóa cấp ổ đĩa AES-256         |
| **NFR-SEC-03** | Quản lý phiên & Xác thực (JWT)            | Sử dụng JSON Web Token (**HS256**) với cấu trúc phân tách rõ ràng giữa Access Token và Refresh Token | • Access Token: Thời hạn **3 giờ**<br>• Refresh Token: Thời hạn **7 ngày**, lưu **HttpOnly, Secure cookie** |
| **NFR-SEC-04** | Kiểm soát quyền truy cập tài nguyên       | Tài nguyên Media (Video, PDF, Docx) không cấp URL public trực tiếp                                   | Sử dụng **Signed URL** hoặc **Pre-signed S3 URL** có thời hạn truy cập ($30 - 60\text{ phút}$)              |
| **NFR-SEC-05** | Chống tấn công phổ biến (OWASP Top 10)    | Hệ thống phải có cơ chế ngăn chặn SQL Injection, XSS, CSRF, và Parameter Tampering                   | Sử dụng ORM/Prepared Statement, Sanitize HTML input ở phần bình luận                                        |
| **NFR-SEC-06** | Giới hạn tần suất gọi API (Rate Limiting) | Ngăn chặn tấn công Brute-Force đăng nhập và DDoS vào các API tốn tài nguyên                          | • API Đăng nhập: Tối đa 5 lần sai / 15 phút / IP<br>• API thường: Tối đa 100 requests / phút / User         |
| **NFR-SEC-07** | Kiểm duyệt và an toàn tải tệp             | File CSV/tài liệu upload phải được kiểm tra loại file thực (Magic Bytes, MIME Type) và dung lượng    | Giới hạn dung lượng: CSV $\le 5\text{MB}$, PDF/Word $\le 25\text{MB}$, Video $\le 200\text{MB}$             |
| **NFR-SEC-08** | Nhật ký kiểm toán (Audit Logging)         | Hệ thống ghi log không thể can thiệp đối với các hành động quản trị nhạy cảm                         | Ghi lại `user_id`, `action`, `IP_address`, `timestamp`, `old_value`, `new_value`                            |

### 3.4. Khả năng mở rộng & Năng lực chịu tải (Scalability & Capacity)

| Mã               | Hạng mục                                           | Mô tả chi tiết                                                                                | Ngưỡng đo lường / Tiêu chuẩn                                                           |
| ---------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **NFR-SCALE-01** | Tải người dùng đồng thời (Concurrency)             | Hệ thống duy trì hoạt động ổn định khi nhiều người dùng cùng truy cập học bài và làm minigame | Tối thiểu **1,000 Concurrent Users** (giai đoạn 1); có khả năng nâng lên 5,000 users   |
| **NFR-SCALE-02** | Kiến trúc mở rộng chiều ngang (Horizontal Scaling) | Tầng Stateless REST API có thể nhân bản (scale out) tức thời khi tài nguyên CPU $\ge 70\%$    | Triển khai qua Docker/Kubernetes hoặc Auto-scaling group phía sau Load Balancer        |
| **NFR-SCALE-03** | Xử lý tác vụ nền bất đồng bộ                       | Tác vụ nặng (parse CSV lớn, trích xuất dữ liệu, gửi email hàng loạt) được đưa vào hàng đợi    | Xử lý qua Message Queue (RabbitMQ / Redis Streams / Kafka worker)                      |
| **NFR-SCALE-04** | Khả năng mở rộng CSDL (Database Scalability)       | Tách biệt luồng đọc/ghi (Read-Write Splitting) và tối ưu hóa bộ nhớ tạm                       | Sử dụng **Redis Caching** cho dữ liệu ít biến động (Danh mục Topic, danh sách bài học) |

### 3.5. Tính khả dụng & Trải nghiệm người dùng (Usability & Accessibility)

| Mã             | Hạng mục                                  | Mô tả chi tiết                                                                                  | Tiêu chuẩn kỹ thuật                                                                          |
| -------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **NFR-USE-01** | Khả năng thích ứng giao diện (Responsive) | Giao diện Web hiển thị liền mạch trên nhiều loại kích thước màn hình                            | Tương thích từ màn hình nhỏ ($360\text{px}$) đến màn hình độ phân giải cao ($1920\text{px}$) |
| **NFR-USE-02** | Tính trực quan và phản hồi thao tác       | Người dùng nhận được phản hồi trực quan (loading skeleton, spinner, snackbar) cho mọi hành động | Phản hồi hiển thị trong vòng $\le 100\text{ms}$ sau khi click/chạm                           |
| **NFR-USE-03** | Thông báo lỗi thân thiện                  | Thông báo lỗi hiển thị bằng ngôn ngữ tự nhiên, chỉ dẫn rõ ràng cách khắc phục                   | Cung cấp mã lỗi cụ thể ở file CSV (ví dụ: _"Lỗi dòng 14: Thiếu cột 'Nghĩa của từ'"_)         |
| **NFR-USE-04** | Tối ưu hóa kích thước ứng dụng Mobile     | Dung lượng cài đặt ứng dụng Android APK/AAB tối ưu để người dùng tải nhanh                      | Dung lượng tải ban đầu $\le 30\text{MB}$; áp dụng ProGuard/R8 và dynamic delivery            |

### 3.6. Tính tương thích & Tính khả chuyển (Compatibility & Portability)

| Mã              | Hạng mục                         | Mô tả chi tiết                                                                          | Tiêu chuẩn kỹ thuật                                                     |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **NFR-COMP-01** | Tương thích Trình duyệt Web      | Hỗ trợ đầy đủ tính năng trên các trình duyệt hiện đại phổ biến                          | Chrome, Firefox, Safari, Microsoft Edge (2 phiên bản gần nhất)          |
| **NFR-COMP-02** | Tương thích Hệ điều hành Android | Ứng dụng Kotlin chạy ổn định trên các phiên bản hệ điều hành Android khác nhau          | Hỗ trợ từ **Android 8.0 (API Level 26)** trở lên đến phiên bản mới nhất |
| **NFR-COMP-03** | Độc lập nền tảng API             | Tầng REST API thiết kế theo chuẩn JSON RESTful, phục vụ đồng nhất cho cả Web và Android | Hỗ trợ chuẩn tài liệu hóa OpenAPI / Swagger 3.0                         |

### 3.7. Khả năng bảo trì & Vận hành (Maintainability & Observability)

| Mã               | Hạng mục                                    | Mô tả chi tiết                                                                  | Tiêu chuẩn kỹ thuật                                                           |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **NFR-MAINT-01** | Cấu trúc mã nguồn & Module hóa              | Áp dụng kiến trúc phân tầng rõ ràng (Clean Architecture / 3-Layer Architecture) | Phân tách rành mạch Controller - Service - Repository                         |
| **NFR-MAINT-02** | Giám sát & Ghi log tập trung                | Hệ thống có cơ chế log lỗi chi tiết theo chuẩn structured JSON kèm Request-ID   | Tích hợp hệ thống APM/Monitoring (Prometheus, Grafana hoặc ELK stack)         |
| **NFR-MAINT-03** | Độ bao phủ kiểm thử tự động (Test Coverage) | Tỷ lệ bao phủ kiểm thử tự động trên các luồng nghiệp vụ cốt lõi                 | Unit Test coverage $\ge 70\%$ cho tầng Service tính toán tiến độ và parse CSV |
| **NFR-MAINT-04** | Quy trình triển khai tự động (CI/CD)        | Tự động hóa quá trình build, test và deploy lên môi trường staging/production   | Pipeline hoàn thành trong $\le 15\text{ phút}$                                |

### 3.8. Sao lưu, Phục hồi & Toàn vẹn dữ liệu (Backup & Disaster Recovery)

| Mã            | Hạng mục                               | Mô tả chi tiết                                                                | Chỉ số mục tiêu                                                                       |
| ------------- | -------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **NFR-DR-01** | Tần suất sao lưu CSDL                  | Tự động sao lưu toàn bộ cơ sở dữ liệu định kỳ                                 | Sao lưu hàng ngày (Daily Snapshot) và lưu trữ bản ghi giao dịch (WAL/Binlog) liên tục |
| **NFR-DR-02** | Mục tiêu điểm phục hồi (RPO)           | Lượng dữ liệu tối đa chấp nhận mất mát khi có sự cố thảm họa xảy ra           | $\text{RPO} \le 1\text{ giờ}$                                                         |
| **NFR-DR-03** | Mục tiêu thời gian phục hồi (RTO)      | Thời gian tối đa để khôi phục hoàn toàn hệ thống trở lại trạng thái hoạt động | $\text{RTO} \le 4\text{ giờ}$                                                         |
| **NFR-DR-04** | Tính toàn vẹn dữ liệu (Data Integrity) | Đảm bảo tính nhất quán dữ liệu tiến độ và kết quả làm bài của học sinh        | Áp dụng tính chất **ACID** cho các thao tác cập nhật điểm số và trạng thái hoàn thành |

---

## 4. Mô hình Dữ liệu Logic (Logical Data Model)

### 4.1. Danh sách các Thực thể (Entities)

| Thực thể         | Mô tả                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| User             | Tài khoản người dùng chung (Student/Teacher/Admin), phân biệt bằng trường `role` |
| Topic            | Chủ đề học tập, do Teacher tạo                                                   |
| Lesson           | Bài học thuộc một Topic, chứa tài liệu học và (tùy chọn) minigame                |
| LessonMaterial   | Tài liệu học liệu (Video/PDF/Word) gắn với một Lesson                            |
| VocabularyItem   | Bản ghi từ vựng được parse từ file CSV, gắn với một Lesson                       |
| Minigame         | Minigame ôn tập được sinh ra từ VocabularyItem, gắn với một Lesson               |
| MinigameQuestion | Câu hỏi cụ thể thuộc một Minigame                                                |
| MinigameAttempt  | Lượt học sinh làm một Minigame, lưu điểm số và thời gian                         |
| LessonProgress   | Trạng thái hoàn thành của một Student với một Lesson cụ thể                      |
| Comment          | Bình luận, có thể gắn ở cấp Topic hoặc cấp Lesson, hỗ trợ reply (self-reference) |

---

_Hết tài liệu._
