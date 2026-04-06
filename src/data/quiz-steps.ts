export type Step =
  | 'product'
  | 'goal'
  | 'marketplace'
  | 'import_supply'
  | 'production'
  | 'urgency'
  | 'documents'
  | 'result'
  | 'success'

export type QuizOption = {
  id: string
  emoji: string
  label: string
  next: Step
}

export type QuizStepDef = {
  id: Step
  title: string
  subtitle?: string
  description?: string
  options: QuizOption[]
  multi?: boolean
  tail: number
}

export const quizSteps: QuizStepDef[] = [
  {
    id: 'product',
    title: 'Укажите тип продукции',
    subtitle: 'Выберите один вариант',
    options: [
      { id: 'cosmetics', emoji: '💅', label: 'Косметика', next: 'goal' },
      { id: 'clothing', emoji: '👘', label: 'Одежда / текстиль', next: 'goal' },
      { id: 'electronics', emoji: '🔌', label: 'Электроника', next: 'goal' },
      { id: 'children', emoji: '👶', label: 'Детские товары', next: 'goal' },
      { id: 'food', emoji: '🍎', label: 'Пищевые продукты', next: 'goal' },
      { id: 'other', emoji: '📎', label: 'Другое', next: 'goal' },
    ],
    tail: 6,
  },
  {
    id: 'goal',
    title: 'Для каких целей нужна сертификация?',
    subtitle: 'Выберите один вариант',
    options: [
      { id: 'marketplace', emoji: '🛍', label: 'Продажа на маркетплейсах', next: 'marketplace' },
      { id: 'import', emoji: '✈️', label: 'Импорт в Россию', next: 'import_supply' },
      { id: 'make_and_sell', emoji: '📦', label: 'Производство и продажа', next: 'production' },
      {
        id: 'renewal',
        emoji: '📜',
        label: 'Уже продаю, необходимо продление сертификата',
        next: 'production',
      },
    ],
    tail: 5,
  },
  {
    id: 'marketplace',
    title: 'На каком маркетплейсе будете продавать?',
    subtitle: 'Можно выбрать несколько вариантов',
    multi: true,
    options: [
      { id: 'wb', emoji: '🟣', label: 'Wildberries', next: 'production' },
      { id: 'ozon', emoji: '🔵', label: 'Ozon', next: 'production' },
      { id: 'yandex_market', emoji: '🟡', label: 'Яндекс Маркет', next: 'production' },
      { id: 'avito', emoji: '🟢', label: 'Авито', next: 'production' },
    ],
    tail: 5,
  },
  {
    id: 'import_supply',
    title: 'Планируете ли первую поставку?',
    subtitle: 'Выберите один вариант',
    options: [
      { id: 'first', emoji: '🌱', label: 'Первая поставка', next: 'production' },
      { id: 'repeat', emoji: '🪴', label: 'Повторная поставка, уже ввозили', next: 'production' },
    ],
    tail: 5,
  },
  {
    id: 'production',
    title: 'Где производится товар?',
    subtitle: 'Выберите один вариант',
    options: [
      { id: 'russia', emoji: '🏭', label: 'Россия', next: 'urgency' },
      { id: 'china', emoji: '📦', label: 'Китай', next: 'urgency' },
      { id: 'europe', emoji: '🇪🇺', label: 'Европа', next: 'urgency' },
      { id: 'other', emoji: '🌍', label: 'Другое', next: 'urgency' },
    ],
    tail: 4,
  },
  {
    id: 'urgency',
    title: 'Насколько срочно нужны документы?',
    subtitle: 'Выберите один вариант',
    options: [
      { id: 'urgent', emoji: '⚡', label: 'Срочно (до 3 дней)', next: 'documents' },
      { id: 'week', emoji: '📅', label: 'В течение недели', next: 'documents' },
      { id: 'not_urgent', emoji: '☕', label: 'Не срочно', next: 'documents' },
    ],
    tail: 3,
  },
  {
    id: 'documents',
    title: 'Есть ли у вас документы на продукцию?',
    subtitle: 'Выберите один вариант',
    options: [
      { id: 'full', emoji: '📑', label: 'Да, полный комплект', next: 'result' },
      { id: 'partial', emoji: '📄', label: 'Частично', next: 'result' },
      { id: 'no', emoji: '❔', label: 'Нет', next: 'result' },
    ],
    tail: 2,
  },
  {
    id: 'result',
    title: 'Получить расчёт',
    description:
      'Мы рассчитали предварительную стоимость и сроки под ваш товар. Учтены требования законодательства РФ, расчёт подготовит специалист.',
    options: [{ id: 'calculate', emoji: '🧮', label: 'Получить расчёт', next: 'success' }],
    tail: 1,
  },
  {
    id: 'success',
    title: 'Успех',
    description: 'Спасибо, заявка принята. Специалист свяжется с вами в течение ~2 минут.',
    options: [],
    tail: 0,
  },
]

export const steps = new Map(quizSteps.map((s) => [s.id, s]))