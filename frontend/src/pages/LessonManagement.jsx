import { useEffect, useRef, useState } from 'react'
import AppShell from '../components/AppShell'
import Icon from '../components/Icon'
import { api } from '../api'

export default function LessonManagement() {
  const [topics, setTopics] = useState([])
  const [topicId, setTopicId] = useState('')
  const [lessons, setLessons] = useState([])
  const [materials, setMaterials] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [lessonForm, setLessonForm] = useState({ title: '', orderIndex: 1, completionThreshold: 80 })
  const [materialType, setMaterialType] = useState('PDF')
  const fileRef = useRef(null)

  useEffect(() => {
    api
      .listTopics()
      .then((list) => {
        setTopics(list)
        if (list.length > 0) setTopicId(String(list[0].topicId))
      })
      .catch((e) => setError(e.message))
  }, [])

  useEffect(() => {
    if (!topicId) return
    api
      .listLessons(topicId)
      .then(setLessons)
      .catch((e) => setError(e.message))
  }, [topicId])

  useEffect(() => {
    if (!selectedLesson) return
    api
      .listMaterials(selectedLesson.lessonId)
      .then(setMaterials)
      .catch((e) => setError(e.message))
  }, [selectedLesson])

  const createLesson = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      await api.createLesson(topicId, lessonForm)
      setLessonForm({ title: '', orderIndex: 1, completionThreshold: 80 })
      const list = await api.listLessons(topicId)
      setLessons(list)
      setMessage('Đã tạo bài học.')
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteLesson = async (id) => {
    if (!window.confirm('Xóa bài học này?')) return
    try {
      await api.deleteLesson(id)
      if (selectedLesson?.lessonId === id) setSelectedLesson(null)
      setLessons(await api.listLessons(topicId))
    } catch (err) {
      setError(err.message)
    }
  }

  const uploadMaterial = async (e) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) {
      setError('Vui lòng chọn file.')
      return
    }
    setError('')
    setMessage('')
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', materialType)
    try {
      await api.uploadMaterial(selectedLesson.lessonId, formData)
      setMaterials(await api.listMaterials(selectedLesson.lessonId))
      setMessage('Đã upload học liệu.')
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteMaterial = async (id) => {
    try {
      await api.deleteMaterial(id)
      setMaterials(await api.listMaterials(selectedLesson.lessonId))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppShell active="lessons">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Bài học & Học liệu</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Quản lý bài học và upload tài liệu Video/PDF/Word.
          </p>
        </div>
        <select
          className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
          value={topicId}
          onChange={(e) => {
            setTopicId(e.target.value)
            setSelectedLesson(null)
          }}
        >
          <option value="">Chọn chủ đề...</option>
          {topics.map((t) => (
            <option key={t.topicId} value={String(t.topicId)}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="bg-error-container text-on-error-container p-space-md rounded-xl mb-space-md">{error}</div>}
      {message && <div className="bg-secondary-container text-on-secondary-container p-space-md rounded-xl mb-space-md">{message}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-lg items-start">
        {/* Lessons list + create */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Danh sách bài học</h2>
          <form className="flex flex-col gap-space-sm mb-space-md" onSubmit={createLesson}>
            <input
              className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tiêu đề bài học"
              required
              value={lessonForm.title}
              onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
            />
            <div className="flex gap-space-sm">
              <input
                className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                min={1}
                placeholder="Thứ tự"
                type="number"
                value={lessonForm.orderIndex}
                onChange={(e) => setLessonForm({ ...lessonForm, orderIndex: Number(e.target.value) })}
              />
              <input
                className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                min={0}
                max={100}
                placeholder="Ngưỡng hoàn thành %"
                type="number"
                value={lessonForm.completionThreshold}
                onChange={(e) => setLessonForm({ ...lessonForm, completionThreshold: Number(e.target.value) })}
              />
              <button className="bg-primary text-on-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md" type="submit">
                Thêm bài
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-space-sm">
            {lessons.map((l) => (
              <button
                key={l.lessonId}
                className={`flex items-center justify-between p-space-md rounded-xl text-left transition-colors ${
                  selectedLesson?.lessonId === l.lessonId
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
                onClick={() => setSelectedLesson(l)}
                type="button"
              >
                <div>
                  <p className="font-body-md-medium text-body-md-medium">{l.title}</p>
                  <p className="font-label-sm text-label-sm opacity-70">
                    Thứ tự {l.orderIndex} • Ngưỡng {l.completionThreshold}%
                  </p>
                </div>
                <span
                  className="bg-error-container text-on-error-container p-2 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteLesson(l.lessonId)
                  }}
                  role="button"
                >
                  <Icon name="delete" className="text-[18px]" />
                </span>
              </button>
            ))}
            {lessons.length === 0 && <p className="text-on-surface-variant">Chưa có bài học.</p>}
          </div>
        </div>

        {/* Materials */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
            Học liệu {selectedLesson ? `của "${selectedLesson.title}"` : ''}
          </h2>
          {!selectedLesson ? (
            <p className="text-on-surface-variant">Chọn một bài học để quản lý học liệu.</p>
          ) : (
            <>
              <form className="flex flex-col gap-space-sm mb-space-md" onSubmit={uploadMaterial}>
                <div className="flex gap-space-sm">
                  <select
                    className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none"
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                  >
                    <option value="PDF">PDF</option>
                    <option value="VIDEO">Video</option>
                    <option value="WORD">Word</option>
                  </select>
                  <input className="text-on-surface font-body-md" ref={fileRef} type="file" />
                </div>
                <button className="bg-primary text-on-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md self-start" type="submit">
                  Upload học liệu
                </button>
              </form>
              <div className="flex flex-col gap-space-sm">
                {materials.map((m) => (
                  <div key={m.materialId} className="flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
                    <div>
                      <p className="font-body-md-medium text-body-md-medium">{m.type}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant break-all">{m.fileUrl}</p>
                    </div>
                    <button
                      className="bg-error-container text-on-error-container p-2 rounded-lg"
                      onClick={() => deleteMaterial(m.materialId)}
                      type="button"
                    >
                      <Icon name="delete" className="text-[18px]" />
                    </button>
                  </div>
                ))}
                {materials.length === 0 && <p className="text-on-surface-variant">Chưa có học liệu.</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  )
}
