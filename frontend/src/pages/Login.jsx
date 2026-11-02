import { useState } from 'react'
import Icon from '../components/Icon'
import { login } from '../api/auth'

const ROLE_COPY = {
  teacher: {
    title: 'Đăng nhập Cổng Giảng Viên',
    subtext: 'Truy cập lớp học, kho đề thi số và giao lưu học viên trực tuyến.',
    placeholder: 'Nhập username giảng viên (VD: gv.nguyenvanan)',
    value: '',
  },
  admin: {
    title: 'Đăng nhập Ban Quản Trị',
    subtext: 'Dành riêng cho Kiểm duyệt viên giáo trình và Trưởng bộ môn.',
    placeholder: 'Nhập username quản trị (VD: admin.khoahoc)',
    value: '',
  },
}

/** Tai khoan mau de dang nhap nhanh (du lieu test da co trong DB dev). */
const QUICK_ACCOUNTS = [
  { label: 'Giảng viên', hint: 'teacher1', username: 'teacher1', password: 'Teacher@123' },
  { label: 'Học viên', hint: 'webtest1', username: 'webtest1', password: 'Webtest@123' },
  { label: 'Chưa xác thực', hint: 'webtest2', username: 'webtest2', password: 'Webtest@123' },
]

/** Chuyen ma loi tu Backend thanh thong bao tieng Viet. */
function mapLoginError(error) {
  switch (error?.code) {
    case 'INVALID_CREDENTIALS':
      return 'Sai tên đăng nhập hoặc mật khẩu. Vui lòng kiểm tra lại.'
    case 'ACCOUNT_PENDING':
      return 'Tài khoản chưa xác thực email. Vui lòng kiểm tra email để kích hoạt tài khoản.'
    case 'ACCOUNT_LOCKED':
      return 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.'
    case 'VALIDATION_ERROR':
      return 'Thông tin nhập chưa hợp lệ. Vui lòng kiểm tra lại.'
    default:
      return error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
  }
}

