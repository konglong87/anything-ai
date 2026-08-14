import { defineConfig } from 'vitepress'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const _require = createRequire(import.meta.url)

const _ROOT = dirname(dirname(fileURLToPath(import.meta.url))) // .vitepress -> 项目根
let _parser = null
function getParser() {
  if (!_parser) _parser = _require(join(_ROOT, 'scripts/lib/parser'))
  return _parser
}

// ===== GEO（生成式引擎优化）常量与工具 =====
// URL 映射与 scripts/generate-llms-txt.js 共用 scripts/lib/geo.js，避免两处规则漂移
const { SITE_ORIGIN, SITE_BASE, toUrl } = _require(join(_ROOT, 'scripts/lib/geo'))

// ctx.page 可能是 rewrites 的产物（index.md ← README.md），映射回真实源文件
function sourcePath(rel) {
  if (existsSync(join(_ROOT, rel))) return rel
  const alt = rel.replace(/(^|\/)index\.md$/i, '$1README.md')
  return existsSync(join(_ROOT, alt)) ? alt : rel
}

// frontmatter 日期可能被 YAML 解析成 Date 对象，统一成 YYYY-MM-DD
function toDateStr(v) {
  if (!v) return ''
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  const s = String(v).trim()
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : ''
}

// 最后一次提交日期。不能用构建时间兜底：那会把全站 dateModified 谎报成当天。
const _gitDateCache = new Map()
function gitDate(rel) {
  if (_gitDateCache.has(rel)) return _gitDateCache.get(rel)
  let d = ''
  try {
    d = execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], {
      cwd: _ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim()
  } catch (e) { /* 非 git 环境或文件未提交 */ }
  _gitDateCache.set(rel, d)
  return d
}

// 中英对照页，仅在对应文件真实存在时才声明 hreflang。
// 英文页有两种形态：已迁移的 en/<path>.md，与未迁移的 <path>.en.md，两者都要认。
function altPair(srcRel) {
  if (srcRel.startsWith('en/')) {
    const zh = srcRel.slice(3)
    return existsSync(join(_ROOT, zh)) ? { zh, en: srcRel } : null
  }
  if (/\.en\.md$/i.test(srcRel)) {
    const zh = srcRel.replace(/\.en\.md$/i, '.md')
    return existsSync(join(_ROOT, zh)) ? { zh, en: srcRel } : null
  }
  const enMigrated = 'en/' + srcRel
  if (existsSync(join(_ROOT, enMigrated))) return { zh: srcRel, en: enMigrated }
  const enFlat = srcRel.replace(/\.md$/i, '.en.md')
  return existsSync(join(_ROOT, enFlat)) ? { zh: srcRel, en: enFlat } : null
}

