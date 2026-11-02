import { useEffect, useRef, useState } from 'react'
import AppShell from '../components/AppShell'
import Icon from '../components/Icon'
import { api } from '../api'

export default function VocabMinigame() {
  const [topics, setTopics] = useState([])
  const [lessons, setLessons] = useState([])
  const [topicId, setTopicId] = useState('')
  const [lessonId, setLessonId] = useState('')
  const [vocab, setVocab] = useState([])
  const [minigames, setMinigames] = useState([])
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    api.listTopics().then((list) => {
      setTopics(list)
      if (list.length > 0) setTopicId(String(list[0].topicId))
    }).catch((e) => setError(e.message))
  }, [])

  useEffect(() => {
    if (!topicId) return
    api.listLessons(topicId).then((list) => {
      setLessons(list)
      setLessonId(list.length > 0 ? String(list[0].lessonId) : '')
    }).catch((e) => setError(e.message))
  }, [topicId])

  useEffect(() => {
    if (!lessonId) return
    api.listVocab(lessonId).then(setVocab).catch((e) => setError(e.message))
    api.listMinigames(lessonId).then(setMinigames).catch((e) => setError(e.message))
  }, [lessonId])

  const handleUpload = async (e) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) {
      setError('Vui lòng chọn file CSV.')
      return
    }
    setUploading(true)
    setError('')
    setResult(null)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await api.uploadVocabCsv(lessonId, formData)
      setResult(res)
      setVocab(await api.listVocab(lessonId))
      setMinigames(await api.listMinigames(lessonId))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const publish = async (id) => {
    try {
      await api.publishMinigame(id)
      setMinigames(await api.listMinigames(lessonId))
    } catch (err) {
      setError(err.message)
    }
  }

  const previewMinigame = async (id) => {
    try {
      setPreview(await api.getMinigame(id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppShell active="vocab">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md mb-space-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Từ vựng & Minigame</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Upload CSV từ vựng (cột: word, meaning, pronunciation, example) để tự động sinh minigame.
          </p>
        </div>
        <div className="flex flex-wrap gap-space-md">
          <select
            className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
          >
            <option value="">Chọn chủ đề...</option>
            {topics.map((t) => (
              <option key={t.topicId} value={String(t.topicId)}>{t.title}</option>
            ))}
          </select>
          <select
            className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
          >
            <option value="">Chọn bài học...</option>
            {lessons.map((l) => (
              <option key={l.lessonId} value={String(l.lessonId)}>{l.title}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="bg-error-container text-on-error-container p-space-md rounded-xl mb-space-md">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-lg items-start">
        {/* CSV upload + vocab */}
        <div className="flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Upload CSV từ vựng</h2>
            <form className="flex flex-col gap-space-sm" onSubmit={handleUpload}>
              <input ref={fileRef} type="file" accept=".csv,text/csv" />
              <button className="bg-primary text-on-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md self-start" disabled={uploading || !lessonId} type="submit">
                {uploading ? 'Đang import...' : 'Import CSV'}
              </button>
            </form>
            {result && (
              <div className="mt-space-md p-space-md rounded-xl bg-surface-container-low">
                <p className="font-label-md text-label-md text-on-surface">
                  Đã import <b>{result.importedCount}</b> từ • <b>{result.failedRows.length}</b> dòng lỗi
                </p>
                {result.failedRows.length > 0 && (
                  <ul className="mt-2 font-label-sm text-label-sm text-error">
                    {result.failedRows.map((r, i) => (
                      <li key={i}>Dòng {r.line}: {r.error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Danh sách từ vựng ({vocab.length})</h2>
            <div className="max-h-80 overflow-auto flex flex-col gap-space-sm">
              {vocab.map((v) => (
                <div key={v.vocabId} className="bg-surface-container-low p-space-sm rounded-xl">
                  <p className="font-body-md-medium text-body-md-medium">{v.word} {v.pronunciation ? `(${v.pronunciation})` : ''}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{v.meaning}</p>
                </div>
              ))}
              {vocab.length === 0 && <p className="text-on-surface-variant">Chưa có từ vựng.</p>}
            </div>
          </div>
        </div>

        {/* Minigames + preview */}
        <div className="flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Minigame</h2>
            <div className="flex flex-col gap-space-sm">
              {minigames.map((m) => (
                <div key={m.minigameId} className="flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
                  <div>
                    <p className="font-body-md-medium text-body-md-medium">{m.title}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{m.questionCount} câu • {m.status}</p>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-space-sm py-1.5 rounded-lg font-label-sm text-label-sm" onClick={() => previewMinigame(m.minigameId)} type="button">
                      Xem
                    </button>
                    {m.status === 'DRAFT' && (
                      <button className="bg-primary text-on-primary px-space-sm py-1.5 rounded-lg font-label-sm text-label-sm" onClick={() => publish(m.minigameId)} type="button">
                        Xuất bản
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {minigames.length === 0 && <p className="text-on-surface-variant">Chưa có minigame.</p>}
            </div>
          </div>

          {preview && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{preview.title}</h2>
                <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setPreview(null)} type="button">
                  <Icon name="close" />
                </button>
              </div>
              <div className="flex flex-col gap-space-sm">
                {preview.questions.map((q) => (
                  <div key={q.questionId} className="bg-surface-container-low p-space-md rounded-xl">
                    <p className="font-body-md-medium text-body-md-medium mb-2">{q.questionText}</p>
                    <div className="flex flex-col gap-1">
                      {q.options.map((o) => (
                        <p key={o.key} className={`font-body-md text-body-md ${o.correct ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
                          {o.key}. {o.text} {o.correct ? '✓' : ''}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
