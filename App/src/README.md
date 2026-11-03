# Cau truc thu muc `src/`

Cau truc chuan cho Expo Router (SDK 57) + React Native, theo huong **layered (theo vai tro)**.

## Cay thu muc

```text
src/
├── app/                        # CHI chua route — moi file .js trong day la 1 man hinh
│   ├── _layout.js              # Root layout (Stack + Providers)
│   ├── index.js                # Route "/"
│   ├── +not-found.js           # Route 404
│   ├── (auth)/                 # Nhom route khong hien tren URL
│   │   ├── _layout.js
│   │   ├── sign-in.js          # Man hinh dang nhap (theo mockup)
│   │   └── sign-up.js
│   ├── (tabs)/                 # Nhom route co tab bar
│   │   ├── _layout.js          # <Tabs> config
│   │   ├── index.js            # tab "Hoc"
│   │   ├── vocabulary.js       # tab "Tu vung"
│   │   ├── practice.js         # tab "Luyen tap"
│   │   └── profile.js          # tab "Ca nhan"
│   └── (modals)/
│       └── settings.js         # Trinh bay dang modal (presentation: 'modal')
│
├── api/                        # Tang giao tiep Backend (khong chua JSX)
│   ├── client.js               # fetch wrapper: timeout, ApiError, JSON
│   ├── endpoints.js            # Hang so duong dan API
│   ├── auth.js                 # login / register / me
│   ├── lessons.js              # list / detail / complete
│   └── index.js                # Barrel export
│
├── components/                 # UI tai su dung
│   ├── ui/                     # Primitive: Alert, Button, Card, Checkbox,
│   │   └── index.js            #   Divider, Icon, Input, ProgressBar,
│   │                           #   ProgressRing, Screen
│   └── layout/                 # AppHeader (app bar dung chung moi man hinh)
│
├── constants/                  # Gia tri bat bien
│   ├── config.js               # API_BASE_URL, timeout, nguong dat
│   ├── theme.js                # palette (Material 3), colors, radius,
│   │                           #   spacing, typography, shadows
│   └── index.js
│
├── hooks/                      # Custom hooks dung chung
│   ├── useAsync.js             # loading / error / data
│   ├── useTheme.js             # truy cap design tokens
│   └── index.js
│
├── providers/                  # React Context toan cuc
│   ├── AppProviders.js         # Gom SafeAreaProvider (+ QueryClient, Auth... sau nay)
│   └── index.js
│
├── features/                   # Module theo nghiep vu (feature-first)
│   ├── auth/                   #   components/ (SocialSignIn) + hooks/
│   │                           #   (useSignIn, useSignUp) + errors.js
│   ├── home/                   #   TodayProgressCard + hooks trang chu
│   ├── lesson/                 #   features/lesson/{components,hooks,api}
│   └── progress/               #   ProgressStatTiles, WeeklyPracticeChart,
│                               #   TopicProgressCard
│
├── store/                      # State toan cuc (Zustand / Redux Toolkit)
├── types/                      # JSDoc typedef hoac .ts khi chuyen TypeScript
├── utils/                      # Ham thuan: format, validate (khong JSX, khong API)
└── ...
```

Thu muc `assets/` nam o **goc project** (`App/assets/`) vi `app.json` dang tro toi do.

## Quy tac

1. **`app/` chi chua route.** Khong dat component/hook/util trong `app/` — file la
   man hinh, thu muc la segment cua URL. Code khong phai route phai nam ngoai `app/`.
2. **Mot chieu phu thuoc:** `app/` -> `features/` -> `components|hooks|api|utils`.
   Tang duoi KHONG duoc import nguoc len `app/`.
3. **Nhom route** dung ngoac don `(tabs)`, `(auth)` — khong xuat hien tren URL.
4. **File rieng tu** trong `app/` (khong phai route) nen dat ngoai `app/` hoac them `_`
   (vi du `_components/`) — Expo Router bo qua file bat dau bang `_`.
5. **Dat tên file:** component `PascalCase.js`, hook `useSomething.js`, util `camelCase.js`,
   route `kebab-case.js`.
6. **Khong fetch truc tiep trong component** — di qua `api/` + `hooks/`.
7. **Design tokens** chi lay tu `constants/theme.js` (nhom `colors`), khong hardcode mau.
8. **Icon** chi dung component `Icon` (`components/ui/Icon.js`) — khong import truc tiep
   tu `@expo/vector-icons`, de sau nay doi bo icon chi sua mot cho.

## Man hinh da co

| Route      | File                    | Ghi chu                                                  |
| ---------- | ----------------------- | -------------------------------------------------------- |
| `/`        | `app/index.js`          | Trang chao, co CTA sang dang nhap                        |
| `/sign-in` | `app/(auth)/sign-in.js` | Dang nhap: validate, loading, loi, social, quen mat khau |
| `/sign-up` | `app/(auth)/sign-up.js` | Dang ky tai khoan hoc vien                               |
| `*`        | `app/+not-found.js`     | 404                                                      |

Header mac dinh cua Stack da tat (`headerShown: false`) — moi man hinh tu ve
`<AppHeader />` de giong mockup.

## Them mot man hinh moi

```js
// src/app/(tabs)/vocabulary.js
import { StyleSheet, View } from "react-native";

import { AppHeader } from "../../components/layout/AppHeader";
import { Card, Screen } from "../../components/ui";
import { spacing } from "../../constants/theme";

export default function VocabularyScreen() {
  return (
    <Screen padded={false}>
      <AppHeader title="Từ vựng" />
      <View style={styles.body}>
        <Card title="Từ vựng" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: spacing.md, gap: spacing.md },
});
```

`Screen padded={false}` de `AppHeader` nam ngoai vung padding (header khong bi scroll).
Man hinh co form thi tach logic ra hook trong `src/features/<feature>/hooks/`
(xem `useSignIn.js`) — man hinh chi lo hien thi.

## Buoc tiep theo (tuy chon)

- **Dung thu UI that:** `npx expo start` roi mo iOS/Android (hoac `--web`).
- **Path alias** `@/` de bo import `../../`: them `jsconfig.json` + `babel-plugin-module-resolver`.
- **State toan cuc:** `npm i zustand` -> dat store trong `src/store/`.
- **Data fetching:** `npm i @tanstack/react-query` -> them `QueryClientProvider` vao `AppProviders`.
- **Tab bar:** dien vao `app/(tabs)/_layout.js` + cac tab; luu y `(tabs)/index.js`
  se trung route `/` voi `app/index.js` — can doi trang chao vao trong `(tabs)`.
- **TypeScript:** doi `.js` -> `.tsx` va giu nguyen cay thu muc.
