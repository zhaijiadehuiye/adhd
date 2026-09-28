import type { Item, AnswerValue } from '@/assessment/types'
import { cn } from '@/lib/cn'

interface Props {
  item: Item
  value: AnswerValue | undefined
  onSelect: (value: number) => void
  /** options come from item.options (or item.cards) */
  variant?: 'list' | 'grid'
}

/**
 * Vertical list of selectable options (frequency / agreement scales).
 * Number keys are handled by the page.
 */
export function OptionCards({ item, value, onSelect, variant = 'list' }: Props) {
  const options = item.options ?? item.cards ?? []

  return (
    <div
      className={cn(
        'mt-7',
        variant === 'grid'
          ? 'grid grid-cols-1 gap-2.5 sm:grid-cols-2'
          : 'flex flex-col gap-2.5',
      )}
      role="radiogroup"
      aria-label={item.prompt}
    >
      {options.map((opt, i) => {
        const selected = value === opt.value
        const isCard = !!item.cards
        return (
          <button
            key={`${opt.label}-${i}`}
            type="button"
            role="radio"
            aria-checked={selected}
            data-index={i}
            onClick={() => onSelect(opt.value)}
            className={cn(
              'group flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left transition active:scale-[0.99]',
              selected
                ? 'border-brand bg-[var(--brand-soft)]'
                : 'border-line bg-surface hover:border-line-strong hover:bg-surface-2/50',
            )}
          >
            <span
              className={cn(
                'grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-medium transition',
                isCard ? 'bg-surface-2 text-muted' : '',
                selected
                  ? 'bg-brand text-white'
                  : !isCard
                    ? 'bg-surface-2 text-muted group-hover:text-ink'
                    : 'text-muted',
              )}
            >
              {isCard ? opt.label : i + 1}
            </span>
            <span className="flex-1">
              {isCard ? (
                <span className={cn('block text-[14.5px]', selected && 'font-medium')}>
                  {opt.hint}
                </span>
              ) : (
                <span className={cn('block text-[14.5px]', selected && 'font-medium')}>
                  {opt.label}
                </span>
              )}
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
