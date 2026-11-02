import { request } from './client'

const data = (payload) => payload.data

export const api = {
  // Hồ sơ giáo viên
  getTeacherProfile: () => request('/teachers/me').then(data),
  updateTeacherProfile: (body) => request('/teachers/me', { method: 'PUT', body }).then(data),
  changePassword: (body) => request('/users/me/password', { method: 'PUT', body }).then(data),

  // Chủ đề
  listTopics: () => request('/topics').then(data),
  createTopic: (body) => request('/topics', { method: 'POST', body }).then(data),
  updateTopic: (id, body) => request(`/topics/${id}`, { method: 'PUT', body }).then(data),
  deleteTopic: (id) => request(`/topics/${id}`, { method: 'DELETE' }).then(data),

  // Bài học
  listLessons: (topicId) => request(`/topics/${topicId}/lessons`).then(data),
  createLesson: (topicId, body) => request(`/topics/${topicId}/lessons`, { method: 'POST', body }).then(data),
  updateLesson: (id, body) => request(`/lessons/${id}`, { method: 'PUT', body }).then(data),
  deleteLesson: (id) => request(`/lessons/${id}`, { method: 'DELETE' }).then(data),

  // Học liệu
  listMaterials: (lessonId) => request(`/lessons/${lessonId}/materials`).then(data),
  uploadMaterial: (lessonId, formData) =>
    request(`/lessons/${lessonId}/materials`, { method: 'POST', body: formData }).then(data),
  deleteMaterial: (id) => request(`/materials/${id}`, { method: 'DELETE' }).then(data),

  // Từ vựng
  listVocab: (lessonId) => request(`/lessons/${lessonId}/vocab`).then(data),
  uploadVocabCsv: (lessonId, formData) =>
    request(`/lessons/${lessonId}/vocab/csv`, { method: 'POST', body: formData }).then(data),

  // Minigame
  listMinigames: (lessonId) => request(`/lessons/${lessonId}/minigames`).then(data),
  getMinigame: (id) => request(`/minigames/${id}`).then(data),
  publishMinigame: (id) => request(`/minigames/${id}/publish`, { method: 'POST' }).then(data),

  // Bình luận
  listComments: () => request('/comments').then(data),
  replyComment: (id, body) => request(`/comments/${id}/replies`, { method: 'POST', body }).then(data),

  // Chứng chỉ
  listCertificates: () => request('/teachers/me/certificates').then(data),
  createCertificate: (body) => request('/teachers/me/certificates', { method: 'POST', body }).then(data),
  updateCertificate: (id, body) =>
    request(`/teachers/me/certificates/${id}`, { method: 'PUT', body }).then(data),
  deleteCertificate: (id) => request(`/teachers/me/certificates/${id}`, { method: 'DELETE' }).then(data),

  // Tìm kiếm
  search: (q) => request(`/search?q=${encodeURIComponent(q)}`).then(data),
}
