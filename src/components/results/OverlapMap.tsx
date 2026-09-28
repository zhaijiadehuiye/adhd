import type { AssessmentResult, SignalLevel } from '@/assessment/types'
import { SIGNAL_LABELS } from '@/assessment/explanations'

function levelWeight(level: SignalLevel): number {
  switch (level) {
    case 'high':
      return 1
    case 'moderate':
      return 0.78
    case 'slight':
      return 0.55
    case 'none':
      return 0.34
    case 'unknown':
      return 0.34
  }
}

export function OverlapMap({ result }: { result: AssessmentResult }) {
  const wA = levelWeight(result.signals.adhd)
  const wB = levelWeight(result.signals.asd)
  const rA = 62 + wA * 34
  const rB = 62 + wB * 34

  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-[17px] font-semibold tracking-tight">Overlap Map · 特征重叠</h2>
      <p className="mt-1 text-[12.5px] text-subtle">
        圆的大小代表特征信号强度；两类特征可以同时存在。这不是“患病概率”。
      </p>

      <div className="mt-2 flex justify-center">
        <svg viewBox="0 0 360 230" className="h-[230px] w-full max-w-[420px]" role="img"
          aria-label="ADHD 特征与自闭谱系特征重叠图">
          <circle
            cx={150 - (wB - wA) * 10}
            cy={118}
            r={rA}
            fill="var(--adhd)"
            fillOpacity={0.16}
            stroke="var(--adhd)"
            strokeWidth={2}
          />
          <circle
            cx={212 - (wB - wA) * 10}
            cy={118}
            r={rB}
            fill="var(--asd)"
            fillOpacity={0.16}
            stroke="var(--asd)"
            strokeWidth={2}
          />
          <text x={108} y={112} textAnchor="middle" fontSize="12.5" fill="var(--muted)">
            ADHD 特征
          </text>
          <text x={108} y={132} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--ink)">
            {SIGNAL_LABELS[result.signals.adhd]}
          </text>
          <text x={256} y={112} textAnchor="middle" fontSize="12.5" fill="var(--muted)">
            Autistic 特征
          </text>
          <text x={256} y={132} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--ink)">
            {SIGNAL_LABELS[result.signals.asd]}
          </text>
          <text x={182} y={168} textAnchor="middle" fontSize="11" fill="var(--subtle)">
            重叠区
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface-2 px-4 py-3 text-center">
          <p className="text-[12px] text-muted">功能损害指数</p>
          <p className="mt-0.5 text-[20px] font-semibold">
            {result.dimensionScores.impairment}
            <span className="text-[12px] font-normal text-subtle">/100</span>
          </p>
        </div>
        <div className="rounded-xl bg-surface-2 px-4 py-3 text-center">
          <p className="text-[12px] text-muted">检出的替代解释</p>
          <p className="mt-0.5 text-[20px] font-semibold">{result.alternatives.length} 项</p>
        </div>
      </div>
    </div>
  )
}
