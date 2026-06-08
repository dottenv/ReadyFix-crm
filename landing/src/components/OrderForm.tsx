import { type FormEvent, useState } from 'react'

type FormData = {
  name: string
  phone: string
  device: string
  problem: string
}

const initial: FormData = { name: '', phone: '', device: '', problem: '' }

const devices = ['iPhone', 'Samsung', 'Xiaomi', 'Другой телефон', 'iPad', 'Samsung Tab', 'Другой планшет', 'MacBook', 'Windows ноутбук', 'Другое']

export default function OrderForm() {
  const [form, setForm] = useState<FormData>(initial)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          device: form.device,
          problem: form.problem,
        }),
      })
      if (!res.ok) throw new Error('Ошибка отправки')
      setSent(true)
      setForm(initial)
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.')
    }
  }

  if (sent) {
    return (
      <section id="order" className="bg-gradient-to-br from-blue-600 to-violet-600">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Заявка отправлена!</h2>
          <p className="mt-4 text-lg text-blue-100">Мы перезвоним в течение 5 минут.</p>
          <button onClick={() => setSent(false)} className="mt-8 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50">
            Отправить ещё
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="order" className="bg-gradient-to-br from-blue-600 to-violet-700">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Вызвать мастера</h2>
          <p className="mt-4 text-lg text-blue-100">
            Заполните форму — мы перезвоним, уточним детали и отправим мастера
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {error && (
            <div className="rounded-xl bg-red-500/20 p-3 text-sm text-red-200 backdrop-blur-sm">
              {error}
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Ваше имя"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-blue-200 backdrop-blur-sm transition-all focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <input
              type="tel"
              placeholder="+7 (999) 123-45-67"
              required
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-blue-200 backdrop-blur-sm transition-all focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          <select
            value={form.device}
            onChange={e => setForm(f => ({ ...f, device: e.target.value }))}
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white backdrop-blur-sm transition-all focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="" disabled className="text-gray-800">Выберите устройство</option>
            {devices.map(d => (
              <option key={d} value={d} className="text-gray-800">{d}</option>
            ))}
          </select>

          <textarea
            placeholder="Опишите проблему (необязательно)"
            rows={3}
            value={form.problem}
            onChange={e => setForm(f => ({ ...f, problem: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-blue-200 backdrop-blur-sm transition-all focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
          >
            Отправить заявку
          </button>

          <p className="text-center text-sm text-blue-200">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </div>
    </section>
  )
}
