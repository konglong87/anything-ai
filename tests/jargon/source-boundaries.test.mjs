import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCatalog, readJSON, readLock } from '../../scripts/jargon/normalize.mjs';
import { formatSections, formatValue, label, KIND_LABELS } from '../../scripts/jargon/labels.mjs';
import { renderPrompt, checkSelection } from '../../scripts/jargon/prompt-core.mjs';

const catalog = buildCatalog();
const lock = readLock();
const leafIndex = readJSON('index/leaves.json');
const sourceEntries = leafIndex.leaves.flatMap(meta => {
  const document = readJSON(meta.path);
  return document.entries.map(entry => ({
    document, entry, path: meta.path,
    item: catalog.items.find(item => item.id === `${document.leaf_id}--${entry.id}`),
  }));
});
const templates = catalog.items.filter(item => item.sourcePath.startsWith('templates/'));
const DASHBOARD_PATH = 'templates/dashboard/dashboard-style-system.json';
const BASE_IP_PATH = 'templates/aigc/base-ip.json';
const dashboardSource = readJSON(DASHBOARD_PATH);
const dashboard = templates.find(item => item.sourcePath === DASHBOARD_PATH);
const FIFTH_ID = 'warm-three-column-dashboard';
const fifth = sourceEntries.find(({ entry }) => entry.id === FIFTH_ID);
// These are linkage metadata, not readable body content. Deliberately independent
// of the production INTERNAL_FIELDS set, so accidental newly hidden fields fail.
const LINKAGE_KEYS = new Set([
  'id', 'aliases', 'related', 'contract_ref', 'base_ip_ref',
  'pattern_refs', 'schema_version', 'template_refs',
]);
const CONTRACT_KEYS = ['field_contract', 'shared_execution_contract', 'source_gaps', 'forbidden_defaults'];

function readableScalars(value, path = 'source') {
  if (value === null || value === undefined) return [[path, '未提供 / 待核验']];
  if (typeof value !== 'object') return [[path, typeof value === 'boolean' ? (value ? '是' : '否') : String(value)]];
  if (Array.isArray(value)) return value.flatMap((entry, index) => readableScalars(entry, `${path}[${index}]`));
  return Object.entries(value).filter(([key]) => !LINKAGE_KEYS.has(key))
    .flatMap(([key, entry]) => readableScalars(entry, `${path}.${key}`));
}

function assertContent(value, text, context) {
  for (const [path, scalar] of readableScalars(value)) {
    assert.ok(text.includes(scalar), `${context}: dropped ${path} = ${JSON.stringify(scalar)}`);
  }
}

function assertLockedReference(path) {
  assert.equal(typeof path, 'string');
  assert.ok(Object.hasOwn(lock.files, path), `unlocked dependency: ${path}`);
  return readJSON(path);
}

test('readable source: every substantive value from all 120 raw entries survives normalization and copying', () => {
  assert.equal(sourceEntries.length, 120);
  for (const { entry, item } of sourceEntries) {
    assert.ok(item, entry.id);
    assertContent(entry, item.prompt, item.id);
    assertContent(entry, renderPrompt(item), `${item.id}: copied text`);
    assert.doesNotMatch(item.prompt, /\[object Object\]/, item.id);
  }
});

test('readable source: search aliases and related terms are retained outside the prompt body', () => {
  for (const { document, entry, item } of sourceEntries) {
    for (const alias of [...(entry.aliases || []), document.title, ...(entry.related || [])]) {
      assert.ok(item.aliases.includes(alias), `${item.id}: missing alias ${alias}`);
    }
  }
});

test('readable source: state, accessibility, acceptance, performance and fallback sections are present', () => {
  const required = {
    state_machine: '交互状态机', accessibility: '可访问性', acceptance: '验收标准',
    performance_budget: '性能预算', fallback: '回退路径', mobile_degradation: '移动端降级',
    reduced_motion: '减少动态效果', agentExec: '执行与事件', state: '状态模型', tokens: '设计变量',
  };
  for (const [key, heading] of Object.entries(required)) {
    const entries = sourceEntries.filter(({ entry }) => Object.hasOwn(entry, key));
    assert.ok(entries.length > 0, `fixture must exercise ${key}`);
    for (const { entry, item } of entries) {
      assert.ok(item.prompt.includes(`【${heading}】`), `${item.id}: ${key}`);
      assertContent(entry[key], item.prompt, `${item.id}.${key}`);
    }
  }
});

