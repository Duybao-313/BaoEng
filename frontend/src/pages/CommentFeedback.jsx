import { useEffect, useState } from 'react'
import AppShell from '../components/AppShell'
import Icon from '../components/Icon'
import { api } from '../api'

export default function CommentFeedback() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [replies, setReplies] = useState({})
  const [sendingId, setSendingId] = useState(null)

  const load = () => {
    api
      .listComments()
      .then((data) => {
        setError('')
        setComments(data)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const sendReply = async (id) => {
    const content = replies[id]
    if (!content || !content.trim()) return
    setSendingId(id)
    setError('')
    try {
      await api.replyComment(id, { content: content.trim() })
      setReplies((prev) => ({ ...prev, [id]: '' }))
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSendingId(null)
    }
  }

  return (
    <AppShell active="comments">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex items-center justify-between mb-space-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Phản hồi Bình luận</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Trả lời thắc mắc của học viên tại chủ đề / bài học.
          </p>
        </div>
        <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-2.5 rounded-xl font-label-md text-label-md" onClick={load} type="button">
          <Icon name="refresh" className="text-[18px] align-middle mr-1" /> Tải lại
        </button>
      </div>

      {error && <div className="bg-error-container text-on-error-container p-space-md rounded-xl mb-space-md">{error}</div>}

      {loading ? (
        <p className="text-on-surface-variant">Đang tải...</p>
      ) : comments.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm text-on-surface-variant">
          Chưa có bình luận nào.
        </div>
      ) : (
        <div className="flex flex-col gap-space-md">
          {comments.map((c) => (
            <div key={c.commentId} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                    {(c.authorName || 'H')[0].toUpperCase()}
                  </span>
                  <div>
                    <p className="font-body-md-medium text-body-md-medium">{c.authorName}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {c.targetType} #{c.targetId} • {c.createdAt ? new Date(c.createdAt).toLocaleString('vi-VN') : ''}
                    </p>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{c.replyCount} phản hồi</span>
              </div>

              <p className="font-body-md text-body-md text-on-surface mb-space-md">{c.content}</p>

              {c.replies.length > 0 && (
                <div className="flex flex-col gap-space-sm pl-space-lg border-l-2 border-surface-container mb-space-md">
                  {c.replies.map((r) => (
                    <div key={r.commentId} className="bg-surface-container-low p-space-md rounded-xl">
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                        {r.authorName} • {r.createdAt ? new Date(r.createdAt).toLocaleString('vi-VN') : ''}
                      </p>
                      <p className="font-body-md text-body-md text-on-surface">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-space-sm">
                <input
                  className="flex-1 bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Viết phản hồi..."
                  value={replies[c.commentId] || ''}
                  onChange={(e) => setReplies((prev) => ({ ...prev, [c.commentId]: e.target.value }))}
                />
                <button
                  className="bg-primary text-on-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md"
                  disabled={sendingId === c.commentId}
                  onClick={() => sendReply(c.commentId)}
                  type="button"
                >
                  {sendingId === c.commentId ? 'Đang gửi...' : 'Gửi'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  )
}
