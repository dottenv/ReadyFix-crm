import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { Order } from '@shared/types'

const statusLabels: Record<string, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  done: 'Выполнена',
  cancelled: 'Отменена',
  awaiting_parts: 'Ожидание запчастей',
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.orders.list()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const updated = await api.orders.update(id, { status })
      setOrders(prev => prev.map(o => (o.id === id ? updated : o)))
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Мои заказы</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{orders.length} заказов</p>
      </div>

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">#{order.id}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleString('ru', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="font-medium">{order.name}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <a href={`tel:${order.phone}`} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    {order.phone}
                  </a>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {order.device}{order.problem ? ` — ${order.problem}` : ''}
                </p>
              </div>

              <select
                value={order.status}
                onChange={e => handleStatusChange(order.id, e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Нет назначенных заказов</p>
          </div>
        )}
      </div>
    </div>
  )
}
