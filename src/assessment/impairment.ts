/* Functional impairment domains — shared by the grid UI and the report */

export interface ImpairmentDomain {
  id: string
  label: string
}

export const IMPAIRMENT_DOMAINS: ImpairmentDomain[] = [
  { id: 'study', label: '学习 / 学业' },
  { id: 'work', label: '工作 / 职业' },
  { id: 'daily', label: '日常生活（做饭、采购、办事）' },
  { id: 'finance', label: '财务管理' },
  { id: 'health', label: '健康习惯（运动、就医、服药）' },
  { id: 'relationships', label: '亲密 / 家庭关系' },
  { id: 'social', label: '社交生活' },
  { id: 'household', label: '家务与居住环境' },
]

/* Per-domain response options for the grid (frequency of impairment) */
export const IMPAIRMENT_LEVELS = [
  { label: '没有困扰', value: 0 },
  { label: '轻微', value: 0.25 },
  { label: '中等', value: 0.5 },
  { label: '明显', value: 0.75 },
  { label: '严重困扰', value: 1 },
]
