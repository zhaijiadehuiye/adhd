import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildPath } from '@/assessment/engine'
import { evaluateEvidence } from '@/assessment/rules'
import { useAssessmentStore } from '@/store/useAssessmentStore'
import { RadarMap } from '@/components/results/RadarMap'
import { SignalOverview } from '@/components/results/SignalOverview'
import { OverlapMap } from '@/components/results/OverlapMap'
import { EvidenceSection } from '@/components/results/EvidenceSection'
import { ConfounderBars } from '@/components/results/ConfounderBars'
import { SymptomTimelineViz } from '@/components/results/SymptomTimelineViz'
import { AlternativesCard } from '@/components/results/AlternativesCard'
import { NextSteps } from '@/components/results/NextSteps'
import { ReportModal } from '@/components/results/ReportModal'
import { ShareModal } from '@/components/results/ShareModal'

function Interstitial({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-[22px] font-semibold tracking-tight">{title}</h1>
      <div className="mt-3 text-[14px] leading-relaxed text-muted">{children}</div>
    </div>
  )
}

export default function ResultsPage() {
  const answers = useAssessmentStore((s) => s.answers)
  const reset = useAssessmentStore((s) => s.reset)
  const [reportOpen, setReportOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const path = useMemo(() => buildPath(answers), [answers])
  const answeredOnPath = path.filter((id) => answers[id] !== undefined).length
  const complete = path.length > 0 && answeredOnPath === path.length
  const result = useMemo(() => evaluateEvidence(answers), [answers])

  if (Object.keys(answers).length === 0) {
    return (
      <Interstitial title="还没有可显示的 Neuro Map">
        <p>完成一次筛查后，你的完整分析会出现在这里。</p>
        <Link
          to="/assessment"
          className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-[14px] font-medium text-white transition hover:bg-brand-strong"
        >
          开始我的神经特征地图
        </Link>
      </Interstitial>
    )
  }

  if (!complete) {
    const pct = Math.round((answeredOnPath / path.length) * 100)
    return (
      <Interstitial title="测评尚未完成">
        <p>
          你已完成约 {pct}%（{answeredOnPath} / {path.length} 题）。完成后才能生成可靠的 Neuro Map。
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/assessment"
            className="inline-flex rounded-full bg-brand px-6 py-3 text-[14px] font-medium text-white transition hover:bg-brand-strong"
          >
            继续测评
          </Link>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-line px-6 py-3 text-[14px] text-muted transition hover:text-confound"
          >
            重新开始
          </button>
        </div>
      </Interstitial>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight sm:text-[30px]">
            你的 Neuro Map
          </h1>
          <p className="mt-1 text-[12.5px] text-subtle">
            生成于 {new Date(result.generatedAt).toLocaleString('zh-CN', { hour12: false })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setReportOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[12.5px] font-medium transition hover:border-line-strong"
          >
            生成评估摘要
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[12.5px] font-medium transition hover:border-line-strong"
          >
            分享卡
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-line px-4 py-2 text-[12.5px] text-muted transition hover:text-confound"
          >
            重新测试
          </button>
        </div>
      </div>

      {/* Outcome */}
      <div className="mt-6 rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-brand">
          Screening overview
        </p>
        <h2 className="mt-2 text-[20px] font-semibold leading-snug tracking-tight sm:text-[23px]">
          {result.outcomeHeadline}
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          {result.outcomeSummary}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <RadarMap result={result} />
        <SignalOverview result={result} />
        <OverlapMap result={result} />
        <EvidenceSection result={result} />
        <ConfounderBars result={result} />
        <SymptomTimelineViz result={result} />
        <AlternativesCard result={result} />
        <NextSteps result={result} />
      </div>

      <p className="mt-8 text-center text-[12px] leading-relaxed text-subtle">
        NeuroScope 是自我了解与初步筛查工具，结果不构成诊断。
        如你正在经历危机或有伤害自己的想法，请立即联系当地紧急服务或前往急诊。
      </p>

      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        answers={answers}
      />
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        result={result}
      />
    </div>
  )
}
