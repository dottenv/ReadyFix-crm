import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { User } from '@shared/types'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.auth.users()
      .then(res => setUsers(res.users))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  const roleLabels: Record<string, string> = {
    director: 'Директор',
    admin: 'Администратор',
    master: 'Мастер',
    courier: 'Курьер',
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Сотрудники</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{users.length} человек</p>
      </div>

      <div className="space-y-3">
        {users.map(user => (
          <div
            key={user.id}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-800">
                {roleLabels[user.role] || user.role}
              </span>
              {user.phone && <div className="mt-0.5 text-xs text-gray-400">{user.phone}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
