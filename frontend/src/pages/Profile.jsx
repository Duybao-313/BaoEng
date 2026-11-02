import { useEffect, useState } from 'react'
import AppShell from '../components/AppShell'
import Icon from '../components/Icon'
import { api } from '../api'

const STATUS_META = {
  VERIFIED: { label: 'Đã xác minh', cls: 'bg-secondary-container text-on-secondary-container' },
  PENDING: { label: 'Chờ duyệt', cls: 'bg-tertiary-fixed text-tertiary' },
  REJECTED: { label: 'Từ chối', cls: 'bg-error-container text-on-error-container' },
}

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({})
  const [certForm, setCertForm] = useState({ name: '', score: '', issuingBody: '' })
  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '' })

  const load = () => {
    api
      .getTeacherProfile()
      .then((p) => {
        setError('')
        setProfile(p)
        setForm({
        teacherCode: p.teacherCode || '',
        phone: p.phone || '',
        academicTitle: p.academicTitle || '',
        specialization: p.specialization || '',
        highestEducation: p.highestEducation || '',
        graduateSchool: p.graduateSchool || '',
        teachingExperienceYears: p.teachingExperienceYears || 0,
        bio: p.bio || '',
      })
    }).catch((e) => setError(e.message))
    api.listCertificates().then(setCertificates).catch((e) => setError(e.message))
  }

  useEffect(() => {
    load()
  }, [])

  const saveProfile = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.updateTeacherProfile(form)
      setMessage('Đã cập nhật hồ sơ.')
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const addCertificate = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.createCertificate(certForm)
      setCertForm({ name: '', score: '', issuingBody: '' })
      setCertificates(await api.listCertificates())
    } catch (err) {
      setError(err.message)
    }
  }

  const removeCertificate = async (id) => {
    try {
      await api.deleteCertificate(id)
      setCertificates(await api.listCertificates())
    } catch (err) {
      setError(err.message)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.changePassword(pwForm)
      setPwForm({ oldPassword: '', newPassword: '' })
      setMessage('Đã đổi mật khẩu.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppShell active="profile">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex items-center justify-between mb-space-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Hồ sơ & Chứng chỉ</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Quản lý thông tin cá nhân và chứng chỉ giảng dạy.
          </p>
        </div>
      </div>

      {error && <div className="bg-error-container text-on-error-container p-space-md rounded-xl mb-space-md">{error}</div>}
      {message && <div className="bg-secondary-container text-on-secondary-container p-space-md rounded-xl mb-space-md">{message}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-lg items-start">
        {/* Profile card + edit */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          <div className="flex items-center gap-space-md mb-space-lg">
            <span className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-lg text-headline-lg font-bold">
              {(profile?.fullName || 'GV').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
            </span>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">{profile?.fullName || '—'}</h2>
              <p className="font-label-md text-label-md text-on-surface-variant">
                {profile?.teacherCode || 'Mã GV'} • {profile?.email || ''}
              </p>
            </div>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm" onSubmit={saveProfile}>
            {[
              { key: 'teacherCode', label: 'Mã GV' },
              { key: 'phone', label: 'Số điện thoại' },
              { key: 'academicTitle', label: 'Học vị' },
              { key: 'specialization', label: 'Chuyên môn' },
              { key: 'highestEducation', label: 'Trình độ' },
              { key: 'graduateSchool', label: 'Trường tốt nghiệp' },
            ].map((f) => (
              <div key={f.key} className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant">{f.label}</label>
                <input
                  className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              </div>
            ))}
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Kinh nghiệm (năm)</label>
              <input
                className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                type="number"
                value={form.teachingExperienceYears ?? 0}
                onChange={(e) => setForm({ ...form, teachingExperienceYears: Number(e.target.value) })}
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Giới thiệu</label>
              <textarea
                className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
                value={form.bio ?? ''}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <button className="sm:col-span-2 bg-primary text-on-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md" type="submit">
              Lưu hồ sơ
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-space-lg">
          {/* Certificates */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Chứng chỉ</h2>
            <form className="flex flex-col gap-space-sm mb-space-md" onSubmit={addCertificate}>
              <input
                className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tên chứng chỉ (VD: IELTS)"
                required
                value={certForm.name}
                onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
              />
              <div className="flex gap-space-sm">
                <input
                  className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Điểm"
                  value={certForm.score}
                  onChange={(e) => setCertForm({ ...certForm, score: e.target.value })}
                />
                <input
                  className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Đơn vị cấp"
                  value={certForm.issuingBody}
                  onChange={(e) => setCertForm({ ...certForm, issuingBody: e.target.value })}
                />
              </div>
              <button className="bg-primary text-on-primary px-space-md py-2 rounded-xl font-label-md text-label-md self-start" type="submit">
                Thêm chứng chỉ
              </button>
            </form>

            <div className="flex flex-col gap-space-sm">
              {certificates.map((c) => (
                <div key={c.certificateId} className="flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
                  <div>
                    <p className="font-body-md-medium text-body-md-medium">{c.name} {c.score ? `• ${c.score}` : ''}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{c.issuingBody || ''}</p>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full ${STATUS_META[c.status]?.cls || ''}`}>
                      {STATUS_META[c.status]?.label || c.status}
                    </span>
                    <button className="text-error hover:opacity-80" onClick={() => removeCertificate(c.certificateId)} type="button">
                      <Icon name="delete" />
                    </button>
                  </div>
                </div>
              ))}
              {certificates.length === 0 && <p className="text-on-surface-variant">Chưa có chứng chỉ.</p>}
            </div>
          </div>

          {/* Change password */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Đổi mật khẩu</h2>
            <form className="flex flex-col gap-space-sm" onSubmit={changePassword}>
              <input
                className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Mật khẩu hiện tại"
                required
                type="password"
                value={pwForm.oldPassword}
                onChange={(e) => setPwForm({ ...pwForm, oldPassword: e.target.value })}
              />
              <input
                className="bg-surface-container-low text-on-surface px-3 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Mật khẩu mới"
                required
                type="password"
                value={pwForm.newPassword}
                onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
              />
              <button className="bg-primary text-on-primary px-space-md py-2 rounded-xl font-label-md text-label-md self-start" type="submit">
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
