# BaoEng — Mobile App (React Native + Expo)

Ứng dụng mobile của dự án **BaoEng** (nền tảng học tiếng Anh trực tuyến), dành cho **người học (Student)**.

- **Stack:** React Native + Expo (SDK 57), Expo Router (file-based routing), JavaScript/JSX.
- **Build/phát hành:** EAS Build / EAS Update (xem `eas.json`).
- **Tài liệu nghiệp vụ:** `../Docs/BRD_SRS_demo.md`, `../Docs/API_Specification.md`, `../Docs/Stitch_App_Description.md`.
- **Quy tắc code:** `../.docs/AI_CODING_RULES.md`.

## Cấu trúc thư mục

```
App/
├── src/
│   ├── app/              # Expo Router — mỗi file là 1 màn hình (_layout.js = navigator)
│   │   ├── _layout.js
│   │   ├── settings.js   # Cài đặt: ngôn ngữ + giao diện (light/dark/gradient)
│   │   └── index.js
│   ├── i18n/             # từ điển VI → EN + hàm translate()
│   ├── providers/        # AppProviders, SettingsProvider (theme + ngôn ngữ)
│   └── constants/        # theme (design tokens + runtime theme) + config (env, API base URL)
├── assets/               # icon, splash
├── app.json              # cấu hình app (tên, scheme, icon, plugins)
├── eas.json              # profile build EAS
└── eslint.config.js
```

> Quy ước: **mọi route** nằm trong `src/app/`; components/hooks/utils đặt **ngoài** `src/app/`.

## Cài đặt

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
```

## Chạy app

```bash
npm start          # mở Metro + Expo Dev Tools
npm run android    # mở trên Android (emulator/thiết bị)
npm run ios        # macOS hoặc Expo Go
npm run web        # chạy trên trình duyệt (dev nhanh)
npm run lint       # kiểm tra ESLint
```

## Lưu ý kỹ thuật

- **Giao diện & ngôn ngữ:** màn hình `src/app/settings.js` cho chọn tiếng Việt / tiếng Anh và 3 giao diện
  (mặc định / tối / gradient). Lựa chọn được lưu bằng AsyncStorage (`baoeng.themeMode`, `baoeng.language`).
  - Style dùng `themed((colors) => ({ ... }))` trong `constants/theme.js` — mỗi file được tạo sẵn 3 bộ style
    và trả về Proxy theo giao diện đang chọn; đổi giao diện sẽ remount navigator (`key={themeMode}`) để áp dụng.
  - Chuỗi tiếng Việt trong code được dịch tự động qua `Text` của `components/ui/Text.js` + từ điển
    `src/i18n/messages.js` (hỗ trợ placeholder như `{n} bài học`).
- Luôn dùng `npx expo install <package>` (không dùng `npm install <package>`) để chọn đúng version tương thích SDK.
- Không tạo/sửa thủ công thư mục `android/` và `ios/` — chúng được sinh tự động (CNG); cấu hình native trong `app.json`.
- Thư viện có native code cần **development build** (`eas build --profile development`), không chạy được trong Expo Go.
- Token JWT: access token hết hạn 3 giờ, refresh token nằm trong **HttpOnly cookie** → không lưu token vào `AsyncStorage`/`localStorage`.

## Trạng thái

Đã hiện thực đủ 14 màn hình theo `Docs/Stitch_App_Description.md`:

- **Tài khoản:** onboarding, đăng nhập, đăng ký, quên/đặt lại mật khẩu, xác thực email.
- **Học tập:** trang chủ (danh sách chủ đề + lọc level + tìm kiếm), chi tiết chủ đề (tham gia/rời, tiến độ, bình luận),
  chi tiết bài học (tab Video/PDF/Word, từ vựng, card minigame, bình luận), chơi minigame, kết quả minigame.
- **Theo dõi:** tiến độ (tổng thể + theo chủ đề + tuần), thông báo (danh sách + đánh dấu đã đọc), tìm kiếm, hồ sơ
  (đổi tên, đổi ảnh đại diện qua `expo-image-picker`, đổi mật khẩu, đăng xuất).
- **Cài đặt:** đổi ngôn ngữ toàn app (VI/EN) và giao diện (mặc định / tối / gradient) — xem `src/app/settings.js`.

Lưu ý: `expo-image-picker` có sẵn trong Expo Go và hỗ trợ Expo Web; nếu dùng development build thì phải build lại sau khi thêm module.

