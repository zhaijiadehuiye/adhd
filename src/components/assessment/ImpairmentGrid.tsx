import type { Item, AnswerValue } from '@/assessment/types'
import { IMPAIRMENT_DOMAINS, IMPAIRMENT_LEVELS } from '@/assessment/impairment'
import { cn } from '@/lib/cn'

interface Props {
  item: Item
  value: AnswerValue | undefined
  onChange: (value: Record<string, number>) => void
  onCommit: () => void
}

const SHORT = ['无', '轻', '中', '显', '重']

export function ImpairmentGrid({ value, onChange, onCommit }: Props) {
  const map = value && typeof value === 'object' ? (value as Record<string, number>) : {}

  const setCell = (domainId: string, level: number) => {
    onChange({ ...map, [domainId]: level })
  }

  const allSet = IMPAIRMENT_DOMAINS.every((d) => map[d.id] !== undefined)

  return (
    <div className="mt-7">
      <div className="card p-4 sm:p-5">
        <div className="hidden grid-cols-[minmax(130px,1fr)_repeat(5,52px)] gap-1.5 px-2 pb-2 text-center text-[11px] text-subtle sm:grid">
          <span className="text-left">领域</span>
          {IMPAIRMENT_LEVELS.map((l) => (
            <span key={l.value}>{l.label}</span>
          ))}
        </div>

        <div className="flex flex-col divide-y divide-line">
          {IMPAIRMENT_DOMAINS.map((dom) => (
            <div
              key={dom.id}
              className="flex flex-col gap-2 py-3 sm:grid sm:grid-cols-[minmax(130px,1fr)_repeat(5,52px)] sm:items-center sm:gap-1.5 sm:px-2"
            >
              <span className="text-[13.5px] font-medium sm:text-left">{dom.label}</span>
              <div className="grid grid-cols-5 gap-1.5 sm:contents">
                {IMPAIRMENT_LEVELS.map((l, i) => {
                  const selected = map[dom.id] === l.value
                  return (
                    <button
                      key={l.value}
                      type="button"
                      title={l.label}
                      aria-label={`${dom.label}：${l.label}`}
                      aria-pressed={selected}
                      onClick={() => setCell(dom.id, l.value)}
                      className={cn(
                        'h-9 rounded-lg border text-[12px] transition sm:h-8',
                        selected
                          ? 'border-confound bg-[var(--confound-soft)] font-medium text-confound'
                          : 'border-line bg-surface text-muted hover:border-line-strong',
                      )}
                    >
                      <span className="sm:hidden">{SHORT[i]}</span>
                      <span className="hidden sm:inline">{selected ? '●' : ''}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-[12px] text-subtle">逐行评定；这是“实际影响”，不是特点本身。</p>
        <button
          type="button"
          data-action="continue"
          onClick={onCommit}
          disabled={!allSet}
          className={cn(
            'rounded-full px-6 py-3 text-[14px] font-medium transition active:scale-[0.98]',
            allSet
              ? 'bg-brand text-white hover:bg-brand-strong'
              : 'cursor-not-allowed bg-surface-2 text-subtle',
          )}
        >
          查看我的 Neuro Map
        </button>
      </div>
    </div>
  )
}
