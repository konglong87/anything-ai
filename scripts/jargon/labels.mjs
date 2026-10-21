export const FIELD_LABELS = {
  name:'名称', plain_language:'白话解释', when_to_use:'适用场景', parameters:'专业参数与锚点', constraints:'边界与约束',
  state_machine:'交互状态机', accessibility:'可访问性', acceptance:'验收标准', animation_sequence:'动画顺序', spatial_anchor:'空间锚点',
  performance_budget:'性能预算', fallback:'回退路径', mobile_degradation:'移动端降级', reduced_motion:'减少动态效果',
  layout:'布局与信息结构', termSkill:'专业术语', uiSkill:'视觉规范', agentExec:'执行与事件', state:'状态模型', tokens:'设计变量',
  evidence:'证据与确认状态', status:'状态', source:'来源', state_model:'状态模型边界', missing_inputs:'待确认输入',
  verification_required:'需要核验', verification_note:'核验说明', verification_checklist:'核验清单', external_references:'外部参考（需核验）',
  verified_at:'已核验日期', provider:'适用工具', provider_specific:'工具专属', do_not_generalize:'不得泛化',
  description:'说明', consistency_rules:'角色一致性', negative_prompt:'负面约束', prompt_blocks:'提示词模块',
  subject:'主体', composition:'构图', material:'材质', lighting:'光线', quality:'质量', aspect_ratio:'画幅比例',
  purpose:'目标', required_inputs:'必要输入', inputs:'必要输入', output_contract:'输出要求', field_contract:'字段含义',
  shared_execution_contract:'共享执行规范', source_gaps:'原始资料缺口（不得补造）', forbidden_defaults:'禁止的默认做法',
  rules:'规则', flow:'执行流程', event:'事件', writes:'写入状态', updates:'更新视图', preserves:'保持不变', example:'示例（非全局默认）',
  guard:'前置条件', candidate:'待确认候选逻辑（不得默认执行）', sets:'赋值', example_values:'示例值', example_transition:'示例状态变化',
  before:'之前', after:'之后', dimensions:'维度', terms:'术语', mappings:'映射', intents:'意图',
  unknown:'未提供', slot:'原稿位置', missing:'缺失项', policy:'处理边界', entry_id:'条目', confirmed_layers:'已确认层',
  product_or_scene:'产品或使用场景', content_priority:'内容优先级', reference_image:'参考图说明（请在目标 AI 中另行上传图片）',
  style_direction:'视觉风格', task:'任务目标与实际约束', suffix:'工具参数', positive_prompt_mode:'正向提示处理',
  negative_prompt_mode:'负面提示处理', controlnet_hint:'结构控制建议', loading_note:'加载说明', external_reference_policy:'外部参考政策'
};
export const KIND_LABELS = {term:'术语',pattern:'设计模式',template:'场景模板',technique:'实现技巧',principle:'原则',guideline:'规范',parameter:'参数','platform-research':'平台研究'};
export const INTERNAL_FIELDS = new Set(['id','aliases','related','contract_ref','base_ip_ref','pattern_refs','schema_version','template_refs']);
export const label = key => FIELD_LABELS[key] || key;
export function formatValue(value, depth = 0) {
  if (value === null || value === undefined) return '未提供 / 待核验';
  if (typeof value !== 'object') return typeof value === 'boolean' ? (value ? '是' : '否') : String(value);
  if (Array.isArray(value)) return value.map(v => `${'  '.repeat(depth)}- ${formatValue(v, depth + 1).trim()}`).join('\n');
  return Object.entries(value).filter(([key]) => !INTERNAL_FIELDS.has(key)).map(([key,v]) => `${'  '.repeat(depth)}${label(key)}：${typeof v === 'object' && v !== null ? '\n' : ''}${formatValue(v, depth + 1)}`).join('\n');
}
export function formatSections(object, omit = []) {
  const excluded = new Set([...INTERNAL_FIELDS, ...omit]);
  return Object.entries(object).filter(([key]) => !excluded.has(key)).map(([key,value]) => `【${label(key)}】\n${formatValue(value)}`).join('\n\n');
}
