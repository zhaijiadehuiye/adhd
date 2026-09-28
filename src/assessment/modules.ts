import type { AssessmentModule } from './types'

/* ==================================================================
   Adaptive modules — deep dives and differential (confound) modules.
   Each module only enters the path when its trigger fires.
   Triggers read the *partial* answers available at that point.
================================================================== */

export const MODULES: AssessmentModule[] = [
  /* ---------------- Deep (trait) modules ---------------- */

  {
    id: 'adhd_deep',
    stage: 'deep',
    title: '注意力与执行功能 · 深入',
    trigger: (c) =>
      Math.max(
        c.dimPreview('attention'),
        c.dimPreview('executive'),
        c.dimPreview('impulsivity'),
      ) >= 0.45,
    items: [
      'd_adhd_init',
      'd_adhd_org',
      'd_adhd_time',
      'd_adhd_finish',
      'd_adhd_rely',
    ],
  },
  {
    id: 'asd_social_deep',
    stage: 'deep',
    title: '社交沟通与直觉 · 深入',
    trigger: (c) =>
      Math.max(
        c.dimPreview('socialCommunication'),
        c.dimPreview('socialIntuition'),
      ) >= 0.45,
    items: [
      'd_asd_subtext',
      'd_asd_emotion',
      'd_asd_eyes',
      'd_asd_smalltalk',
      'd_asd_monologue',
      'd_asd_mask',
    ],
  },
  {
    id: 'asd_core_deep',
    stage: 'deep',
    title: '固定模式与感官 · 深入',
    trigger: (c) =>
      Math.max(c.dimPreview('routine'), c.dimPreview('sensory')) >= 0.45,
    items: [
      'd_asd_sameness',
      'd_asd_special',
      'd_asd_overload',
      'd_asd_food',
    ],
  },

  /* ---------------- Differential (confound) modules ---------------- */

  {
    id: 'sleep_deep',
    stage: 'confound',
    title: '睡眠干扰',
    trigger: (c) => c.dimPreview('sleep') >= 0.5,
    items: ['c_sleep_reg', 'c_sleep_improves', 'c_sleep_apnea'],
  },
  {
    id: 'stress_mood_deep',
    stage: 'confound',
    title: '压力、焦虑与低落',
    trigger: (c) => c.dimPreview('emotional') >= 0.45,
    items: [
      'c_stress_level',
      'c_anxiety',
      'c_mood',
      'c_burnout',
      'c_lifeevents',
    ],
  },
  {
    id: 'connection_deep',
    stage: 'confound',
    title: '孤独与社会隔离',
    trigger: (c) => c.dimPreview('connection') >= 0.45,
    items: ['c_friends', 'c_contact', 'c_alone'],
  },
  {
    id: 'health_context',
    stage: 'confound',
    title: '健康与生活方式背景',
    trigger: (c) =>
      c.answer('g_good_before') === 'recent' ||
      Math.max(
        c.dimPreview('emotional'),
        c.dimPreview('sleep'),
        c.dimPreview('connection'),
      ) >= 0.4,
    items: ['c_health', 'c_media_time'],
  },
]

export const MODULE_MAP: Record<string, AssessmentModule> = MODULES.reduce(
  (acc, m) => {
    acc[m.id] = m
    return acc
  },
  {} as Record<string, AssessmentModule>,
)
