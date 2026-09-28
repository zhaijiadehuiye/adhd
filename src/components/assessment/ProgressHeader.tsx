import { STAGE_META, estimateRemainingMinutes } from '@/assessment/engine'
import type { StageId } from '@/assessment/types'

interface Props {
  stage: StageId
  index: number
  total: number
}

export function ProgressHeader({ stage, index, total }: Props) {
  const pct = Math.min(100, Math.round((index / Math.max(total, 1)) * 100))
  const remaining = estimateRemainingMinutes(
    Array.from({ length: total }, (_, i) => String(i)),
    index,
  )

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-7 sm:px-6">
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
          {STAGE_META[stage].label}
        </span>
        <span className="text-subtle">
          第 {Math.min(index + 1, total)} / {total} 题 · 预计还需 {remaining} 分钟
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
