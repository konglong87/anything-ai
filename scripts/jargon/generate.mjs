#!/usr/bin/env node
import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { buildCatalog, readJSON, readSource, readLock, PROJECT_ROOT } from './normalize.mjs';
import { renderPrompt, exportCollection } from './prompt-core.mjs';
import { KIND_LABELS } from './labels.mjs';
const catalog=buildCatalog(); const lock=readLock(); const managed=[];
const target=path=>join(PROJECT_ROOT,path);
const put=(path,body)=>{mkdirSync(dirname(target(path)),{recursive:true});writeFileSync(target(path),path.endsWith('.md') ? body.trimEnd()+'\n' : body);managed.push(path);};
const json=value=>JSON.stringify(value,null,2)+'\n';
const fm=(title,extra='')=>`---\ntitle: ${JSON.stringify(title)}\ndifficulty: beginner\nroles: [everyone]\ntype: guide\nduration: 5min\ntags: [提示词, Jargon]\n${extra}---\n\n`;
const code=(text,language='text')=>`\n\`\`\`\`${language}\n${text.trim()}\n\`\`\`\`\n`;
const sourceLink=path=>`${lock.repository}/blob/${lock.commit}/${path}`;
const domainPath=id=>`/prompts/jargon/domains/${id}.html`;
const rawSlug=path=>path.replace(/\//g,'--').replace(/\.json$/,'');
const legacyPaths=Object.keys(lock.files).filter(path=>/^terms\/[^/]+\.json$/.test(path)).sort();
const leafManifest=readJSON('index/leaves.json').leaves;
put('.vitepress/theme/jargon/catalog.json',json(catalog));
put('.vitepress/theme/jargon/discovery.json',json({total:catalog.items.length,templates:catalog.stats.templates,domains:catalog.domains.filter(domain=>domain.count>0).map(({id,title,count})=>({id,title,count})),kinds:[...new Set(catalog.items.map(item=>item.kind))]}));
const landing=fm('专业提示词 · 把感觉说清楚','outline: false\n')+`# 专业提示词\n\n把「有质感」「顺滑」「稳定」变成可执行的专业表达。**先找场景，再看取舍，最后复制。**\n\n<JargonLibrary />\n\n## 阅读与来源\n\n这里有 ${catalog.stats.entries} 条术语/模式条目和 ${catalog.stats.templates} 个结构化模板，来自 ${catalog.stats.leaves} 个叶子包。并非每一条都是原作者写好的成品提示词：本站保留原文，同时提供明确标注的整理版。\n\n- [使用方法与组合边界](./guide.md)\n- [完整来源、覆盖清单与许可证](./sources.md)\n- [全部素材合集（TXT）](/jargon/all-prompts.txt) · [锁定源码快照（JSON）](/jargon/source.json)\n\n### 全部领域（纯文字导航）\n\n${catalog.domains.map(d=>`- [${d.title}](${domainPath(d.id)}) — ${d.count ? `${d.count} 条可浏览内容`:'骨架 / 草稿参考，尚无可执行模板'}`).join('\n')}\n`;
put('prompts/jargon/README.md',landing);
for(const item of catalog.items) {
  const warnings=item.warnings.length?`::: warning 适用边界\n${item.warnings.map(w=>'- '+w).join('\n')}\n:::\n\n`:'';
  const original=item.sourcePath.startsWith('terms/') ? (()=>{const d=readJSON(item.sourcePath);return {...Object.fromEntries(Object.entries(d).filter(([k])=>k!=='entries')),entries:d.entries.filter(e=>item.id===`${d.leaf_id}--${e.id}`)};})() : readJSON(item.sourcePath);
  const text=fm(item.title)+`# ${item.title}\n\n[专业提示词库](../README.md) / [${item.domainTitle}](${domainPath(item.domainId)}) / ${KIND_LABELS[item.kind]||item.kind}\n\n${item.description}\n\n**适用场景：** ${item.whenToUse}\n\n${warnings}<JargonPrompt id="${item.id}" />\n\n## 如何把白话说具体\n\n本条目将「${item.whenToUse}」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。\n\n${item.aliases.length ? '**检索词（含站点导引词）：** '+item.aliases.join('、')+'\n\n':''}::: details 阅读完整文字版（保留待填写项，可直接复制）\n${code(renderPrompt(item))}\n:::\n\n## 原始资料与依赖\n\n以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。\n\n${item.sourceFiles.map(path=>`- [${path}](${sourceLink(path)})`).join('\n')}\n\n::: details 展开当前条目原文\n${code(JSON.stringify(original,null,2),'json')}\n:::\n\n[查看覆盖清单与许可证](../sources.md) · 来源提交：\`${lock.commit.slice(0,7)}\`\n`;
  put(`prompts/jargon/scenes/${item.id}.md`,text);
}
for(const domain of catalog.domains) {
  const items=catalog.items.filter(item=>item.domainId===domain.id);
  const legacy=legacyPaths.filter(path=>readJSON(path).domain_id===domain.id);
  const available=items.length>0;
  put(`prompts/jargon/domains/${domain.id}.md`,fm(domain.title)+`# ${domain.title}\n\n[返回专业提示词库](../README.md)\n\n${domain.description}\n\n${available?`共 **${items.length} 条**可浏览内容。待核验/待确认条目会单独标记，不进入执行组合。`:'::: warning 尚未形成可执行内容\n本领域只有骨架和草稿资料，不能视为已审核的专业模板，不在默认执行库中出现。\n:::'}\n\n## 场景与条目\n\n${items.map(item=>`- [${item.title}](${item.detailPath})${item.status==='reference'?' **〔待核验 / 待确认〕**':''} — ${item.description}`).join('\n')||'暂无正式条目。'}\n\n${available?`[下载本领域合集（TXT）](/jargon/collections/${domain.id}.txt)\n\n`:''}## 原始领域包\n\n以下为旧版聚合包或草稿，保留原文便于追溯，不重复统计为新模板。\n\n${legacy.map(path=>`- [${readJSON(path).title}：${readJSON(path).status==='draft'?'草稿，仅供参考':'旧版聚合原文'}](../reference/${rawSlug(path)}.md)`).join('\n')}\n`);
  if(available)put(`public/jargon/collections/${domain.id}.txt`,exportCollection(items)+'\n');
}
for(const path of legacyPaths) {
  const doc=readJSON(path); const draft=doc.status==='draft';
  put(`prompts/jargon/reference/${rawSlug(path)}.md`,fm(`${doc.title} · ${draft?'草稿参考':'旧版原文'}`)+`# ${doc.title}\n\n[返回所属领域](${domainPath(doc.domain_id)}) · [完整来源](../sources.md)\n\n::: warning ${draft?'草稿，非正式模板':'旧版聚合包，非新增模板'}\n${draft?'本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。':'本包与渐进式叶子有重叠；保留全部原文便于学习，不重复计入场景数量。'}\n:::\n\n## 原文\n\n${code(JSON.stringify(doc,null,2),'json')}\n\n[查看固定版本来源](${sourceLink(path)})\n`);
}
const coverage=Object.keys(lock.files).sort().map(path=>({path,sha256:lock.files[path],role:path.startsWith('templates/')?'template':/^terms\/[^/]+\.json$/.test(path)?'legacy-reference':path.startsWith('terms/')?'leaf':path.startsWith('index/')?'index':path.endsWith('SKILL.md')?'skill':'supporting',sceneIds:catalog.items.filter(item=>item.sourceFiles.includes(path)).map(item=>item.id)}));
const report={source:catalog.source,stats:catalog.stats,totalFiles:coverage.length,sceneCount:catalog.items.length,files:coverage};
put('public/jargon/coverage.json',json(report));
put('public/jargon/source.json',json({lock,files:Object.fromEntries(Object.keys(lock.files).sort().map(path=>[path,readSource(path)]))}));
put('public/jargon/all-prompts.txt',exportCollection(catalog.items)+'\n');
put('public/jargon/LICENSE.txt',readSource('LICENSE'));
put('prompts/jargon/sources.md',fm('Jargon 来源、覆盖与许可证')+`# 来源与覆盖清单\n\n## 锁定版本\n\n- 来源仓库：[feeling-to-jargon](${lock.repository})\n- 提交：[${lock.commit}](${lock.repository}/commit/${lock.commit})\n- 上游提交时间：${lock.committedAt}\n- 导入时间：${lock.importedAt}\n- 许可：MIT，保留版权与许可原文。\n\n导入从 Git 提交对象提取，不读取源仓库未提交文件。构建不访问上游网络，不会随上游 main 自动漂移。\n\n## 覆盖核对\n\n| 类型 | 数量 | 处理方式 |\n|---|---:|---|\n| 根领域 | ${catalog.stats.domains} | 全部生成领域页 |\n| 叶子包 | ${catalog.stats.leaves} | 全量读取 |\n| 叶子内条目 | ${catalog.stats.entries} | 各自生成阅读与复制页 |\n| 独立模板文件 | ${catalog.stats.templates} | 展开依赖，互斥方向单选 |\n| 可浏览场景页 | ${catalog.items.length} | 条目与模板合计，不冒充全是现成提示词 |\n| 旧版领域包 | ${catalog.stats.legacy} | 保留完整原文，避免重复计数 |\n| 其中草稿包 | ${catalog.stats.drafts} | 仅参考，不进入执行库 |\n| 原仓库文件 | ${coverage.length} | 逐文件 SHA256 校验并完整保留 |\n\n[机器可读覆盖清单](/jargon/coverage.json) · [完整源码快照](/jargon/source.json) · [模板合集](/jargon/all-prompts.txt)\n\n## 已知内容边界\n\n- 19 个领域并不等于 19 个成熟提示词包；正式叶子目前集中在 UI/UX、软件架构、AIGC、职场沟通四类。\n- Dashboard 第 5 例的执行逻辑待确认，第 6 例原文缺失。网站保留这些缺口，不补造案例。\n- 工具专属、平台研究、待核验资料保留警示；平台研究和待确认内容不能加入执行组合。\n- 复制内容属于规则化整理版，原始 JSON 和 Skill 原文独立展示。\n\n## Skill 原文\n\nSkill 中的脚本和文件路径用于安装后的运行环境，不能当成聊天窗口已有的附件。本站场景提示词已展开必要依赖。\n\n::: details 查看锁定 Skill 原文\n${code(readSource('skills/feeling-to-jargon/SKILL.md'),'text')}\n:::\n\n## 许可证原文\n${code(readSource('LICENSE'))}\n`);
put('prompts/jargon/guide.md',fm('专业提示词使用方法')+`# 从感觉到执行\n\n## 先选场景，再填参数\n\n1. 在[专业提示词库](./README.md)按领域、类型或关键词查找；可以搜索白话、专业名词和别名。站点导引词仅帮助发现相关条目，不代表固定风格、执行默认或已核验结论。\n2. 进入详情，阅读适用场景与警示；填写任务、参考图说明等必要输入。图片必须另外上传到目标 AI，输入框不会自动上传文件。\n3. 多风格与工具参数只选一项，预览会同步更新。未填项保留明确占位，不擅自补数据。\n4. 点击复制后粘贴到目标工具，核对输入完整，再执行。复制失败时会提供手动复制，不会显示虚假成功。\n\n## 从首页进入与分享搜索\n\n首页可直接输入「简洁大方的后台界面」，或点击示例词和需求捷径，进入后不用重新输入。关键词、领域与类型随网址同步；刷新和浏览器前进后退可恢复条件。点击「复制搜索链接」可分享当前检索，链接不包含组合中的任务目标或参数。搜索词会出现在网址和浏览器历史中，请勿输入敏感信息。顶部「站内搜索」用于找文章与教程，不等于提示词检索。\n\n## 组合不是全库堆叠\n\n- 同一任务可组合同领域的互补模块，最多 8 个。\n- 同一互斥方向只能选一项；工具不兼容、待核验研究和未确认执行逻辑不能混入执行组合。\n- 组合区可填写统一目标、逐条移除或清空。选择记录仅存在当前浏览器会话，填写的任务文本不持久化，也不上传服务器。\n- 分类合集和全库下载保留条目分隔，只是收藏素材，不是要求 AI 同时执行所有模板。\n\n## 原文与整理版\n\n每条内容都有固定提交的来源链接、原始结构化内容与整理后的文字提示。数字与性能参数是原文锚点或示例，不是效果保证；待确认部分必须先澄清。完整规则见[来源与覆盖清单](./sources.md)。\n\n## 无 JavaScript 与无剪贴板权限\n\n页面下方保留分类文字导航；详情的「阅读完整文字版」可展开、选中与手动复制。交互式搜索、填参和组合需要 JavaScript。剪贴板受限时，请手动选中预览文字复制。\n`);
const oldManifest=target('.data/jargon/generated.json');
if(existsSync(oldManifest)) for(const path of JSON.parse(readFileSync(oldManifest,'utf8'))) {
  if(!managed.includes(path) && /^(prompts\/jargon\/|public\/jargon\/|\.vitepress\/theme\/jargon\/(?:catalog|discovery)\.json$)/.test(path) && !path.split('/').includes('..') && existsSync(target(path)))unlinkSync(target(path));
}
writeFileSync(oldManifest,json(managed.sort()));
console.log(`Generated ${catalog.items.length} scenes, ${catalog.domains.length} domain pages, ${legacyPaths.length} reference pages; ${coverage.length} source files verified.`);
