const steps = [
  {
    num: '1',
    title: 'Оставьте заявку',
    desc: 'Заполните форму на сайте или позвоните нам. Мы перезвоним в течение 5 минут.',
  },
  {
    num: '2',
    title: 'Бесплатная диагностика',
    desc: 'Мастер приедет к вам и проведёт диагностику. Если ремонт нецелесообразен — вы ничего не платите.',
  },
  {
    num: '3',
    title: 'Согласование стоимости',
    desc: 'Мы называем точную цену и сроки. Вы принимаете решение — чинить или нет.',
  },
  {
    num: '4',
    title: 'Ремонт на месте',
    desc: 'Мастер ремонтирует устройство у вас дома или забирает в сервис, если требуется сложный ремонт.',
    note: 'Модульный ремонт (дисплей, АКБ, разъёмы) — на месте. Сложный (пайка, BGA) — в сервисе.',
  },
  {
    num: '5',
    title: 'Гарантия',
    desc: 'На все работы даём гарантию до 12 месяцев. Чек и гарантийный талон — на руки.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Как мы работаем</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Процесс ремонта
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Всё максимально прозрачно и удобно для вас.
          </p>
        </div>

        <div className="mt-14 grid gap-0 md:grid-cols-5">
          {steps.map((step, i) => (
            <div key={step.num} className="relative px-4 text-center">
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-blue-500 to-violet-500 md:block" />
              )}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white shadow-lg shadow-blue-600/20">
                {step.num}
              </div>
              <h3 className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
                {step.title}
                {step.note && (
                  <span className="group relative inline-flex cursor-help items-baseline">
                    <span className="ml-1 text-blue-500 dark:text-blue-400">*</span>
                    <span className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 text-xs leading-relaxed text-gray-700 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      {step.note}
                    </span>
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
