import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import { useEffect, useState } from 'react'
import { DIMENSIONS } from '@/assessment/dimensions'
import type { AssessmentResult } from '@/assessment/types'

function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    typeof window !==undefined && window.innerWidth < 480,
  )
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 480)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return narrow
}

export function RadarMap({ result }: { result: AssessmentResult }) {
  const narrow = useIsNarrow()
  const data = DIMENSIONS.map((d) => ({
    label: d.label,
    value: result.dimensionScores[d.id],
  }))

  return (
    <div className="card p-5 sm:p-7">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[17px] font-semibold tracking-tight">维度雷达</h2>
        <p className="text-[12px] text-subtle">0–100 维度指数</p>
      </div>

      <div className="mt-2 h-[320px] w-full sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius={narrow ? '56%' : '70%'}>
            <PolarGrid stroke="var(--line-strong)" />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fill: 'var(--muted)', fontSize: 11.5 }}
            />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              stroke="var(--brand)"
              fill="var(--brand)"
              fillOpacity={0.22}
              strokeWidth={2}
              isAnimationActive
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="rounded-xl bg-surface-2 px-4 py-3 text-[12.5px] leading-relaxed text-muted">
        例如 <span className="font-medium text-ink">82/100</span> 表示你在本次问卷中报告了较多这一维度的困难，
        <span className="font-medium text-ink">并不代表 82% 的患病概率</span>。它是“维度指数”，不是诊断指标。
      </p>
    </div>
  )
}
