import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { buildPath } from '@/assessment/engine'
import { getQuestion } from '@/assessment/questions'
import { useAssessmentStore } from '@/store/useAssessmentStore'
import { ProgressHeader } from '@/components/assessment/ProgressHeader'
import { QuestionRenderer } from '@/components/assessment/QuestionRenderer'

export default function AssessmentPage() {
  const navigate = useNavigate()
  const answers = useAssessmentStore((s) => s.answers)
  const currentIndex = useAssessmentStore((s) => s.currentIndex)
  const setAnswer = useAssessmentStore((s) => s.setAnswer)
  const setIndex = useAssessmentStore((s) => s.setIndex)
  const goBack = useAssessmentStore((s) => s.goBack)
  const markCompleted = useAssessmentStore((s) => s.markCompleted)

  const path = useMemo(() => buildPath(answers), [answers])

  // Finished all questions → results.
  useEffect(() => {
    if (path.length > 0 && currentIndex >= path.length) {
      markCompleted()
      navigate('/results')
    }
  }, [currentIndex, path.length, navigate, markCompleted])

  // Clamp index if an earlier answer removed conditional items.
  useEffect(() => {
    if (path.length > 0 && currentIndex > path.length - 1) {
      setIndex(path.length - 1)
    }
  }, [path.length, currentIndex, setIndex])

  const itemId = path[currentIndex]

  /* Keyboard: digits click the matching data-index option; Enter continues. */
  useEffect(() => {
    if (!itemId) return
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && ['TEXTAREA', 'INPUT'].includes(el.tagName)) return

      if (/^[1-9]$/.test(e.key)) {
        const i = Number(e.key) - 1
        const btn = document.querySelector<HTMLButtonElement>(
          `[data-question="${itemId}"] [data-index="${i}"]`,
        )
        if (btn) {
          e.preventDefault()
          btn.click()
        }
      } else if (e.key === 'Enter') {
        const btn = document.querySelector<HTMLButtonElement>(
          `[data-question="${itemId}"] [data-action="continue"]`,
        )
        if (btn && !btn.disabled) {
          e.preventDefault()
          btn.click()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [itemId])

  if (!itemId) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-muted">正在准备你的测评……</p>
      </div>
    )
  }

  const item = getQuestion(itemId)
  const advance = () => setIndex(currentIndex + 1)

  return (
    <div className="pb-10">
      <ProgressHeader stage={item.stage} index={currentIndex} total={path.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={itemId}
          data-question={itemId}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-2xl px-4 sm:px-6"
        >
          <h2 className="mt-8 text-balance text-[23px] font-semibold leading-snug tracking-tight sm:text-[27px]">
            {item.prompt}
          </h2>
          {item.subtitle && (
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
              {item.subtitle}
            </p>
          )}

          <QuestionRenderer
            item={item}
            value={answers[itemId]}
            setAnswer={setAnswer}
            advance={advance}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom nav: back / save & exit */}
      <div className="mx-auto mt-10 flex w-full max-w-2xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] text-muted transition enabled:hover:text-ink disabled:opacity-35"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M19 12H5M11 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          返回上一题
        </button>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] text-muted transition hover:text-ink"
        >
          暂存并退出
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M14 6l6 6-6 6M20 12H8M12 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
