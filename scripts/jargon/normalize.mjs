import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { formatSections, formatValue, label } from './labels.mjs';
export const PROJECT_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const SNAPSHOT = join(PROJECT_ROOT,'.data/jargon/upstream');
export const readJSON = path => JSON.parse(readFileSync(join(SNAPSHOT,path),'utf8'));
export const readSource = path => readFileSync(join(SNAPSHOT,path),'utf8');
export const readLock = () => JSON.parse(readFileSync(join(PROJECT_ROOT,'.data/jargon/lock.json'),'utf8'));
const sorted = a => a.sort((x,y)=>x.localeCompare(y,'en'));
const unique = values => [...new Set(values)];
export function validateSnapshot(lock=readLock()) {
  if (!lock.files || !Object.keys(lock.files).length) throw new Error('Snapshot manifest must not be empty');
  for (const path of Object.keys(lock.files)) {
    if (path.startsWith('/') || path.split('/').includes('..')) throw new Error(`Unsafe source path: ${path}`);
  }
  const actualPaths=[];
  const visit=(directory,prefix='')=>{for(const name of readdirSync(directory)) {
    const path=prefix+name;const full=join(directory,name);const stat=lstatSync(full);
    if(stat.isSymbolicLink()) throw new Error(`Unexpected source symlink: ${path}`);
    if(stat.isDirectory()) visit(full,path+'/');else actualPaths.push(path);
  }};
  visit(SNAPSHOT);
  if(actualPaths.length!==Object.keys(lock.files).length || actualPaths.some(path=>!Object.hasOwn(lock.files,path))) throw new Error('Snapshot manifest is incomplete or contains unexpected files');
  for (const [path,sha] of Object.entries(lock.files)) {
    if (path.startsWith('/') || path.split('/').includes('..')) throw new Error(`Unsafe source path: ${path}`);
    const actual=createHash('sha256').update(readFileSync(join(SNAPSHOT,path))).digest('hex');
    if(actual!==sha) throw new Error(`Pinned snapshot changed: ${path}. Re-import a reviewed commit instead of editing upstream files.`);
  }
  return Object.keys(lock.files).length;
}
const field = key => ({key,label:label(key),placeholder:`请填写${label(key)}`});
const section = (title,content) => content ? `【${title}】\n${content}` : '';
const sourceUrl = (lock,path) => `${lock.repository}/blob/${lock.commit}/${path}`;
const packageBoundaries = doc => {
  const keys=['scope','provider','do_not_generalize','verified_at','verification_required','external_reference_policy','loading_note'];
  return formatSections(Object.fromEntries(keys.filter(k=>k in doc).map(k=>[k,doc[k]])));
};
function warningsFor(doc,entry={}) {
  const warnings=[];
  if(doc.scope==='provider-specific'||doc.do_not_generalize||entry.provider_specific) warnings.push(`工具专属：${doc.provider||entry.provider||'原文指定平台'}；不能推广为所有工具的通用行为。`);
  if(doc.verification_required||entry.verification_required||doc.knowledge_type==='platform-research') warnings.push('含待核验的外部信息；使用前核验当前官方文档，不视为已验证事实。');
  if(entry.evidence?.state_model) warnings.push(entry.evidence.state_model);
  if(entry.evidence?.status==='needs_confirmation') warnings.push('执行逻辑尚未确认：仅已确认的布局和视觉可参考；候选联动不得直接实现。');
  return unique(warnings);
}
function expandContract(entry,sourceFiles) {
  if(!entry.contract_ref) return '';
  sourceFiles.push(entry.contract_ref);
  const contract=readJSON(entry.contract_ref);
  return formatSections(Object.fromEntries(['field_contract','shared_execution_contract','source_gaps','forbidden_defaults'].filter(k=>k in contract).map(k=>[k,contract[k]])));
}
function buildEnvelope(title,body,warnings,source,task=true) {
  return `# ${title}\n\n${task ? '我的任务：{{task}}\n\n' : ''}下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。\n\n${warnings.length ? section('适用边界',warnings.map(x=>'- '+x).join('\n'))+'\n\n' : ''}${body}\n\n【输出要求】\n先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。\n\n【来源】\n${source}`;
}
function groupFor(doc,entry) {
  if(doc.subdomain_id==='dashboard-design' || (entry.layout && entry.uiSkill)) return 'visual-direction';
  return null;
}
function createLeafItems(leaves,domainMap,lock) {
  return leaves.flatMap(meta=>{
    const doc=readJSON(meta.path);
    if(doc.entries.length!==meta.entry_count) throw new Error(`Entry count mismatch: ${meta.path}`);
    return doc.entries.map(entry=>{
      const id=`${doc.leaf_id}--${entry.id}`;
      if(!/^[a-z0-9-]+$/.test(id)) throw new Error(`Unsafe scene ID: ${id}`);
      const sourceFiles=[meta.path]; const contract=expandContract(entry,sourceFiles); const warnings=warningsFor(doc,entry);
      const status=(entry.evidence?.status==='needs_confirmation'||doc.knowledge_type==='platform-research'||doc.verification_required||entry.verification_required)?'reference':'published';
      const body=[formatSections(entry),packageBoundaries(doc),contract].filter(Boolean).join('\n\n');
      return {id,title:entry.name,domainId:doc.domain_id,domainTitle:domainMap.get(doc.domain_id).title,subdomainId:doc.subdomain_id,subdomainTitle:doc.title,kind:doc.knowledge_type,status,description:entry.plain_language,whenToUse:entry.when_to_use,aliases:unique([...(entry.aliases||[]),doc.title,...(entry.related||[])]),prompt:buildEnvelope(entry.name,body,warnings,sourceUrl(lock,meta.path)),fields:[field('task')],choices:[],warnings,sourcePath:meta.path,sourceUrl:sourceUrl(lock,meta.path),sourceFiles:unique(sourceFiles),detailPath:`/prompts/jargon/scenes/${id}.html`,exclusiveGroup:groupFor(doc,entry),provider:doc.provider||entry.provider||null};
    });
  });
}
function createTemplateItem(path,domainMap,lock) {
  const doc=readJSON(path); const dashboard=Boolean(doc.template_id==='dashboard-style-system');
  const domainId=dashboard?'digital-product-uiux':'ai-aigc-meta-skills';
  const id=`template--${doc.scene_id||doc.template_id||doc.id}`;
  const sourceFiles=[path]; const warnings=['这是原始结构化模板的可读展开版；工具参数保留原文，使用前请核验目标工具的支持情况。'];
  const fields=[field('task')]; const choices=[]; const parts=[];
  if(doc.base_ip_ref) {sourceFiles.push(doc.base_ip_ref);parts.push(section('基础角色设定（已展开依赖）',formatSections(readJSON(doc.base_ip_ref))));}
  const inputKeys=(doc.required_inputs||doc.inputs||[]).filter(k=>k!=='style_direction');
  for(const key of inputKeys) fields.push(field(key));
  if(inputKeys.length) parts.push(section('必要输入',inputKeys.map(k=>`${label(k)}：{{${k}}}`).join('\n')));
  if(dashboard) {
    const options=doc.style_directions.map(style=>({value:style.id,label:style.name,text:formatSections(style,['name'])}));
    for(const ref of doc.pattern_refs||[]) {
      sourceFiles.push(ref.path);const leaf=readJSON(ref.path);const entry=leaf.entries.find(e=>e.id===ref.entry_id);
      if(!entry) throw new Error(`Missing dashboard pattern: ${ref.entry_id}`);
      options.push({value:entry.id,label:entry.name+(ref.status==='needs_confirmation'?'（待确认）':''),text:formatSections(entry)});
    }
    choices.push({key:'style_direction',label:'视觉方向 / 具体布局（只选一个）',options});
    parts.push(section('选择的方向','{{style_direction}}'));
    parts.push(formatSections(doc,['template_id','name','type','inputs','style_directions']));
    warnings.push('原始资料第 5 例的执行逻辑待确认，第 6 例缺失；不补造案例，也不把候选逻辑默认落地。');
  } else {
    parts.push(formatSections(doc,['name','scene_id','inputs','required_inputs','tool_adapters']));
    if(doc.tool_adapters) {
      choices.push({key:'tool_adapter',label:'目标工具（仅使用所选工具参数）',options:Object.entries(doc.tool_adapters).map(([key,value])=>({value:key,label:key==='generic'?'通用（不绑定工具）':key,text:formatSections(value)}))});
      parts.push(section('工具适配','{{tool_adapter}}'));
    }
  }
  return {id,title:doc.name,domainId,domainTitle:domainMap.get(domainId).title,subdomainId:dashboard?'dashboard-design':'character-ip',subdomainTitle:dashboard?'Dashboard 风格模板':'角色 IP 场景模板',kind:'template',status:'published',description:doc.purpose||doc.description||'选择一个方向，展开共享规范，得到完整可复制模板。',whenToUse:doc.purpose||'需要完整场景模板与可调整参数时',aliases:[doc.scene_id||doc.template_id||doc.id],prompt:buildEnvelope(doc.name,parts.join('\n\n'),warnings,sourceUrl(lock,path)),fields,choices,warnings,sourcePath:path,sourceUrl:sourceUrl(lock,path),sourceFiles:unique(sourceFiles),detailPath:`/prompts/jargon/scenes/${id}.html`,exclusiveGroup:dashboard?'visual-direction':doc.base_ip_ref?'aigc-scene':'aigc-base',provider:null};
}
export function buildCatalog() {
  const lock=readLock(); validateSnapshot(lock);
  const root=readJSON('index/root.json'); const leaves=readJSON('index/leaves.json').leaves;
  const domainMap=new Map(root.domains.map(domain=>[domain.domain_id,domain]));
  const templatePaths=sorted(Object.keys(lock.files).filter(path=>path.startsWith('templates/')&&path.endsWith('.json')));
  const legacyPaths=sorted(Object.keys(lock.files).filter(path=>/^terms\/[^/]+\.json$/.test(path)));
  const items=[...createLeafItems(leaves,domainMap,lock),...templatePaths.map(path=>createTemplateItem(path,domainMap,lock))];
  if(new Set(items.map(item=>item.id)).size!==items.length) throw new Error('Duplicate scene ID');
  const domains=root.domains.map(domain=>({id:domain.domain_id,title:domain.title,description:domain.description,count:items.filter(item=>item.domainId===domain.domain_id).length}));
  const stats={domains:domains.length,leaves:leaves.length,entries:leaves.reduce((n,l)=>n+l.entry_count,0),templates:templatePaths.length,legacy:legacyPaths.length,drafts:legacyPaths.filter(p=>readJSON(p).status==='draft').length};
  return {source:{repository:lock.repository,commit:lock.commit,importedAt:lock.importedAt,license:lock.license},stats,domains,items};
}
