import { Link } from 'react-router-dom'

/* ----------------------------------------------------------------- */

interface Ref {
  title: string
  source: string
  url: string
}

const INSTITUTIONAL: Ref[] = [
  {
    title: 'Attention-Deficit / Hyperactivity Disorder (ADHD)',
    source: 'U.S. Centers for Disease Control and Prevention (CDC)',
    url: 'https://www.cdc.gov/adhd/',
  },
  {
    title: 'Autism Spectrum Disorder (ASD)',
    source: 'U.S. Centers for Disease Control and Prevention (CDC)',
    url: 'https://www.cdc.gov/autism/',
  },
  {
    title: 'Attention-Deficit/Hyperactivity Disorder',
    source: 'U.S. National Institute of Mental Health (NIMH)',
    url: 'https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd',
  },
  {
    title: 'Autism Spectrum Disorder',
    source: 'U.S. National Institute of Mental Health (NIMH)',
    url: 'https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd',
  },
  {
    title: 'Attention deficit hyperactivity disorder (NICE NG87)',
    source: 'UK National Institute for Health and Care Excellence',
    url: 'https://www.nice.org.uk/guidance/ng87',
  },
  {
    title: 'Autism spectrum disorder in adults (NICE NG142)',
    source: 'UK National Institute for Health and Care Excellence',
    url: 'https://www.nice.org.uk/guidance/ng142',
  },
  {
    title: 'ICD-11 for Mortality and Morbidity Statistics',
    source: 'World Health Organization (WHO)',
    url: 'https://icd.who.int/browse/2024-01/mms/en',
  },
]

const PEER_REVIEWED: Ref[] = [
  {
    title:
      'The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population. Psychological Medicine, 35(2), 245–256.',
    source: 'Kessler, Adler, Ames, et al. (2005)',
    url: 'https://doi.org/10.1017/S0033291704002892',
  },
  {
    title:
      'The Autism-Spectrum Quotient (AQ): Evidence from Asperger syndrome/high-functioning autism, males and females, scientists and mathematicians. J Autism Dev Disord, 31(1), 5–17.',
    source: 'Baron-Cohen, Wheelwright, Skinner, Martin & Clubley (2001)',
    url: 'https://doi.org/10.1023/A:1005653411471',
  },
  {
    title:
      'The World Federation of ADHD International Consensus Statement: 208 evidence-based conclusions. Neuroscience & Biobehavioral Reviews.',
    source: 'Faraone, Banaschewski, Coghill, et al. (2021)',
    url: 'https://doi.org/10.1016/j.neubiorev.2021.01.022',
  },
  {
    title: 'Autism. The Lancet, 383(9920), 896–910.',
    source: 'Lai, Lombardo & Baron-Cohen (2014)',
    url: 'https://doi.org/10.1016/S0140-6736(13)61539-1',
  },
  {
    title:
      'Identifying the lost generation of adults with autism spectrum conditions. The Lancet Psychiatry, 2(11), 1013–1027.',
    source: 'Lai & Baron-Cohen (2015)',
    url: 'https://doi.org/10.1016/S2215-0366(15)00277-1',
  },
  {
    title:
      'Effects of sleep deprivation on cognition. Progress in Brain Research, 185, 105–129.',
    source: 'Killgore (2010)',
    url: 'https://doi.org/10.1016/B978-0-444-53702-7.00007-5',
  },
  {
    title:
      'Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience, 10, 410–422.',
    source: 'Arnsten (2009)',
    url: 'https://doi.org/10.1038/nrn2648',
  },
  {
    title:
      'Perceived social isolation and cognition. Trends in Cognitive Sciences, 13(10), 447–454.',
    source: 'Cacioppo & Hawkley (2009)',
    url: 'https://doi.org/10.1016/j.tics.2009.06.005',
  },
  {
    title:
      'Psychiatric disorders in children with autism spectrum disorders. J Am Acad Child Adolesc Psychiatry, 47(8), 921–929.',
    source: 'Simonoff, Pickles, Charman, et al. (2008)',
    url: 'https://doi.org/10.1097/CHI.0b013e318179964f',
  },
]

