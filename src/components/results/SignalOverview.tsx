import type { AssessmentResult, SignalLevel } from '@/assessment/types'
import { SIGNAL_LABELS } from '@/assessment/explanations'
import { cn } from '@/lib/cn'

const TOTAL_DOTS = 5

function filledCount(level: SignalLevel): number {
  switch (level) {
    case 'high':
      return 4
    case 'moderate':
      return 3
    case 'slight':
      return 2
    case 'none':
      return 1
    case 'unknown':
      return 0
  }
}

function Dots({ level }: { level: SignalLevel }) {
  const filled = filledCount(level)
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {Array.from({ length: TOTAL_DOTS }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-2 w-2 rounded-full',
            i < filled ? 'bg-brand' : 'bg-surface-2',
          )}
        />
      ))}
    </span>
  )
}

const COMPLETENESS_LABEL: Record<SignalLevel, string> = {
  high: '完整',
  moderate: '较好',
  slight: '一般',
  none: '不足',
  unknown: '无法判断',
}

export function SignalOverview({ result }: { result: AssessmentResult }) {
  const s = result.signals
  const rows: Array<{ label: string; level: SignalLevel; text: string }> = [
    { label: 'ADHD 相关信号', level: s.adhd, text: SIGNAL_LABELS[s.adhd] },
    { label: 'ASD 相关信号', level: s.asd, text: SIGNAL_LABELS[s.asd] },
    { label: '睡眠干扰', level: s.sleep, text: SIGNAL_LABELS[s.sleep] },
    { label: '孤独 / 社会隔离', level: s.loneliness, text: SIGNAL_LABELS[s.loneliness] },
    { label: '功能损害', level: s.impairment, text: SIGNAL_LABELS[s.impairment] },
    {
      label: '证据完整度',
      level: s.completeness,
      text: COMPLETENESS_LABEL[s.completeness],
    },
  ]

  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-[17px] font-semibold tracking-tight">你的筛查概况</h2>
      <p className="mt-1 text-[12.5px] text-subtle">
        “证据完整度”只衡量回答是否完整、时间线是否一致，<span className="text-muted">不是诊断置信度</span>。
      </p>

      <div className="mt-5 divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between py-3">
            <span className="text-[14px] text-muted">{r.label}</span>
            <span className="flex items-center gap-3">
              <Dots level={r.level} />
              <span className="w-8 text-right text-[13.5px] font-medium">{r.text}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
