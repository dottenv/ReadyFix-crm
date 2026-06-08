const categories = [
  {
    name: 'Телефоны',
    items: [
      { service: 'Замена дисплея', price: 'от 1 500 ₽' },
      { service: 'Замена аккумулятора', price: 'от 1 200 ₽' },
      { service: 'Замена разъёма зарядки', price: 'от 900 ₽' },
      { service: 'Ремонт после воды', price: 'от 2 000 ₽' },
      { service: 'Замена задней крышки', price: 'от 800 ₽' },
      { service: 'Диагностика', price: 'Бесплатно' },
    ],
  },
  {
    name: 'Планшеты',
    items: [
      { service: 'Замена дисплея', price: 'от 2 500 ₽' },
      { service: 'Замена аккумулятора', price: 'от 1 800 ₽' },
      { service: 'Ремонт корпуса', price: 'от 1 500 ₽' },
      { service: 'Не включается', price: 'от 1 500 ₽' },
      { service: 'Диагностика', price: 'Бесплатно' },
    ],
  },
  {
    name: 'Ноутбуки',
    items: [
      { service: 'Замена термопасты', price: 'от 1 000 ₽' },
      { service: 'Замена клавиатуры', price: 'от 1 500 ₽' },
      { service: 'Замена матрицы', price: 'от 2 500 ₽' },
      { service: 'Апгрейд SSD/RAM', price: 'от 500 ₽' },
      { service: 'Ремонт системы питания', price: 'от 2 000 ₽' },
      { service: 'Диагностика', price: 'Бесплатно' },
    ],
  },
]

export default function Prices() {
  return (
    <section id="prices" className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Прайс-лист</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Цены на ремонт
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Цены указаны ориентировочные. Точную стоимость назовёт мастер после диагностики.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
              <ul className="space-y-4">
                {cat.items.map(item => (
                  <li key={item.service} className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.service}</span>
                    <span className={`whitespace-nowrap text-sm font-semibold ${
                      item.price === 'Бесплатно' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm text-gray-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-gray-300">
          <p className="flex items-start gap-2">
            <span className="mt-0.5 font-mono text-blue-600 dark:text-blue-400">*</span>
            <span>
              Цены на <strong>модульный ремонт</strong> (замена дисплея, АКБ, разъёмов) фиксированы для ремонта на месте.
              <strong> Сложный ремонт</strong> оценивается индивидуально после диагностики в сервисе.
            </span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Не нашли свою проблему?{' '}
            <a href="#order" className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400">
              Оставьте заявку
            </a>
            , мы подскажем.
          </p>
        </div>
      </div>
    </section>
  )
}
