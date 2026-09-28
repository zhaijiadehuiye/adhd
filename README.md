# NeuroScope — 神经特征地图

> 你到底是注意力出了问题，还是这个世界已经把你耗尽了？

NeuroScope 是一个面向成人的**非诊断性神经多样性多维筛查 Web App**。它不试图在网页上“确诊” ADHD 或自闭谱系（ASD），而是通过 **多维筛查 + 自适应流程 + 发展史时间线 + 功能损害分析 + 替代解释（鉴别）分析**，回答：

- 你的困难目前主要集中在哪些维度？
- 哪些表现与 ADHD 特征相符，哪些与 ASD 特征相符，是否同时存在？
- 这些表现是否更可能来自睡眠不足、长期压力、焦虑、低落、孤独、社会隔离或生活结构缺失？
- 支持 / 不支持每个解释的证据分别是什么？
- 是否值得寻求专业的 ADHD / ASD 评估？

结果使用“ADHD 特征信号：较高”“目前证据不足”“建议进一步专业评估”这类措辞，**不会**输出“你有 83% 的概率是 ADHD”这类医学上不存在的精确概率。

---

## 功能（V1）

- **自适应测评引擎（Adaptive Assessment Engine）**：宽筛之后根据回答动态增减题目，简单情况约 20–30 题，复杂情况最多约 55 题，不是固定长问卷。
- **11 维 Neuro Profile**：注意力、执行功能、冲动/活动水平、社交沟通、社交直觉、固定模式、感官处理、情绪/压力负荷、睡眠与节律、社会连接，以及独立的**功能损害**指标。
- **发展史时间线（Timeline）**：从学龄前到最近半年，区分“从小持续的特征”与“最近才出现的问题”。
- **鉴别分析（Differential Explorer）**：睡眠、压力、焦虑、低落、孤独、生活结构、高刺激媒体、倦怠、重大生活事件、健康/药物因素等替代解释。
- **证据引擎（Evidence Engine）**：为 ADHD / ASD 两个假设分别维护支持证据、反驳证据、未知项与混淆因素。
- **结果页「你的 Neuro Map」**：雷达图、筛查概况（●●●●○）、Overlap Map、证据列表、混淆因素条、症状时间线、替代解释、三级下一步行动。
- **专业评估摘要**：一键整理成类似初诊资料的结构，支持 **Print / Save as PDF**，完全离线。
- **隐私友好分享卡**：Canvas 生成 PNG，只含维度指数，不含姓名与具体回答。
- **隐私优先**：无需注册，答案默认只保存在浏览器本地（localStorage），刷新可继续，可一键清除全部数据；没有服务器收集心理健康信息。
- 响应式、手机优先、深色模式、键盘快捷键（数字键选择、Enter 继续、Esc 关闭弹窗）。

---

## 技术栈

- React 19 + TypeScript（strict mode）
- Vite（构建，相对路径 `base: './'`）
- Tailwind CSS v4
- React Router（HashRouter，保证任意静态托管刷新不 404）
- Recharts（雷达图）、Framer Motion（动效）、Zustand（状态 + 本地持久化）
- Vitest + Testing Library（自动化测试）

---

## 本地运行

```bash
npm install
npm run dev       # 启动开发服务器
```

## 构建与预览

```bash
npm run build     # 类型检查 + 产物输出到 dist/
npm run preview   # 本地预览生产构建
```

## 测试

```bash
npx vitest run
```

测试覆盖：评分归一化、自适应路径、证据引擎，以及 **6 类模拟用户**（儿童期 ADHD / ASD / 双重特征 / 近期注意力下降+严重睡眠不足 / 长期孤独+社交退缩 / 无明显异常），确保不同画像得到明显不同且临床逻辑合理的结果。

---

## 项目结构

```
src/
  assessment/
    types.ts          # 领域类型
    dimensions.ts     # 11 个维度的元数据
    scales.ts         # 统一量表选项与人生时期
    questions.ts      # 题库（原创题目）
    modules.ts        # 自适应模块与触发条件
    engine.ts         # 自适应路径构建
    scoring.ts        # 答案归一化与维度聚合
    rules.ts          # Evidence Engine：证据、混淆因素、结论、行动层级
    explanations.ts   # 结果措辞与科普文案
    timeline.ts       # 症状时间线数据
    impairment.ts     # 功能损害领域
    report.ts         # 专业评估摘要构建
    share.ts          # 分享卡 Canvas 绘制
  store/
    useAssessmentStore.ts  # Zustand + localStorage 持久化
  components/
    layout/           # Nav / Footer / Logo / ThemeToggle
    ui/               # Modal 等通用组件
    assessment/       # 各类答题交互与题目渲染
    results/          # 结果页全部模块
  pages/
    HomePage.tsx
    AssessmentPage.tsx
    ResultsPage.tsx
    SciencePage.tsx
  hooks/              # useTheme
  lib/                # cn 等工具
  test/               # 测试初始化与 persona 模拟器
```

---

## 算法说明

NeuroScope **没有** “总分超过阈值 ⇒ 诊断” 的逻辑。

1. **归一化**：每道可计分题的回答映射到 0–1（越高困难越多），不同题型（频率、场景卡、滑块、多选、损害网格）有各自的映射规则（`scoring.ts`）。
2. **维度指数**：按维度对题目加权平均后换算为 0–100，仅表示“本次报告的困难多少”，不是疾病概率。
3. **证据引擎**（`rules.ts`）：为 ADHD / ASD 分别收集：
   - `supporting[]`：如儿童期起病、跨多个环境、执行功能困难、功能损害；
   - `contradicting[]`：如仅近期出现、睡好后症状明显改善、儿童期无对应表现；
   - `unknown[]`：发展史不清、单一环境证据有限；
   - `confounders[]`：睡眠、压力、孤独、结构缺失、媒体、生活事件、健康因素的强度。
4. **结论生成**：组合规则输出六种结果之一——`adhd` / `asd` / `dual` / `neither` / `insufficient` / `contextual`（目前更像其他因素干扰）。
5. **行动层级**：根据信号强度与功能损害给出 LEVEL 1–3 的建议。

### 量表版权

ASRS（WHO 成人 ADHD 自评量表）与 AQ（自闭谱系商数）均为受版权保护的工具。NeuroScope **没有复制**它们的题目，而是依据公开的诊断维度（CDC / NIMH / NICE / DSM-5 / ICD-11 公开资料）设计**原创筛查问题**，因此本工具不是正式量表，也不声称与任何量表等价。

---

## 部署

### GitHub Pages（已内置自动化）

仓库已包含 `.github/workflows/deploy.yml`：push 到 `main` 后自动 `npm ci && npm run build` 并部署 `dist/`。

首次使用需在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。Vite 使用相对路径 base 与 HashRouter，无需额外路由配置。

### Vercel / Netlify / Surge 等静态托管

`npm run build` 产物为纯静态文件（`dist/`），直接上传即可；HashRouter 不依赖服务端 rewrite 规则。

---

## 医疗免责声明

NeuroScope 仅用于**自我了解与初步筛查**，不构成医疗建议、诊断或治疗方案，不能替代医生、精神科医生或临床心理师的专业评估。如你正在经历危机或有伤害自己的想法，请立即联系当地紧急服务或前往急诊。本工具不推荐任何处方药物。

## 隐私

无需注册；答案默认仅保存在当前设备的浏览器本地存储中，不会被上传、出售或用于广告。你可以随时通过首页的「清除我的全部测试数据」删除所有内容。
