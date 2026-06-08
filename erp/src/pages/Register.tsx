import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const roles = [
  { value: 'director', label: 'Директор' },
  { value: 'admin', label: 'Администратор' },
  { value: 'master', label: 'Мастер' },
  { value: 'courier', label: 'Курьер' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '', role: 'master' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white shadow-lg">
            RF
          </div>
          <h1 className="text-2xl font-bold">Регистрация</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Создайте аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium">Имя</label>
            <input type="text" required value={form.name} onChange={e => update('name', e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input type="email" required value={form.email} onChange={e => update('email', e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Телефон</label>
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900"
              placeholder="+7 (999) 123-45-67" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Роль</label>
            <select value={form.role} onChange={e => update('role', e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900">
              {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Пароль</label>
            <input type="password" required value={form.password} onChange={e => update('password', e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
