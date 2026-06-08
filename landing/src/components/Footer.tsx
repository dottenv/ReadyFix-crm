export default function Footer() {
  return (
    <footer id="contacts" className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">RF</span>
              ReadyFix
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Выездной сервисный центр. Ремонтируем телефоны, планшеты и ноутбуки с выездом к вам.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Ремонт телефонов</li>
              <li>Ремонт планшетов</li>
              <li>Ремонт ноутбуков</li>
              <li>Срочный выезд</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>+7 (999) 123-45-67</li>
              <li>info@readyfix.ru</li>
              <li>пн-вс 9:00–22:00</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">Мы в соцсетях</h4>
            <div className="flex gap-3">
              {['TG', 'VK', 'WA'].map(s => (
                <span key={s} className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
          &copy; {new Date().getFullYear()} ReadyFix. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
