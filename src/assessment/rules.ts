import type {
  AlternativeResult,
  AnswerMap,
  AssessmentResult,
  ConfounderResult,
  EvidenceItem,
  HypothesisResult,
  OutcomeKind,
  SignalLevel,
} from './types'
import {
  CHILDHOOD_PERIODS,
  DEVELOPMENTAL_PERIODS,
  RECENT_PERIODS,
} from './scales'
import { createEngineContext } from './engine'
import { buildPath } from './engine'
import { dimensionScores, clamp01 } from './scoring'
import { buildTimeline } from './timeline'
import {
  ALTERNATIVE_META,
  CONFOUND_NOTES,
  OUTCOME_TEXT,
  levelFromScore,
} from './explanations'

/* ==================================================================
   Evidence Engine
   Each hypothesis accumulates supporting / contradicting / unknown
   evidence and confounders. There is no single cut-off score; the
   outcome is an explanation assembled from rule outputs.
================================================================== */

function multiSelected(answers: AnswerMap, id: string): string[] {
  const v = answers[id]
  return Array.isArray(v) ? v : []
}

function sortEvidence(items: EvidenceItem[]): EvidenceItem[] {
  return [...items].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
}

export function evaluateEvidence(answers: AnswerMap): AssessmentResult {
  const ctx = createEngineContext(answers)
  const d = ctx.dimPreview.bind(ctx)
  const s = ctx.itemScore.bind(ctx)

  /* ---------- Onset / developmental history ---------- */

  const attnOnset =
    typeof answers.t_attn_start === 'string' ? answers.t_attn_start : undefined
  const othersOnset =
    typeof answers.t_others === 'string' ? answers.t_others : undefined
  const socialOnset =
    typeof answers.t_social_start === 'string' ? answers.t_social_start : undefined

  const attnEarly = !!(attnOnset && CHILDHOOD_PERIODS.includes(attnOnset))
  const othersEarly = !!(othersOnset && CHILDHOOD_PERIODS.includes(othersOnset))
  const attnDevelopmental = !!(
    attnOnset && DEVELOPMENTAL_PERIODS.includes(attnOnset)
  )
  const socialDevelopmental = !!(
    socialOnset && DEVELOPMENTAL_PERIODS.includes(socialOnset)
  )
  const attnRecent = !!(attnOnset && RECENT_PERIODS.includes(attnOnset))
  const socialRecent = !!(socialOnset && RECENT_PERIODS.includes(socialOnset))

  const childhoodPatterns = multiSelected(answers, 't_child_patterns')
  const adhdChildFlags = childhoodPatterns.filter((v) =>
    ['hyper', 'careless'].includes(v),
  )
  const asdChildFlags = childhoodPatterns.filter((v) =>
    ['rigid', 'special', 'sensory', 'change'].includes(v),
  )

  const recentOnlyADHD =
    attnRecent && !attnDevelopmental && adhdChildFlags.length === 0
  const recentOnlyASD =
    socialRecent && !socialDevelopmental && asdChildFlags.length === 0

  /* ---------- Settings / trait composites ---------- */

  const settings = multiSelected(answers, 'b_settings')
  const settingsCount = settings.filter((v) =>
    ['school', 'work', 'home', 'social'].includes(v),
  ).length
  const multiSetting =
    settings.includes('everywhere') || settingsCount >= 3

  const adhdTraits =
    (d('attention') + d('executive') + d('impulsivity')) / 3
  const asdTraits =
    (d('socialCommunication') +
      d('socialIntuition') +
      d('routine') +
      d('sensory')) /
    4
  const impairment01 = d('impairment')

  /* ---------- Confound strengths ---------- */

  const sleepLevel = Math.max(d('sleep'), s('c_sleep_apnea') ?? 0)
  const stressLevel = d('emotional')
  const lonelinessLevel = d('connection')
  const structureLevel = s('b_structure') ?? 0
  const mediaLevel = Math.max(s('b_media') ?? 0, s('c_media_time') ?? 0)
  const lifeEventsLevel = s('c_lifeevents') ?? 0
  const healthLevel = s('c_health') ?? 0
  const moodLevel = Math.max(s('c_mood') ?? 0, s('c_burnout') ?? 0)

  /* =================================================================
     ADHD hypothesis
  ================================================================= */

  const adhdSupport: EvidenceItem[] = []
  const adhdContradict: EvidenceItem[] = []
  const adhdUnknown: EvidenceItem[] = []

  if (attnEarly) {
    adhdSupport.push({
      text: '注意力困难在儿童期（小学或更早）就已经出现。',
      weight: 0.95,
    })
  } else if (othersEarly) {
    adhdSupport.push({
      text: '家人或老师在你小时候就评价你粗心、坐不住、忘事。',
      weight: 0.9,
    })
  }
  if (adhdChildFlags.length >= 1) {
    adhdSupport.push({
      text: '童年回忆中存在上课难以静坐、粗心丢分、忘带东西或作业做不完等表现。',
      weight: 0.85,
    })
  }
  if (multiSetting) {
    adhdSupport.push({
      text: '注意力与执行功能困难跨越多个环境出现（学习、工作、家庭、社交）。',
      weight: 0.8,
    })
  }
  if (d('executive') >= 0.6) {
    adhdSupport.push({
      text: '任务启动、组织、时间感与“把事情做完”等执行功能环节报告了明显困难。',
      weight: 0.75,
    })
  }
  if (d('attention') >= 0.6) {
    adhdSupport.push({ text: '注意力维持困难的报告频率较高。', weight: 0.6 })
  }
  if (d('impulsivity') >= 0.55) {
    adhdSupport.push({
      text: '存在冲动决定、打断他人，或活动水平偏高、难以等待的表现。',
      weight: 0.5,
    })
  }
  if (impairment01 >= 0.4) {
    adhdSupport.push({
      text: '这些问题已经对学习、工作、关系或日常生活造成实际影响。',
      weight: 0.7,
    })
  }
  if (answers.g_good_before === 'always') {
    adhdSupport.push({
      text: '你报告这种状态从小持续至今，并非短期波动。',
      weight: 0.7,
    })
  }

  if (recentOnlyADHD) {
    adhdContradict.push({
      text: '明显的注意力困难主要在最近阶段出现，儿童期缺少对应表现。',
      weight: 0.95,
    })
  }
  if (answers.g_good_before === 'recent') {
    adhdContradict.push({
      text: '你曾有很长时间状态良好，报告最近一两年才明显变差。',
      weight: 0.8,
    })
  }
  if ((s('c_sleep_improves') ?? 0) >= 0.75) {
    adhdContradict.push({
      text: '注意力随睡眠好坏明显波动，连续几晚睡好后会显著改善。',
      weight: 0.7,
    })
  }
  if (stressLevel >= 0.65) {
    adhdContradict.push({
      text: '情绪与压力负荷很高，而焦虑本身就可以造成注意力不集中。',
      weight: 0.55,
    })
  }
  if (adhdTraits < 0.3) {
    adhdContradict.push({
      text: '注意力、执行功能与冲动维度整体报告的困难较少。',
      weight: 0.6,
    })
  }

  if (answers.g_good_before === 'unknown' || !attnOnset) {
    adhdUnknown.push({
      text: '发展史信息不够清晰，难以判断这些表现从何时开始。',
      weight: 0.6,
    })
  }
  if (settingsCount === 1 && !settings.includes('everywhere')) {
    adhdUnknown.push({
      text: '目前困难主要集中在单一环境，跨环境的证据有限。',
      weight: 0.45,
    })
  }

  /* =================================================================
     ASD hypothesis
  ================================================================= */

  const asdSupport: EvidenceItem[] = []
  const asdContradict: EvidenceItem[] = []
  const asdUnknown: EvidenceItem[] = []

  if (socialDevelopmental) {
    asdSupport.push({
      text: '社交困惑在发育期（高中或更早）就已经存在。',
      weight: 0.95,
    })
  }
  if (asdChildFlags.length >= 2) {
    asdSupport.push({
      text: '童年已出现固定习惯、强烈兴趣、感官敏感或抗拒变化等模式。',
      weight: 0.9,
    })
  } else if (asdChildFlags.length === 1) {
    asdSupport.push({
      text: '童年回忆中已出现部分固定模式或感官敏感的表现。',
      weight: 0.7,
    })
  }
  if (d('socialIntuition') >= 0.6) {
    asdSupport.push({
      text: '在暗示、潜台词与情绪判断等“社交直觉”环节报告明显困难。',
      weight: 0.75,
    })
  }
  if (d('socialCommunication') >= 0.55) {
    asdSupport.push({
      text: '对话节奏、寒暄、眼神等社交沟通环节存在持续困难。',
      weight: 0.65,
    })
  }
  if (d('routine') >= 0.6) {
    asdSupport.push({
      text: '对惯例与可预测性需要较强，计划改变会带来明显痛苦。',
      weight: 0.6,
    })
  }
  if (d('sensory') >= 0.6) {
    asdSupport.push({
      text: '多个感官通道报告敏感，或在刺激密集环境中出现“过载”。',
      weight: 0.6,
    })
  }
  if (
    answers.g_good_before === 'always' &&
    (d('socialCommunication') >= 0.45 || d('socialIntuition') >= 0.45)
  ) {
    asdSupport.push({
      text: '社交与感官模式长期稳定，而不是近期才出现。',
      weight: 0.6,
    })
  }
  if ((s('d_asd_mask') ?? 0) >= 0.75) {
    asdSupport.push({
      text: '需要长期刻意“伪装”社交表情与动作，事后精疲力尽。',
      weight: 0.5,
    })
  }

  if (recentOnlyASD) {
    asdContradict.push({
      text: '社交困难最近才出现，儿童期缺少长期模式的证据。',
      weight: 0.95,
    })
  }
  if (lonelinessLevel >= 0.6 && d('routine') < 0.4 && d('sensory') < 0.4) {
    asdContradict.push({
      text: '目前的社交退缩更多伴随孤独、低落出现，而非长期的社交认知差异。',
      weight: 0.7,
    })
  }
  if (d('routine') < 0.3 && d('sensory') < 0.3 && asdTraits >= 0.3) {
    asdContradict.push({
      text: '固定模式与感官敏感并不突出，而它们通常是谱系特征的重要组成部分。',
      weight: 0.55,
    })
  }
  if (asdTraits < 0.3) {
    asdContradict.push({
      text: '社交、固定模式与感官维度整体报告的困难较少。',
      weight: 0.6,
    })
  }

  if (answers.g_good_before === 'unknown' || !socialOnset) {
    asdUnknown.push({
      text: '早期社交发展史不够清晰，难以判断是否长期存在。',
      weight: 0.6,
    })
  }

  /* ---------- Signal levels ---------- */

  function adhdLevel(): SignalLevel {
    if (adhdTraits < 0.26) return 'none'
    const confoundStrong =
      Math.max(sleepLevel, stressLevel) >= 0.75 ||
      (sleepLevel + stressLevel) / 2 >= 0.6
    if (recentOnlyADHD && confoundStrong) return 'slight'
    return levelFromScore(adhdTraits)
  }

  function asdLevel(): SignalLevel {
    if (asdTraits < 0.26) return 'none'
    const confoundSocial =
      Math.max(lonelinessLevel, stressLevel) >= 0.75
    if (recentOnlyASD && confoundSocial) return 'slight'
    return levelFromScore(asdTraits)
  }

  const adhdSig = adhdLevel()
  const asdSig = asdLevel()

  /* ---------- Confounders ---------- */

  const confounderDefs: Array<{
    id: string
    label: string
    level: number
  }> = [
    { id: 'sleep', label: '睡眠不足 / 节律紊乱', level: sleepLevel },
    { id: 'stress', label: '长期压力 / 焦虑', level: stressLevel },
    { id: 'loneliness', label: '孤独 / 社会隔离', level: lonelinessLevel },
    { id: 'structure', label: '生活结构缺失', level: structureLevel },
    { id: 'media', label: '高刺激媒体', level: mediaLevel },
    { id: 'lifeevents', label: '重大生活变化', level: lifeEventsLevel },
    { id: 'health', label: '健康 / 药物因素', level: healthLevel },
  ]

  const confounders: ConfounderResult[] = confounderDefs
    .filter((c) => c.level >= 0.2)
    .map((c) => ({
      id: c.id,
      label: c.label,
      level: Math.round(c.level * 100) / 100,
      note: CONFOUND_NOTES[c.id] ?? '',
    }))
    .sort((a, b) => b.level - a.level)

  /* ---------- Alternatives ---------- */

  const alternativeDefs: Array<{ id: string; level: number }> = [
    { id: 'sleep', level: sleepLevel },
    { id: 'stress', level: stressLevel },
    { id: 'mood', level: moodLevel },
    { id: 'loneliness', level: lonelinessLevel },
    { id: 'structure', level: structureLevel },
    { id: 'media', level: mediaLevel },
    { id: 'lifeevents', level: lifeEventsLevel },
    { id: 'health', level: healthLevel },
  ]

  const alternatives: AlternativeResult[] = alternativeDefs
    .filter((c) => {
      if (c.id === 'lifeevents') return c.level >= 0.3
      if (c.id === 'health') return c.level >= 0.25
      return c.level >= 0.55
    })
    .map((c) => {
      const meta = ALTERNATIVE_META[c.id]
      return {
        id: c.id,
        label: meta.label,
        level: levelFromScore(c.level),
        why: meta.why,
        effects: meta.effects,
      }
    })

  /* ---------- Evidence completeness ---------- */

  const path = buildPath(answers)
  const answeredCount = path.filter((id) => answers[id] !== undefined).length
  let completeness = path.length === 0 ? 0 : answeredCount / path.length
  if (attnDevelopmental && answers.g_good_before === 'recent') completeness -= 0.15
  if (attnRecent && answers.g_good_before === 'always') completeness -= 0.15
  completeness = clamp01(completeness)

  /* ---------- Outcome classification ---------- */

  const adhdProminent = adhdSig === 'high' || adhdSig === 'moderate'
  const asdProminent = asdSig === 'high' || asdSig === 'moderate'

  let outcome: OutcomeKind
  if (completeness < 0.55) {
    outcome = 'insufficient'
  } else if (adhdProminent && asdProminent) {
    outcome = 'dual'
  } else if (adhdProminent) {
    outcome = 'adhd'
  } else if (asdProminent) {
    outcome = 'asd'
  } else {
    const confoundLoad =
      (sleepLevel + stressLevel + lonelinessLevel + structureLevel) / 4
    const contextualFlag =
      (recentOnlyADHD || recentOnlyASD || answers.g_good_before === 'recent') &&
      confoundLoad >= 0.45
    outcome = contextualFlag ? 'contextual' : 'neither'
  }

  /* ---------- Action level ---------- */

  let actionLevel: 1 | 2 | 3 = 1
  if (
    ((adhdSig === 'high' || asdSig === 'high') && impairment01 >= 0.5) ||
    (adhdProminent && asdProminent && impairment01 >= 0.45)
  ) {
    actionLevel = 3
  } else if (
    adhdProminent ||
    asdProminent ||
    impairment01 >= 0.35 ||
    (outcome === 'contextual' && impairment01 >= 0.25)
  ) {
    actionLevel = 2
  }

  /* ---------- Assemble ---------- */

  const hypotheses: Record<'adhd' | 'asd', HypothesisResult> = {
    adhd: {
      id: 'adhd',
      label: 'ADHD 相关特征',
      level: adhdSig,
      supporting: sortEvidence(adhdSupport),
      contradicting: sortEvidence(adhdContradict),
      unknown: sortEvidence(adhdUnknown),
    },
    asd: {
      id: 'asd',
      label: '自闭谱系相关特征',
      level: asdSig,
      supporting: sortEvidence(asdSupport),
      contradicting: sortEvidence(asdContradict),
      unknown: sortEvidence(asdUnknown),
    },
  }

  const dimensionScores0100 = dimensionScores(answers)
  const outcomeText = OUTCOME_TEXT[outcome]

  return {
    dimensionScores: dimensionScores0100,
    signals: {
      adhd: adhdSig,
      asd: asdSig,
      sleep: levelFromScore(sleepLevel),
      loneliness: levelFromScore(lonelinessLevel),
      impairment: levelFromScore(impairment01),
      completeness: levelFromScore(completeness),
    },
    hypotheses,
    confounders,
    alternatives,
    timeline: buildTimeline(answers),
    outcome,
    outcomeHeadline: outcomeText.headline,
    outcomeSummary: outcomeText.summary,
    actionLevel,
    evidenceCompleteness: Math.round(completeness * 100) / 100,
    generatedAt: new Date().toISOString(),
    schemaVersion: 1,
  }
}
