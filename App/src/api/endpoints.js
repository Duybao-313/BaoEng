/** Danh sach endpoint cua Backend. Xem `Docs/API_Specification.md`. */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },
  lessons: {
    list: "/lessons",
    detail: (id) => `/lessons/${id}`,
    complete: (id) => `/lessons/${id}/complete`,
  },
  vocabulary: {
    list: "/vocabulary",
    review: "/vocabulary/review",
  },
  practice: {
    start: "/practice/sessions",
    submit: (id) => `/practice/sessions/${id}/submit`,
  },
  users: {
    profile: "/users/me",
    progress: "/users/me/progress",
  },
};
