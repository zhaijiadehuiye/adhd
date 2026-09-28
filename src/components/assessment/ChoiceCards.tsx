import type { Item, AnswerValue } from '@/assessment/types'
import { cn } from '@/lib/cn'

interface Props {
  item: Item
  value: AnswerValue | undefined
  onSelect: (value: string) => void
}

export function ChoiceCards({ item, value, onSelect }: Props) {
  const choices = item.choices ?? []

  return (
    <div className="mt-7 flex flex-col gap-2.5" role="radiogroup" aria-label={item.prompt}>
      {choices.map((c, i) => {
        const selected = value === c.value
        return (
          <button
            key={c.value}
            type="button"
            role="radio"
            aria-checked={selected}
            data-index={i}
            onClick={() => onSelect(c.value)}
            className={cn(
              'flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left transition active:scale-[0.99]',
              selected
                ? 'border-brand bg-[var(--brand-soft)]'
                : 'border-line bg-surface hover:border-line-strong hover:bg-surface-2/50',
            )}
          >
            <span
              className={cn(
                'grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-medium transition',
                selected ? 'bg-brand text-white' : 'bg-surface-2 text-muted',
              )}
            >
              {i + 1}
            </span>
            <span className={cn('flex-1 text-[14.5px]', selected && 'font-medium')}>
              {c.label}
            </span>
            <span
              className={cn(
                'h-4 w-4 shrink-0 rounded-full border transition',
                selected ? 'border-brand bg-brand' : 'border-line-strong',
              )}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  )
}
