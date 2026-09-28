import { useEffect, useMemo } from 'react'
import { Modal } from '@/components/ui/Modal'
import { buildReport } from '@/assessment/report'
import type { AnswerMap } from '@/assessment/types'

interface Props {
  open: boolean
  onClose: () => void
  answers: AnswerMap
}

export function ReportModal({ open, onClose, answers }: Props) {
  const report = useMemo(() => buildReport(answers), [answers])

  useEffect(() => {
    document.body.classList.toggle('reporting-print', open)
    return () => document.body.classList.remove('reporting-print')
  }, [open])

  const handlePrint = () => window.print()

  return (
    <Modal open={open} onClose={onClose} title="评估摘要（供专业人员参考）">
      <div id="print-root" className="px-5 py-6 sm:px-8">
        <p className="text-[12.5px] leading-relaxed text-subtle">
          本摘要由你在 NeuroScope 的回答自动整理，用于提高面诊效率，
          <span className="text-muted">不是诊断书，也不替代临床评估。</span>
        </p>

        {report.sections.map((section) => (
          <section key={section.title} className="mt-6 break-inside-avoid">
            <h3 className="text-[14.5px] font-semibold tracking-tight">
              {section.title}
            </h3>
            <dl className="mt-2.5 flex flex-col gap-2">
              {section.rows.map((row, i) => (
                <div
                  key={`${row.label}-${i}`}
                  className="grid grid-cols-[110px_1fr] gap-3 text-[13px] leading-relaxed"
                >
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <p className="mt-8 text-[11.5px] text-subtle">
          生成时间：{new Date(report.generatedAt).toLocaleString('zh-CN')}
        </p>
      </div>

      <div className="no-print sticky bottom-0 flex items-center justify-end gap-3 border-t border-line bg-surface px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-line px-5 py-2.5 text-[13px] text-muted transition hover:text-ink"
        >
          关闭
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-brand-strong"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7v-6Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
          Print / Save as PDF
        </button>
      </div>
    </Modal>
  )
}
