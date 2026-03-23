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

  // i18n多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '从这里开始', link: '/0-start-here/' },
          { text: '理解AI', link: '/1-understand-ai/README.md' },
          { text: '选择工具', link: '/2-choose-tools/README.md' },
          { text: '行业案例', link: '/roles/README.md' },
          { text: '进阶主题', link: '/4-advanced-topics/README.md' },
          { text: '提示词库', link: '/prompts/README.md' },
          { text: '外部资源', link: '/resources/README.md' }
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
                { text: '深入原理', link: '/1-understand-ai/README.md' }
              ]
            },
            {
              text: '选择工具',
              collapsed: true,
              items: [
                { text: '工具选择矩阵', link: '/2-choose-tools/tool-matrix' }
              ]
            },
            {
              text: '行业案例',
              collapsed: true,
              items: [
                { text: '程序员', link: '/roles/programmer/README.md' },
                { text: '内容创作者', link: '/roles/content-creator/README.md' },
                { text: '教师', link: '/roles/teacher/README.md' },
                { text: '学生', link: '/roles/student/README.md' },
                { text: '财务', link: '/roles/finance/README.md' },
                { text: 'HR', link: '/roles/hr/README.md' },
                { text: '销售', link: '/roles/sales/README.md' },
                { text: '设计师', link: '/roles/designer/README.md' },
                { text: '行政', link: '/roles/admin/README.md' }
              ]
            },
            {
              text: '进阶主题',
              collapsed: true,
              items: [
                { text: '概览', link: '/4-advanced-topics/README.md' }
              ]
            },
            {
              text: '提示词库',
              collapsed: true,
              items: [
                { text: '概览', link: '/prompts/README.md' }
              ]
            },
            {
              text: '外部资源',
              collapsed: true,
              items: [
                { text: '概览', link: '/resources/README.md' }
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
          { text: 'Start Here', link: '/en/0-start-here/' },
          { text: 'Understand AI', link: '/en/1-understand-ai/README.md' },
          { text: 'Choose Tools', link: '/en/2-choose-tools/README.md' },
          { text: 'Industry Cases', link: '/en/roles/README.md' },
          { text: 'Advanced Topics', link: '/en/4-advanced-topics/README.md' },
          { text: 'Prompts', link: '/en/prompts/README.md' },
          { text: 'Resources', link: '/en/resources/README.md' }
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
                { text: 'Deep Principles', link: '/en/1-understand-ai/README.md' }
              ]
            },
            {
              text: 'Choose Tools',
              collapsed: true,
              items: [
                { text: 'Tool Matrix', link: '/en/2-choose-tools/tool-matrix' }
              ]
            },
            {
              text: 'Industry Cases',
              collapsed: true,
              items: [
                { text: 'Programmer', link: '/en/roles/programmer/README.md' },
                { text: 'Content Creator', link: '/en/roles/content-creator/README.md' },
                { text: 'Teacher', link: '/en/roles/teacher/README.md' },
                { text: 'Student', link: '/en/roles/student/README.md' },
                { text: 'Finance', link: '/en/roles/finance/README.md' },
                { text: 'HR', link: '/en/roles/hr/README.md' },
                { text: 'Sales', link: '/en/roles/sales/README.md' },
                { text: 'Designer', link: '/en/roles/designer/README.md' },
                { text: 'Admin', link: '/en/roles/admin/README.md' }
              ]
            },
            {
              text: 'Advanced Topics',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/4-advanced-topics/README.md' }
              ]
            },
            {
              text: 'Prompts',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/prompts/README.md' }
              ]
            },
            {
              text: 'Resources',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/resources/README.md' }
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