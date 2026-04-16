import { defineConfig } from 'vitepress'

export default defineConfig({
  // GitHub Pages部署配置
  base: '/anything-ai/',

  // 站点元数据
  title: 'Anything-AI',
  description: '系统性AI知识索引 - 帮助人们认识、理解和驾驭AI',

  // 忽略死链接检查
  ignoreDeadLinks: true,

  // 排除不需要的目录
  srcExclude: [
    'indexes/**',
    'scripts/**',
    'node_modules/**',
    'docs/superpowers/**',
    '0-start-here/_templates/**',
    'PROGRESS.md',
    'CLAUDE.md'
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
          { text: '资源下载', link: '/assets/README.html' }
        ],
        sidebar: {
          '/': [
            {
              text: '从这里开始',
              collapsed: false,
              items: [
                { text: 'AI是什么', link: '/0-start-here/what-is-ai' },
                { text: '为什么不需要AI焦虑', link: '/0-start-here/ai-anxiety' },
                { text: '学习路径总览', link: '/0-start-here/learning-path' }
              ]
            },
            {
              text: '理解AI',
              collapsed: true,
              items: [
                { text: '概览', link: '/1-understand-ai/README.html' },
                { text: 'AI工程范式', link: '/1-understand-ai/ai-engineering-paradigms/README.html' },
                { text: 'LLM基础', link: '/1-understand-ai/llm-basics/transformer-intro' },
                { text: 'AI如何思考', link: '/1-understand-ai/how-ai-thinks/reasoning' },
                { text: 'Agent入门', link: '/1-understand-ai/agent-intro/agent-intro' }
              ]
            },
            {
              text: '选择工具',
              collapsed: true,
              items: [
                { text: '概览', link: '/2-choose-tools/README.html' },
                { text: '工具选择矩阵', link: '/2-choose-tools/tool-matrix' },
                { text: 'Claude详细指南', link: '/2-choose-tools/tools/claude/README.html' },
 { text: 'Claude Code最新15条技巧', link: '/2-choose-tools/tools/claude/boris-15-tips-2026-03' },
                { text: 'DeepSeek详细指南', link: '/2-choose-tools/tools/deepseek/README.html' },
                { text: 'ChatGPT详细指南', link: '/2-choose-tools/tools/chatgpt/README.html' },
                { text: '豆包详细指南', link: '/2-choose-tools/tools/doubao/README.html' },
                { text: 'Hermes Agent', link: '/2-choose-tools/tools/hermes/README.html' }
              ]
            },
            {
              text: '行业案例',
              collapsed: true,
              items: [
                { text: '程序员', link: '/roles/programmer/README.html' },
                { text: '内容创作者', link: '/roles/content-creator/README.html' },
                { text: '教师', link: '/roles/teacher/README.html' },
                { text: '学生', link: '/roles/student/README.html' },
                { text: '财务', link: '/roles/finance/README.html' },
                { text: 'HR', link: '/roles/hr/README.html' },
                { text: '销售', link: '/roles/sales/README.html' },
                { text: '设计师', link: '/roles/designer/README.html' },
                { text: '行政', link: '/roles/admin/README.html' }
              ]
            },
            {
              text: '进阶主题',
              collapsed: true,
              items: [
                { text: '概览', link: '/4-advanced-topics/README.html' },
                { text: '提示词工程', link: '/4-advanced-topics/prompt-engineering' },
                { text: '模型微调', link: '/4-advanced-topics/model-fine-tuning' },
                { text: 'RAG', link: '/4-advanced-topics/rag' },
                { text: 'Agent开发', link: '/4-advanced-topics/agent-development' },
                { text: '深度研究指南', link: '/4-advanced-topics/deep-research-guide' }
              ]
            },
            {
              text: 'AI Agents',
              collapsed: true,
              items: [
                { text: 'Hermes Agent', link: '/3-ai-agents/hermes-agent/README.html' }
              ]
            },
            {
              text: 'AI Skills',
              collapsed: true,
              items: [
 { text: 'ECC 技能包', link: '/5-skills/tdd-workflow/README.html' },
          { text: 'Impeccable - 前端优化', link: '/5-skills/impeccable-skill/README.html' },
                { text: 'Skills精选', link: '/5-skills/README.html' },
                { text: '完整索引', link: '/5-skills/INDEX.html' },
                { text: '研究类', link: '/5-skills/research/README.html' },
                { text: '开发类', link: '/5-skills/development/README.html' },
                { text: '规划类', link: '/5-skills/planning/README.html' },
                { text: '课程学习', link: '/5-skills/course/README.html' }
              ]
            },
            {
              text: '提示词库',
              collapsed: true,
              items: [
                { text: '概览', link: '/prompts/README.html' },
                { text: '写作提示词', link: '/prompts/by-scene/writing-prompts' },
                { text: '编程提示词', link: '/prompts/by-scene/coding-prompts' },
                { text: '学习提示词', link: '/prompts/by-scene/learning-prompts' },
                { text: '分析提示词', link: '/prompts/by-scene/analysis-prompts' },
                { text: '研究写作提示词', link: '/prompts/by-scene/research-writing-prompts' }
              ]
            },
            {
              text: '外部资源',
              collapsed: true,
              items: [
                { text: '概览', link: '/resources/README.html' },
                { text: 'AI工具资源', link: '/resources/ai-tools/ai-tools-index' },
                { text: '生成式AI资源', link: '/resources/generative-ai/generative-ai-resources' },
 { text: 'Everything Claude Code精选', link: '/resources/external/everything-claude-code/README.html' },
                { text: '外部资源链接', link: '/resources/external/external-resources' }
              ]
            },
            {
              text: '资源下载',
              collapsed: true,
              items: [
                { text: '资源索引', link: '/assets/README.html' },
                { text: 'PDF教程', link: '/assets/pdf/readme.html' }
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
          { text: 'Downloads', link: '/en/assets/README.html' }
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Start Here',
              collapsed: false,
              items: [
                { text: 'What is AI', link: '/en/0-start-here/what-is-ai' },
                { text: 'Why No AI Anxiety', link: '/en/0-start-here/ai-anxiety' },
                { text: 'Learning Path', link: '/en/0-start-here/learning-path' }
              ]
            },
            {
              text: 'Understand AI',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/1-understand-ai/README.html' },
                { text: 'AI Engineering Paradigms', link: '/en/1-understand-ai/ai-engineering-paradigms/README.html' },
                { text: 'LLM Basics', link: '/en/1-understand-ai/llm-basics/transformer-intro' },
                { text: 'How AI Thinks', link: '/en/1-understand-ai/how-ai-thinks/reasoning' },
                { text: 'Agent Intro', link: '/en/1-understand-ai/agent-intro/agent-intro' }
              ]
            },
            {
              text: 'Choose Tools',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/2-choose-tools/README.html' },
                { text: 'Tool Matrix', link: '/en/2-choose-tools/tool-matrix' },
                { text: 'Claude Guide', link: '/en/2-choose-tools/tools/claude/README.html' },
 { text: 'Claude Code 15 Latest Tips', link: '/en/2-choose-tools/tools/claude/boris-15-tips-2026-03' },
                { text: 'DeepSeek Guide', link: '/en/2-choose-tools/tools/deepseek/README.html' },
                { text: 'ChatGPT Guide', link: '/en/2-choose-tools/tools/chatgpt/README.html' },
                { text: 'Doubao Guide', link: '/en/2-choose-tools/tools/doubao/README.html' },
                { text: 'Hermes Agent', link: '/en/2-choose-tools/tools/hermes/README.html' }
              ]
            },
            {
              text: 'Industry Cases',
              collapsed: true,
              items: [
                { text: 'Programmer', link: '/en/roles/programmer/README.html' },
                { text: 'Content Creator', link: '/en/roles/content-creator/README.html' },
                { text: 'Teacher', link: '/en/roles/teacher/README.html' },
                { text: 'Student', link: '/en/roles/student/README.html' },
                { text: 'Finance', link: '/en/roles/finance/README.html' },
                { text: 'HR', link: '/en/roles/hr/README.html' },
                { text: 'Sales', link: '/en/roles/sales/README.html' },
                { text: 'Designer', link: '/en/roles/designer/README.html' },
                { text: 'Admin', link: '/en/roles/admin/README.html' }
              ]
            },
            {
              text: 'Advanced Topics',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/4-advanced-topics/README.html' },
                { text: 'Prompt Engineering', link: '/en/4-advanced-topics/prompt-engineering' },
                { text: 'Model Fine-tuning', link: '/en/4-advanced-topics/model-fine-tuning' },
                { text: 'RAG', link: '/en/4-advanced-topics/rag' },
                { text: 'Agent Development', link: '/en/4-advanced-topics/agent-development' },
                { text: 'Deep Research Guide', link: '/en/4-advanced-topics/deep-research-guide' }
              ]
            },
            {
              text: 'AI Agents',
              collapsed: true,
              items: [
                { text: 'Hermes Agent', link: '/en/3-ai-agents/hermes-agent/README.html' }
              ]
            },
            {
              text: 'AI Skills',
              collapsed: true,
              items: [
                { text: 'Skills Collection', link: '/en/5-skills/README.html' },
          { text: 'Impeccable - Frontend', link: '/en/5-skills/impeccable-skill/README.en.html' },
                { text: 'Full Index', link: '/en/5-skills/INDEX.html' },
                { text: 'Course', link: '/en/5-skills/course/README.html' }
              ]
            },
            {
              text: 'Prompts',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/prompts/README.html' },
                { text: 'Writing Prompts', link: '/en/prompts/by-scene/writing-prompts' },
                { text: 'Coding Prompts', link: '/en/prompts/by-scene/coding-prompts' },
                { text: 'Learning Prompts', link: '/en/prompts/by-scene/learning-prompts' },
                { text: 'Analysis Prompts', link: '/en/prompts/by-scene/analysis-prompts' },
                { text: 'Research Writing', link: '/en/prompts/by-scene/research-writing-prompts' }
              ]
            },
            {
              text: 'Resources',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/resources/README.html' },
 { text: 'Everything Claude Code', link: '/en/resources/external/everything-claude-code/README.en.html' },
                { text: 'AI Tools Resources', link: '/en/resources/ai-tools/ai-tools-index' },
                { text: 'Generative AI', link: '/en/resources/generative-ai/generative-ai-resources' },
                { text: 'External Links', link: '/en/resources/external/external-resources' }
              ]
            },
            {
              text: 'Downloads',
              collapsed: true,
              items: [
                { text: 'Assets Index', link: '/en/assets/README.html' },
                { text: 'PDF Tutorials', link: '/en/assets/pdf/readme.html' }
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