import type { AnswerMap, AnswerValue } from './types'
import { getQuestion } from './questions'
import { PERIOD_MAP } from './scales'
import { IMPAIRMENT_DOMAINS, IMPAIRMENT_LEVELS } from './impairment'
import { evaluateEvidence } from './rules'
import { SIGNAL_LABELS } from './explanations'

/* ==================================================================
   Professional report builder — turns answers into a clinician-style
   intake summary. Rendered to print / Save as PDF, entirely offline.
================================================================== */

export interface ReportRow {
  label: string
  value: string
}
export interface ReportSection {
  title: string
  rows: ReportRow[]
}
export interface ProfessionalReport {
  generatedAt: string
  sections: ReportSection[]
}

function asList(value: AnswerValue | undefined): string[] {
  return Array.isArray(value) ? value : []
}

function multiLabels(answers: AnswerMap, id: string): string[] {
  const item = getQuestion(id)
  const selected = asList(answers[id])
  return (item.multiOptions ?? [])
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label)
}

function choiceLabel(answers: AnswerMap, id: string): string {
  const item = getQuestion(id)
  const v = answers[id]
  if (typeof v !== 'string') return '未回答'
  return item.choices?.find((c) => c.value === v)?.label ?? v
}

function periodLabel(value: AnswerValue | undefined): string {
  if (typeof value !== 'string' || value === 'never') return '没有 / 未注意到'
  return PERIOD_MAP[value]?.label ?? value
}

function joinLabels(labels: string[]): string {
  return labels.length ? labels.join('；') : '未报告'
}

export function buildReport(answers: AnswerMap): ProfessionalReport {
  const result = evaluateEvidence(answers)
  const ownWords =
    typeof answers.g_ownwords === 'string' && answers.g_ownwords.trim()
      ? answers.g_ownwords.trim()
      : '（未填写）'

  const grid = (answers.i_grid ?? {}) as Record<string, number>

  const sections: ReportSection[] = [
    {
      title: '1. 基本情况',
      rows: [
        { label: '年龄段', value: choiceLabel(answers, 'g_age') },
        {
          label: '测评完成时间',
          value: new Date(result.generatedAt).toLocaleString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      ],
    },
    {
      title: '2. 主要困扰（本人描述）',
      rows: [
        { label: '自述', value: ownWords },
        {
          label: '最希望解决',
          value: joinLabels(multiLabels(answers, 'g_priority')),
        },
      ],
    },
    {
      title: '3. 首次出现时间',
      rows: [
        {
          label: '注意力 / 执行功能困难',
          value: periodLabel(answers.t_attn_start),
        },
        {
          label: '他人评价粗心、坐不住、忘事',
          value: periodLabel(answers.t_others),
        },
        { label: '社交困惑', value: periodLabel(answers.t_social_start) },
        { label: '睡眠 / 作息问题', value: periodLabel(answers.t_sleep_start) },
        {
          label: '功能开始受拖累',
          value: periodLabel(answers.t_function_decline),
        },
      ],
    },
    {
      title: '4. 儿童期表现（约 12 岁前）',
      rows: [
        {
          label: '回忆中的表现',
          value: joinLabels(multiLabels(answers, 't_child_patterns')),
        },
      ],
    },
    {
      title: '5. ADHD 相关表现',
      rows: [
        {
          label: '筛查信号',
          value: SIGNAL_LABELS[result.signals.adhd] ?? '证据不足',
        },
        {
          label: '支持信息',
          value:
            result.hypotheses.adhd.supporting
              .slice(0, 5)
              .map((e) => e.text)
              .join('；') || '无',
        },
        {
          label: '不支持的信息',
          value:
            result.hypotheses.adhd.contradicting
              .slice(0, 4)
              .map((e) => e.text)
              .join('；') || '无',
        },
      ],
    },
    {
      title: '6. 自闭谱系相关表现',
      rows: [
        {
          label: '筛查信号',
          value: SIGNAL_LABELS[result.signals.asd] ?? '证据不足',
        },
        {
          label: '支持信息',
          value:
            result.hypotheses.asd.supporting
              .slice(0, 5)
              .map((e) => e.text)
              .join('；') || '无',
        },
        {
          label: '不支持的信息',
          value:
            result.hypotheses.asd.contradicting
              .slice(0, 4)
              .map((e) => e.text)
              .join('；') || '无',
        },
      ],
    },
    {
      title: '7. 感官特点',
      rows: [
        {
          label: '会造成不适的感官体验',
          value: joinLabels(multiLabels(answers, 'd_asd_food')),
        },
      ],
    },
    {
      title: '8. 睡眠与精力',
      rows: [
        {
          label: '平均睡眠',
          value:
            typeof answers.b_sleep_hours === 'number'
              ? `${answers.b_sleep_hours} 小时`
              : '未回答',
        },
        {
          label: '睡眠质量 / 节律',
          value: SIGNAL_LABELS[result.signals.sleep],
        },
      ],
    },
    {
      title: '9. 情绪 / 压力',
      rows: [
        {
          label: '压力、焦虑与低落',
          value:
            joinLabels(multiLabels(answers, 'c_lifeevents')) === '未报告'
              ? '未报告明显重大生活事件'
              : `近一年变化：${joinLabels(multiLabels(answers, 'c_lifeevents'))}`,
        },
      ],
    },
    {
      title: '10. 社会情况',
      rows: [
        { label: '可来往的人数', value: choiceLabel(answers, 'c_friends') },
        { label: '线下交往频率', value: choiceLabel(answers, 'c_contact') },
        {
          label: '孤独 / 隔离信号',
          value: SIGNAL_LABELS[result.signals.loneliness],
        },
      ],
    },
    {
      title: '11. 功能损害（各领域）',
      rows: IMPAIRMENT_DOMAINS.map((dom) => {
        const v = grid[dom.id]
        const level =
          v === undefined
            ? '未评定'
            : IMPAIRMENT_LEVELS.find((l) => l.value === v)?.label ?? String(v)
        return { label: dom.label, value: level }
      }),
    },
  ]

  return { generatedAt: result.generatedAt, sections }
}
