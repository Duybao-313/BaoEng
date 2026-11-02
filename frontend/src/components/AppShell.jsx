import Icon from './Icon'
import { getUser, logout } from '../utils/auth'

const NAV_ITEMS = [
  { path: 'dashboard', icon: 'dashboard', label: 'Tổng quan', badge: null },
  { path: 'topics', icon: 'category', label: 'Quản lý Chủ đề', badge: null },
  { path: 'lessons', icon: 'auto_stories', label: 'Bài học & Học liệu', badge: null },
  { path: 'vocab', icon: 'sports_esports', label: 'Từ vựng & Minigame', badge: null },
  { path: 'comments', icon: 'forum', label: 'Phản hồi Bình luận', badge: '8' },
  { path: 'profile', icon: 'workspace_premium', label: 'Hồ sơ & Chứng chỉ', badge: null },
]

export default function AppShell({ active, children }) {
  const user = getUser()
  const fullName = user?.fullName || 'Giảng viên'
  const username = user?.username || ''
  const roleLabel = user?.role === 'ADMIN' ? 'Quản trị viên' : 'Giảng viên'
  const initials = (fullName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()) || 'GV'

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Brand */}
          <div className="h-16 px-space-lg flex items-center gap-space-sm bg-surface-container-lowest">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0">
              <Icon name="school" className="text-[20px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-none">BaoEng</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                Educator Suite
              </span>
            </div>
          </div>

          {/* Status pill */}
          <div className="px-space-md py-space-sm">
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-secondary-container"></span>
                <span className="font-label-md text-label-md text-secondary">Giảng dạy trực tuyến</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                Kỳ 2024
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-space-md mt-space-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.path
              return (
                <a
                  key={item.path}
                  href={`#/${item.path}`}
                  className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-body-md-medium text-body-md-medium transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  } ${item.badge ? 'justify-between' : ''}`}
                >
                  <span className="flex items-center gap-space-sm">
                    <Icon name={item.icon} className="text-[20px]" />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="bg-error text-on-error font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              )
            })}
          </nav>
        </div>

        {/* Support card */}
        <div className="p-space-md bg-surface-container-low m-space-md rounded-xl">
          <div className="flex items-center gap-space-sm">
            <Icon name="support_agent" className="text-primary text-[22px]" />
            <div>
              <p className="font-label-md text-label-md text-on-surface">Hỗ trợ Giảng viên</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">support@baoeng.edu.vn</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="pl-72">
        {/* Top header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl">
          <div className="flex items-center gap-space-md w-96">
            <div className="relative w-full">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
              />
              <input
                className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md pl-10 pr-4 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tìm kiếm học liệu, học viên, bài tập..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center bg-surface-container-low rounded-xl p-1">
              <button className="font-label-sm text-label-sm px-2.5 py-1 rounded-lg bg-surface-container-lowest shadow-sm text-primary font-bold" type="button">
                VIE
              </button>
              <button className="font-label-sm text-label-sm px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-on-surface" type="button">
                ENG
              </button>
            </div>
            <button className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" type="button">
              <Icon name="notifications" className="text-[24px]" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-on-error">
                5
              </span>
            </button>
            <div className="h-8 w-px bg-surface-container-high"></div>
            <a href="#/profile" className="flex items-center gap-space-sm">
              <div className="text-right">
                <p className="font-label-lg text-label-lg text-on-surface leading-snug">{fullName}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{roleLabel} • {username}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center ring-2 ring-primary-fixed font-bold font-label-md text-label-md">
                {initials}
              </div>
            </a>
            <button
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors"
              onClick={logout}
              title="Đăng xuất"
              type="button"
            >
              <Icon name="logout" className="text-[24px]" />
            </button>
          </div>
        </header>

        <main className="w-full pt-16 bg-background px-space-xl py-space-xl">
          <div className="flex flex-col w-full">{children}</div>
        </main>
      </div>
    </>
  )
}
