export const TOKEN_KEY = 'baoeng.accessToken'
export const USER_KEY = 'baoeng.user'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export function isTeacherAdmin(user) {
  return !!user && (user.role === 'TEACHER' || user.role === 'ADMIN')
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  window.location.hash = '#/login'
}
