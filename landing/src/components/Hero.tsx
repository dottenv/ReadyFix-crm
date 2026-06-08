export default function Hero() {
  return (
    <section className="relative flex min-h-[90dvh] items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover brightness-[0.3]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Работаем ежедневно 9:00–22:00
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ремонт техники{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              с выездом на дом
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
            Чиним телефоны, планшеты и ноутбуки прямо у вас дома или в офисе{' '}
            <span className="group relative inline-flex cursor-help items-baseline">
              <span className="text-blue-400">*</span>
              <span className="absolute bottom-full left-1/2 z-10 mb-2 w-72 -translate-x-1/2 rounded-xl border border-blue-500/30 bg-gray-900/95 p-3 text-xs leading-relaxed text-gray-200 opacity-0 shadow-xl backdrop-blur-sm transition-opacity group-hover:opacity-100">
                На месте возможен только модульный ремонт: замена дисплея, аккумулятора, разъёмов, кнопок и других заменяемых модулей. Сложный ремонт (пайка, BGA, восстановление платы) — в сервисном центре. Точнее скажет мастер после диагностики.
              </span>
            </span>.
            Бесплатная диагностика, гарантия до 12 месяцев.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Вызвать мастера
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#prices"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Смотреть цены
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-800 pt-8">
            {[
              { value: '500+', label: 'Ремонтов в месяц' },
              { value: '4.9', label: 'Средний рейтинг' },
              { value: '60 мин', label: 'Среднее время' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
