/** Не шаг из массива — переход к форме лида в UI */
export const QUIZ_LEAD_NEXT = 'lead' as const

export type Step = 'product' | 'goal' | 'marketplace' | 'import_supply' | 'production' | 'urgency' | 'documents' | 'result' | 'success' | 'finish'


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
  multi?: boolean // если можно выбирать несколько ответов
  tail: number // сколько осталось шагов в лучшем случае
}

// tail можно рассчитать алгоритмом
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
    tail: 6, // осталось 6 шагов
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
    description: 'Мы рассчитали предварительную стоимость и сроки под ваш товар. Учтены требования законодательства РФ — детали уточнит специалист',
    options: [ { id: 'calculate', emoji: '🧮', label: 'Да, полный комплект', next: 'success' },],
    tail: 1,
  },
  {
    id: 'success',
    title: 'Успех',
    description: 'Мы рассчитали предварительную стоимость и сроки под ваш товар. Учтены требования законодательства РФ — детали уточнит специалист',
    options: [],
    tail: 0,
  },
]

export const steps = new Map(quizSteps.map((s) => [s.id, s]))


/**
 * Описание ребра (перехода) между вершинами графа.
 * Содержит идентификатор, отображаемые данные и целевую вершину.
 */
export interface Option {
  id: string;
  emoji?: string;
  label?: string;
  next: string; // id вершины, в которую ведёт ребро
}

/**
 * Шаг истории: из какой вершины, по какому ребру и в какую вершину был совершён переход.
 */
export interface Jump {
  prev: string
  next: string
  option: Option
}

/**
 * Хранит путь посещённых вершин графа и выбранные рёбра переходов.
 * Позволяет перемещаться назад по истории.
 */
export class PathTracker {
  private jumps: Jump[] = []
  private currentNodeId: string
  private initialNodeId: string

  /**
   * @param initialNodeId - id начальной вершины (точка входа в граф)
   */
  constructor(initialNodeId: string) {
    this.initialNodeId = initialNodeId
    this.currentNodeId = initialNodeId
  }

  /**
   * Текущая вершина (последняя посещённая).
   */
  getCurrentNode(): string {
    return this.currentNodeId
  }

  /**
   * Все совершённые шаги в порядке выполнения.
   */
  getJumps(): Jump[] {
    return [...this.jumps]
  }

  /**
   * Полный путь вершин от начальной до текущей.
   */
  getNodesPath(): string[] {
    const nodes: string[] = [this.initialNodeId]
    for (const { next } of this.jumps) {
      nodes.push(next)
    }
    return nodes
  }

  /**
   * Совершить переход по заданному ребру.
   * @param option - выбранное ребро (должно содержать поле next)
   * @throws Если у ребра отсутствует целевая вершина (next)
   */
  forward(option: Option): void {
    if (!option.next) {
      throw new Error('Option must have a "next" field');
    }
    const jump: Jump = {
      prev: this.currentNodeId,
      next: option.next,
      option: { ...option }, // копируем, чтобы избежать внешних мутаций
    }
    this.jumps.push(jump)
    this.currentNodeId = option.next
  }

  /**
   * Вернуться на один шаг назад.
   * @returns true, если шаг был совершён, false – если история пуста
   */
  back(): boolean {
    if (!this.jumps.length) return false;
    this.jumps.pop()
    this.currentNodeId = this.jumps.length
      ? this.jumps[this.jumps.length - 1].next
      : this.initialNodeId
    return true;
  }

  /**
   * Проверить, можно ли вернуться назад.
   */
  canGoBack(): boolean {
    return Boolean(this.jumps.length)
  }
}