import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Topics from './pages/Topics'
import LessonManagement from './pages/LessonManagement'
import CommentFeedback from './pages/CommentFeedback'
import VocabMinigame from './pages/VocabMinigame'
import Profile from './pages/Profile'
import { getUser, isTeacherAdmin, logout } from './utils/auth'

const VALID_ROUTES = ['login', 'dashboard', 'topics', 'lessons', 'vocab', 'comments', 'profile']

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  return VALID_ROUTES.includes(hash) ? hash : 'login'
}

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-8">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-xl shadow-md p-8 text-center">
        <p className="font-headline-md text-headline-md text-error mb-2">Không có quyền truy cập</p>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          Cổng Giảng Viên chỉ dành cho tài khoản Giảng viên (TEACHER) và Quản trị viên (ADMIN).
        </p>
        <button
          className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-lg text-label-lg"
          onClick={logout}
          type="button"
        >
          Quay lại Đăng nhập
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const user = getUser()

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (route !== 'login') {
    if (!user) {
      return <Login />
    }
    if (!isTeacherAdmin(user)) {
      return <AccessDenied />
    }
  }

  switch (route) {
    case 'dashboard':
      return <Dashboard />
    case 'topics':
      return <Topics />
    case 'lessons':
      return <LessonManagement />
    case 'vocab':
      return <VocabMinigame />
    case 'comments':
      return <CommentFeedback />
    case 'profile':
      return <Profile />
    case 'login':
    default:
      return <Login />
  }
}
