import { Link } from 'react-router-dom'
import { useAssessmentStore } from '@/store/useAssessmentStore'
import { buildPath } from '@/assessment/engine'

const META = ['约 8–12 分钟', '可随时退出', '本地保存', '免费查看完整分析']

const FEATURES = [
  {
    title: '自适应，而不是固定问卷',
    body: '宽筛之后根据你的回答动态增减题目：简单情况约 20–30 题，复杂情况最多约 55 题。',
    icon: (
      <path
        d="M4 7h10M14 7l-2.5-2.5M14 7l-2.5 2.5M20 17H10M10 17l2.5-2.5M10 17l2.5 2.5"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: '11 个维度的 Neuro Profile',
    body: '注意力、执行功能、冲动、社交沟通与直觉、固定模式、感官、压力、睡眠、社会连接与功能损害，分别呈现。',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4.5" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: '发展史时间线',
    body: '从学龄前到最近半年，区分“从小持续至今的特征”与“最近才出现的问题”——这对 ADHD / ASD 筛查至关重要。',
    icon: (
      <path
        d="M5 18V6M5 18h14M9 14.5v-5M13 14.5V8M17 14.5v-3"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: '鉴别分析：还有什么可能？',
    body: '睡眠不足、慢性压力、焦虑、低落、孤独、生活结构缺失、倦怠……这些因素都可能产生与 ADHD / ASD 相似的表现。',
    icon: (
      <path
        d="M9.5 9.5a3.5 3.5 0 1 1 5 0c.8.8 1.5 1.4 1.5 2.6a2.9 2.9 0 0 1-2.9 2.9h-.2M12 17.5v.6"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: '完整结果，免费且可打印',
    body: '证据支持与不支持、症状时间线、替代解释、下一步行动，以及可打印的专业评估摘要——没有付费解锁。',
    icon: (
      <path
        d="M7 4h10v16l-3-2-2 2-2-2-3 2V4ZM10 8.5h4M10 11.5h4"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
]

const PRIVACY = [
  { title: '不需要注册', body: '不设账号，不收集姓名、邮箱或联系方式。' },
  {
    title: '答案只保存在当前设备',
    body: '默认使用浏览器本地存储，刷新可继续，数据不会被上传到服务器。',
  },
  {
    title: '不会出售给广告商',
    body: '没有广告追踪，没有数据交易。你可以随时一键清除全部数据。',
  },
]

export default function HomePage() {
  const answers = useAssessmentStore((s) => s.answers)
  const reset = useAssessmentStore((s) => s.reset)
  const answeredCount = Object.keys(answers).length
  const path = buildPath(answers)
  const hasProgress = answeredCount > 0
  const progressPct = Math.round((answeredCount / Math.max(path.length, 1)) * 100)

  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section className="grain-bg">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <p
            className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12.5px] text-muted"
            style={{ animationDelay: '0ms' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            非诊断性的成人神经多样性多维筛查
          </p>

          <h1
            className="animate-rise text-balance text-[34px] font-semibold leading-[1.15] tracking-tight sm:text-[56px]"
            style={{ animationDelay: '80ms' }}
          >
            你到底是注意力出了问题，
            <br className="hidden sm:block" />
            还是这个世界已经把你耗尽了？
          </h1>

          <p
            className="animate-rise mx-auto mt-5 max-w-xl text-pretty text-[15.5px] leading-relaxed text-muted sm:text-[17px]"
            style={{ animationDelay: '160ms' }}
          >
            一次多维筛查，拆开 ADHD、孤独、压力、睡眠与自闭谱系特征之间容易混淆的部分。
          </p>

          <div
            className="animate-rise mt-8 flex flex-col items-center gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              to="/assessment"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15.5px] font-medium text-white shadow-[var(--shadow-pop)] transition hover:bg-brand-strong active:scale-[0.98]"
            >
              {hasProgress ? '继续我的神经特征地图' : '开始我的神经特征地图'}
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                className="transition group-hover:translate-x-0.5"
                aria-hidden
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12.5px] text-subtle">
              {META.map((m, i) => (
                <span key={m} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>·</span>}
                  {m}
                </span>
              ))}
            </div>
          </div>

          {hasProgress && (
            <div className="mx-auto mt-8 max-w-md animate-fade-in">
              <div className="card-flat flex items-center gap-4 px-5 py-4 text-left">
                <div className="flex-1">
                  <p className="text-[13.5px] font-medium">
                    已完成约 {progressPct}%（{answeredCount} 题）
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-brand transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-line px-3 py-1.5 text-[12.5px] text-muted transition hover:text-confound"
                >
                  重新开始
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-center text-[26px] font-semibold tracking-tight sm:text-[30px]">
            这不是又一个“打分测试”
          </h2>
          <p className="mx-auto mt-2.5 max-w-lg text-center text-[14.5px] text-muted">
            NeuroScope 不试图在网页上“确诊”你，而是帮你看清症状、时间、环境、功能与替代解释之间的关系。
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6 transition hover:border-line-strong">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand-ink">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
                    {f.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-[15.5px] font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            ))}

            {/* CTA cell */}
            <div className="flex flex-col justify-center rounded-[1.25rem] border border-dashed border-line-strong bg-surface/60 p-6">
              <p className="text-[15px] font-semibold">准备好看看你的地图了吗？</p>
              <p className="mt-1.5 text-[13.5px] text-muted">
                每一步都可以返回，随时可以退出，进度自动保存在本机。
              </p>
              <Link
                to="/assessment"
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-[var(--canvas)] transition opacity-90 hover:opacity-100"
              >
                开始筛查
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Privacy ---------------- */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="text-[22px] font-semibold tracking-tight">隐私是默认设置</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {PRIVACY.map((p) => (
              <div key={p.title} className="card-flat p-5">
                <h3 className="text-[14.5px] font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] text-muted transition hover:border-confound hover:text-confound"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              清除我的全部测试数据
            </button>
            <Link
              to="/science"
              className="text-[13px] text-muted underline-offset-4 hover:underline"
            >
              查看筛查背后的科学依据
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