test('dependencies: all seven base_ip_ref templates embed the complete locked character definition', () => {
  const inherited = templates.filter(item => readJSON(item.sourcePath).base_ip_ref);
  assert.equal(inherited.length, 7);
  for (const item of inherited) {
    const source = readJSON(item.sourcePath);
    assert.equal(source.base_ip_ref, BASE_IP_PATH);
    const base = assertLockedReference(source.base_ip_ref);
    assert.ok(item.sourceFiles.includes(BASE_IP_PATH), item.id);
    assertContent(base, renderPrompt(item), item.id);
    assert.match(item.prompt, /基础角色设定.*已展开依赖/);
    assert.ok(!item.prompt.includes('base_ip_ref'), `${item.id}: unresolved base pointer`);
  }
});

test('dependencies: every contract_ref expands field semantics, execution, gaps and forbidden defaults', () => {
  const contracted = sourceEntries.filter(({ entry }) => entry.contract_ref);
  assert.equal(contracted.length, 6);
  for (const { entry, item } of contracted) {
    const contract = assertLockedReference(entry.contract_ref);
    assert.ok(item.sourceFiles.includes(entry.contract_ref), item.id);
    for (const key of CONTRACT_KEYS) {
      assert.ok(Object.hasOwn(contract, key), `${entry.contract_ref}.${key}`);
      assertContent(contract[key], renderPrompt(item), `${item.id}.${key}`);
    }
    assert.ok(!item.prompt.includes('contract_ref'), `${item.id}: unresolved contract pointer`);
  }
});

test('dependencies: Dashboard pattern references resolve to real source entries and exact choices', () => {
  const choice = dashboard.choices.find(choice => choice.key === 'style_direction');
  const expected = [...dashboardSource.style_directions.map(style => style.id)];
  assert.equal(dashboardSource.pattern_refs.length, 5);
  for (const reference of dashboardSource.pattern_refs) {
    const source = assertLockedReference(reference.path);
    const entry = source.entries.find(entry => entry.id === reference.entry_id);
    assert.ok(entry, reference.entry_id);
    assert.ok(dashboard.sourceFiles.includes(reference.path));
    const option = choice.options.find(option => option.value === reference.entry_id);
    assert.ok(option, reference.entry_id);
    assertContent(entry, option.text, reference.entry_id);
    expected.push(reference.entry_id);
  }
  assert.deepEqual(choice.options.map(option => option.value), expected);
});

test('templates: original prompt blocks, consistency and negative constraints survive in every AIGC template', () => {
  for (const item of templates.filter(item => item.sourcePath.startsWith('templates/aigc/'))) {
    const source = readJSON(item.sourcePath);
    const body = Object.fromEntries(Object.entries(source).filter(([key]) => ![
      'name', 'scene_id', 'inputs', 'required_inputs', 'tool_adapters',
    ].includes(key)));
    assertContent(body, renderPrompt(item), item.id);
    for (const key of source.required_inputs || source.inputs || []) {
      assert.ok(item.fields.some(field => field.key === key), `${item.id}: missing editable ${key}`);
    }
  }
});

test('provider boundaries: provider-specific statements never become universal tool behavior', () => {
  const scoped = sourceEntries.filter(({ document, entry }) => document.scope === 'provider-specific'
    || document.do_not_generalize || entry.provider_specific);
  assert.ok(scoped.length >= 10);
  for (const { document, entry, item } of scoped) {
    assert.equal(item.provider, document.provider || entry.provider || null, item.id);
    assert.ok(item.warnings.some(warning => /工具专属/.test(warning)), item.id);
    assert.match(renderPrompt(item), /不能推广为所有工具/);
    for (const key of ['scope', 'provider', 'do_not_generalize', 'external_reference_policy', 'loading_note']) {
      if (Object.hasOwn(document, key)) assertContent({ [key]: document[key] }, item.prompt, `${item.id}.${key}`);
    }
  }
});

