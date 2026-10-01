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
│   │   └── index.js
│   └── constants/        # theme (design tokens) + config (env, API base URL)
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

- Luôn dùng `npx expo install <package>` (không dùng `npm install <package>`) để chọn đúng version tương thích SDK.
- Không tạo/sửa thủ công thư mục `android/` và `ios/` — chúng được sinh tự động (CNG); cấu hình native trong `app.json`.
- Thư viện có native code cần **development build** (`eas build --profile development`), không chạy được trong Expo Go.
- Token JWT: access token hết hạn 3 giờ, refresh token nằm trong **HttpOnly cookie** → không lưu token vào `AsyncStorage`/`localStorage`.

## Trạng thái

Đã có base setup (routing + theme + config). Các màn hình theo `Docs/Stitch_App_Description.md` chưa được hiện thực.
