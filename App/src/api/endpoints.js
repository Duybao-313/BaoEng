/** Danh sach endpoint cua Backend. Xem `Docs/API_Specification.md`. */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
  },
  users: {
    me: "/users/me",
    password: "/users/me/password",
  },
  topics: {
    list: "/topics",
    detail: (id) => `/topics/${id}`,
    enroll: (id) => `/topics/${id}/enroll`,
    unenroll: (id) => `/topics/${id}/enroll`,
    lessons: (id) => `/topics/${id}/lessons`,
    progress: (id) => `/topics/${id}/progress`,
  },
  lessons: {
    detail: (id) => `/lessons/${id}`,
    materials: (id) => `/lessons/${id}/materials`,
    vocab: (id) => `/lessons/${id}/vocab`,
    minigames: (id) => `/lessons/${id}/minigames`,
  },
  minigames: {
    detail: (id) => `/minigames/${id}`,
    attempts: (id) => `/minigames/${id}/attempts`,
  },
  progress: {
    overview: "/progress",
  },
  comments: {
    list: "/comments",
    create: "/comments",
  },
  search: {
    list: "/search",
  },
};
