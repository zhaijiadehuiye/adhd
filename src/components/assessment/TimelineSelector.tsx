import type { Item, AnswerValue } from '@/assessment/types'
import { TIMELINE_PERIODS, NEVER_PERIOD } from '@/assessment/scales'
import { cn } from '@/lib/cn'

interface Props {
  item: Item
  value: AnswerValue | undefined
  onSelect: (periodId: string) => void
}

/**
 * Horizontal life-period selector with a connecting rail.
 * Periods are ordered chronologically; "never" sits at the end.
 */
export function TimelineSelector({ item, value, onSelect }: Props) {
  const periods = item.periods ?? TIMELINE_PERIODS

  return (
    <div className="mt-8">
      <div className="no-scrollbar overflow-x-auto pb-2">
        <div className="flex min-w-max items-start gap-0">
          {periods.map((p, i) => {
            const selected = value === p.id
            const isNever = p.id === NEVER_PERIOD.id
            return (
              <div key={p.id} className="flex items-start">
                <button
                  type="button"
                  data-index={i}
                  onClick={() => onSelect(p.id)}
                  className="group flex w-[88px] flex-col items-center gap-2.5"
                  aria-label={p.label}
                >
                  <span
                    className={cn(
                      'z-10 grid h-9 w-9 place-items-center rounded-full border-2 text-[12.5px] font-medium transition',
                      selected
                        ? 'border-brand bg-brand text-white'
                        : 'border-line-strong bg-surface text-muted group-hover:border-brand group-hover:text-brand',
                    )}
                  >
                    {selected ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="m5 12.5 4.5 4.5L19 7.5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : isNever ? (
                      '×'
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      'text-center text-[11.5px] leading-tight transition',
                      selected ? 'font-medium text-ink' : 'text-muted',
                    )}
                  >
                    {p.short}
                  </span>
                </button>
                {!isNever && i < periods.length - 1 && (
                  <div className="mt-[17px] h-0.5 w-3 shrink-0 bg-line-strong" aria-hidden />
                )}
                {isNever && <div />}
              </div>
            )
          })}
        </div>
      </div>
      <p className="mt-3 text-[12px] text-subtle">
        凭印象选择即可，不需要精确到某一年。数字键 1–{periods.length} 也可以选择。
      </p>
    </div>
  )
}
