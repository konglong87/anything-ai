/** Pure, browser-safe prompt rendering. All copy/export paths use these functions. */
export const MAX_SELECTION = 8;
export const COLLECTION_NOTICE = '这是独立模板素材合集，不是一个需要同时执行的任务。请按场景选择，勿混用互斥风格或工具参数。';
const orderedUnique = values => [...new Set(values)];

export function renderPrompt(item, values = {}) {
  const fields = new Map((item.fields || []).map(field => [field.key, field]));
  const choices = new Map((item.choices || []).map(choice => [choice.key, choice]));
  return item.prompt.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_, key) => {
    const choice = choices.get(key);
    if (choice) {
      const option = choice.options.find(option => option.value === values[key]) || choice.options[0];
      return option ? `${option.label}\n${option.text}` : `[待选择：${choice.label}]`;
    }
    const value = String(values[key] ?? '').trim();
    return value || `[待填写：${fields.get(key)?.label || key}]`;
  });
}

export function checkSelection(items) {
  if (!items.length) return { ok: false, message: '请先选择至少一个模块。' };
  if (items.length > MAX_SELECTION) return { ok: false, message: `一次最多组合 ${MAX_SELECTION} 个模块，请先缩小任务范围。` };
  if (new Set(items.map(item => item.id)).size !== items.length) return { ok: false, message: '该模块已在组合中，无需重复添加。' };
  if (new Set(items.map(item => item.domainId)).size > 1) return { ok: false, message: '请在同一领域内组合；跨领域需求请分别复制，避免混淆任务。' };
  if (items.some(item => item.status !== 'published')) return { ok: false, message: '待核验或待确认资料不能加入执行组合，请先单独阅读其边界。' };
  const groups = items.map(item => item.exclusiveGroup).filter(Boolean);
  if (new Set(groups).size !== groups.length) return { ok: false, message: '这些模块属于互斥方向，请只保留其中一个风格、布局或场景。' };
  const providers = orderedUnique(items.map(item => item.provider).filter(Boolean));
  if (providers.length > 1) return { ok: false, message: '这些模块适用于不同工具，不能直接混合工具专属参数。' };
  return { ok: true, message: '' };
}

export function composePrompts(items, values = {}) {
  const result = checkSelection(items);
  if (!result.ok) throw new Error(result.message);
  const goal = String(values.goal || '').trim() || '[待填写：本次任务的目标、输入与限制]';
  const blocks = orderedUnique(items.map(item => `## ${item.title}\n${renderPrompt(item, { task: goal, ...(values[item.id] || {}) })}`));
  const warnings = orderedUnique(items.flatMap(item => item.warnings || []));
  return `# 组合执行提示词\n\n目标：${goal}\n\n下面模块均服务于同一目标。遇到要求冲突先指出并澄清，不得擅自覆盖。占位内容应补全后再执行。\n${warnings.length ? `\n共同边界：\n${warnings.map(x => '- ' + x).join('\n')}\n` : ''}\n${blocks.join('\n\n---\n\n')}`;
}

export function exportCollection(items) {
  return `# 专业提示词素材合集\n\n${COLLECTION_NOTICE}\n\n共 ${items.length} 条；保留待填写项、来源和适用边界。\n\n${orderedUnique(items.map(item => `## ${item.title}\n\n${renderPrompt(item)}\n\n来源：${item.sourceUrl}`)).join('\n\n---\n\n')}`;
}