export default function Login() {
  const [role, setRole] = useState('teacher')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [demoState, setDemoState] = useState('default')
  const [errorMessage, setErrorMessage] = useState('')
  const [loginUser, setLoginUser] = useState(null)

  const copy = ROLE_COPY[role]

  const switchRole = (nextRole) => {
    setRole(nextRole)
    setIdentifier('')
    setPassword('')
    setDemoState('default')
    setErrorMessage('')
  }

  const doLogin = async (username, password) => {
    setDemoState('loading')
    setErrorMessage('')
    setLoginUser(null)

    try {
      const data = await login({ username, password })

      // Cổng này chỉ dành cho Giảng viên (TEACHER) và Quản trị viên (ADMIN).
      if (data.user && data.user.role === 'STUDENT') {
        setDemoState('error')
        setErrorMessage('Bạn không có quyền truy cập Cổng Giảng Viên. Tài khoản của bạn là Học viên (STUDENT).')
        return
      }

      localStorage.setItem('baoeng.accessToken', data.accessToken)
      localStorage.setItem('baoeng.user', JSON.stringify(data.user))
      setLoginUser(data.user)
      setDemoState('success')
      window.setTimeout(() => {
        window.location.hash = '#/dashboard'
      }, 900)
    } catch (error) {
      setDemoState('error')
      setErrorMessage(mapLoginError(error))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doLogin(identifier.trim(), password)
  }

  const quickLogin = (account) => {
    setIdentifier(account.username)
    setPassword(account.password)
    doLogin(account.username, account.password)
  }

  const activeSegment = 'flex-1 py-2 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all'
  const inactiveSegment = `${activeSegment} text-on-surface-variant hover:text-on-surface`

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-margin-desktop flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-md">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <Icon name="school" className="text-[20px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">BaoEng</span>
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Cổng Giảng Viên &amp; Quản Trị Bài Giảng
              </span>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-space-sm">
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded-full text-secondary font-label-sm text-label-sm">
              <Icon name="lock" className="text-[16px]" />
              <span>256-bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded-full text-secondary font-label-sm text-label-sm">
              <Icon name="verified_user" className="text-[16px]" />
              <span>ISO 27001 Certified</span>
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <nav className="hidden md:flex items-center gap-space-md">
              <a className="px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary-container font-semibold rounded-lg" href="#/login">
                Đăng nhập
              </a>
              <a className="font-label-lg text-label-lg px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#">
                Sổ tay Giảng viên
              </a>
              <a className="font-label-lg text-label-lg px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" href="#">
                Hỗ trợ kỹ thuật
              </a>
            </nav>
            <div className="flex items-center gap-space-sm bg-surface-container-low px-space-sm py-1 rounded-full">
              <span className="font-label-sm text-label-sm font-semibold text-primary">VIE</span>
              <span className="font-label-sm text-label-sm text-outline">/</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">ENG</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="person" className="text-on-primary text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)]">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface-container-low py-space-xl lg:py-16">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-margin-desktop w-full relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Panel: Brand & Value Proposition */}
                <div className="lg:col-span-6 flex flex-col space-y-space-xl">
                  <div className="space-y-space-md">
                    <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant">
                      <Icon name="verified" className="text-[18px]" />
                      <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">BaoEng Educator Suite</span>
                    </div>
                    <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-tight">
                      Quản trị nội dung &amp; <br className="hidden xl:inline" />
                      <span className="text-primary-container">Đồng hành cùng học viên</span>
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                      Hệ thống quản lý bài giảng video, học liệu đa phương tiện, ngân hàng câu hỏi trắc nghiệm thông minh và trung tâm phản hồi học viên thời gian thực.
                    </p>
                  </div>

                  {/* Feature & Metric Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                    <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-space-sm">
                        <span className="font-display-lg text-headline-lg text-primary font-bold">45,000+</span>
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                          <Icon name="group" />
                        </div>
                      </div>
                      <p className="font-label-lg text-label-lg text-on-surface">Học viên tích cực</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Tương tác trực tiếp trên app mỗi tuần</p>
                    </div>
                    <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-space-sm">
                        <span className="font-display-lg text-headline-lg text-secondary font-bold">98.6%</span>
                        <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary">
                          <Icon name="forum" />
                        </div>
                      </div>
                      <p className="font-label-lg text-label-lg text-on-surface">Phản hồi đúng hạn</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">SLA giải đáp bài tập &lt; 20 phút</p>
                    </div>
                    <div className="sm:col-span-2 p-space-md rounded-xl bg-gradient-to-r from-surface-container to-surface-container-high flex items-center gap-space-md">
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon name="sync" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-md-medium text-body-md-medium text-on-surface">Đồng bộ tức thì với BaoEng Mobile</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Cập nhật đề thi, bài đọc và phát âm AI đồng thời tới các lớp học trực tuyến.</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center gap-space-lg pt-space-xs text-on-surface-variant">
                    <div className="flex items-center gap-space-xs">
                      <Icon name="shield_locked" className="text-[20px] text-secondary" />
                      <span className="font-label-md text-label-md">256-bit SSL Banking-grade</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <Icon name="key" className="text-[20px] text-primary" />
                      <span className="font-label-md text-label-md">Single Sign-On (SSO) Ready</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <Icon name="fingerprint" className="text-[20px] text-tertiary" />
                      <span className="font-label-md text-label-md">2FA Multi-Factor Auth</span>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Login Card */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-md p-space-xl transition-all duration-300">
                    {/* Role Selection Segmented Switcher */}
                    <div className="flex p-1 bg-surface-container rounded-xl mb-space-lg">
                      <button
                        className={role === 'teacher' ? `${activeSegment} bg-surface-container-lowest text-primary-container shadow-sm font-semibold` : inactiveSegment}
                        onClick={() => switchRole('teacher')}
                        type="button"
                      >
                        <Icon name="school" className="text-[18px]" />
                        <span>Giảng viên bộ môn</span>
                      </button>
                      <button
                        className={role === 'admin' ? `${activeSegment} bg-surface-container-lowest text-primary-container shadow-sm font-semibold` : inactiveSegment}
                        onClick={() => switchRole('admin')}
                        type="button"
                      >
                        <Icon name="admin_panel_settings" className="text-[18px]" />
                        <span>Quản trị viên nội dung</span>
                      </button>
                    </div>

                    {/* Card Header */}
                    <div className="mb-space-lg">
                      <h2 className="font-headline-lg text-headline-lg text-on-surface">{copy.title}</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">{copy.subtext}</p>
                    </div>

                    {/* Status Alert Box */}
                    {demoState !== 'default' && (
                      <div
                        className={`p-space-md rounded-xl mb-space-md transition-all ${
                          demoState === 'error'
                            ? 'bg-error-container text-on-error-container'
                            : demoState === 'success'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-surface-container-high text-primary'
                        }`}
                      >
                        <div className="flex items-start gap-space-sm">
                          <Icon
                            name={demoState === 'error' ? 'error' : demoState === 'success' ? 'check_circle' : 'phonelink_lock'}
                            className="text-[20px] flex-shrink-0 mt-0.5"
                          />
                          <div className="flex-1">
                            <p className="font-label-lg text-label-lg font-semibold">
                              {demoState === 'error'
                                ? 'Đăng nhập không thành công'
                                : demoState === 'success'
                                ? 'Đăng nhập thành công'
                                : 'Đang kiểm tra bảo mật...'}
                            </p>
                            <p className="font-label-sm text-label-sm mt-0.5">
                              {demoState === 'error'
                                ? errorMessage || 'Đăng nhập thất bại. Vui lòng thử lại.'
                                : demoState === 'success'
                                ? `Xin chào ${loginUser?.fullName ?? 'giảng viên'}! Đang chuyển đến Bảng điều khiển...`
                                : 'Đang xác thực tài khoản với máy chủ BaoEng...'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form */}
                    <form className="space-y-space-md" onSubmit={handleSubmit}>
                      {/* Field 1: Identifier */}
                      <div className="space-y-space-xs">
                        <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="usernameInput">
                          Tên đăng nhập (Username)
                        </label>
                        <div className="relative rounded-xl bg-surface-container-low shadow-sm focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary-container transition-all">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                            <Icon name="badge" className="text-[20px]" />
                          </div>
                          <input
                            className="w-full pl-11 pr-4 py-3 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none rounded-xl"
                            id="usernameInput"
                            name="username"
                            placeholder={copy.placeholder}
                            required
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Field 2: Password */}
                      <div className="space-y-space-xs">
                        <div className="flex items-center justify-between">
                          <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="passwordInput">
                            Mật khẩu
                          </label>
                          {capsLock && (
                            <span className="text-tertiary font-label-sm text-label-sm flex items-center gap-1">
                              <Icon name="keyboard_capslock" className="text-[14px]" /> CapsLock đang bật
                            </span>
                          )}
                        </div>
                        <div className="relative rounded-xl bg-surface-container-low shadow-sm focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary-container transition-all">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                            <Icon name="lock" className="text-[20px]" />
                          </div>
                          <input
                            className="w-full pl-11 pr-11 py-3 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none rounded-xl"
                            id="passwordInput"
                            name="password"
                            placeholder="••••••••••••"
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={(e) => {
                              if (e.getModifierState && e.getModifierState('CapsLock')) {
                                setCapsLock(true)
                              } else {
                                setCapsLock(false)
                              }
                            }}
                          />
                          <button
                            aria-label="Hiện hoặc ẩn mật khẩu"
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors focus:outline-none"
                            onClick={() => setShowPassword((v) => !v)}
                            type="button"
                          >
                            <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                          </button>
                        </div>
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-space-xs cursor-pointer select-none">
                          <input
                            defaultChecked
                            className="w-4 h-4 rounded text-primary-container focus:ring-primary accent-primary-container cursor-pointer"
                            type="checkbox"
                          />
                          <span className="font-body-md text-body-md text-on-surface-variant">Duy trì phiên đăng nhập (30 ngày)</span>
                        </label>
                        <a className="font-label-md text-label-md text-primary font-semibold hover:underline" href="#">
                          Quên mật khẩu hoặc mã GV?
                        </a>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          className={`w-full h-12 rounded-xl font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-sm shadow-md active:scale-[0.99] transition-all cursor-pointer ${
                            demoState === 'loading'
                              ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
                              : 'bg-primary-container hover:bg-primary text-on-primary'
                          }`}
                          disabled={demoState === 'loading'}
                          type="submit"
                        >
                          <span>{demoState === 'loading' ? 'Đang kiểm tra bảo mật...' : 'Đăng nhập vào Hệ thống Quản trị'}</span>
                          <Icon name={demoState === 'loading' ? 'progress_activity' : 'arrow_forward'} className="text-[20px]" />
                        </button>
                      </div>
                    </form>

                    {/* Quick Login — tài khoản test */}
                    <div className="mt-space-lg">
                      <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-space-sm">
                        Đăng nhập nhanh (tài khoản test)
                      </p>
                      <div className="grid grid-cols-3 gap-space-sm">
                        {QUICK_ACCOUNTS.map((account) => (
                          <button
                            key={account.username}
                            className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors shadow-sm"
                            onClick={() => quickLogin(account)}
                            type="button"
                          >
                            <span className="font-label-md text-label-md font-semibold">{account.label}</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">{account.hint}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SSO Partition */}
                    <div className="relative my-space-lg">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full bg-surface-container h-[1px]"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-surface-container-lowest px-space-md font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          Hoặc đăng nhập liên kết tổ chức
                        </span>
                      </div>
                    </div>

                    {/* SSO Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                      <button className="flex items-center justify-center gap-space-xs py-2.5 px-space-md rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm" type="button">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" fill="#4285F4" />
                          <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.32 7.33 24 12 24z" fill="#34A853" />
                          <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z" fill="#FBBC05" />
                          <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.68 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                        </svg>
                        <span>Google Workspace</span>
                      </button>
                      <button className="flex items-center justify-center gap-space-xs py-2.5 px-space-md rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm" type="button">
                        <svg className="w-4 h-4" viewBox="0 0 23 23">
                          <path d="M1 1h10v10H1z" fill="#f35325" />
                          <path d="M12 1h10v10H12z" fill="#81bc06" />
                          <path d="M1 12h10v10H1z" fill="#05a6f0" />
                          <path d="M12 12h10v10H12z" fill="#ffba08" />
                        </svg>
                        <span>Microsoft 365 Edu</span>
                      </button>
                    </div>

                    {/* Security Note Footer */}
                    <div className="mt-space-lg p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
                      <Icon name="security" className="text-[18px] text-outline flex-shrink-0 mt-0.5" />
                      <p className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                        Cổng thông tin được bảo vệ bởi chứng chỉ bảo mật cấp cao. Nếu truy cập từ thiết bị hoặc địa chỉ IP mới, hệ thống sẽ kích hoạt xác minh OTP 2 lớp.
                      </p>
                    </div>

                    {/* Hotline Support */}
                    <div className="mt-space-md text-center">
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Chưa nhận được mã giảng viên? Liên hệ Ban Đào tạo:{' '}
                        <a className="font-semibold text-primary hover:underline" href="tel:19006868">1900 6868 (Ext: 102)</a>
                      </p>
                    </div>
                  </div>

                  {/* Interactive UX State Control Toolbar */}
                  <div className="w-full max-w-lg mt-space-md p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <span className="font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Icon name="touch_app" className="text-[16px]" /> Giả lập trạng thái UX:
                    </span>
                    <div className="flex items-center gap-space-xs w-full sm:w-auto">
                      <button
                        className="flex-1 sm:flex-none px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high font-label-sm text-label-sm text-on-surface transition-colors"
                        onClick={() => setDemoState('default')}
                      >
                        Mặc định
                      </button>
                      <button
                        className="flex-1 sm:flex-none px-2.5 py-1 rounded bg-error-container text-on-error-container hover:opacity-90 font-label-sm text-label-sm transition-opacity"
                        onClick={() => setDemoState('error')}
                      >
                        Báo lỗi
                      </button>
                      <button
                        className="flex-1 sm:flex-none px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed-variant hover:opacity-90 font-label-sm text-label-sm transition-opacity"
                        onClick={() => setDemoState('loading')}
                      >
                        Đang 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low shadow-[0_-1px_6px_rgba(0,0,0,0.02)] py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="font-body-md text-body-md text-on-surface-variant">© 2024 BaoEng Education Platform. Bản quyền thuộc về Hệ thống Giảng dạy &amp; Khảo thí Tiếng Anh.</p>
            <p className="font-label-sm text-label-sm text-outline">Hệ thống bảo mật dữ liệu cấp cao tuân thủ Nghị định 13/2023/NĐ-CP.</p>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-space-lg">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Sổ tay Giảng viên</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Tiêu chuẩn An toàn Thông tin</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Chính sách Bảo mật</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Điều khoản Sử dụng</a>
          </div>
        </div>
      </footer>
    </>
  )
}
