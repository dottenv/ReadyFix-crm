const API_BASE = '/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Ошибка запроса' }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) =>
      request<{ token: string; user: import('@shared/types').User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    register: (data: { email: string; password: string; name: string; phone?: string; role?: string }) =>
      request<{ token: string; user: import('@shared/types').User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    me: () => request<{ user: import('@shared/types').User }>('/auth/me'),
    users: () => request<{ users: import('@shared/types').User[] }>('/auth/users'),
  },
  orders: {
    list: () => request<import('@shared/types').Order[]>('/orders/'),
    get: (id: number) => request<import('@shared/types').Order>(`/orders/${id}`),
    create: (data: import('@shared/types').OrderCreate) =>
      request<import('@shared/types').Order>('/orders/', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number, data: import('@shared/types').OrderUpdate) =>
      request<import('@shared/types').Order>(`/orders/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: number) => request<{ message: string }>(`/orders/${id}`, { method: 'DELETE' }),
  },
  contacts: {
    list: () => request<import('@shared/types').ContactRequest[]>('/contacts/'),
    update: (id: number, data: { status?: string; assigned_to?: number | null }) =>
      request<import('@shared/types').ContactRequest>(`/contacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: number) => request<{ message: string }>(`/contacts/${id}`, { method: 'DELETE' }),
  },
}
