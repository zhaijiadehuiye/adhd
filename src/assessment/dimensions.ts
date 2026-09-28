import type { DimensionId } from './types'

export interface DimensionMeta {
  id: DimensionId
  /** Chinese label */
  label: string
  /** short English label used on the share card */
  en: string
  /** one-line plain-language description */
  description: string
  /** radar / chart color */
  color: string
}

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: 'attention',
    label: '注意力维持',
    en: 'Attention',
    description: '维持专注、抗干扰、在枯燥任务上保持注意力的困难程度。',
    color: '#3573d8',
  },
  {
    id: 'executive',
    label: '执行功能',
    en: 'Executive Function',
    description: '任务启动、组织规划、时间感、工作记忆与把事情做完的能力。',
    color: '#0d8f80',
  },
  {
    id: 'impulsivity',
    label: '冲动 / 活动水平',
    en: 'Impulsivity & Activity',
    description: '打断、冲动决定、等待困难，以及坐立不安、需要不停活动。',
    color: '#5b6ee0',
  },
  {
    id: 'socialCommunication',
    label: '社交沟通',
    en: 'Social Communication',
    description: '对话节奏、表达与理解、寒暄、眼神与非言语交流。',
    color: '#c9822b',
  },
  {
    id: 'socialIntuition',
    label: '社交直觉',
    en: 'Social Intuition',
    description: '读懂暗示、潜台词、他人情绪，以及在多人场合中把握规则。',
    color: '#d9a03c',
  },
  {
    id: 'routine',
    label: '固定模式',
    en: 'Routine & Patterns',
    description: '对惯例、可预测性的需要，变化带来的不适，以及高度专注的兴趣。',
    color: '#7d72c8',
  },
  {
    id: 'sensory',
    label: '感官敏感',
    en: 'Sensory Processing',
    description: '对声音、灯光、衣物触感、气味、拥挤等环境刺激的敏感程度。',
    color: '#4a9d8e',
  },
  {
    id: 'emotional',
    label: '情绪 / 压力负荷',
    en: 'Emotional & Stress',
    description: '长期压力、焦虑、情绪波动与情绪调节的负担。',
    color: '#c46b8e',
  },
  {
    id: 'sleep',
    label: '睡眠与节律',
    en: 'Sleep & Rhythm',
    description: '睡眠时长与质量、作息规律性、生理节律紊乱。',
    color: '#5b8ac4',
  },
  {
    id: 'connection',
    label: '社会连接',
    en: 'Social Connection',
    description: '孤独感、现实社交频率、长期独处与生活结构的缺失。',
    color: '#6b9e8a',
  },
  {
    id: 'impairment',
    label: '功能损害',
    en: 'Functional Impairment',
    description: '这些困难在学习、工作、关系、生活管理等领域造成的实际影响。',
    color: '#bd6565',
  },
]

export const DIMENSION_MAP: Record<DimensionId, DimensionMeta> = DIMENSIONS.reduce(
  (acc, d) => {
    acc[d.id] = d
    return acc
  },
  {} as Record<DimensionId, DimensionMeta>,
)

/** Radar order: the 10 trait dimensions, with impairment rendered separately */
export const RADAR_DIMENSIONS = DIMENSIONS
