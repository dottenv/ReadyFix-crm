import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute, RoleGuard } from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UsersPage from './pages/UsersPage'
import MyOrders from './pages/MyOrders'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/users"
            element={
              <RoleGuard roles={['director', 'admin']}>
                <UsersPage />
              </RoleGuard>
            }
          />
          <Route
            path="/my-orders"
            element={
              <RoleGuard roles={['master']}>
                <MyOrders />
              </RoleGuard>
            }
          />
          <Route
            path="/reports"
            element={
              <RoleGuard roles={['director']}>
                <div className="flex items-center justify-center py-20 text-gray-500">Отчёты (в разработке)</div>
              </RoleGuard>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
