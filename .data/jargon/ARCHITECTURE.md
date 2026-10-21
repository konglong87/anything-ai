---
title: Jargon 提示词库实现方案
difficulty: advanced
roles: [programmer]
type: guide
duration: 15min
---

# Jargon 提示词库实现与验收方案

## 决策
- 本轮上游固定为 konglong87/feeling-to-jargon @ 4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d；仅从 git 对象导出，不读工作区修改。
- `.data/jargon/upstream` 保存完整公开源码快照与 LICENSE；lock.json 记录提交与逐文件 SHA256；CI 构建离线。
- 现有 VitePress 负责静态阅读与本地搜索，不新增服务端、模型调用、数据库或 UI 框架。
- 规范化与提示词渲染是纯模块；页面、剪贴板、合集下载、组合器全部消费同一份生成数据。
- 每个叶子的每条 entry 单独展示，9 个独立模板另外展示；19 个 legacy 包只做溯源/草稿参考，不重复算作新模板。
- 所有来源字段完整保存在快照和原文页。状态机、验收、可访问性、性能/降级、provider 和待核验边界必须进入可复制文本。
- template 的 base_ip_ref / contract_ref 必须展开。多风格与多布局使用单选，不把互斥方向混入同一执行提示。
- 上游 source_gaps 明确保留，第五例未定执行逻辑不补造，第六例缺失不制造空案例。
- 复制合集保持各条分隔；组合器只允许同一领域、非互斥模块、兼容 provider，最多 8 条。

## 模块契约
生成数据路径：`.vitepress/theme/jargon/catalog.json`。
形状：{ source:{repository,commit,importedAt}, stats:{domains,leaves,entries,templates,legacy,drafts}, domains:[{id,title,description,count}], items:[Item] }。
Item: {id,title,domainId,domainTitle,subdomainId,subdomainTitle,kind,status,description,whenToUse,aliases:string[],prompt:string,fields:[{key,label,placeholder}],choices:[{key,label,options:[{value,label,text}]}],warnings:string[],sourcePath,sourceUrl,sourceFiles:string[],detailPath,exclusiveGroup:string|null,provider:string|null}。
- status 为 published/reference；draft 放领域原文页面，不出现在可执行卡片中。
- prompt 中的 {{key}} 由纯模块替换；没有填写时保留清晰的「[待填写：标签]」。choices 必须选取一个选项，默认第一项并在界面明确显示。
- detailPath 形如 /prompts/jargon/scenes/<id>.html，前端使用 VitePress withBase。
- `scripts/jargon/prompt-core.mjs` 导出 `renderPrompt(item, values={})`, `checkSelection(items) -> {ok,message}`, `composePrompts(items, values={}) -> string`, `exportCollection(items) -> string`, `MAX_SELECTION`。
- 组件：JargonLibrary.vue（分类/搜索/批量复制/组合），JargonPrompt.vue（id 属性，填写参数/单选/完整复制/加入组合），共享 useClipboard.ts 和 selection.ts。
- sessionStorage 只保存选择 id，不保存用户填写内容；SSR 安全，刷新时丢弃失效 id。
- 页面原文阅读应在无 JS 时仍然可用；组件 SSR 渲染初始卡片与提示词。

## 计划
1. 快照、校验、规范化、生成静态场景页/领域页/合集/覆盖清单；纯函数测试。
2. 分类库与可复用复制/组合组件，接入主题与导航；构建验证。
3. 桌面/手机/暗色截图，真实浏览器 E2E 验证搜索、分类、填参、复制内容一致、组合冲突、清空、刷新、键盘与无结果状态。
4. 复查来源覆盖、草稿与敏感信息边界、站内链接；提交 push，等待 Pages，线上复验。

## 验收
- 上游文件 SHA 与锁定提交一致；105 叶子、120 entries、9 templates、19 legacy 均可对账。
- template/contract 依赖不丢失，不出现虚构补全；复制文本不是 JSON 引用指令。
- 浏览器粘贴结果与实际展示文本完全一致；错误时无虚假成功反馈。
- 同组互斥方向不能组合；跨领域与不兼容工具有清晰反馈；合集不被当成单一任务。
- 页面在桌面/移动端/暗色无横向溢出；详情直达、返回、来源链接正常。
- `npm run build`、永久回归测试通过；截图与验收报告保留，临时服务器和中间产物清理。
