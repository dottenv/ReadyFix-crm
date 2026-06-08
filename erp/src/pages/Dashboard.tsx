import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'
import type { Order, ContactRequest, User } from '@shared/types'

const statusLabels: Record<string, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  done: 'Выполнена',
  cancelled: 'Отменена',
  awaiting_parts: 'Ожидание запчастей',
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  done: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  awaiting_parts: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

export default function Dashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [contacts, setContacts] = useState<ContactRequest[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'all' | 'orders' | 'contacts'>('all')

  useEffect(() => {
    Promise.all([
      api.orders.list(),
      api.contacts.list(),
      user?.role === 'director' || user?.role === 'admin' ? api.auth.users() : Promise.resolve(null),
    ])
      .then(([ordersRes, contactsRes, usersRes]) => {
        setOrders(ordersRes)
        setContacts(contactsRes)
        if (usersRes) setUsers(usersRes.users)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const updated = await api.orders.update(id, { status: newStatus })
      setOrders(prev => prev.map(o => (o.id === id ? updated : o)))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleAssign = async (id: number, assignedTo: number | null) => {
    try {
      const updated = await api.contacts.update(id, { assigned_to: assignedTo })
      setContacts(prev => prev.map(c => (c.id === id ? updated : c)))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const allItems = [
    ...orders.map(o => ({ type: 'order' as const, ...o })),
    ...contacts.map(c => ({ type: 'contact' as const, ...c })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const canAssign = user?.role === 'director' || user?.role === 'admin'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">План-график</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Всего: {orders.length} заявок, {contacts.length} обращений
          </p>
        </div>

        <div className="flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
          {([
            { key: 'all', label: 'Все' },
            { key: 'orders', label: 'Заявки' },
            { key: 'contacts', label: 'Обращения' },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t.key
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Новые заявки" value={orders.filter(o => o.status === 'new').length} color="blue" />
        <StatCard label="В работе" value={orders.filter(o => o.status === 'in_progress').length} color="amber" />
        <StatCard label="Новые обращения" value={contacts.filter(c => c.status === 'new').length} color="violet" />
        <StatCard label="Выполнено сегодня" value={orders.filter(o => o.status === 'done').length} color="green" />
      </div>

      <div className="mt-6 space-y-3">
        {allItems
          .filter(item => tab === 'all' || item.type === tab.slice(0, -1))
          .map(item => (
            <div
              key={`${item.type}-${item.id}`}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.type === 'order'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                      }`}
                    >
                      {item.type === 'order' ? 'Заявка' : 'Обращение'}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[item.status] || statusColors['new']}`}>
                      {statusLabels[item.status] || item.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleString('ru', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <a href={`tel:${item.phone}`} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                      {item.phone}
                    </a>
                  </div>

                  {'device' in item && item.device && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.device}{item.problem ? ` — ${item.problem}` : ''}
                    </p>
                  )}
                  {'message' in item && item.message && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.message}</p>
                  )}

                  {item.assigned_name && (
                    <p className="mt-1 text-xs text-gray-500">
                      Исполнитель: {item.assigned_name}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {item.type === 'order' && (
                    <select
                      value={item.status}
                      onChange={e => handleStatusChange(item.id, e.target.value)}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    >
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  )}

                  {canAssign && (
                    <select
                      value={item.assigned_to ?? ''}
                      onChange={e => handleAssign(item.id, e.target.value ? Number(e.target.value) : null)}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <option value="">Назначить</option>
                      {users.filter(u => u.role === 'master' || u.role === 'courier').map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role === 'master' ? 'Мастер' : 'Курьер'})</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}

        {allItems.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Пока нет заявок и обращений</p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    amber: 'from-amber-500 to-amber-600',
    violet: 'from-violet-500 to-violet-600',
    green: 'from-green-500 to-green-600',
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[color]} text-white`}>
          {value}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </div>
  )
}
