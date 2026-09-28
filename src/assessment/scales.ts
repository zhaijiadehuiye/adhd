import type { Option, Period } from './types'

/* Frequency scale — used for most trait items (avoids repetitive agree/disagree) */
export const FREQ_OPTIONS: Option[] = [
  { label: '从不', value: 0 },
  { label: '偶尔', value: 0.25 },
  { label: '有时', value: 0.5 },
  { label: '经常', value: 0.75 },
  { label: '几乎总是', value: 1 },
]

/* Agreement scale — used sparingly */
export const AGREE_OPTIONS: Option[] = [
  { label: '很不符合', value: 0 },
  { label: '较不符合', value: 0.25 },
  { label: '一般', value: 0.5 },
  { label: '比较符合', value: 0.75 },
  { label: '非常符合', value: 1 },
]

/* Canonical life periods for the developmental timeline */
export const LIFE_PERIODS: Period[] = [
  { id: 'preschool', label: '小学以前', short: '学龄前', order: 0 },
  { id: 'primary', label: '小学', short: '小学', order: 1 },
  { id: 'junior', label: '初中', short: '初中', order: 2 },
  { id: 'high', label: '高中', short: '高中', order: 3 },
  { id: 'earlyAdult', label: '18–22 岁', short: '成年初', order: 4 },
  { id: 'recentYears', label: '最近几年', short: '近几年', order: 5 },
  { id: 'last6m', label: '最近 6 个月', short: '近半年', order: 6 },
]

export const NEVER_PERIOD: Period = {
  id: 'never',
  label: '从未 / 没有这种感觉',
  short: '从未',
  order: 99,
}

export const TIMELINE_PERIODS: Period[] = [...LIFE_PERIODS, NEVER_PERIOD]

export const PERIOD_MAP: Record<string, Period> = TIMELINE_PERIODS.reduce(
  (acc, p) => {
    acc[p.id] = p
    return acc
  },
  {} as Record<string, Period>,
)

/** Period ids considered "childhood" (before age 12) */
export const CHILDHOOD_PERIODS = ['preschool', 'primary']
/** Period ids considered adolescence or earlier (before adulthood) */
export const DEVELOPMENTAL_PERIODS = ['preschool', 'primary', 'junior', 'high']
export const RECENT_PERIODS = ['recentYears', 'last6m']