/* ----------------------------------------------------------------- */

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-[19px] font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-[14.5px] leading-[1.75] text-muted">
        {children}
      </div>
    </section>
  )
}

function RefList({ refs }: { refs: Ref[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {refs.map((r, i) => (
        <li key={r.url} className="text-[13.5px] leading-relaxed">
          <span className="mr-1.5 text-subtle">{i + 1}.</span>
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-ink underline decoration-line underline-offset-4 transition hover:decoration-brand"
          >
            {r.title}
          </a>
          <span className="text-subtle"> — {r.source}</span>
        </li>
      ))}
    </ol>
  )
}

const TOC = [
  { id: 'screening', label: '筛查 ≠ 诊断' },
  { id: 'questionnaire', label: '单一问卷为何不够' },
  { id: 'childhood-adhd', label: 'ADHD 与儿童期' },
  { id: 'history-asd', label: '成人 ASD 与发展史' },
  { id: 'mimics', label: '睡眠、焦虑与压力' },
  { id: 'overlap', label: 'ADHD 与 ASD 共存' },
  { id: 'engine', label: 'NeuroScope 算法' },
  { id: 'limits', label: '局限' },
]

export default function SciencePage() {
  return (
    <div className="grain-bg">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-brand">
          About the science
        </p>
        <h1 className="mt-2 text-[28px] font-semibold tracking-tight sm:text-[34px]">
          为什么我们把它做成“地图”，而不是“判决书”
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          ADHD 与自闭谱系特征都不是靠一次网页问答就能确认的。这一页解释 NeuroScope 的设计依据，
          以及每一个结果背后的临床逻辑。
        </p>

        {/* In-page TOC */}
        <nav className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-line bg-surface p-4">
          {TOC.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="rounded-full bg-surface-2 px-3 py-1.5 text-[12.5px] text-muted transition hover:text-ink"
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-12">
          <Section id="screening" title="筛查（screening）与诊断（diagnosis）不是一回事">
            <p>
              筛查的目的是回答“值不值得进一步评估”，它只需要自我报告的信息，几分钟即可完成。
              诊断则是由合格的临床医生（精神科医生、临床心理师等）完成的临床过程：通常包含面谈、
              完整的发展史、旁证（家人、旧记录）、对其他疾病的排除，往往需要不止一次会面。
            </p>
            <p>
              因此 NeuroScope 只会使用“ADHD 特征信号：较高”“目前证据不足”“建议进一步专业评估”
              这样的表达，永远不会告诉你“你是 ADHD / ASD”，也不会生成医学上不存在的精确概率。
            </p>
          </Section>

          <Section id="questionnaire" title="为什么一份问卷不能确诊 ADHD">
            <p>
              即便是设计良好的筛查量表（如 WHO 的成人 ADHD 自评量表 ASRS），其作者也明确将其定位为
              筛查工具：高分提示需要临床访谈，而不是等同于诊断。自评问卷无法核实你的回忆是否准确，
              无法判断症状是否由睡眠、焦虑、压力或其他情况造成，也无法确认功能损害的真实程度。
            </p>
            <p>
              这正是 NeuroScope 不满足于一个总分的原因：它同时记录发展史、跨环境表现、功能损害和
              替代解释，并把支持与不支持每个解释的证据分别呈现给你。
            </p>
          </Section>

          <Section id="childhood-adhd" title="为什么 ADHD 必须关注儿童期">
            <p>
              ADHD 属于神经发育障碍，现行诊断框架（DSM-5、ICD-11）要求相关表现在 12 岁以前就已存在，
              并且在两个或更多环境中出现。一个“过去完全正常、最近一年才开始注意力下降”的模式，
              与 ADHD 的典型病程并不吻合。
            </p>
            <p>
              所以我们专门设计了时间线：你第一次觉得难以集中是什么时候、家人老师小时候如何评价你、
              童年是否有粗心/多动的表现。如果证据显示问题是近期才出现，NeuroScope 会主动降低
              ADHD 解释的权重，并把注意力转向睡眠、压力等替代因素。
            </p>
          </Section>

          <Section id="history-asd" title="为什么成人 ASD 评估特别依赖发展史">
            <p>
              许多成人自闭谱系特征会被多年的“伪装”、回避策略和高智商所掩盖，直到环境要求超出了
              应对能力才被注意到。研究者将这一群体称为“迷失的一代”。判断当下的社交困难是否属于
              谱系特征，关键在于它们是否以某种形式长期存在，而不是最近才出现。
            </p>
            <p>
              因此我们会询问：社交困惑从何时开始、童年是否存在固定习惯/强烈兴趣/感官敏感/抗拒变化。
              朋友少、社交退缩本身并不等于 ASD——它们同样可能来自孤独、低落或社交焦虑。
            </p>
          </Section>

          <Section id="mimics" title="睡眠、焦虑与压力，为什么能“模仿”ADHD / ASD">
            <p>
              实验研究反复证实：睡眠不足会损害持续注意、工作记忆和情绪调节，表现与 ADHD 高度相似；
              慢性压力会通过神经通路削弱前额叶的规划与控制功能；焦虑让注意力被担忧占据；
              长期孤独与隔离会影响认知表现与社交意愿。
            </p>
            <p>
              这些因素通常是可逆的，且处理方式与神经发育差异不同。NeuroScope 的鉴别模块会逐一检查：
              睡眠时长与质量、长期压力、焦虑与低落、倦怠、孤独与隔离、生活结构、高刺激媒体、
              重大生活事件以及身体健康/药物因素，并解释它们如何造成你感受到的困难。
            </p>
          </Section>

          <Section id="overlap" title="为什么 ADHD 与 ASD 可以同时存在">
            <p>
              研究显示 ADHD 与 ASD 的共患率相当高，两者共享部分遗传与认知基础，却又有不同的核心表现。
              现行诊断框架已允许同时给出两个诊断。因此 NeuroScope 从不要求你“二选一”：
              Overlap Map 会同时展示两类特征的强度、功能损害与替代解释。
            </p>
          </Section>

          <Section id="engine" title="NeuroScope 的结果是怎么算出来的">
            <p>
              我们没有使用“分数超过某条线 = 某种疾病”的逻辑。证据引擎为 ADHD 与 ASD 两个假设分别
              维护四类信息：支持证据、反驳证据、未知项与混淆因素。最终的结论（ADHD / ASD / 双重特征 /
              均不突出 / 证据不足 / 更像其他因素）是由这些规则组合生成的解释，而不是标签分配。
            </p>
            <p>
              所有规则、题目、计分与解释都在代码库的 <code>src/assessment/</code> 目录中独立维护，
              可审阅、可复现。
            </p>
            <p>
              关于量表版权：ASRS 与 AQ 均为受版权保护的工具。NeuroScope 没有复制它们的题目，
              而是依据公开的诊断维度设计了原创筛查问题。因此本工具不是正式量表，也不声称与任何量表
              等价；它是“非诊断性的特征筛查”。
            </p>
          </Section>

          <Section id="limits" title="本工具的局限">
            <p>
              自我报告会受到记忆、当下心情和主观感受的影响；本工具不收集旁证，也无法进行体格检查或
              实验室检查。它不能识别全部精神或身体问题，也不适合未成年人独立使用。
            </p>
            <p>
              如果困难持续存在并影响生活，请带着评估摘要，咨询熟悉成人 ADHD / ASD 的专业人员。
              如果你正在经历危机或有伤害自己的念头，请立即联系当地紧急服务或前往急诊。
            </p>
            <p>
              <Link
                to="/assessment"
                className="font-medium text-brand underline underline-offset-4"
              >
                回到测评 →
              </Link>
            </p>
          </Section>
        </div>

        {/* References */}
        <div className="mt-16">
          <h2 className="text-[19px] font-semibold tracking-tight">机构来源</h2>
          <div className="mt-5">
            <RefList refs={INSTITUTIONAL} />
          </div>

          <h2 className="mt-12 text-[19px] font-semibold tracking-tight">
            同行评议研究
          </h2>
          <div className="mt-5">
            <RefList refs={PEER_REVIEWED} />
          </div>

          <p className="mt-10 text-[12px] leading-relaxed text-subtle">
            外部链接由对应机构维护，NeuroScope 不对第三方页面内容负责。
          </p>
        </div>
      </div>
    </div>
  )
}
