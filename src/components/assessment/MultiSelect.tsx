import type { Item, AnswerValue } from '@/assessment/types'
import { cn } from '@/lib/cn'

interface Props {
  item: Item
  value: AnswerValue | undefined
  onChange: (values: string[]) => void
  onCommit: () => void
}

export function MultiSelect({ item, value, onChange, onCommit }: Props) {
  const selected = Array.isArray(value) ? value : []
  const options = item.multiOptions ?? []

  const toggle = (optValue: string) => {
    if (item.noneValue && optValue === item.noneValue) {
      onChange([item.noneValue])
      return
    }
    let next: string[]
    if (selected.includes(optValue)) {
      next = selected.filter((v) => v !== optValue)
    } else {
      next = [...selected.filter((v) => v !== item.noneValue), optValue]
    }
    onChange(next)
  }

  const valid = selected.length >= (item.multiMin ?? 1)

  return (
    <div className="mt-7">
      <div className="flex flex-col gap-2.5" role="group" aria-label={item.prompt}>
        {options.map((opt, i) => {
          const isSelected = selected.includes(opt.value)
          const isNone = opt.value === item.noneValue
          return (
            <button
              key={opt.value}
              type="button"
              data-index={i}
              onClick={() => toggle(opt.value)}
              className={cn(
                'flex items-center gap-3.5 rounded-2xl border px-5 py-3.5 text-left transition active:scale-[0.99]',
                isSelected
                  ? 'border-brand bg-[var(--brand-soft)]'
                  : 'border-line bg-surface hover:border-line-strong',
              )}
            >
              <span
                className={cn(
                  'grid h-6 w-6 shrink-0 place-items-center rounded-md border transition',
                  isSelected ? 'border-brand bg-brand text-white' : 'border-line-strong',
                )}
                aria-hidden
              >
                {isSelected && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className={cn('flex-1 text-[14.5px]', isSelected && 'font-medium')}>
                {opt.label}
              </span>
              {isNone && <span className="text-[11.5px] text-subtle">互斥</span>}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-[12px] text-subtle">可多选；数字键快速勾选，Enter 继续。</p>
        <button
          type="button"
          data-action="continue"
          onClick={onCommit}
          disabled={!valid}
          className={cn(
            'rounded-full px-6 py-3 text-[14px] font-medium transition active:scale-[0.98]',
            valid
              ? 'bg-brand text-white hover:bg-brand-strong'
              : 'cursor-not-allowed bg-surface-2 text-subtle',
          )}
        >
          继续
        </button>
      </div>
    </div>
  )
}
