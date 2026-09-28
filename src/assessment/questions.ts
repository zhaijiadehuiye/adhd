import type { Item } from './types'
import { AGREE_OPTIONS, FREQ_OPTIONS } from './scales'

/* ==================================================================
   NeuroScope item bank
   Original items designed around publicly documented ADHD / ASD
   symptom dimensions. They are NOT copies of copyrighted scales
   (ASRS / AQ) and this is a non-diagnostic screening, not a scale.
   ================================================================== */

export const QUESTIONS: Item[] = [
  /* ----------------------------------------------------------------
     STAGE 1 · BROAD SCREEN — everyone answers these
  ----------------------------------------------------------------- */

  {
    id: 'b_attention',
    stage: 'broad',
    type: 'frequency',
    dim: 'attention',
    prompt: '我很难把注意力维持在枯燥、但又必须完成的事情上。',
    subtitle: '比如阅读长文档、填表、处理流程性工作或听长篇讲解。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_exec_scenario',
    stage: 'broad',
    type: 'scenario',
    dim: 'executive',
    prompt: '想象一下：有一件无聊但重要的事，需要你在截止日前完成。你通常会怎样？',
    cards: [
      { label: 'A', value: 0, hint: '通常直接开始，按节奏做完' },
      { label: 'B', value: 0.33, hint: '会拖一阵，但能在截止前完成' },
      { label: 'C', value: 0.67, hint: '基本要拖到截止临近才开始' },
      { label: 'D', value: 1, hint: '即使后果严重也很难开始，常常做不完' },
    ],
  },
  {
    id: 'b_workingmem',
    stage: 'broad',
    type: 'frequency',
    dim: 'executive',
    prompt: '别人刚交代的事、刚读到的数字或安排，我转头就忘。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_impulse',
    stage: 'broad',
    type: 'frequency',
    dim: 'impulsivity',
    prompt: '我会脱口而出、冲动下单或做决定；需要排队、等待时我特别难受。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_restless',
    stage: 'broad',
    type: 'frequency',
    dim: 'impulsivity',
    prompt: '需要长时间安静坐着时，我总忍不住抖腿、摆弄东西、起身走动，或脑子已经飘走。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_social_conv',
    stage: 'broad',
    type: 'frequency',
    dim: 'socialCommunication',
    prompt: '寒暄、闲聊或维持一段普通对话让我很费力，容易冷场、抢话或节奏不对。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_social_intuit',
    stage: 'broad',
    type: 'scenario',
    dim: 'socialIntuition',
    prompt: '一群人在一起聊天时，你对“气氛、暗示和玩笑”的把握如何？',
    cards: [
      { label: 'A', value: 0, hint: '通常能自然跟上，也读得出气氛' },
      { label: 'B', value: 0.33, hint: '偶尔会慢半拍，但问题不大' },
      { label: 'C', value: 0.67, hint: '经常要事后才反应过来当时是什么意思' },
      { label: 'D', value: 1, hint: '几乎总是摸不着头脑，容易误解或被说“没眼色”' },
    ],
  },
  {
    id: 'b_routine',
    stage: 'broad',
    type: 'frequency',
    dim: 'routine',
    prompt: '计划被临时打乱、路线变更或事情没有按预期进行时，我会明显烦躁或难以切换。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_interests',
    stage: 'broad',
    type: 'agreement',
    dim: 'routine',
    prompt: '我会长时间沉浸在自己特别感兴趣的事物里，以至于忘记时间、忽略周围。',
    options: AGREE_OPTIONS,
  },
  {
    id: 'b_sensory',
    stage: 'broad',
    type: 'frequency',
    dim: 'sensory',
    prompt: '声音、灯光、衣物触感或标签、气味、拥挤环境，很容易让我不舒服甚至“过载”。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_emotion',
    stage: 'broad',
    type: 'frequency',
    dim: 'emotional',
    prompt: '我长期处于紧绷、焦虑或一点就着的状态，情绪恢复起来很慢。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_sleep_hours',
    stage: 'broad',
    type: 'slider',
    dim: 'sleep',
    prompt: '最近半年，你平均每晚实际睡几个小时？',
    slider: {
      min: 3,
      max: 11,
      step: 0.5,
      initial: 7.5,
      unit: '小时',
      minLabel: '3 小时',
      maxLabel: '11 小时',
      // ≤4.5h → 1 (severe), ≥8.5h → 0 (adequate)
      scoreMap: (h) => Math.min(1, Math.max(0, (8.5 - h) / 4)),
    },
  },
  {
    id: 'b_sleep_quality',
    stage: 'broad',
    type: 'frequency',
    dim: 'sleep',
    prompt: '我入睡困难、夜里易醒、作息后移，或睡醒后仍觉得没有恢复。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_lonely',
    stage: 'broad',
    type: 'frequency',
    dim: 'connection',
    prompt: '我经常感到孤独，现实中能真正来往、说上话的人很少。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_structure',
    stage: 'broad',
    type: 'frequency',
    dim: 'connection',
    prompt: '我的日子缺少固定结构：没有稳定作息，也没有必须出门、必须见人的安排。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'b_media',
    stage: 'broad',
    type: 'agreement',
    dim: 'attention',
    prompt: '短视频、信息流等高刺激内容占去我大量时间；一旦停下来，反而更难专注。',
    options: AGREE_OPTIONS,
  },
  {
    id: 'b_settings',
    stage: 'broad',
    type: 'multi',
    dim: 'attention',
    prompt: '你的注意力或执行功能困难，主要出现在哪些环境中？（可多选）',
    multiMin: 1,
    multiOptions: [
      { label: '学校 / 学习', value: 'school' },
      { label: '工作', value: 'work' },
      { label: '家里 / 日常生活', value: 'home' },
      { label: '社交场合', value: 'social' },
      { label: '几乎任何环境都一样', value: 'everywhere', weight: 1 },
      { label: '没有什么特别困难', value: 'none', weight: 0 },
    ],
    noneValue: 'none',
  },

  /* ----------------------------------------------------------------
     STAGE 2 · TIMELINE / DEVELOPMENTAL HISTORY
  ----------------------------------------------------------------- */

  {
    id: 't_attn_start',
    stage: 'timeline',
    type: 'timeline',
    prompt: '你第一次明显觉得自己“难以集中注意力、很难把事情做完”，大概是什么时期？',
  },
  {
    id: 't_others',
    stage: 'timeline',
    type: 'timeline',
    prompt: '家人、老师或同学第一次评价你“粗心、坐不住、拖延、忘事”，大概是什么时期？',
  },
  {
    id: 't_social_start',
    stage: 'timeline',
    type: 'timeline',
    prompt: '社交上的困惑——听不懂暗示、融不进群体、对话总不在一个节奏——大概从什么时候开始？',
  },
  {
    id: 't_child_patterns',
    stage: 'timeline',
    type: 'multi',
    prompt: '回想童年（大约 12 岁以前），以下哪些情况曾经存在？（可多选）',
    multiMin: 1,
    noneValue: 'none',
    multiOptions: [
      { label: '特别固定的习惯、顺序或“仪式”，被打乱会崩溃', value: 'rigid' },
      { label: '对某类事物异常着迷，知道得远超同龄人', value: 'special' },
      { label: '感官敏感：怕吵、怕光、挑衣服材质、挑食、怕气味', value: 'sensory' },
      { label: '很难接受变化、转学或计划变更', value: 'change' },
      { label: '上课很难安静坐着，被说多动', value: 'hyper' },
      { label: '经常因粗心丢分、忘带东西、作业做不完', value: 'careless' },
      { label: '以上都没有', value: 'none', weight: 0 },
    ],
  },
  {
    id: 't_function_decline',
    stage: 'timeline',
    type: 'timeline',
    dim: 'impairment',
    prompt: '你第一次明显感到这些问题开始拖累学习、工作或生活，大概是什么时期？',
  },
  {
    id: 't_sleep_start',
    stage: 'timeline',
    type: 'timeline',
    prompt: '睡眠或作息问题，大概从什么时候开始变得明显？',
  },
  {
    id: 'g_good_before',
    stage: 'timeline',
    type: 'choice',
    prompt: '在这些困难出现之前，你是否曾有很长一段时间可以稳定专注、社交也基本顺利？',
    choices: [
      { label: '是，最近一两年才明显变差', value: 'recent' },
      { label: '是，但那已经是很多年前', value: 'longago' },
      { label: '否，我从小就大体是这样', value: 'always' },
      { label: '想不起来 / 说不好', value: 'unknown' },
    ],
  },

  /* ----------------------------------------------------------------
     STAGE 3 · DEEP MODULES (conditional)
  ----------------------------------------------------------------- */

  // ADHD deep ------------------------------------------------------
  {
    id: 'd_adhd_init',
    stage: 'deep',
    moduleId: 'adhd_deep',
    type: 'frequency',
    dim: 'executive',
    prompt: '面对任务，我常常卡在“开始”这一步——哪怕任务本身并不难。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_adhd_org',
    stage: 'deep',
    moduleId: 'adhd_deep',
    type: 'frequency',
    dim: 'executive',
    prompt: '我的桌面、文件、日程或个人物品经常一团乱，整理后很快又恢复原样。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_adhd_time',
    stage: 'deep',
    moduleId: 'adhd_deep',
    type: 'frequency',
    dim: 'executive',
    prompt: '我对时间的感觉经常失灵：要么觉得“还早”，要么一抬头几小时已过，常迟到。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_adhd_finish',
    stage: 'deep',
    moduleId: 'adhd_deep',
    type: 'frequency',
    dim: 'executive',
    prompt: '我有很多开了头却没完成的事：项目、爱好、回复、计划、修理……',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_adhd_rely',
    stage: 'deep',
    moduleId: 'adhd_deep',
    type: 'frequency',
    dim: 'executive',
    prompt: '我必须靠闹钟、清单、提醒、他人催促或外部压力，才能把日常维持住。',
    options: FREQ_OPTIONS,
  },

  // ASD social deep ------------------------------------------------
  {
    id: 'd_asd_subtext',
    stage: 'deep',
    moduleId: 'asd_social_deep',
    type: 'frequency',
    dim: 'socialIntuition',
    prompt: '我很难听出反话、委婉拒绝或“话里有话”，常常按字面意思理解。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_emotion',
    stage: 'deep',
    moduleId: 'asd_social_deep',
    type: 'frequency',
    dim: 'socialIntuition',
    prompt: '判断别人当下的情绪或感受并不容易，我需要刻意“分析”而不是自然感知。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_eyes',
    stage: 'deep',
    moduleId: 'asd_social_deep',
    type: 'frequency',
    dim: 'socialCommunication',
    prompt: '眼神接触让我不自在，或者别人常说我说话时不看他们、表情太少。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_smalltalk',
    stage: 'deep',
    moduleId: 'asd_social_deep',
    type: 'frequency',
    dim: 'socialCommunication',
    prompt: '我不知道寒暄该说什么、何时结束，常觉得寒暄毫无意义、想直接跳过。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_monologue',
    stage: 'deep',
    moduleId: 'asd_social_deep',
    type: 'frequency',
    dim: 'socialCommunication',
    prompt: '聊到自己感兴趣的话题时我会讲很久，较难察觉对方其实并不感兴趣。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_mask',
    stage: 'deep',
    moduleId: 'asd_social_deep',
    type: 'frequency',
    dim: 'socialIntuition',
    prompt: '我要刻意模仿别人的表情、语气和动作才能“看起来正常”，事后精疲力尽。',
    options: FREQ_OPTIONS,
  },

  // ASD routine / sensory deep -------------------------------------
  {
    id: 'd_asd_sameness',
    stage: 'deep',
    moduleId: 'asd_core_deep',
    type: 'frequency',
    dim: 'routine',
    prompt: '走同样的路线、吃同样的食物、按同样的顺序做事让我安心；改变会带来明显痛苦。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_special',
    stage: 'deep',
    moduleId: 'asd_core_deep',
    type: 'frequency',
    dim: 'routine',
    prompt: '我有过持续多年、非常强烈而专注的兴趣，会投入海量时间收集相关信息。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_overload',
    stage: 'deep',
    moduleId: 'asd_core_deep',
    type: 'frequency',
    dim: 'sensory',
    prompt: '在商场、聚会、开放办公区等刺激密集的环境里，我会“过载”，想立刻逃离或宕机。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'd_asd_food',
    stage: 'deep',
    moduleId: 'asd_core_deep',
    type: 'multi',
    dim: 'sensory',
    prompt: '以下哪些感官体验会让你明显难受？（可多选）',
    multiMin: 1,
    noneValue: 'none',
    multiOptions: [
      { label: '特定人声或声音（咀嚼、敲键盘、吸鼻子）', value: 'sound' },
      { label: '灯光、闪烁或强光', value: 'light' },
      { label: '衣物材质、标签、缝线或袜子', value: 'touch' },
      { label: '气味（香水、油烟、体味）', value: 'smell' },
      { label: '食物质地、味道或混合', value: 'food' },
      { label: '拥挤、被触碰或拥抱', value: 'crowd' },
      { label: '都没有', value: 'none', weight: 0 },
    ],
  },

  /* ----------------------------------------------------------------
     STAGE 4 · CONFOUND / DIFFERENTIAL MODULES (conditional)
  ----------------------------------------------------------------- */

  // Sleep ----------------------------------------------------------
  {
    id: 'c_sleep_reg',
    stage: 'confound',
    moduleId: 'sleep_deep',
    type: 'frequency',
    dim: 'sleep',
    prompt: '我的入睡和起床时间每天差别很大，经常昼夜颠倒、越睡越晚。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'c_sleep_improves',
    stage: 'confound',
    moduleId: 'sleep_deep',
    type: 'frequency',
    prompt: '如果连续几晚睡好、节奏稳定，我的注意力和执行力会明显改善。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'c_sleep_apnea',
    stage: 'confound',
    moduleId: 'sleep_deep',
    type: 'frequency',
    dim: 'sleep',
    prompt: '我常被说打鼾很响、睡觉时憋气，或白天在开会、开车时不受控制地犯困。',
    options: FREQ_OPTIONS,
  },

  // Stress / mood --------------------------------------------------
  {
    id: 'c_stress_level',
    stage: 'confound',
    moduleId: 'stress_mood_deep',
    type: 'frequency',
    dim: 'emotional',
    prompt: '过去半年，我持续承受着高强度压力（工作、经济、家庭、学业或关系）。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'c_anxiety',
    stage: 'confound',
    moduleId: 'stress_mood_deep',
    type: 'frequency',
    dim: 'emotional',
    prompt: '我经常身体紧绷、心跳加快、反复担心，或脑子像停不下来的转盘。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'c_mood',
    stage: 'confound',
    moduleId: 'stress_mood_deep',
    type: 'frequency',
    dim: 'emotional',
    prompt: '曾有持续两周以上的时间，我情绪低落、对原本喜欢的事提不起兴趣。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'c_burnout',
    stage: 'confound',
    moduleId: 'stress_mood_deep',
    type: 'frequency',
    dim: 'emotional',
    prompt: '我觉得自己被工作或学习“榨干”了：麻木、提不起劲、表现明显下滑。',
    options: FREQ_OPTIONS,
  },
  {
    id: 'c_lifeevents',
    stage: 'confound',
    moduleId: 'stress_mood_deep',
    type: 'multi',
    prompt: '最近一年内，你经历过哪些重大变化？（可多选）',
    multiMin: 1,
    noneValue: 'none',
    multiOptions: [
      { label: '失业、换工作或换专业', value: 'job' },
      { label: '分手、离婚或重要关系破裂', value: 'breakup' },
      { label: '失去亲人', value: 'loss' },
      { label: '搬家或长期居住环境变化', value: 'move' },
      { label: '明显的经济困难', value: 'money' },
      { label: '自己生病、受伤或手术', value: 'illness' },
      { label: '成为家人的长期照护者', value: 'care' },
      { label: '没有什么特别的变化', value: 'none', weight: 0 },
    ],
  },

  // Connection -----------------------------------------------------
  {
    id: 'c_friends',
    stage: 'confound',
    moduleId: 'connection_deep',
    type: 'choice',
    dim: 'connection',
    prompt: '现实生活中，你大约有几个可以互相倾诉、或经常来往的人？',
    choices: [
      { label: '0 个', value: '0' },
      { label: '1 个', value: '1' },
      { label: '2–3 个', value: '2-3' },
      { label: '4 个以上', value: '4+' },
    ],
  },
  {
    id: 'c_contact',
    stage: 'confound',
    moduleId: 'connection_deep',
    type: 'choice',
    dim: 'connection',
    prompt: '最近半年，你和别人进行线下深入交谈或聚会的频率是？',
    choices: [
      { label: '几乎没有', value: 'rarely' },
      { label: '每月一两次', value: 'monthly' },
      { label: '每周一两次', value: 'weekly' },
      { label: '几乎每天', value: 'daily' },
    ],
  },
  {
    id: 'c_alone',
    stage: 'confound',
    moduleId: 'connection_deep',
    type: 'frequency',
    dim: 'connection',
    prompt: '一天中的大部分时间我都在独处，常常一连很多天没有面对面的交流。',
    options: FREQ_OPTIONS,
  },

  // Health / media context -----------------------------------------
  {
    id: 'c_health',
    stage: 'confound',
    moduleId: 'health_context',
    type: 'multi',
    prompt: '以下情况，有哪些可能正在影响你的注意力或精力？（可多选）',
    multiMin: 1,
    noneValue: 'none',
    multiOptions: [
      { label: '长期身体疾病、疼痛或慢性疲劳', value: 'chronic' },
      { label: '甲状腺、贫血等内分泌或代谢问题', value: 'endo' },
      { label: '正在服用可能影响注意力或睡眠的药物', value: 'meds' },
      { label: '饮酒、咖啡因过量或其他物质', value: 'substance' },
      { label: '怀孕、产后、更年期等激素变化', value: 'hormone' },
      { label: '以上都没有', value: 'none', weight: 0 },
    ],
  },
  {
    id: 'c_media_time',
    stage: 'confound',
    moduleId: 'health_context',
    type: 'slider',
    dim: 'attention',
    prompt: '工作日里，你每天大约花多少时间在短视频、信息流或游戏上？',
    slider: {
      min: 0,
      max: 10,
      step: 0.5,
      initial: 0,
      unit: '小时',
      minLabel: '0 小时',
      maxLabel: '10 小时',
      scoreMap: (h) => Math.min(1, h / 7),
    },
  },

  /* ----------------------------------------------------------------
     STAGE 5 · FUNCTIONAL IMPAIRMENT
  ----------------------------------------------------------------- */

  {
    id: 'i_grid',
    stage: 'impairment',
    type: 'impairmentGrid',
    dim: 'impairment',
    prompt: '过去 6 个月，这些困难在以下领域给你造成了多大困扰？',
    subtitle: '“存在某种特点”和“它已经造成实际困难”是两件事——这一题专门衡量后者。',
  },

  /* ----------------------------------------------------------------
     STAGE 6 · CLOSING
  ----------------------------------------------------------------- */

  {
    id: 'g_age',
    stage: 'closing',
    type: 'choice',
    prompt: '你的年龄段是？',
    choices: [
      { label: '17 岁及以下', value: 'under18' },
      { label: '18–24 岁', value: '18-24' },
      { label: '25–34 岁', value: '25-34' },
      { label: '35–44 岁', value: '35-44' },
      { label: '45–54 岁', value: '45-54' },
      { label: '55 岁及以上', value: '55+' },
    ],
  },
  {
    id: 'g_priority',
    stage: 'closing',
    type: 'multi',
    prompt: '你最希望先弄明白或改善什么？（可多选）',
    multiMin: 1,
    multiOptions: [
      { label: '注意力与拖延', value: 'attention' },
      { label: '组织、计划与时间管理', value: 'executive' },
      { label: '社交上的困惑', value: 'social' },
      { label: '感官与环境敏感', value: 'sensory' },
      { label: '睡眠与精力', value: 'sleep' },
      { label: '情绪与压力', value: 'emotion' },
      { label: '孤独与社交圈', value: 'connection' },
      { label: '了解自己是否值得做专业评估', value: 'assessment' },
      { label: '暂时只是好奇', value: 'curious', weight: 0 },
    ],
  },
  {
    id: 'g_ownwords',
    stage: 'closing',
    type: 'text',
    optional: true,
    prompt: '如果用你自己的话，描述一下最困扰你的状态（选填）',
    subtitle: '仅保存在当前设备，并会出现在你可打印的评估摘要中。',
  },
]

export const QUESTION_MAP: Record<string, Item> = QUESTIONS.reduce(
  (acc, q) => {
    acc[q.id] = q
    return acc
  },
  {} as Record<string, Item>,
)

export function getQuestion(id: string): Item {
  const q = QUESTION_MAP[id]
  if (!q) throw new Error(`Unknown question id: ${id}`)
  return q
}
