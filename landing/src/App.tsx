import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import Layout from './components/Layout'
import Home from './pages/Home'

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}
