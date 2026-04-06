import React, { useReducer } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { type Step, steps, type QuizStepDef } from '@/data/quiz-steps'
import { cn, getPercent } from '@/lib/utils'


type LeadFormData = {
  name: string
  phone: string
}

type State = {
  steps: Step[]
  answers: Set<string>[]
}
type ActionBack = { type: 'back' }
type ActionNext = { type: 'next', payload: Step }
type ActionUpdate = { type: 'update'; payload: Set<string> }
type ActionToggle = { type: 'toggle'; payload: string }

type Action = ActionBack | ActionNext | ActionUpdate | ActionToggle 

const reducer = (state: State, action: Action): State => {
  if (action.type === 'back') {
    return {
      steps: state.steps.slice(0, -1),
      answers: state.answers.slice(0, -1),
    }
  }
  if (action.type === 'next') {
    return {
      steps: [ ...state.steps, action.payload ],
      answers: [ ...state.answers, new Set<string>() ],
    }
  }
  if (action.type === 'update') {
    return {
      steps: [ ...state.steps ],
      answers: [ ...state.answers.slice(0, -1), action.payload ],
    }
  }
  if (action.type === 'toggle') {
    const answer = new Set(state.answers.at(-1) ?? [])
    if (answer.has(action.payload)) {
      answer.delete(action.payload)
    } else {
      answer.add(action.payload)
    }

    return {
      steps: [ ...state.steps ],
      answers: [ ...state.answers.slice(0, -1), answer ],
    }
  }
  throw Error('Unknown action.');
}

const initialState: State = { steps: ['product'], answers: [new Set<string>()] }

export const QuizFlow: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [formData, setFormData] = React.useState<LeadFormData>({
    name: '',
    phone: '',
  });

  const step = steps.get(state.steps.at(-1) as Step) as QuizStepDef

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    console.log(state)
    console.log(steps.get(state.steps.at(-1)!)!.options[0].next)
    handleNext(steps.get(state.steps.at(-1)!)!.options[0].next)
  }

  const handleBack = () => {
    dispatch({ type: 'back' })
  }

  const handleToggle = (optId: string) => {
    dispatch({ type: 'toggle', payload: optId })
  }

  const handleSelect = (values: Set<string>) => {
    dispatch({ type: 'update', payload: values })
  } 

  const handleNext = (next: Step) => {
    dispatch({ type: 'next', payload: next })
  }

  const total = state.answers.length + step?.tail

  const progress = getPercent(state.answers.length, total)

  if (state.steps.at(-1) === 'success') {
    return (
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="text-4xl" aria-hidden>
            ✅
          </div>
          <CardTitle>Спасибо, заявка принята</CardTitle>
          <CardDescription className="text-base">
            Специалист свяжется с вами в течение ~2 минут
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (state.steps.at(-1) === 'result') {
    return (
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <div className="mb-2">
            <Progress value={progress} />
          </div>
          <CardTitle>{step.title}</CardTitle>
          <CardDescription className="text-base text-foreground/90">
            {step.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="lead-name">Имя</Label>
              <Input
                id="lead-name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Как к вам обращаться"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-phone">Номер телефона</Label>
              <Input
                id="lead-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+7 …"
              />
            </div>
            <Button type="submit" variant="default" className="w-full sm:w-auto">
              Получить расчёт
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="button" variant="ghost" onClick={handleBack}>
            Назад
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <div className="mb-3 space-y-2">
          <Progress value={progress} />
          <p className="text-xs font-semibold text-primary">
            Шаг {state.answers.length} · вопросов в ветке ~{total}
          </p>
        </div>
        <CardTitle>{step.title}</CardTitle>
        {step.subtitle ? <CardDescription className="text-base">{step.subtitle}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {step.multi ? (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {step.options.map((opt) => {
                const answer = state.answers.at(-1)!
                const checked = answer.has(opt.id)
                return (
                  <label
                    key={opt.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors',
                      checked ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => handleToggle(opt.id)}
                      aria-label={opt.label}
                    />
                    <span className="text-2xl" aria-hidden>
                      {opt.emoji}
                    </span>
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </label>
                )
              })}
            </div>
            <Button
              type="button"
              className="w-full sm:w-auto"
              variant="default"
              disabled={state.answers.length < 2}
              onClick={() => handleNext(step.options[0].next)}
            >
              Далее
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={cn(
                  'flex min-h-22 flex-col items-center justify-center gap-2 rounded-lg border-2 border-border bg-card p-4 text-center transition-colors',
                  'hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                )}
                onClick={() => {
                  handleSelect(new Set([opt.id]))
                  handleNext(opt.next)
                }}
              >
                <span className="text-3xl" aria-hidden>
                  {opt.emoji}
                </span>
                <span className="text-sm font-semibold text-foreground">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </CardContent>
      {(state.answers.length > 1) && (
        <CardFooter className="border-t border-border pt-4">
          <Button type="button" variant="ghost" onClick={handleBack}>
            Назад
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
