import { useEffect, useState } from 'react'
import AppShell from '../components/AppShell'
import Icon from '../components/Icon'
import { api } from '../api'

const LEVEL_BADGE = {
  BEGINNER: 'bg-surface-container-highest text-on-surface',
  INTERMEDIATE: 'bg-primary-container text-on-primary',
  ADVANCED: 'bg-tertiary-container text-on-tertiary-container',
}

export default function Topics() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', level: 'BEGINNER' })

  const load = () => {
    api
      .listTopics()
      .then((data) => {
        setError('')
        setTopics(data)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await api.createTopic(form)
      setForm({ title: '', description: '', level: 'BEGINNER' })
      setShowForm(false)
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const togglePublish = async (topic) => {
    try {
      await api.updateTopic(topic.topicId, { status: topic.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED' })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const removeTopic = async (id) => {
    if (!window.confirm('Xóa chủ đề này và toàn bộ bài học bên trong?')) return
    try {
      await api.deleteTopic(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const publishedCount = topics.filter((t) => t.status === 'PUBLISHED').length

  return (
    <AppShell active="topics">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Quản lý Chủ đề Học tập</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Tạo, chỉnh sửa và xuất bản các chủ đề học phần.
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-space-md py-2.5 rounded-xl font-label-lg text-label-lg"
          onClick={() => setShowForm((v) => !v)}
          type="button"
        >
          <Icon name="add_circle" className="text-[20px]" />
          <span>Tạo chủ đề mới</span>
        </button>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-space-md rounded-xl mb-space-md">{error}</div>
      )}

      {showForm && (
        <form
          className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-lg space-y-space-md"
          onSubmit={handleCreate}
        >
          <input
            className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tiêu đề chủ đề"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Mô tả"
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex items-center gap-space-sm">
            <select
              className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
            <button
              className="bg-primary text-on-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md"
              disabled={saving}
              type="submit"
            >
              {saving ? 'Đang lưu...' : 'Lưu chủ đề'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mb-space-lg">
        {[
          { label: 'Tổng chủ đề', value: topics.length },
          { label: 'Đã xuất bản', value: publishedCount },
          { label: 'Tổng bài học', value: topics.reduce((a, t) => a + t.lessonCount, 0) },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
            <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
            <p className="font-headline-lg text-headline-lg text-on-surface mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-on-surface-variant">Đang tải...</p>
      ) : topics.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm text-on-surface-variant">
          Chưa có chủ đề nào. Hãy tạo chủ đề đầu tiên.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {topics.map((t) => (
            <div key={t.topicId} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between gap-space-sm">
                <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full ${LEVEL_BADGE[t.level] || ''}`}>
                  {t.level}
                </span>
                <span
                  className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full ${
                    t.status === 'PUBLISHED'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {t.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{t.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">{t.description || '—'}</p>
              <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
                <span>{t.lessonCount} bài học</span>
                <span>{t.createdAt ? new Date(t.createdAt).toLocaleDateString('vi-VN') : ''}</span>
              </div>
              <div className="flex items-center gap-space-sm pt-1">
                <button
                  className="bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-2 rounded-xl font-label-md text-label-md"
                  onClick={() => togglePublish(t)}
                  type="button"
                >
                  {t.status === 'PUBLISHED' ? 'Chuyển nháp' : 'Xuất bản'}
                </button>
                <button
                  className="bg-error-container text-on-error-container hover:opacity-90 px-space-md py-2 rounded-xl font-label-md text-label-md"
                  onClick={() => removeTopic(t.topicId)}
                  type="button"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  )
}
