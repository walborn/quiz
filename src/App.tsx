import { QuizFlow } from '@/components/quiz-flow'
import { Button } from '@/components/ui/button'

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
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
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

      <footer className="border-t border-border pt-8 text-center text-xs text-muted-foreground sm:text-sm">
        <p>
          Работаем по всей России. Отправка формы в демо пишется в консоль — подключите CRM при деплое.
        </p>
      </footer>
    </main>
  )
}

export default App
