import type { AssessmentResult } from '@/assessment/types'
import { ACTION_LEVELS } from '@/assessment/explanations'

export function NextSteps({ result }: { result: AssessmentResult }) {
  const level = ACTION_LEVELS[result.actionLevel]

  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-[17px] font-semibold tracking-tight">下一步行动</h2>
      <div className="mt-4 rounded-2xl bg-[var(--brand-soft)] px-5 py-4">
        <p className="text-[14.5px] font-semibold text-brand-ink">{level.title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{level.lead}</p>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {level.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[13.5px] leading-relaxed">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[12px] leading-relaxed text-subtle">
        本工具不会推荐任何处方药物；药物相关问题请与医生讨论。
      </p>
    </div>
  )
}
