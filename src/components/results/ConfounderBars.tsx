import type { AssessmentResult } from '@/assessment/types'

function Bar({ label, level, note }: { label: string; level: number; note: string }) {
  const pct = Math.round(level * 100)
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[13.5px] font-medium">{label}</span>
        <span className="text-[12px] text-subtle">{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-confound transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-relaxed text-subtle">{note}</p>
    </div>
  )
}

export function ConfounderBars({ result }: { result: AssessmentResult }) {
  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-[17px] font-semibold tracking-tight">可能的混淆因素</h2>
      <p className="mt-1 text-[12.5px] text-subtle">
        这些因素越强，越需要谨慎解释 ADHD / ASD 信号。
      </p>
      <div className="mt-5 flex flex-col gap-5">
        {result.confounders.length === 0 ? (
          <p className="text-[13px] text-subtle">未报告明显的混淆因素。</p>
        ) : (
          result.confounders.map((c) => (
            <Bar key={c.id} label={c.label} level={c.level} note={c.note} />
          ))
        )}
      </div>
    </div>
  )
}
