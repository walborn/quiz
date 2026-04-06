import { QuizFlow } from '@/components/quiz-flow'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const segments = [
  { title: 'Маркетплейсы', description: 'Быстрый запуск карточек на WB, Ozon и Яндекс Маркет.', emoji: '🛍️' },
  { title: 'Импорт', description: 'Подготовка документов для первой и повторной поставки.', emoji: '✈️' },
  { title: 'Производители РФ', description: 'Сертификация серийного выпуска и новых SKU.', emoji: '🏭' },
]

const advantages = [
  { title: 'Собственные лаборатории', description: 'Ускоряем испытания без длинной цепочки подрядчиков.', emoji: '🧪' },
  { title: 'Прозрачные сроки', description: 'Фиксируем этапы и держим вас в курсе по каждому шагу.', emoji: '⏱️' },
  { title: 'Работаем по РФ', description: 'Удалённое сопровождение и доставка оригиналов документов.', emoji: '📦' },
  { title: 'Под ключ', description: 'От подбора схемы до готового комплекта для продаж.', emoji: '🧩' },
  { title: 'Эксперты по регламентам', description: 'Учитываем требования законодательства и отрасли.', emoji: '📘' },
]

const processSteps = [
  'Бриф и проверка задачи по товару',
  'Подбор схемы сертификации и расчёт',
  'Испытания и оформление протоколов',
  'Регистрация и выпуск документов',
  'Передача комплекта и сопровождение',
]

const cases = [
  { product: 'Косметика', deadline: '5 дней', result: 'Запуск продаж на маркетплейсах без задержек' },
  { product: 'Детские товары', deadline: '7 дней', result: 'Успешный ввоз первой партии в РФ' },
  { product: 'Электроника', deadline: '4 дня', result: 'Оформление декларации для серийных поставок' },
]

const riskItems = [
  'Блокировка карточек товара и заморозка продаж',
  'Штрафы за отсутствие корректных разрешительных документов',
  'Задержки на таможне при импорте',
  'Потеря времени из-за неверно выбранной схемы',
  'Повторные расходы на переделку документов',
]

const trustItems = [
  { title: 'Лаборатории', description: 'Аккредитованные площадки для испытаний', emoji: '🏢' },
  { title: 'Документы', description: 'Работаем по действующим техрегламентам', emoji: '📄' },
  { title: 'Партнёры', description: 'Поддержка поставщиков и брендов из разных ниш', emoji: '🤝' },
  { title: 'Экспертность', description: 'Команда с практикой в B2B сертификации', emoji: '🎓' },
]

const faqItems = [
  {
    question: 'Сколько длится оформление сертификации?',
    answer: 'В среднем 3–7 рабочих дней. Точный срок зависит от типа продукции и набора документов.',
  },
  {
    question: 'Можно ли запустить процесс, если документов пока нет?',
    answer: 'Да, поможем собрать комплект по чек-листу и подскажем, что подготовить в первую очередь.',
  },
  {
    question: 'Вы работаете с импортом и маркетплейсами одновременно?',
    answer: 'Да, строим маршрут под ваш кейс: ввоз, испытания, оформление и подготовка для площадок.',
  },
]

function App() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[1320px] flex-col gap-10 px-4 py-8 sm:gap-16 sm:px-6 sm:py-12 lg:gap-24 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <p className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
          Сертификация · испытания · B2B
        </p>
        <h1 className="mb-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Сертификация продукции за 3–7 дней с гарантией принятия документов
        </h1>
        <p className="mb-6 text-pretty text-base text-muted-foreground sm:text-lg">
          Собственные лаборатории, без лишних посредников. Оформим документы под маркетплейсы и импорт.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
            <a href="#quiz">Рассчитать за 2 минуты</a>
          </Button>
          <Button variant="primary" size="lg" className="w-full sm:w-auto" asChild>
            <a href="#quiz">Консультация</a>
          </Button>
        </div>
      </header>

      <section
        id="quiz"
        aria-labelledby="quiz-heading"
        className="rounded-2xl border border-border/60 bg-card/50 p-4 shadow-sm sm:p-8"
      >
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <h2 id="quiz-heading" className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
            Ответьте на вопросы квиза
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Подберём формат сертификации под вашу продукцию и задачу. Один вопрос на экран.
          </p>
        </div>
        <QuizFlow />
      </section>

      <section aria-labelledby="segments-heading" className="space-y-6">
        <div className="max-w-2xl">
          <h2 id="segments-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Подбираем решение под задачу бизнеса
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {segments.map((segment) => (
            <Card key={segment.title}>
              <CardHeader>
                <div className="text-3xl" aria-hidden>
                  {segment.emoji}
                </div>
                <CardTitle>{segment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base">{segment.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="advantages-heading" className="space-y-6">
        <div className="max-w-2xl">
          <h2 id="advantages-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Почему нам доверяют сертификацию
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="text-2xl" aria-hidden>
                  {item.emoji}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <a href="#quiz">Рассчитать стоимость</a>
        </Button>
      </section>

      <section aria-labelledby="process-heading" className="space-y-6">
        <div className="max-w-2xl">
          <h2 id="process-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Процесс в 5 прозрачных шагах
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Card key={step}>
              <CardHeader>
                <p className="text-sm font-semibold text-primary">Шаг {index + 1}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{step}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="cases-heading" className="space-y-6">
        <div className="max-w-2xl">
          <h2 id="cases-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Кейсы по разным категориям товаров
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((item) => (
            <Card key={item.product}>
              <CardHeader>
                <CardTitle>{item.product}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Срок: {item.deadline}</p>
                <p className="rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary">{item.result}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="risks-heading" className="rounded-2xl border border-border bg-muted/70 p-6 sm:p-8">
        <div className="max-w-3xl space-y-4">
          <h2 id="risks-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Чем рискует бизнес без корректной сертификации
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {riskItems.map((item) => (
              <li key={item} className="rounded-lg bg-card px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a href="#quiz">Снизить риски через квиз</a>
          </Button>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="space-y-6">
        <div className="max-w-2xl">
          <h2 id="trust-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Блок доверия: документы, лаборатории, опыт
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="text-2xl" aria-hidden>
                  {item.emoji}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Получите предварительный расчёт стоимости и сроков за 2 минуты
          </h2>
          <p className="text-sm text-primary-foreground/90 sm:text-base">
            Ответьте на вопросы квиза, и специалист подготовит решение под ваш товар и канал продаж.
          </p>
          <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
            <a href="#quiz">Рассчитать</a>
          </Button>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-4xl space-y-6">
        <div className="max-w-2xl">
          <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            FAQ
          </h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-base font-semibold">{item.question}</summary>
              <p className="pt-3 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="lead-form" aria-labelledby="lead-form-heading" className="mx-auto w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle id="lead-form-heading">Оставьте заявку на консультацию</CardTitle>
            <CardDescription>Перезвоним, уточним задачу и подскажем оптимальный формат сертификации.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 sm:grid-cols-3">
              <Input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Имя"
                className="h-12"
              />
              <Input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+7 ..."
                className="h-12"
              />
              <Button type="button" className="h-12 w-full" size="default">
                Оставить заявку
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border pt-8 text-center text-xs text-muted-foreground sm:text-sm">
        <p>
          Работаем по всей России. Готовы подключить отправку лидов в CRM или Telegram по вашему процессу.
        </p>
      </footer>
    </main>
  )
}

export default App
