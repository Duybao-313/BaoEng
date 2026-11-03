/**
 * Tu dien Viet -> Anh cho toan bo chuoi giao dien.
 *
 * Quy uoc:
 * - Key la chuoi hien thi tieng Viet (giong het trong code) => value la ban dich tieng Anh.
 * - Key co the chua placeholder dang `{ten}` de dich ca chuoi ghep so lieu,
 *   vi du: `{n} bài học` => `{n} lessons`.
 * - Khong dich du lieu dong lay tu API (ten chu de, bai hoc, binh luan...).
 */
export const EN_MESSAGES = {
  // ---------- Dieu huong / chung ----------
  "Trang chủ": "Home",
  "Tiến độ": "Progress",
  "Thông báo": "Notifications",
  "Hồ sơ": "Profile",
  "Cài đặt": "Settings",
  "Tìm kiếm": "Search",
  "Tìm kiếm chủ đề": "Search topics",
  "Tìm kiếm chủ đề...": "Search topics...",
  "Tìm kiếm chủ đề, bài học...": "Search topics, lessons...",
  "Tìm kiếm nội dung học": "Search learning content",
  "Tìm gần đây": "Recent searches",
  "Tìm lại {keyword}": "Search again for {keyword}",
  "Quay lại": "Back",
  "Rời": "Leave",
  "Hủy": "Cancel",
  "Xóa": "Clear",
  "Gửi": "Send",
  "Tiếp theo": "Next",
  "Bỏ qua": "Skip",
  "Thử lại": "Retry",
  "Xem tất cả": "See all",
  "Thu gọn": "Collapse",
  "Đọc tất cả": "Mark all read",
  "Tất cả": "All",
  "Lỗi": "Error",
  "Thành công": "Success",
  "Hợp lệ": "Valid",
  "Người dùng": "User",
  "Giáo viên": "Teacher",
  "Học viên": "Student",
  "Tài khoản": "Account",
  "Tất cả chủ đề nổi bật": "All featured topics",
  "Khám phá chủ đề": "Explore topics",
  "Chọn chủ đề bạn yêu thích và bắt đầu học ngay hôm nay.":
    "Pick a topic you love and start learning today.",

  // ---------- Xác thực ----------
  "Đăng nhập": "Sign in",
  "Đăng ký": "Sign up",
  "Đăng xuất": "Sign out",
  "Đăng ký ngay": "Sign up now",
  "Đăng nhập không thành công": "Sign in failed",
  "Đăng ký không thành công": "Sign up failed",
  "Quên mật khẩu": "Forgot password",
  "Quên mật khẩu?": "Forgot password?",
  "Đặt lại mật khẩu": "Reset password",
  "Đặt mật khẩu mới": "Set a new password",
  "Xác thực email": "Verify email",
  "Xác thực không thành công": "Verification failed",
  "Xác thực thành công!": "Verification successful!",
  "Tạo tài khoản": "Create account",
  "Tạo tài khoản học viên": "Create a student account",
  "Bắt đầu lộ trình 15 phút mỗi ngày cùng BaoEng.":
    "Start your 15-minute-a-day journey with BaoEng.",
  "Chào mừng trở lại! 👋": "Welcome back! 👋",
  "Đăng nhập để tiếp tục chuỗi ngày học tiếng Anh cùng BaoEng.":
    "Sign in to keep your English learning streak going with BaoEng.",
  "Tên đăng nhập": "Username",
  "Mật khẩu": "Password",
  "Mật khẩu hiện tại": "Current password",
  "Mật khẩu mới": "New password",
  "Xác nhận mật khẩu mới": "Confirm new password",
  "Nhập lại mật khẩu mới": "Re-enter new password",
  "Nhập mật khẩu của bạn": "Enter your password",
  "Ghi nhớ đăng nhập": "Remember me",
  "Hiện mật khẩu": "Show password",
  "Ẩn mật khẩu": "Hide password",
  "Họ và tên": "Full name",
  "Email": "Email",
  "VD: Nguyễn Quốc Bảo": "e.g. Nguyen Quoc Bao",
  "Hoặc đăng nhập với": "Or sign in with",
  "Đăng nhập với {provider}": "Sign in with {provider}",
  "Đăng nhập bằng {provider}": "Sign in with {provider}",
  "Chưa có tài khoản học viên?": "Don't have a student account?",
  "Đã có tài khoản?": "Already have an account?",
  "Gửi liên kết đặt lại": "Send reset link",
  "Quay lại đăng nhập": "Back to sign in",
  "Về trang đăng nhập": "Back to sign in",
  "Về trang chủ": "Back to home",
  "Điền nhanh dữ liệu mẫu": "Fill demo data",
  "Sau khi đăng ký, vui lòng kiểm tra email để xác thực tài khoản trước khi đăng nhập.":
    "After signing up, verify your email before signing in.",
  "Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu cho bạn.":
    "Enter your registered email and we'll send you a reset link.",
  "Chọn một mật khẩu mới cho tài khoản của bạn.":
    "Choose a new password for your account.",
  "Nếu email tồn tại, liên kết đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.":
    "If the email exists, a reset link has been sent. Please check your inbox.",
  "Đặt lại mật khẩu thành công.": "Password reset successfully.",
  "Đổi mật khẩu thành công.": "Password changed successfully.",
  "Tài khoản của bạn đã được kích hoạt. Giờ bạn có thể đăng nhập và bắt đầu học.":
    "Your account is activated. You can sign in and start learning.",
  "Tài khoản chưa được xác thực email. Vui lòng kiểm tra hộp thư để kích hoạt.":
    "Your account is not verified. Please check your inbox to activate it.",
  "Tài khoản đã bị khóa. Vui lòng liên hệ bộ phận hỗ trợ BaoEng.":
    "Your account is locked. Please contact BaoEng support.",
  "Token không hợp lệ hoặc đã hết hạn.": "The token is invalid or has expired.",
  "Bạn đã thử quá nhiều lần. Vui lòng chờ một lát rồi thử lại.":
    "Too many attempts. Please wait a moment and try again.",
  "Máy chủ đang bận. Vui lòng thử lại sau.": "The server is busy. Please try again later.",
  "Không kết nối được máy chủ. Vui lòng kiểm tra kết nối mạng.":
    "Cannot reach the server. Please check your connection.",
  "Không gửi được yêu cầu. Vui lòng thử lại.":
    "Couldn't send the request. Please try again.",
  "Đã có lỗi xảy ra. Vui lòng thử lại.": "Something went wrong. Please try again.",
  "Vui lòng thử lại sau.": "Please try again later.",
  "Vui lòng kiểm tra kết nối mạng.": "Please check your connection.",
  "Email không hợp lệ.": "Invalid email.",
  "Email không hợp lệ. Vui lòng kiểm tra lại.": "Invalid email. Please check again.",
  "Email này đã được sử dụng. Vui lòng dùng email khác.":
    "This email is already used. Please use another one.",
  "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.":
    "This username already exists. Please choose another.",
  "Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.":
    "Incorrect username or password. Please check again.",
  "Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại.":
    "Invalid credentials. Please check again.",
  "Tên đăng nhập không được chứa khoảng trắng.": "Username cannot contain spaces.",
  "Tên đăng nhập tối đa 50 ký tự.": "Username must be at most 50 characters.",
  "Mật khẩu tối thiểu 8 ký tự.": "Password must be at least 8 characters.",
  "Mật khẩu mới tối thiểu 8 ký tự.": "New password must be at least 8 characters.",
  "Xác nhận mật khẩu không khớp.": "Passwords do not match.",
  "Tối thiểu 8 ký tự": "At least 8 characters",
  "Vui lòng nhập tên đăng nhập.": "Please enter your username.",
  "Vui lòng nhập mật khẩu.": "Please enter your password.",
  "Vui lòng nhập mật khẩu hiện tại.": "Please enter your current password.",
  "Vui lòng nhập họ tên.": "Please enter your full name.",
  "Dành riêng cho học viên BaoEng • Mã hóa an toàn SSL 256-bit":
    "For BaoEng students • Secured with 256-bit SSL",
  "Học cùng BaoEng": "Learn with BaoEng",
  "15 phút mỗi ngày để mở khóa phản xạ tiếng Anh tự nhiên.":
    "15 minutes a day to build natural English reflexes.",
  "Học liệu đa phương tiện": "Multimedia lessons",
  "Video, PDF và Word giúp bạn học tiếng Anh sinh động hơn.":
    "Video, PDF and Word make learning English more lively.",
  "Minigame từ vựng": "Vocabulary minigames",
  "Ôn tập từ mới qua các câu đố trắc nghiệm nhanh và thú vị.":
    "Review new words with quick and fun multiple-choice quizzes.",
  "Theo dõi tiến độ": "Track your progress",
  "Biết rõ bạn đã hoàn thành bao nhiêu phần trong mỗi chủ đề.":
    "See exactly how much of each topic you have finished.",
  "Đang tạo tài khoản...": "Creating account...",
  "Đang đăng nhập...": "Signing in...",
  "Đang gửi...": "Sending...",
  "Đang xác thực...": "Verifying...",
  "Đang cập nhật...": "Updating...",
  "Đang lưu...": "Saving...",
  "Đang nộp bài...": "Submitting...",
  "Đang rời...": "Leaving...",
  "Đang tham gia...": "Joining...",
  "Đang xử lý...": "Processing...",
  "Đang tải...": "Loading...",
  "Đang học": "In progress",

  // ---------- Hồ sơ / cài đặt ----------
  "Thông tin cá nhân": "Personal information",
  "Lưu thay đổi": "Save changes",
  "Đổi mật khẩu": "Change password",
  "Cập nhật mật khẩu": "Update password",
  "Ảnh đại diện": "Profile photo",
  "Đổi ảnh đại diện": "Change profile photo",
  "Đã cập nhật ảnh đại diện.": "Profile photo updated.",
  "Không cập nhật được ảnh đại diện.": "Couldn't update your profile photo.",
  "Bạn cần cấp quyền truy cập thư viện ảnh để đổi ảnh đại diện.":
    "You need photo library access to change your profile photo.",
  "Đã lưu thay đổi hồ sơ.": "Profile changes saved.",
  "Không lưu được hồ sơ. Vui lòng thử lại.":
    "Couldn't save your profile. Please try again.",
  "Không đổi được mật khẩu. Vui lòng thử lại.":
    "Couldn't change your password. Please try again.",
  "Không đặt lại được mật khẩu. Vui lòng thử lại.":
    "Couldn't reset your password. Please try again.",
  "Ngôn ngữ": "Language",
  "Tiếng Việt": "Vietnamese",
  "Tiếng Anh": "English",
  "Giao diện": "Appearance",
  "Mặc định": "Default",
  "Tối": "Dark",
  "Gradient": "Gradient",
  "Chọn ngôn ngữ hiển thị cho toàn bộ ứng dụng.":
    "Choose the display language for the whole app.",
  "Chọn màu giao diện cho toàn bộ ứng dụng.":
    "Choose the color theme for the whole app.",
  "Xem trước": "Preview",
  "Tuỳ chỉnh ngôn ngữ và màu giao diện cho toàn bộ ứng dụng.":
    "Customize the language and color theme for the whole app.",
  "Học tiếng Anh mỗi ngày": "Learn English every day",
  "Minigame từ vựng • Theo dõi tiến độ • Học liệu đa phương tiện":
    "Vocabulary minigames • Progress tracking • Multimedia lessons",

  // ---------- Trang chủ / chủ đề ----------
  "Tiến độ hôm nay": "Today's progress",
  "Chủ đề đang học": "Current topic",
  "Chủ đề đề xuất cho bạn": "Recommended for you",
  "Học tiếp": "Continue",
  "Học tiếp chủ đề {title}": "Continue {title}",
  "Mở chủ đề {title}": "Open topic {title}",
  "Xem chủ đề {title}, đã hoàn thành {a} trên {b} bài học":
    "View {title}, {a} of {b} lessons completed",
  "Danh sách bài học": "Lesson list",
  "Chủ đề này chưa có bài học nào.": "This topic has no lessons yet.",
  "Chưa có bài học": "No lessons yet",
  "Bạn chưa bắt đầu học": "You haven't started yet",
  "Sẵn sàng học bài đầu tiên": "Ready for your first lesson",
  "Tham gia chủ đề": "Join topic",
  "Đã tham gia chủ đề": "Joined",
  "Rời chủ đề": "Leave topic",
  "Rời chủ đề này?": "Leave this topic?",
  "Bạn đã hoàn thành mọi chủ đề đã tham gia.":
    "You've completed every topic you joined.",
  "Bạn đã hoàn thành toàn bộ lộ trình đã tham gia.":
    "You've completed your entire enrolled path.",
  "Bạn đã hoàn thành chủ đề này": "You've completed this topic",
  "Đã hoàn thành chủ đề": "Topic completed",
  "Đã hoàn thành": "Completed",
  "Hoàn thành": "Completed",
  "hoàn thành": "completed",
  "Chủ đề xong": "Topics finished",
  "Bài hoàn thành": "Lessons completed",
  "Chưa có chủ đề nào": "No topics yet",
  "Bỏ lọc cấp độ": "Clear level filter",
  "{n} chủ đề phù hợp": "{n} matching topics",
  "Thử từ khóa khác hoặc bỏ bớt bộ lọc để xem toàn bộ chủ đề.":
    "Try another keyword or remove filters to see all topics.",
  "Hôm nay bạn đã hoàn thành {n} bài học.": "You completed {n} lessons today.",
  "Hôm nay bạn chưa học — bắt đầu với vài phút ôn từ vựng nhé!":
    "You haven't studied today — start with a few minutes of vocabulary review!",
  "Đã đạt mục tiêu hôm nay": "Daily goal reached",
  "{label} hôm nay: {value} phút": "{label} today: {value} min",
  "Chuỗi {n} ngày học liên tiếp": "{n}-day learning streak",
  "{n} ngày": "{n} days",
  "Còn {n} phút nữa": "{n} min left",
  "{n} phút": "{n} min",
  "{n} giờ": "{n} hr",
  "{n} giờ {m} phút": "{n} hr {m} min",
  // Manh chuoi khi JSX tach so lieu thanh nhieu node con (vi du `{n} bài học`).
  " ngày": " days",
  " phút": " min",
  " giờ": " hr",
  " phút / ": " min / ",
  " bài học": " lessons",
  " bài": " lessons",
  " bài hoàn thành": " lessons completed",
  " chủ đề": " topics",
  " câu đúng": " correct",
  " điểm": " points",
  "/{n} phút": "/{n} min",
  "Từ vựng (": "Vocabulary (",
  "Câu ": "Question ",
  "Bài học đã hoàn thành — Tiến độ chủ đề: ":
    "Lesson completed — Topic progress: ",

  // ---------- Bài học ----------
  "Tài liệu PDF": "PDF document",
  "Chưa có học liệu Video": "No video material yet",
  "Ôn tập từ vựng": "Vocabulary review",
  "Kiểm tra vốn từ của bạn với trắc nghiệm nhanh.":
    "Test your vocabulary with a quick quiz.",
  "Bắt đầu": "Start",
  "Từ vựng": "Vocabulary",
  "Chưa có từ vựng": "No vocabulary yet",
  "Bài học này chưa có danh sách từ vựng.":
    "This lesson has no vocabulary list yet.",
  "Bình luận & Hỏi giáo viên": "Comments & questions",
  "Nội dung bình luận": "Comment",
  "Đặt câu hỏi cho giáo viên...": "Ask your teacher...",
  "Chưa có bình luận nào.": "No comments yet.",
  "Không tải được bình luận": "Couldn't load comments",
  "Không tải được bài học": "Couldn't load the lesson",
  "Không tải được chủ đề": "Couldn't load the topic",
  "Không tìm thấy chủ đề": "Topic not found",
  "Không tìm thấy kết quả": "No results found",
  "Không tìm được kết quả": "No results found",
  "Trình phát video bài học": "Lesson video player",
  "Mở tài liệu bài học": "Open lesson material",
  "Video chưa sẵn sàng để phát": "The video is not ready to play",
  "Hãy quay lại sau khi giáo viên đăng tải nội dung mới nhé.":
    "Please come back after your teacher uploads new content.",
  "Bài tiếp theo": "Next lesson",
  "Bài tiếp: {title}": "Next: {title}",
  "Quay lại bài học": "Back to lesson",
  "Bắt đầu học": "Start learning",
  "Từ vựng ({n})": "Vocabulary ({n})",

  // ---------- Minigame ----------
  "Câu hỏi": "Question",
  "Câu trước": "Previous",
  "Câu sau": "Next",
  "Nộp bài": "Submit",
  "Thoát": "Exit",
  "Kết quả Minigame": "Minigame result",
  "điểm": "points",
  "Đạt": "Passed",
  "Chưa đạt": "Not passed",
  "Làm lại": "Try again",
  "Không thể nộp bài": "Cannot submit",
  "Vui lòng trả lời tất cả câu hỏi trước khi nộp bài.":
    "Please answer all questions before submitting.",
  "Không nộp được bài làm. Vui lòng thử lại.":
    "Couldn't submit your answers. Please try again.",
  "Không tải được minigame": "Couldn't load the minigame",
  "{a}/{b} câu đúng": "{a}/{b} correct",
  "Bài học đã hoàn thành": "Lesson completed",

  // ---------- Tiến độ ----------
  "Tiến độ tổng thể": "Overall progress",
  "Tiến độ tổng thể {value}": "Overall progress {value}",
  "Giờ tích lũy": "Total hours",
  "Thời gian luyện tập tuần này": "Practice time this week",
  "Tổng cộng:": "Total:",
  "Tuyệt vời! Bạn đã đạt mục tiêu luyện tập của tuần này.":
    "Great job! You've reached this week's practice goal.",
  "{days}/7 ngày có học · còn {mins} phút để đạt mục tiêu tuần":
    "{days}/7 days studied · {mins} min left this week",
  "{a}/{b} bài hoàn thành": "{a}/{b} lessons completed",
  "{a}/{b} bài học": "{a}/{b} lessons",
  "{n} bài học": "{n} lessons",
  "{n} bài": "{n} lessons",
  "Tham gia một chủ đề và hoàn thành bài học đầu tiên để xem tiến độ tại đây.":
    "Join a topic and finish your first lesson to see progress here.",
  "Không tải được tiến độ": "Couldn't load progress",
  "Không tải được tiến độ hôm nay.": "Couldn't load today's progress.",
  "Không tải được dữ liệu luyện tập tuần này.":
    "Couldn't load this week's practice data.",
  "Không tải được chủ đề đề xuất.": "Couldn't load recommended topics.",
  "Chỉ còn {n} bài học nữa để hoàn thành lộ trình.":
    "{n} lessons left to finish your path.",
  "So với tuần trước tăng {n} phần trăm": "Up {n}% vs last week",
  "So với tuần trước giảm {n} phần trăm": "Down {n}% vs last week",

  // ---------- Tìm kiếm ----------
  "Nhập từ khóa để tìm chủ đề và bài học.":
    "Enter a keyword to search topics and lessons.",
  "Không có nội dung nào khớp với \"{query}\".":
    "Nothing matches \"{query}\".",
  "Không có nội dung nào khớp với \"{query}\" ở cấp độ đã chọn.":
    "Nothing matches \"{query}\" at the selected level.",
  "Xem tất cả kết quả cho \"{query}\"": "See all results for \"{query}\"",
  "Lọc {label}": "Filter {label}",

  // ---------- Thông báo ----------
  "Chưa có thông báo nào": "No notifications yet",
  "Khi giáo viên trả lời câu hỏi của bạn, thông báo sẽ xuất hiện tại đây.":
    "When your teacher answers your question, it will show up here.",
  "Không tải được thông báo": "Couldn't load notifications",
  "Không tải được thông báo.": "Couldn't load notifications.",
  "Không cập nhật được thông báo.": "Couldn't update the notification.",
  "Không đánh dấu được thông báo.": "Couldn't mark notifications as read.",
  "{n} thông báo chưa đọc": "{n} unread notifications",
  "Phản hồi mới cho bình luận của bạn": "New reply to your comment",

  // ---------- Khác ----------
  "Sắp ra mắt": "Coming soon",
  "{feature} sẽ được bổ sung trong bản cập nhật tới.":
    "{feature} is coming in a future update.",
  "Cập nhật mật khẩu thành công.": "Password updated successfully.",
  "Không tìm thấy nội dung": "Content not found",
  "Trang không tồn tại": "Page not found",
};
