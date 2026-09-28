import type { AssessmentResult } from '@/assessment/types'
import { LIFE_PERIODS, PERIOD_MAP } from '@/assessment/scales'
import { cn } from '@/lib/cn'

export function SymptomTimelineViz({ result }: { result: AssessmentResult }) {
  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-[17px] font-semibold tracking-tight">症状时间线</h2>
      <p className="mt-1 text-[12.5px] text-subtle">
        每一行显示该类困难最早出现的时期；圆点之后的浅色段表示它持续存在。
      </p>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[660px]">
          {/* Period header */}
          <div className="grid grid-cols-[104px_repeat(7,1fr)] gap-1 pb-2">
            <span />
            {LIFE_PERIODS.map((p) => (
              <span key={p.id} className="text-center text-[11px] text-muted">
                {p.short}
              </span>
            ))}
          </div>

          {result.timeline.map((mark) => {
            const onsetOrder = mark.periodId
              ? (PERIOD_MAP[mark.periodId]?.order ?? -1)
              : -1
            return (
              <div
                key={mark.categoryId}
                className="grid grid-cols-[104px_repeat(7,1fr)] items-center gap-1 border-t border-line py-2.5"
              >
                <span className="truncate pr-2 text-[12.5px] text-muted">
                  {mark.categoryLabel}
                </span>
                {LIFE_PERIODS.map((p, i) => {
                  const isOnset = i === onsetOrder
                  const after = onsetOrder >= 0 && i > onsetOrder
                  return (
                    <div key={p.id} className="flex justify-center">
                      <div
                        className={cn(
                          'h-6 w-full rounded-md',
                          after && 'bg-[var(--brand-soft)]',
                        )}
                      >
                        {isOnset && (
                          <div className="flex h-6 items-center justify-center">
                            <span className="h-3.5 w-3.5 rounded-full border-2 border-brand bg-surface shadow-[0_0_0_4px_var(--brand-soft)]" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