// 从 Markdown 正文抽取一句话摘要（去除代码块/图片/HTML/列表噪声）
function extractSummary(body, max = 160) {
  const lines = String(body)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .split('\n')
  const candidates = []
  let buf = ''
  for (const line of lines) {
    const t = line.trim()
    if (!t) { if (buf) { candidates.push(buf); buf = '' } continue }
    if (t.startsWith('#') || t.startsWith('>') || t.startsWith('|')) continue
    if (/^[-*]\s+\[/.test(t)) continue
    buf += t + ' '
  }
  if (buf) candidates.push(buf)
  const pick =
    candidates.find((c) => {
      const clean = c.replace(/<[^>]+>/g, '').replace(/[*_`]/g, '').trim()
      return clean.length > 10 && !/<[^>]+>/.test(c) && !/^[^：]{0,8}：\s*$/.test(clean)
    }) || candidates.find((c) => !/<[^>]+>/.test(c)) || ''
  let s = pick
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (s.length > max) s = s.slice(0, max).replace(/\s+$/, '') + '…'
  return s
}

const SECTION_LABELS = {
  '0-start-here': '从这里开始',
  '1-understand-ai': '理解AI',
  '2-choose-tools': '选择工具',
  '3-ai-agents': 'AI Agents',
  '4-advanced-topics': '进阶主题',
  '5-skills': 'AI Skills',
  roles: '行业角色',
  prompts: '提示词库',
  resources: '外部资源',
  assets: '资源下载',
  en: 'English'
}
function sectionOf(rel) {
  if (!rel.includes('/')) return '首页'
  const top = rel.split('/')[0]
  return SECTION_LABELS[top] || top
}

// 为单页生成 GEO head 片段：canonical + hreflang + JSON-LD
function buildGeoHead(ctx) {
  const fm = (ctx.pageData && ctx.pageData.frontmatter) || {}

  // headline 只要文章标题：ctx.title 是套过 titleTemplate 的 <title>，带 " | Anything-AI" 后缀
  const headline = String(fm.title || ctx.title || '')
    .replace(/\s*[|｜]\s*Anything-AI\s*$/i, '')
    .replace(/^[\p{Extended_Pictographic}️‍\s]+/u, '')
    .trim()
  if (!headline) return ''

  const rel = ctx.page || ''
  const srcRel = sourcePath(rel)
  const url = toUrl(srcRel)
  const homeUrl = SITE_ORIGIN + SITE_BASE + '/'
  const isHome = url === homeUrl
  const section = sectionOf(srcRel)
  const lang = srcRel.startsWith('en/') || /\.en\.md$/.test(srcRel) ? 'en-US' : 'zh-CN'
  // 作者声明的 updated 优先，其次 git 提交日期；都没有就不输出该字段，绝不用构建时间充数
  const updated = toDateStr(fm.updated) || gitDate(srcRel)
  const keywords = Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : []

  // 摘要：优先从源文件正文首段（干净），回退到 frontmatter / 页面 description
  let desc = ''
  try {
    const entry = getParser().parseMarkdownFile(join(_ROOT, srcRel))
    desc = extractSummary(entry.body || '')
  } catch (e) { /* 源文件读取失败时忽略，走回退 */ }
  desc = desc || fm.description || ctx.description || headline + '。Anything-AI 系统性 AI 知识索引。'

  const graph = []
  if (isHome) {
    graph.push({
      '@type': 'WebSite',
      '@id': homeUrl,
      name: 'Anything-AI',
      url: homeUrl,
      inLanguage: 'zh-CN',
      description: '系统性 AI 知识索引：帮助人们认识、理解、驾驭 AI。',
      potentialAction: {
        '@type': 'SearchAction',
        target: homeUrl + '?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    })
  }
  const article = {
    '@type': fm.difficulty || fm.type ? 'TechArticle' : 'Article',
    headline,
    description: desc,
    inLanguage: lang,
    articleSection: section,
    keywords,
    author: { '@type': 'Organization', name: 'Anything-AI Community' },
    publisher: {
      '@type': 'Organization',
      name: 'Anything-AI Community',
      logo: { '@type': 'ImageObject', url: homeUrl + 'og-image.png' }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url
  }
  if (updated) article.dateModified = updated
  graph.push(article)

  // canonical 指向真实内容页；hreflang 声明中英互为译文而非重复内容
  let out = `<link rel="canonical" href="${url}">`
  const pair = altPair(srcRel)
  if (pair) {
    const zhUrl = toUrl(pair.zh)
    const enUrl = toUrl(pair.en)
    out += `\n<link rel="alternate" hreflang="zh-CN" href="${zhUrl}">`
    out += `\n<link rel="alternate" hreflang="en" href="${enUrl}">`
    out += `\n<link rel="alternate" hreflang="x-default" href="${zhUrl}">`
  }
  out += `\n<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  })}</script>`
  return out
}

export default defineConfig({
  // GitHub Pages部署配置
  base: '/anything-ai/',

  // 站点元数据
  title: 'Anything-AI',
  description: '系统性AI知识索引 - 帮助人们认识、理解和驾驭AI',

  // 忽略死链接检查
  ignoreDeadLinks: true,

  // 社交分享卡片 (Open Graph / Twitter Card)
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Anything-AI' }],
    ['meta', { property: 'og:description', content: '系统性AI知识索引 - 帮助人们认识、理解和驾驭AI' }],
    ['meta', { property: 'og:image', content: 'https://konglong87.github.io/anything-ai/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://konglong87.github.io/anything-ai/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Anything-AI' }],
    ['meta', { name: 'twitter:description', content: '系统性AI知识索引 - 帮助人们认识、理解和驾驭AI' }],
    ['meta', { name: 'twitter:image', content: 'https://konglong87.github.io/anything-ai/og-image.png' }],
    ['link', { rel: 'llms.txt', href: '/anything-ai/llms.txt' }],
    ['link', { rel: 'llms-full.txt', href: '/anything-ai/llms-full.txt' }]
  ],

  // GEO：为每页注入 canonical / hreflang / JSON-LD（Article/TechArticle + WebSite）
  transformHtml(code, id, ctx) {
    const head = buildGeoHead(ctx)
    if (!head) return code
    // 用函数式 replacer：片段里的 $& / $' 等不会被当成替换模式解析
    return code.replace(/<\/head>/i, () => head + '\n</head>')
  },

  // 排除不需要的目录
  srcExclude: [
    'indexes/**',
    'scripts/**',
    'node_modules/**',
    'docs/superpowers/**',
    // 模板页不发布。必须用 **/ 前缀：只写 0-start-here/_templates/** 时
    // en/0-start-here/_templates/** 仍会建出页面，且其 hreflang 指向被排除的中文页 → 404
    '**/_templates/**',
    'PROGRESS.md',
    'CLAUDE.md',
    // 内部计划稿与临时素材，不应作为页面发布（否则会进 sitemap 并带上 canonical/JSON-LD）
    'GEO-PLAN.md',
    '_temp_karpathy/**'
  ],

  // 路由重写规则（修复根路径和英文路径404）
  rewrites: {
    'README.md': 'index.md',
    'en/README.md': 'en/index.md'
  },

  // i18n多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '从这里开始', link: '/0-start-here/README.html' },
          { text: '理解AI', link: '/1-understand-ai/README.html' },
          { text: '选择工具', link: '/2-choose-tools/README.html' },
          { text: '行业案例', link: '/roles/README.html' },
          { text: '进阶主题', link: '/4-advanced-topics/README.html' },
          { text: 'AI Skills', link: '/5-skills/README.html' },
          { text: '提示词库', link: '/prompts/README.html' },
          { text: '外部资源', link: '/resources/README.html' },
          { text: '资源下载', link: '/assets/README.html' },
          { text: '⭐ Star', link: 'https://github.com/konglong87/anything-ai' }
        ],
        sidebar: {
          '/': [
            {
              text: '从这里开始',
              collapsed: false,
              items: [
                { text: 'AI是什么', link: '/0-start-here/what-is-ai' },
                { text: '为什么不需要AI焦虑', link: '/0-start-here/ai-anxiety' },
                { text: 'AI不是许愿池', link: '/0-start-here/ai-not-wishing-well' },
                { text: '学习路径总览', link: '/0-start-here/learning-path' }
              ]
            },
            {
              text: '理解AI',
              collapsed: true,
              items: [
                { text: '概览', link: '/1-understand-ai/README.html' },
                { text: 'AI工程范式', link: '/1-understand-ai/ai-engineering-paradigms/README.html' },
                {
                  text: 'AI工程范式子专题',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '上下文工程', link: '/1-understand-ai/ai-engineering-paradigms/context-engineering/README.html' },
                    { text: 'Harness工程', link: '/1-understand-ai/ai-engineering-paradigms/harness-engineering/README.html' },
                    { text: '提示词工程', link: '/1-understand-ai/ai-engineering-paradigms/prompt-engineering/README.html' }
                  ]
                },
                {
                  text: 'LLM基础',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Transformer入门', link: '/1-understand-ai/llm-basics/transformer-intro' },
                    { text: 'Tokenization', link: '/1-understand-ai/llm-basics/tokenization' },
                    { text: '注意力机制', link: '/1-understand-ai/llm-basics/attention-mechanism' },
                    { text: '上下文窗口', link: '/1-understand-ai/llm-basics/context-window' },
                    { text: '预训练与微调', link: '/1-understand-ai/llm-basics/pretraining-finetuning' }
                  ]
                },
                {
                  text: 'AI如何思考',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '推理', link: '/1-understand-ai/how-ai-thinks/reasoning' },
                    { text: '概率预测', link: '/1-understand-ai/how-ai-thinks/probabilistic-prediction' },
                    { text: '幻觉', link: '/1-understand-ai/how-ai-thinks/hallucination' },
                    { text: '记忆机制', link: '/1-understand-ai/how-ai-thinks/memory-mechanisms' }
                  ]
                },
                {
                  text: 'Agent入门',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Agent简介', link: '/1-understand-ai/agent-intro/agent-intro' },
                    { text: 'Agent架构', link: '/1-understand-ai/agent-intro/agent-architecture' },
                    { text: 'Agent案例', link: '/1-understand-ai/agent-intro/agent-cases' }
                  ]
                },
                { text: '推理模型', link: '/1-understand-ai/reasoning-models' },
                { text: 'AI安全与对齐', link: '/1-understand-ai/ai-safety' }
              ]
            },
            {
              text: '选择工具',
              collapsed: true,
              items: [
                { text: '概览', link: '/2-choose-tools/README.html' },
                { text: '工具选择矩阵', link: '/2-choose-tools/tool-matrix' },
                { text: 'Agent Skills 元指南', link: '/2-choose-tools/agent-skills-guide' },
                { text: 'AI Skills与工具链详解', link: '/2-choose-tools/skills-guide' },
                { text: 'AI 编程 Agent 2026', link: '/2-choose-tools/ai-coding-agents-2026' },
                { text: '中国大模型格局 2026', link: '/2-choose-tools/china-llm-landscape-2026' },
                {
                  text: 'Claude',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Claude详细指南', link: '/2-choose-tools/tools/claude/README.html' },
                    { text: 'Claude Code最新15条技巧', link: '/2-choose-tools/tools/claude/boris-15-tips-2026-03' },
                    { text: 'Claude Code快速入门', link: '/2-choose-tools/tools/claude/claude-code-quickstart' },
                    { text: 'Claude Code完整指南', link: '/2-choose-tools/tools/claude/claude-code-guide' },
                    { text: 'Claude Code实战案例', link: '/2-choose-tools/tools/claude/claude-code-examples' },
                    { text: 'Claude Code专家模式', link: '/2-choose-tools/tools/claude/claude-code-expert' },
                    { text: 'GStack指南', link: '/2-choose-tools/tools/claude/gstack-guide' },
                    { text: 'Everything Claude Code', link: '/2-choose-tools/tools/claude/everything-claude-code' },
                    { text: 'CC切换指南', link: '/2-choose-tools/tools/claude/cc-switch-guide' },
                    { text: 'OpenClaw指南', link: '/2-choose-tools/tools/claude/openclaw-guide' }
                  ]
                },
                { text: 'DeepSeek详细指南', link: '/2-choose-tools/tools/deepseek/README.html' },
                { text: 'ChatGPT详细指南', link: '/2-choose-tools/tools/chatgpt/README.html' },
                { text: 'Copilot详细指南', link: '/2-choose-tools/tools/copilot/README.html' },
                { text: '豆包详细指南', link: '/2-choose-tools/tools/doubao/README.html' },
                { text: 'Hermes Agent', link: '/2-choose-tools/tools/hermes/README.html' }
              ]
            },
            {
              text: '行业案例',
              collapsed: true,
              items: [
                { text: '概览', link: '/roles/README.html' },
                {
                  text: '程序员',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '程序员指南', link: '/roles/programmer/README.html' },
                    { text: 'AI工具推荐', link: '/roles/programmer/ai-tools' },
                    { text: '代码助手', link: '/roles/programmer/code-assistant' },
                    { text: '代码审查', link: '/roles/programmer/code-review' }
                  ]
                },
                {
                  text: '内容创作者',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '内容创作者指南', link: '/roles/content-creator/README.html' },
                    { text: 'AI工具推荐', link: '/roles/content-creator/ai-tools' }
                  ]
                },
                {
                  text: '设计师',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '设计师指南', link: '/roles/designer/README.html' },
                    { text: 'AI工具推荐', link: '/roles/designer/ai-tools' }
                  ]
                },
                {
                  text: '教师',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '教师指南', link: '/roles/teacher/README.html' },
                    { text: '费曼技巧', link: '/roles/teacher/feynman-technique' }
                  ]
                },
                {
                  text: '学生',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '学生指南', link: '/roles/student/README.html' },
                    { text: '费曼技巧', link: '/roles/student/feynman-technique' }
                  ]
                },
                {
                  text: '财务',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '财务指南', link: '/roles/finance/README.html' },
                    { text: 'AI工具推荐', link: '/roles/finance/ai-tools' }
                  ]
                },
                { text: 'HR', link: '/roles/hr/README.html' },
                { text: '销售', link: '/roles/sales/README.html' },
                { text: '行政', link: '/roles/admin/README.html' },
                { text: '产品经理', link: '/roles/product-manager/README.html' },
                { text: 'Vibe Coding', link: '/roles/vibe-coding/README.html' },
                {
                  text: 'Vibe Coding子专题',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '工具推荐', link: '/roles/vibe-coding/tools' },
                    { text: '工作流程', link: '/roles/vibe-coding/workflow' }
                  ]
                },
                { text: '算命师', link: '/roles/fortune-teller/README.html' },
                { text: '代码审查员', link: '/roles/code-reviewer/README.html' },
                { text: '安全审查员', link: '/roles/security-reviewer/README.html' },
                { text: 'TDD指南', link: '/roles/tdd-guide/README.html' },
                { text: '规划师', link: '/roles/planner/README.html' }
              ]
            },
            {
              text: '进阶主题',
              collapsed: true,
              items: [
                { text: '概览', link: '/4-advanced-topics/README.html' },
                { text: 'Loop Engineering 🆕', link: '/4-advanced-topics/loop-engineering' },
                { text: '提示词工程', link: '/4-advanced-topics/prompt-engineering' },
                { text: '模型微调', link: '/4-advanced-topics/model-fine-tuning' },
                { text: '模型部署', link: '/4-advanced-topics/model-deployment' },
                { text: 'RAG', link: '/4-advanced-topics/rag' },
                { text: 'Agent开发', link: '/4-advanced-topics/agent-development' },
                { text: '深度研究指南', link: '/4-advanced-topics/deep-research-guide' },
                { text: 'MCP 模型上下文协议', link: '/4-advanced-topics/mcp' },
                { text: '世界模型与具身智能', link: '/4-advanced-topics/world-models' },
                { text: '全模态与AI视频生成', link: '/4-advanced-topics/multimodal-video' },
                { text: '深度学习', link: '/4-advanced-topics/deep-learning' },
                { text: '机器学习基础', link: '/4-advanced-topics/ml-basics' },
                { text: 'NLP', link: '/4-advanced-topics/nlp' },
                { text: '计算机视觉', link: '/4-advanced-topics/cv' },
                { text: '强化学习', link: '/4-advanced-topics/rl' },
                { text: '学习路径整合', link: '/4-advanced-topics/learning-path-integration' }
              ]
            },
            {
              text: 'AI Agents',
              collapsed: true,
              items: [
                { text: '全景指南', link: '/3-ai-agents/README.html' },
                { text: 'Agent 类型全景', link: '/3-ai-agents/agent-types' },
                { text: 'Agent 工作原理', link: '/3-ai-agents/agent-workflow' },
                { text: 'MCP 与工具集成', link: '/3-ai-agents/mcp-and-tools' },
                { text: 'Agent 框架选型', link: '/3-ai-agents/agent-frameworks' },
                { text: 'Coding Agent 实战', link: '/3-ai-agents/coding-agent-practice' },
                { text: 'Agent 安全与治理', link: '/3-ai-agents/agent-safety-governance' },
                { text: '多 Agent 协作实战', link: '/3-ai-agents/multi-agent-collaboration' },
                { text: 'Hermes Agent', link: '/3-ai-agents/hermes-agent/README.html' }
              ]
            },
            {
              text: 'Agent设计模式',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '教程概述', link: '/5-skills/agent/design-patterns/README.html' },
                { text: '第1章：提示词链', link: '/5-skills/agent/design-patterns/chapters/01-prompt-chaining.html' },
                { text: '第2章：路由', link: '/5-skills/agent/design-patterns/chapters/02-routing.html' },
                { text: '第3章：并行化', link: '/5-skills/agent/design-patterns/chapters/03-parallelization.html' },
                { text: '第4章：反思', link: '/5-skills/agent/design-patterns/chapters/04-reflection.html' },
                { text: '第5章：工具使用', link: '/5-skills/agent/design-patterns/chapters/05-tool-use.html' },
                { text: '第6章：规划', link: '/5-skills/agent/design-patterns/chapters/06-planning.html' },
                { text: '第7章：多Agent协作', link: '/5-skills/agent/design-patterns/chapters/07-multi-agent-collaboration.html' },
                { text: '第8章：记忆管理', link: '/5-skills/agent/design-patterns/chapters/08-memory-management.html' },
                { text: '第10章：MCP', link: '/5-skills/agent/design-patterns/chapters/10-model-context-protocol.html' },
                { text: '第11章：目标设定与监控', link: '/5-skills/agent/design-patterns/chapters/11-goal-setting-and-monitoring.html' },
                { text: '第12章：异常处理与恢复', link: '/5-skills/agent/design-patterns/chapters/12-exception-handling-and-recovery.html' },
                { text: '第13章：人在回路', link: '/5-skills/agent/design-patterns/chapters/13-human-in-the-loop.html' },
                { text: '第14章：知识检索', link: '/5-skills/agent/design-patterns/chapters/14-knowledge-retrieval.html' },
                { text: '第15章：Agent间通信', link: '/5-skills/agent/design-patterns/chapters/15-inter-agent-communication.html' },
                { text: '第16章：资源感知优化', link: '/5-skills/agent/design-patterns/chapters/16-resource-aware-optimization.html' },
                { text: '第17章：推理技术', link: '/5-skills/agent/design-patterns/chapters/17-reasoning-techniques.html' },
                { text: '第18章：护栏与安全模式', link: '/5-skills/agent/design-patterns/chapters/18-guardrails-safety-patterns.html' },
                { text: '第19章：评估与监控', link: '/5-skills/agent/design-patterns/chapters/19-evaluation-and-monitoring.html' },
                { text: '第20章：优先级排序', link: '/5-skills/agent/design-patterns/chapters/20-prioritization.html' },
                { text: '第21章：探索与发现', link: '/5-skills/agent/design-patterns/chapters/21-exploration-and-discovery.html' },
                {
                  text: '附录',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '附录A：高级提示词技术', link: '/5-skills/agent/design-patterns/appendix/appendix-a-advanced-prompting-techniques.html' },
                    { text: '附录B：AI Agent交互', link: '/5-skills/agent/design-patterns/appendix/appendix-b-ai-agentic-interactions.html' },
                    { text: '附录C：Agent框架概览', link: '/5-skills/agent/design-patterns/appendix/appendix-c-quick-overview-of-agentic-frameworks.html' },
                    { text: '附录D：AgentSpace构建', link: '/5-skills/agent/design-patterns/appendix/appendix-d-building-an-agent-with-agentspace.html' },
                    { text: '附录E：CLI上的AI Agent', link: '/5-skills/agent/design-patterns/appendix/appendix-e-ai-agents-on-the-cli.html' },
                    { text: '附录F：底层原理', link: '/5-skills/agent/design-patterns/appendix/appendix-f-under-the-hood.html' },
                    { text: '附录G：Coding Agent', link: '/5-skills/agent/design-patterns/appendix/appendix-g-coding-agents.html' }
                  ]
                }
              ]
            },
            {
              text: 'AI Skills',
              collapsed: true,
              items: [
                { text: 'Skills精选', link: '/5-skills/README.html' },
                { text: '完整索引', link: '/5-skills/INDEX.html' },
                { text: 'ECC 技能包', link: '/5-skills/tdd-workflow/README.html' },
                { text: 'Impeccable - 前端优化', link: '/5-skills/impeccable-skill/README.html' },
                { text: '职场生存技能', link: '/5-skills/career/README.html' },
                { text: '职场生存指南', link: '/5-skills/career/workplace-survival-guide' },
                { text: '玄学技能包', link: '/5-skills/xuanxue/README.html' },
                { text: '安全审查', link: '/5-skills/security-review/README.html' },
                {
                  text: '研究类',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '研究类概览', link: '/5-skills/research/README.html' },
                    { text: 'AI研究技能', link: '/5-skills/research/ai-research-skills' },
                    { text: 'Obsidian技能', link: '/5-skills/research/obsidian-skills' }
                  ]
                },
                {
                  text: '开发类',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '开发类概览', link: '/5-skills/development/README.html' },
                    { text: 'GStack', link: '/5-skills/development/gstack' },
                    { text: 'GStack + Claude Code', link: '/5-skills/development/gstack-claude-code' },
                    { text: 'Karpathy编码准则', link: '/5-skills/development/karpathy-guidelines' }
                  ]
                },
                {
                  text: '规划类',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '规划类概览', link: '/5-skills/planning/README.html' },
                    { text: '文件驱动规划', link: '/5-skills/planning/planning-with-files' }
                  ]
                },
                {
                  text: '效率类',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '效率类概览', link: '/5-skills/productivity/README.html' },
                    { text: '超能力技能', link: '/5-skills/productivity/superpower-skills' }
                  ]
                },
                {
                  text: 'Agent技能',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Agent概览', link: '/5-skills/agent/README.html' },
                    { text: 'Awesome Agent Skills', link: '/5-skills/agent/awesome-agent-skills' },
                    { text: 'Skills目录', link: '/5-skills/agent/skills-catalog' }
                  ]
                },
                {
                  text: '课程学习',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '课程概览', link: '/5-skills/course/README.html' },
                    { text: '课程索引', link: '/5-skills/course/INDEX.html' },
                    { text: '设计模式技能包', link: '/5-skills/course/skills-package-design-patterns' },
                    { text: '第2章：入口模式', link: '/5-skills/course/chapter-02-entry-pattern' },
                    { text: '第3章：模板方法模式', link: '/5-skills/course/chapter-03-template-method-pattern' },
                    { text: '第4章：责任链模式', link: '/5-skills/course/chapter-04-chain-of-responsibility' },
                    { text: '第5章：策略模式', link: '/5-skills/course/chapter-05-strategy-pattern' },
                    { text: '第6章：并行模式', link: '/5-skills/course/chapter-06-parallel-pattern' },
                    { text: '第7-8章：守护者与最佳实践', link: '/5-skills/course/chapter-07-08-guardian-and-best-practices' },
                    { text: '第8章：最佳实践', link: '/5-skills/course/chapter-08-best-practices' }
                  ]
                }
              ]
            },
            {
              text: '提示词库',
              collapsed: true,
              items: [
                { text: '概览', link: '/prompts/README.html' },
                { text: '系统提示词', link: '/prompts/system-prompts' },
                { text: '写作提示词', link: '/prompts/by-scene/writing-prompts' },
                { text: '编程提示词', link: '/prompts/by-scene/coding-prompts' },
                { text: '学习提示词', link: '/prompts/by-scene/learning-prompts' },
                { text: '分析提示词', link: '/prompts/by-scene/analysis-prompts' },
                { text: '研究写作提示词', link: '/prompts/by-scene/research-writing-prompts' },
                { text: '程序员提示词', link: '/prompts/by-role/programmer-prompts' }
              ]
            },
            {
              text: '外部资源',
              collapsed: true,
              items: [
                { text: '概览', link: '/resources/README.html' },
                { text: '行业工具指南', link: '/resources/industry-tools-guide' },
                {
                  text: 'AI工具资源',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '工具索引', link: '/resources/ai-tools/ai-tools-index' },
                    { text: 'AI应用资源', link: '/resources/ai-tools/ai-apps-resources' },
                    { text: 'AI工具资源', link: '/resources/ai-tools/ai-tools-resources' },
                    { text: 'Awesome AI DevTools', link: '/resources/ai-tools/awesome-ai-devtools' }
                  ]
                },
                {
                  text: '生成式AI资源',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: '生成式AI资源', link: '/resources/generative-ai/generative-ai-resources' },
                    { text: 'Awesome生成式AI', link: '/resources/generative-ai/awesome-generative-ai-resources' },
                    { text: 'Awesome AI资源', link: '/resources/generative-ai/awesome-ai-resources' }
                  ]
                },
                {
                  text: '专业资源',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Agent技能资源', link: '/resources/specialized/agent-skills-resources' },
                    { text: 'AI绘画资源', link: '/resources/specialized/ai-painting-resources' },
                    { text: 'AI研究写作', link: '/resources/specialized/ai-research-writing' },
                    { text: 'LangChain资源', link: '/resources/specialized/langchain-resources' },
                    { text: '编码规则', link: '/resources/specialized/coding-rules/README.html' }
                  ]
                },
                {
                  text: '外部链接',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Everything Claude Code精选', link: '/resources/external/everything-claude-code/README.html' },
                    { text: '系统提示词解密', link: '/resources/external/system-prompts-leaks' },
                    { text: '外部资源链接', link: '/resources/external/external-resources' }
                  ]
                }
              ]
            },
            {
              text: '资源下载',
              collapsed: true,
              items: [
                { text: '资源索引', link: '/assets/README.html' },
                { text: 'PDF教程', link: '/assets/pdf/readme.html' },
                { text: '工作流重构系列', link: '/assets/pdf/readme.html#ai-工作流重构系列教程' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Start Here', link: '/en/0-start-here/README.html' },
          { text: 'Understand AI', link: '/en/1-understand-ai/README.html' },
          { text: 'Choose Tools', link: '/en/2-choose-tools/README.html' },
          { text: 'Industry Cases', link: '/en/roles/README.html' },
          { text: 'Advanced Topics', link: '/en/4-advanced-topics/README.html' },
          { text: 'AI Skills', link: '/en/5-skills/README.html' },
          { text: 'Prompts', link: '/en/prompts/README.html' },
          { text: 'Resources', link: '/en/resources/README.html' },
          { text: 'Downloads', link: '/en/assets/README.html' },
          { text: '⭐ Star', link: 'https://github.com/konglong87/anything-ai' }
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Start Here',
              collapsed: false,
              items: [
                { text: 'What is AI', link: '/en/0-start-here/what-is-ai' },
                { text: 'Why No AI Anxiety', link: '/en/0-start-here/ai-anxiety' },
                { text: 'AI Is Not a Wishing Well', link: '/en/0-start-here/ai-not-wishing-well.en.html' },
                { text: 'Learning Path', link: '/en/0-start-here/learning-path' }
              ]
            },
            {
              text: 'Understand AI',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/1-understand-ai/README.html' },
                { text: 'AI Engineering Paradigms', link: '/en/1-understand-ai/ai-engineering-paradigms/README.html' },
                {
                  text: 'AI Engineering Paradigm Topics',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Context Engineering', link: '/en/1-understand-ai/ai-engineering-paradigms/context-engineering/README.html' },
                    { text: 'Harness Engineering', link: '/en/1-understand-ai/ai-engineering-paradigms/harness-engineering/README.html' },
                    { text: 'Prompt Engineering', link: '/en/1-understand-ai/ai-engineering-paradigms/prompt-engineering/README.html' }
                  ]
                },
                {
                  text: 'LLM Basics',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Transformer Intro', link: '/en/1-understand-ai/llm-basics/transformer-intro' },
                    { text: 'Tokenization', link: '/en/1-understand-ai/llm-basics/tokenization' },
                    { text: 'Attention Mechanism', link: '/en/1-understand-ai/llm-basics/attention-mechanism' },
                    { text: 'Context Window', link: '/en/1-understand-ai/llm-basics/context-window' },
                    { text: 'Pretraining & Finetuning', link: '/en/1-understand-ai/llm-basics/pretraining-finetuning' }
                  ]
                },
                {
                  text: 'How AI Thinks',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Reasoning', link: '/en/1-understand-ai/how-ai-thinks/reasoning' },
                    { text: 'Probabilistic Prediction', link: '/en/1-understand-ai/how-ai-thinks/probabilistic-prediction' },
                    { text: 'Hallucination', link: '/en/1-understand-ai/how-ai-thinks/hallucination' },
                    { text: 'Memory Mechanisms', link: '/en/1-understand-ai/how-ai-thinks/memory-mechanisms' }
                  ]
                },
                {
                  text: 'Agent Intro',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Agent Intro', link: '/en/1-understand-ai/agent-intro/agent-intro' },
                    { text: 'Agent Architecture', link: '/en/1-understand-ai/agent-intro/agent-architecture' },
                    { text: 'Agent Cases', link: '/en/1-understand-ai/agent-intro/agent-cases' }
                  ]
                },
                { text: 'Reasoning Models', link: '/en/1-understand-ai/reasoning-models' },
                { text: 'AI Safety & Alignment', link: '/en/1-understand-ai/ai-safety' }
              ]
            },
            {
              text: 'Choose Tools',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/2-choose-tools/README.html' },
                { text: 'Tool Matrix', link: '/en/2-choose-tools/tool-matrix' },
                { text: 'Agent Skills Meta-Guide', link: '/en/2-choose-tools/agent-skills-guide' },
                { text: 'AI Coding Agents 2026', link: '/en/2-choose-tools/ai-coding-agents-2026' },
                { text: 'China LLM Landscape 2026', link: '/en/2-choose-tools/china-llm-landscape-2026' },
                { text: 'Claude Guide', link: '/en/2-choose-tools/tools/claude/README.html' },
                { text: 'Claude Code 15 Latest Tips', link: '/en/2-choose-tools/tools/claude/boris-15-tips-2026-03' },
                { text: 'DeepSeek Guide', link: '/en/2-choose-tools/tools/deepseek/README.html' },
                { text: 'ChatGPT Guide', link: '/en/2-choose-tools/tools/chatgpt/README.html' },
                { text: 'Copilot Guide', link: '/en/2-choose-tools/tools/copilot/README.html' },
                { text: 'Doubao Guide', link: '/en/2-choose-tools/tools/doubao/README.html' },
                { text: 'Hermes Agent', link: '/en/2-choose-tools/tools/hermes/README.html' }
              ]
            },
            {
              text: 'Industry Cases',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/roles/README.html' },
                { text: 'Programmer', link: '/en/roles/programmer/README.html' },
                {
                  text: 'Programmer Topics',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Code Assistant', link: '/en/roles/programmer/code-assistant' },
                    { text: 'Code Review', link: '/en/roles/programmer/code-review' }
                  ]
                },
                { text: 'Content Creator', link: '/en/roles/content-creator/README.html' },
                { text: 'Designer', link: '/en/roles/designer/README.html' },
                { text: 'Teacher', link: '/en/roles/teacher/README.html' },
                { text: 'Student', link: '/en/roles/student/README.html' },
                { text: 'Finance', link: '/en/roles/finance/README.html' },
                { text: 'HR', link: '/en/roles/hr/README.html' },
                { text: 'Sales', link: '/en/roles/sales/README.html' },
                { text: 'Admin', link: '/en/roles/admin/README.html' },
                { text: 'Product Manager', link: '/en/roles/product-manager/README.html' },
                { text: 'Vibe Coding', link: '/en/roles/vibe-coding/README.html' },
                {
                  text: 'Vibe Coding Topics',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Tools', link: '/en/roles/vibe-coding/tools' },
                    { text: 'Workflow', link: '/en/roles/vibe-coding/workflow' }
                  ]
                },
                { text: 'Fortune Teller', link: '/en/roles/fortune-teller/README.html' },
                { text: 'Planner', link: '/en/roles/planner/README.html' }
              ]
            },
            {
              text: 'Advanced Topics',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/4-advanced-topics/README.html' },
                { text: 'Loop Engineering 🆕', link: '/en/4-advanced-topics/loop-engineering' },
                { text: 'Prompt Engineering', link: '/en/4-advanced-topics/prompt-engineering' },
                { text: 'Model Fine-tuning', link: '/en/4-advanced-topics/model-fine-tuning' },
                { text: 'Model Deployment', link: '/en/4-advanced-topics/model-deployment' },
                { text: 'RAG', link: '/en/4-advanced-topics/rag' },
                { text: 'Agent Development', link: '/en/4-advanced-topics/agent-development' },
                { text: 'Deep Research Guide', link: '/en/4-advanced-topics/deep-research-guide' },
                { text: 'MCP (Model Context Protocol)', link: '/en/4-advanced-topics/mcp' },
                { text: 'World Models & Embodied AI', link: '/en/4-advanced-topics/world-models' },
                { text: 'Omnimodal AI & Video Generation', link: '/en/4-advanced-topics/multimodal-video' },
                { text: 'Deep Learning', link: '/en/4-advanced-topics/deep-learning' },
                { text: 'ML Basics', link: '/en/4-advanced-topics/ml-basics' },
                { text: 'NLP', link: '/en/4-advanced-topics/nlp' },
                { text: 'Computer Vision', link: '/en/4-advanced-topics/cv' },
                { text: 'Reinforcement Learning', link: '/en/4-advanced-topics/rl' }
              ]
            },
            {
              text: 'AI Agents',
              collapsed: true,
              items: [
                { text: 'Complete Guide', link: '/en/3-ai-agents/README.html' },
                { text: 'Agent Types', link: '/en/3-ai-agents/agent-types' },
                { text: 'How Agents Work', link: '/en/3-ai-agents/agent-workflow' },
                { text: 'MCP & Tool Integration', link: '/en/3-ai-agents/mcp-and-tools' },
                { text: 'Agent Frameworks', link: '/en/3-ai-agents/agent-frameworks' },
                { text: 'Coding Agent Practice', link: '/en/3-ai-agents/coding-agent-practice' },
                { text: 'Agent Safety & Governance', link: '/en/3-ai-agents/agent-safety-governance' },
                { text: 'Multi-Agent Collaboration', link: '/en/3-ai-agents/multi-agent-collaboration' },
                { text: 'Hermes Agent', link: '/en/3-ai-agents/hermes-agent/README.html' }
              ]
            },
            {
              text: 'Agent Design Patterns',
              collapsible: true,
              collapsed: false,
              items: [
                { text: 'Course Overview', link: '/en/5-skills/agent/design-patterns/README.en.html' },
                { text: 'Chapter 1: Prompt Chaining', link: '/en/5-skills/agent/design-patterns/chapters/01-prompt-chaining.en.html' },
                { text: 'Chapter 2: Routing', link: '/en/5-skills/agent/design-patterns/chapters/02-routing.en.html' },
                { text: 'Chapter 3: Parallelization', link: '/en/5-skills/agent/design-patterns/chapters/03-parallelization.en.html' },
                { text: 'Full Catalog', link: '/en/5-skills/agent/design-patterns/README.en.html#learning-path' }
              ]
            },
            {
              text: 'AI Skills',
              collapsed: true,
              items: [
                { text: 'Skills Collection', link: '/en/5-skills/README.html' },
                { text: 'Impeccable - Frontend', link: '/en/5-skills/impeccable-skill/README.en.html' },
                { text: 'Career Survival', link: '/en/5-skills/career/README.html' },
                { text: 'Xuanxue Skills', link: '/en/5-skills/xuanxue/README.html' },
                { text: 'Full Index', link: '/en/5-skills/INDEX.html' },
                {
                  text: 'Course',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Course Overview', link: '/en/5-skills/course/README.html' },
                    { text: 'Course Index', link: '/en/5-skills/course/INDEX.html' },
                    { text: 'Design Patterns Skill Package', link: '/en/5-skills/course/skills-package-design-patterns' },
                    { text: 'Chapter 2: Entry Pattern', link: '/en/5-skills/course/chapter-02-entry-pattern' },
                    { text: 'Chapter 3: Template Method', link: '/en/5-skills/course/chapter-03-template-method-pattern' },
                    { text: 'Chapter 4: Chain of Responsibility', link: '/en/5-skills/course/chapter-04-chain-of-responsibility' },
                    { text: 'Chapter 5: Strategy Pattern', link: '/en/5-skills/course/chapter-05-strategy-pattern' },
                    { text: 'Chapter 6: Parallel Pattern', link: '/en/5-skills/course/chapter-06-parallel-pattern' },
                    { text: 'Chapter 7-8: Guardian & Best Practices', link: '/en/5-skills/course/chapter-07-08-guardian-and-best-practices' },
                    { text: 'Chapter 8: Best Practices', link: '/en/5-skills/course/chapter-08-best-practices' }
                  ]
                }
              ]
            },
            {
              text: 'Prompts',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/prompts/README.html' },
                { text: 'System Prompts', link: '/en/prompts/system-prompts' },
                { text: 'Writing Prompts', link: '/en/prompts/by-scene/writing-prompts' },
                { text: 'Coding Prompts', link: '/en/prompts/by-scene/coding-prompts' },
                { text: 'Learning Prompts', link: '/en/prompts/by-scene/learning-prompts' },
                { text: 'Analysis Prompts', link: '/en/prompts/by-scene/analysis-prompts' },
                { text: 'Research Writing', link: '/en/prompts/by-scene/research-writing-prompts' },
                { text: 'Programmer Prompts', link: '/en/prompts/by-role/programmer-prompts' }
              ]
            },
            {
              text: 'Resources',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/resources/README.html' },
                {
                  text: 'AI Tools',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Tools Index', link: '/en/resources/ai-tools/ai-tools-index' },
                    { text: 'AI Apps Resources', link: '/en/resources/ai-tools/ai-apps-resources' },
                    { text: 'AI Tools Resources', link: '/en/resources/ai-tools/ai-tools-resources' },
                    { text: 'Awesome AI DevTools', link: '/en/resources/ai-tools/awesome-ai-devtools' }
                  ]
                },
                {
                  text: 'Generative AI',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Generative AI Resources', link: '/en/resources/generative-ai/generative-ai-resources' },
                    { text: 'Awesome Generative AI', link: '/en/resources/generative-ai/awesome-generative-ai-resources' },
                    { text: 'Awesome AI Resources', link: '/en/resources/generative-ai/awesome-ai-resources' }
                  ]
                },
                {
                  text: 'Specialized',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Agent Skills Resources', link: '/en/resources/specialized/agent-skills-resources' },
                    { text: 'AI Painting Resources', link: '/en/resources/specialized/ai-painting-resources' },
                    { text: 'AI Research Writing', link: '/en/resources/specialized/ai-research-writing' },
                    { text: 'LangChain Resources', link: '/en/resources/specialized/langchain-resources' }
                  ]
                },
                {
                  text: 'External Links',
                  collapsible: true,
                  collapsed: true,
                  items: [
                    { text: 'Everything Claude Code', link: '/en/resources/external/everything-claude-code/README.en.html' },
                    { text: 'System Prompts Leaks', link: '/en/resources/external/system-prompts-leaks' },
                    { text: 'External Links', link: '/en/resources/external/external-resources' }
                  ]
                }
              ]
            },
            {
              text: 'Downloads',
              collapsed: true,
              items: [
                { text: 'Assets Index', link: '/en/assets/README.html' },
                { text: 'PDF Tutorials', link: '/en/assets/pdf/readme.html' },
                { text: 'Workflow Restructuring', link: '/en/assets/pdf/readme.html#ai-workflow-restructuring-series' }
              ]
            }
          ]
        }
      }
    }
  },

  // 主题配置
  themeConfig: {
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/konglong87/anything-ai' }
    ],

    // 本地搜索
    search: {
      provider: 'local'
    },

    // 页脚
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2026 Anything-AI Community'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/konglong87/anything-ai/edit/main/:path',
      text: '在GitHub上编辑此页'
    }
  }
})