test('verification boundaries: unverified platform claims remain references and cannot be combined', () => {
  const unverified = sourceEntries.filter(({ document, entry }) => document.verification_required
    || entry.verification_required || document.knowledge_type === 'platform-research');
  assert.equal(unverified.length, 11);
  for (const { document, entry, item } of unverified) {
    assert.equal(item.status, 'reference', item.id);
    assert.equal(checkSelection([item]).ok, false, item.id);
    assert.match(renderPrompt(item), /使用前核验当前官方文档/);
    assert.match(renderPrompt(item), /不视为已验证事实/);
    for (const key of ['verification_required', 'verified_at', 'external_reference_policy']) {
      if (Object.hasOwn(document, key)) assertContent({ [key]: document[key] }, item.prompt, `${item.id}.${key}`);
    }
    if (Object.hasOwn(entry, 'verified_at')) assertContent({ verified_at: entry.verified_at }, item.prompt, item.id);
  }
});

test('verification boundaries: absent verified_at is displayed as unknown, not a fabricated date', () => {
  const undated = sourceEntries.filter(({ document }) => document.verified_at === null);
  assert.ok(undated.length > 0);
  for (const { item } of undated) {
    assert.match(item.prompt, /【已核验日期】\n未提供 \/ 待核验/);
    assert.doesNotMatch(item.prompt, /【已核验日期】\n\d{4}-\d{2}-\d{2}/);
  }
});

test('provider choices: choosing one adapter does not emit another tool’s parameters', () => {
  for (const item of templates) {
    const source = readJSON(item.sourcePath);
    if (!source.tool_adapters) continue;
    const choice = item.choices.find(choice => choice.key === 'tool_adapter');
    assert.deepEqual(choice.options.map(option => option.value), Object.keys(source.tool_adapters));
    for (const [provider, adapter] of Object.entries(source.tool_adapters)) {
      const text = renderPrompt(item, { tool_adapter: provider });
      assertContent(adapter, text, `${item.id}/${provider}`);
      assert.match(text, /核验目标工具的支持情况/);
      if (provider !== 'midjourney') assert.doesNotMatch(text, /--ar\s+\d+:\d+|--stylize\s+\d+/);
      if (provider !== 'stable_diffusion') {
        assert.ok(!text.includes(source.tool_adapters.stable_diffusion.controlnet_hint), item.id);
      }
    }
  }
});

test('Dashboard fifth example: only layout/terminology/visuals are confirmed, execution remains candidate-only', () => {
  assert.ok(fifth);
  assert.equal(fifth.entry.evidence.status, 'needs_confirmation');
  assert.equal(fifth.item.status, 'reference');
  assert.equal(checkSelection([fifth.item]).ok, false);
  assert.deepEqual(fifth.entry.evidence.confirmed_layers, ['layout', 'termSkill', 'uiSkill']);
  const text = renderPrompt(fifth.item);
  assert.match(text, /执行逻辑尚未确认/);
  assert.match(text, /候选联动不得直接实现/);
  assert.match(text, /实现建议，不宣称为原始产品已有逻辑/);
  assertContent(fifth.entry.evidence.missing_inputs, text, FIFTH_ID);
  for (const event of fifth.entry.agentExec) {
    assert.equal(event.status, 'needs_confirmation');
    assert.ok(event.candidate);
    assertContent(event, text, `${FIFTH_ID}.${event.event}`);
  }
  assert.ok(text.includes('确认映射前不推定模式切换等于摄氏/华氏切换'));
  assert.ok(text.includes('blocked: mode-to-unit mapping required'));
  assert.ok(text.includes('blocked: unit conversion rule required'));
});

test('Dashboard fifth example: selecting its template option retains unresolved execution evidence and source gaps', () => {
  const choice = dashboard.choices.find(choice => choice.key === 'style_direction');
  const option = choice.options.find(option => option.value === FIFTH_ID);
  assert.match(option.label, /待确认/);
  const text = renderPrompt(dashboard, { style_direction: FIFTH_ID });
  assert.match(text, /待确认候选逻辑（不得默认执行）/);
  assert.match(text, /不补造案例/);
  assert.match(text, /不把候选逻辑默认落地/);
  assertContent(fifth.entry.evidence, text, FIFTH_ID);
  assertContent(fifth.entry.state.invariants, text, FIFTH_ID);
  assertContent(dashboardSource.source_gaps, text, 'Dashboard gaps');
});

