import type { AlternativeResult, AssessmentResult } from '@/assessment/types'
import { SIGNAL_LABELS } from '@/assessment/explanations'

function AlternativeItem({ alt }: { alt: AlternativeResult }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[14.5px] font-semibold">{alt.label}</h3>
        <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-0.5 text-[11.5px] text-muted">
          信号 · {SIGNAL_LABELS[alt.level]}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{alt.why}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {alt.effects.map((e) => (
          <span
            key={e}
            className="rounded-full border border-line bg-surface-2/60 px-2.5 py-1 text-[11.5px] text-muted"
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  )
}

export function AlternativesCard({ result }: { result: AssessmentResult }) {
  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-[17px] font-semibold tracking-tight">
        如果不是 ADHD / ASD 呢？
      </h2>
      <p className="mt-1 text-[12.5px] text-subtle">
        以下解释根据你的回答动态生成。它们不是诊断，而是值得优先排查的方向。
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {result.alternatives.length === 0 ? (
          <p className="text-[13px] text-subtle">
            你的回答没有指向明显的替代因素；若状态随时间变化，可以随时复测。
          </p>
        ) : (
          result.alternatives.map((alt) => (
            <AlternativeItem key={alt.id} alt={alt} />
          ))
        )}
      </div>
    </div>
  )
}
