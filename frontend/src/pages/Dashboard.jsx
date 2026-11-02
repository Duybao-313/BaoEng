import { useEffect, useState } from 'react'
import AppShell from '../components/AppShell'
import Icon from '../components/Icon'
import { api } from '../api'

export default function Dashboard() {
  const [topics, setTopics] = useState([])
  const [comments, setComments] = useState([])
  const [certificates, setCertificates] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([api.listTopics(), api.listComments(), api.listCertificates()]).then(([t, c, cert]) => {
      if (t.status === 'fulfilled') setTopics(t.value)
      else setError(t.reason?.message || 'Lỗi tải dữ liệu')
      if (c.status === 'fulfilled') setComments(c.value)
      if (cert.status === 'fulfilled') setCertificates(cert.value)
      setLoading(false)
    })
  }, [])

  const totalLessons = topics.reduce((a, t) => a + t.lessonCount, 0)
  const publishedTopics = topics.filter((t) => t.status === 'PUBLISHED').length
  const pendingCertificates = certificates.filter((c) => c.status === 'PENDING').length

  const stats = [
    { label: 'Tổng chủ đề', value: topics.length, icon: 'category', cls: 'bg-primary-fixed text-primary' },
    { label: 'Đã xuất bản', value: publishedTopics, icon: 'verified', cls: 'bg-secondary-container text-on-secondary-container' },
    { label: 'Tổng bài học', value: totalLessons, icon: 'auto_stories', cls: 'bg-tertiary-fixed text-tertiary' },
    { label: 'Bình luận', value: comments.length, icon: 'forum', cls: 'bg-primary-container text-on-primary' },
    { label: 'Chứng chỉ chờ duyệt', value: pendingCertificates, icon: 'pending', cls: 'bg-error-container text-on-error-container' },
  ]

  return (
    <AppShell active="dashboard">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Tổng quan</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Số liệu nội dung giảng dạy của bạn.
        </p>
      </div>

      {error && <div className="bg-error-container text-on-error-container p-space-md rounded-xl mb-space-md">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-space-md mb-space-lg">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-center gap-space-md">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.cls}`}>
              <Icon name={s.icon} />
            </div>
            <div>
              <p className="font-headline-lg text-headline-lg text-on-surface">{loading ? '—' : s.value}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Chủ đề gần đây</h2>
        {topics.length === 0 ? (
          <p className="text-on-surface-variant">Chưa có chủ đề nào.</p>
        ) : (
          <div className="flex flex-col gap-space-sm">
            {topics.slice(0, 8).map((t) => (
              <div key={t.topicId} className="flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
                <div>
                  <p className="font-body-md-medium text-body-md-medium">{t.title}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {t.level} • {t.lessonCount} bài học
                  </p>
                </div>
                <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full ${t.status === 'PUBLISHED' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                  {t.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