test('Dashboard sixth example: missing source stays a gap, never a fabricated item or blank choice', () => {
  const gaps = dashboardSource.source_gaps;
  assert.deepEqual(gaps.map(gap => ({ slot: gap.slot, status: gap.status })), [
    { slot: 5, status: 'needs_confirmation' }, { slot: 6, status: 'missing' },
  ]);
  const expectedIds = dashboardSource.pattern_refs.map(reference => reference.entry_id);
  const concreteEntries = sourceEntries.filter(({ document, entry }) => document.leaf_id === 'layout-patterns' && entry.layout);
  assert.equal(concreteEntries.length, 5);
  assert.deepEqual(concreteEntries.map(({ entry }) => entry.id), expectedIds);
  const actualIds = catalog.items.filter(item => item.sourcePath === fifth.path).map(item => item.id);
  const rawIds = readJSON(fifth.path).entries.map(entry => `layout-patterns--${entry.id}`);
  assert.deepEqual(actualIds, rawIds);
  for (const text of [renderPrompt(dashboard), renderPrompt(fifth.item)]) {
    assert.ok(text.includes(gaps[1].missing));
    assert.ok(text.includes(gaps[1].policy));
    assert.match(text, /不声称六例完整/);
  }
});

test('Dashboard example values remain contextual, not universal defaults or verified implementation facts', () => {
  for (const { entry, item } of sourceEntries.filter(({ entry }) => entry.contract_ref)) {
    const text = renderPrompt(item);
    assert.match(text, /示例参数不是全局默认或效果保证/);
    assertContent(dashboardSource.shared_execution_contract, text, item.id);
    if (entry.evidence?.state_model) assert.ok(text.includes(entry.evidence.state_model), item.id);
    if (entry.tokens) assertContent(entry.tokens, text, item.id);
  }
});

test('labels: boolean, null, numeric zero, arrays and unknown keys stay explicit and readable', () => {
  assert.equal(formatValue(true), '是');
  assert.equal(formatValue(false), '否');
  assert.equal(formatValue(0), '0');
  assert.equal(formatValue(null), '未提供 / 待核验');
  assert.equal(formatValue(undefined), '未提供 / 待核验');
  assert.equal(label('not_a_known_key'), 'not_a_known_key');
  assert.equal(formatValue(['alpha', 'beta']), '- alpha\n- beta');
  assert.equal(formatSections({ task: 'input', not_a_known_key: false }), '【任务目标与实际约束】\ninput\n\n【not_a_known_key】\n否');
});

test('labels: metadata is hidden, but nested event rules and custom fields cannot disappear', () => {
  const input = {
    id: 'hidden-id', aliases: ['hidden-alias'], contract_ref: 'hidden-ref',
    agentExec: [{ event: 'select', candidate: 'confirm first', new_constraint: 'keep this constraint' }],
    unknown_field: { state: false, priority: 0 },
  };
  const text = formatSections(input);
  assert.doesNotMatch(text, /hidden-id|hidden-alias|hidden-ref/);
  assert.match(text, /执行与事件/);
  assert.match(text, /待确认候选逻辑（不得默认执行）/);
  assertContent(input, text, 'nested formatting');
});

test('locked upstream schema audit: the six principle leaves are an explicit known enum discrepancy', t => {
  const declared = new Set(leafIndex.knowledge_types);
  const mismatches = leafIndex.leaves.filter(leaf => !declared.has(leaf.knowledge_type))
    .map(leaf => `${leaf.leaf_id}:${leaf.knowledge_type}`).sort();
  assert.deepEqual(mismatches, [
    'follow:principle', 'information-hierarchy:principle', 'interruption:principle',
    'snap:principle', 'threshold:principle', 'velocity-inheritance:principle',
  ]);
  t.diagnostic('Pinned upstream index/leaves.json omits principle from knowledge_types; six real leaves use it. Do not edit the immutable snapshot; preserve principle in normalization and report upstream.');
});

test('principle schema: all six source principles retain their kind and human-readable label', () => {
  const principles = sourceEntries.filter(({ document }) => document.knowledge_type === 'principle');
  assert.equal(principles.length, 6);
  for (const { item } of principles) assert.equal(item.kind, 'principle', item.id);
  assert.equal(KIND_LABELS.principle, '原则');
  const actualKinds = new Set(sourceEntries.map(({ document }) => document.knowledge_type));
  assert.equal(actualKinds.size, 8);
  for (const kind of actualKinds) {
    assert.equal(typeof KIND_LABELS[kind], 'string', `UI must label source kind: ${kind}`);
    assert.ok(KIND_LABELS[kind].trim(), `empty kind label: ${kind}`);
  }
});
