import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Цены', href: '#prices' },
  { label: 'Как мы работаем', href: '#process' },
  { label: 'Контакты', href: '#contacts' },
]

export default function Header() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">
            RF
          </span>
          ReadyFix
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" aria-label="Переключить тему">
            {theme === 'light' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <a href="#order" className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md sm:inline-block">
            Вызвать мастера
          </a>

          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden" aria-label="Меню">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              {link.label}
            </a>
          ))}
          <a href="#order" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white">
            Вызвать мастера
          </a>
        </nav>
      )}
    </header>
  )
}
