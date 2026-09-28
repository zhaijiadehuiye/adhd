/* ------------------------------------------------------------------
   NeuroScope — core domain types
   All assessment logic is framework-agnostic and lives in this folder.
------------------------------------------------------------------- */

export type DimensionId =
  | 'attention'
  | 'executive'
  | 'impulsivity'
  | 'socialCommunication'
  | 'socialIntuition'
  | 'routine'
  | 'sensory'
  | 'emotional'
  | 'sleep'
  | 'connection'
  | 'impairment'

export type ItemType =
  | 'frequency'
  | 'agreement'
  | 'scenario'
  | 'timeline'
  | 'multi'
  | 'slider'
  | 'choice'
  | 'text'
  | 'impairmentGrid'

export type StageId =
  | 'broad'
  | 'timeline'
  | 'deep'
  | 'confound'
  | 'impairment'
  | 'closing'

export type AnswerValue = number | string | string[] | Record<string, number>
export type AnswerMap = Record<string, AnswerValue>

export type SignalLevel = 'none' | 'slight' | 'moderate' | 'high' | 'unknown'

export interface ScoredDimension {
  dim: DimensionId
  weight?: number
}

export interface Option {
  label: string
  value: number // 0..1, ordered from least to most
  hint?: string
}

export interface Choice {
  label: string
  value: string
  hint?: string
}

export interface MultiOption {
  label: string
  value: string
  /** contribution 0..1 when selected (default 1) */
  weight?: number
}

export interface SliderSpec {
  min: number
  max: number
  step?: number
  /** initial (default) raw value — used when the user never touches it */
  initial?: number
  minLabel: string
  maxLabel: string
  unit?: string
  /** map raw slider value to 0..1 difficulty score */
  scoreMap?: (value: number) => number
}

export interface Period {
  id: string
  label: string
  short: string
  /** chronological order index, smaller = earlier */
  order: number
}

export interface Item {
  id: string
  stage: StageId
  /** which adaptive module this item belongs to (deep / confound stages) */
  moduleId?: string
  type: ItemType
  /** primary scored dimension */
  dim?: DimensionId
  /** multi-dimension scoring (takes precedence over `dim`) */
  dims?: ScoredDimension[]
  prompt: string
  subtitle?: string
  /** frequency / agreement options, ordered low → high */
  options?: Option[]
  /** scenario cards, ordered low → high */
  cards?: Option[]
  /** timeline periods override (defaults to canonical life periods) */
  periods?: Period[]
  /** single-choice options */
  choices?: Choice[]
  /** multi-select options */
  multiOptions?: MultiOption[]
  multiMin?: number
  /** value of a "none of the above" option that deselects others */
  noneValue?: string
  slider?: SliderSpec
  /** text input is optional and never required to proceed */
  optional?: boolean
}

/* ---------------- Adaptive engine ---------------- */

export interface EngineContext {
  answers: AnswerMap
  /** normalized 0..1 score for an item, or null when unanswered / not scored */
  itemScore: (id: string) => number | null
  /** raw answer for an item */
  answer: (id: string) => AnswerValue | undefined
  /** mean 0..1 score for a dimension over answered items */
  dimPreview: (dim: DimensionId) => number
  /** number of answered items that score a dimension */
  dimItemCount: (dim: DimensionId) => number
  isAnswered: (id: string) => boolean
}

export interface AssessmentModule {
  id: string
  stage: StageId
  title: string
  trigger: (ctx: EngineContext) => boolean
  items: string[]
}

/* ---------------- Evidence engine ---------------- */

export type HypothesisId = 'adhd' | 'asd'

export interface EvidenceItem {
  text: string
  /** importance 0..1 (used for ordering / display) */
  weight?: number
}

export interface HypothesisResult {
  id: HypothesisId
  label: string
  level: SignalLevel
  supporting: EvidenceItem[]
  contradicting: EvidenceItem[]
  unknown: EvidenceItem[]
}

export interface ConfounderResult {
  id: string
  label: string
  /** strength 0..1 */
  level: number
  note: string
}

export interface AlternativeResult {
  id: string
  label: string
  level: SignalLevel
  why: string
  effects: string[]
}

export interface TimelineMark {
  categoryId: string
  categoryLabel: string
  /** period id where this first appeared; null = never / not noticed */
  periodId: string | null
}

export type OutcomeKind =
  | 'adhd'
  | 'asd'
  | 'dual'
  | 'neither'
  | 'insufficient'
  | 'contextual'

export interface AssessmentResult {
  dimensionScores: Record<DimensionId, number>
  signals: {
    adhd: SignalLevel
    asd: SignalLevel
    sleep: SignalLevel
    loneliness: SignalLevel
    impairment: SignalLevel
    completeness: SignalLevel
  }
  hypotheses: Record<HypothesisId, HypothesisResult>
  confounders: ConfounderResult[]
  alternatives: AlternativeResult[]
  timeline: TimelineMark[]
  outcome: OutcomeKind
  outcomeHeadline: string
  outcomeSummary: string
  actionLevel: 1 | 2 | 3
  evidenceCompleteness: number
  generatedAt: string
  schemaVersion: number
}
