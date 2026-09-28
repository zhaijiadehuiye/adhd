import type { EvidenceItem, HypothesisResult } from '@/assessment/types'

function CheckIcon() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--positive-soft)] text-positive" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function MinusIcon() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--confound-soft)] text-confound" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function UnknownIcon() {
  return <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-subtle" aria-hidden />
}

function EvidenceList({
  items,
  icon,
  empty,
}: {
  items: EvidenceItem[]
  icon: React.ReactNode
  empty: string
}) {
  if (items.length === 0) {
    return <p className="pl-[26px] text-[12.5px] text-subtle">{empty}</p>
  }
  return (
    <ul className="flex flex-col gap-2">
      {items.map((e, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
          {icon}
          <span>{e.text}</span>
        </li>
      ))}
    </ul>
  )
}

function HypothesisCard({ h, name }: { h: HypothesisResult; name: string }) {
  return (
    <div className="card p-5 sm:p-7">
      <h2 className="text-[17px] font-semibold tracking-tight">
        为什么得到这个结果？· {name}
      </h2>

      <div className="mt-5">
        <p className="mb-2 text-[12.5px] font-medium text-positive">
          最支持 {name} 解释的信息
        </p>
        <EvidenceList
          items={h.supporting.slice(0, 6)}
          icon={<CheckIcon />}
          empty="目前没有明显支持这一解释的信息。"
        />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[12.5px] font-medium text-confound">
          目前不太支持 {name} 的信息
        </p>
        <EvidenceList
          items={h.contradicting.slice(0, 6)}
          icon={<MinusIcon />}
          empty="目前没有明显反驳这一解释的信息。"
        />
      </div>

      {h.unknown.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-[12.5px] font-medium text-subtle">还不确定的部分</p>
          <EvidenceList items={h.unknown} icon={<UnknownIcon />} empty="" />
        </div>
      )}
    </div>
  )
}

export function EvidenceSection({ result }: { result: import('@/assessment/types').AssessmentResult }) {
  return (
    <div className="flex flex-col gap-5">
      <HypothesisCard h={result.hypotheses.adhd} name="ADHD" />
      <HypothesisCard h={result.hypotheses.asd} name="ASD" />
    </div>
  )
}
