export interface User {
  id: number
  email: string
  name: string
  phone: string
  role: 'director' | 'admin' | 'master' | 'courier'
  is_active: boolean
  created_at: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Order {
  id: number
  name: string
  phone: string
  device: string
  problem: string
  status: 'new' | 'in_progress' | 'done' | 'cancelled' | 'awaiting_parts'
  assigned_to: number | null
  assigned_name: string | null
  created_at: string
  updated_at: string | null
}

export interface OrderCreate {
  name: string
  phone: string
  device: string
  problem?: string
}

export interface OrderUpdate {
  status?: string
  assigned_to?: number | null
}

export interface ContactRequest {
  id: number
  name: string
  phone: string
  message: string
  status: string
  assigned_to: number | null
  assigned_name: string | null
  created_at: string
}
