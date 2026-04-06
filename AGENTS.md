# AGENTS — контекст для итераций

## Проект

Одностраничный B2B-лендинг: сертификация продукции, квиз-воронка.

## Стек

- **Bun**, **Vite**, **React 19**, **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`), токены в [src/index.css](src/index.css)
- **shadcn-паттерн:** компоненты в [src/components/ui/](src/components/ui/) на Radix (`Button`, `Card`, `Progress`, `Input`, `Label`, `Checkbox`) + [src/lib/utils.ts](src/lib/utils.ts) (`cn`)

## Импорты

Алиас **`@/`** → `src/` (см. [vite.config.ts](vite.config.ts), [tsconfig.app.json](tsconfig.app.json)).

## Команды

```sh
bun install
bun run dev
bun run build
bun run preview
```

## Дизайн

- Палитра и шрифты задаются в `@theme` в [src/index.css](src/index.css) (основной синий, золотой акцент для CTA).
- Mobile first, крупные кнопки (h-12+), emoji вместо картинок в квизе.

## Данные квиза

Единый источник — [src/data/quiz-steps.ts](src/data/quiz-steps.ts):

- Линейные шаги + ветка **маркетплейс** (multi-select, `multiSelect` / `multiSelectNext`).
- Ветка **импорт** → шаг `import_supply`, затем производство → срочность → документы → форма (`QUIZ_LEAD_NEXT`).
- Логика навигации и форма — [src/components/quiz-flow.tsx](src/components/quiz-flow.tsx).

Синхронизировать с [docs/quiz.md](docs/quiz.md).

## Backlog

- Отправка лида на API / CRM / Telegram.
- Остальные блоки лендинга — [docs/task.md](docs/task.md).

## Правила

- Не раздувать зависимости; новые UI — через `src/components/ui` и `cn()`.
- Доступность: семантика, фокус, контраст.
