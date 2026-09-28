import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnswerMap, AnswerValue } from '@/assessment/types'
import { buildPath } from '@/assessment/engine'

const STORAGE_KEY = 'neuroscope-assessment-v1'

interface AssessmentState {
  version: number
  answers: AnswerMap
  /** index within the adaptive path */
  currentIndex: number
  startedAt: string | null
  completedAt: string | null

  setAnswer: (id: string, value: AnswerValue) => void
  setIndex: (index: number) => void
  goBack: () => void
  markCompleted: () => void
  reset: () => void
  hydratePath: () => string[]
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      version: 1,
      answers: {},
      currentIndex: 0,
      startedAt: null,
      completedAt: null,

      setAnswer: (id, value) =>
        set((state) => ({
          answers: { ...state.answers, [id]: value },
          startedAt: state.startedAt ?? new Date().toISOString(),
        })),

      setIndex: (index) => set({ currentIndex: Math.max(0, index) }),

      goBack: () => set((state) => ({ currentIndex: Math.max(0, state.currentIndex - 1) })),

      markCompleted: () => set({ completedAt: new Date().toISOString() }),

      reset: () =>
        set({
          answers: {},
          currentIndex: 0,
          startedAt: null,
          completedAt: null,
        }),

      hydratePath: () => buildPath(get().answers),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      partialize: (state) => ({
        version: state.version,
        answers: state.answers,
        currentIndex: state.currentIndex,
        startedAt: state.startedAt,
        completedAt: state.completedAt,
      }),
    },
  ),
)

/** Convenience selector: current adaptive path derived from answers. */
export function selectPath(state: AssessmentState): string[] {
  return buildPath(state.answers)
}
