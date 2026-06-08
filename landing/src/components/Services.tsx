const services = [
  {
    title: 'Ремонт телефонов',
    desc: 'Замена дисплея, аккумулятора, разъёмов, восстановление после воды и любые другие поломки iPhone, Samsung, Xiaomi и других брендов.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1598965402089-301f92e13410?w=600&q=80',
  },
  {
    title: 'Ремонт планшетов',
    desc: 'Разбитый экран, не держит заряд, не включается? Восстановим iPad, Samsung Tab, Huawei и другие планшеты любой сложности.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25V4.5a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&q=80',
  },
  {
    title: 'Ремонт ноутбуков',
    desc: 'Замена термопасты, клавиатуры, матрицы, апгрейд SSD/RAM, ремонт системы питания. Работаем с MacBook, ASUS, Lenovo, HP.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1587613759658-51049f4c2e56?w=600&q=80',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Что мы чиним</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Услуги сервисного центра
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Выезжаем по всему городу. Бесплатная диагностика — сразу на месте.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm text-gray-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-gray-300">
          <p className="flex items-start gap-2">
            <span className="mt-0.5 font-mono text-blue-600 dark:text-blue-400">*</span>
            <span>
              <strong>Модульный ремонт</strong> (замена дисплея, аккумулятора, разъёма, кнопок, задней крышки) выполняется на месте — прямо у вас дома или в офисе.
              <strong> Сложный ремонт</strong> (пайка, BGA, восстановление платы, микросхем) требует стационарных условий — устройство забираем в сервис.
              Подробнее уточнит мастер после бесплатной диагностики.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
