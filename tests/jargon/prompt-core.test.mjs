import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCatalog } from '../../scripts/jargon/normalize.mjs';
import {
  renderPrompt, checkSelection, composePrompts, exportCollection,
  MAX_SELECTION, COLLECTION_NOTICE,
} from '../../scripts/jargon/prompt-core.mjs';

// Generate fixtures from the pinned source, never the built catalog or browser.
const { items } = buildCatalog();
const scene = items.find(item => item.sourcePath === 'templates/aigc/action-sheet.json');
const dashboard = items.find(item => item.sourcePath === 'templates/dashboard/dashboard-style-system.json');
const compatible = items.filter(item => item.domainId === 'digital-product-uiux'
  && item.status === 'published' && !item.exclusiveGroup && !item.provider);
const otherDomain = items.find(item => item.status === 'published'
  && item.domainId === 'software-engineering-architecture');
const reference = items.find(item => item.status === 'reference');
const separator = '\n\n---\n\n';
const count = (text, fragment) => text.split(fragment).length - 1;

function assertRejected(selection, messagePattern) {
  const result = checkSelection(selection);
  assert.equal(result.ok, false);
  assert.match(result.message, messagePattern);
  assert.throws(() => composePrompts(selection), error => error.message === result.message);
}

function freezeDeep(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freezeDeep);
    Object.freeze(value);
  }
  return value;
}

test('fixtures contain real independent modules, choices, fields, and a reference', () => {
  assert.ok(scene && dashboard && otherDomain && reference);
  assert.ok(compatible.length > MAX_SELECTION);
  assert.ok(scene.choices.length && scene.fields.length > 1);
});

test('renderPrompt: every omitted catalog input retains its readable placeholder', () => {
  for (const item of items) {
    const rendered = renderPrompt(item);
    for (const field of item.fields) {
      assert.ok(rendered.includes(`[待填写：${field.label}]`), `${item.id}: ${field.key}`);
    }
    assert.doesNotMatch(rendered, /\{\{[a-zA-Z0-9_]+\}\}/, item.id);
    assert.ok(rendered.includes(item.sourceUrl), `${item.id}: pinned source lost`);
    for (const warning of item.warnings) assert.ok(rendered.includes(warning), item.id);
  }
});

test('renderPrompt: supplied fields replace placeholders, trim edges and preserve multiline data', () => {
  const values = Object.fromEntries(scene.fields.map((field, index) => [field.key, `  参数${index}\n下一行  `]));
  const rendered = renderPrompt(scene, values);
  for (const [index, field] of scene.fields.entries()) {
    assert.ok(rendered.includes(`参数${index}\n下一行`));
    assert.ok(!rendered.includes(`[待填写：${field.label}]`));
  }
});

test('renderPrompt: blank, null, and undefined values stay explicitly unfilled', () => {
  const task = scene.fields.find(field => field.key === 'task');
  for (const value of ['', '  \n\t ', null, undefined]) {
    assert.ok(renderPrompt(scene, { task: value }).includes(`[待填写：${task.label}]`));
  }
});

test('renderPrompt: zero and false are actual input rather than missing values', () => {
  assert.ok(renderPrompt(scene, { task: 0 }).includes('我的任务：0'));
  assert.ok(renderPrompt(scene, { task: false }).includes('我的任务：false'));
});

test('renderPrompt: every catalog choice expands exactly the selected option', () => {
  let choicesChecked = 0;
  for (const item of items) {
    for (const choice of item.choices) {
      choicesChecked++;
      for (const option of choice.options) {
        const text = renderPrompt(item, { [choice.key]: option.value });
        assert.equal(count(text, `${option.label}\n${option.text}`), 1, `${item.id}/${option.value}`);
        for (const other of choice.options.filter(other => other.value !== option.value)) {
          assert.ok(!text.includes(`${other.label}\n${other.text}`), `${item.id}: also selected ${other.value}`);
        }
      }
    }
  }
  assert.ok(choicesChecked >= 8, 'exercise actual Dashboard and AIGC choices');
});

test('renderPrompt: missing and unknown choices fall back to the first declared option', () => {
  for (const item of items) {
    for (const choice of item.choices) {
      const first = choice.options[0];
      for (const invalid of [undefined, null, '', 'does-not-exist', 'toString', '__proto__', '<script>bad()</script>']) {
        const actual = renderPrompt(item, { [choice.key]: invalid });
        const expected = renderPrompt(item, { [choice.key]: first.value });
        assert.equal(actual, expected, `${item.id}/${String(invalid)}`);
        assert.ok(actual.includes(`${first.label}\n${first.text}`));
      }
    }
  }
});

test('renderPrompt: an unavailable option list leaves a clear selection placeholder', () => {
  const choice = scene.choices[0];
  const emptyOptions = { ...scene, choices: [{ ...choice, options: [] }] };
  assert.ok(renderPrompt(emptyOptions).includes(`[待选择：${choice.label}]`));
});

test('renderPrompt: interpolation is one-pass literal text, not recursive replacement', () => {
  const input = 'literal {{reference_image}} {{task}} $& $1 $$ ${process.exit(1)}';
  const rendered = renderPrompt(scene, { task: input, reference_image: 'a real reference' });
  assert.ok(rendered.includes(`我的任务：${input}`));
  assert.ok(rendered.includes('a real reference'));
});

test('renderPrompt: malicious HTML remains literal text, never evaluated or silently altered', () => {
  const payloads = [
    '<script>globalThis.__jargonPromptExecuted = true</script>',
    '<img src=x onerror="globalThis.__jargonPromptExecuted=true">',
    '</textarea><svg onload="globalThis.__jargonPromptExecuted=true">',
    '<iframe src="javascript:alert(1)"></iframe>&lt;b&gt;&amp;',
  ];
  const before = globalThis.__jargonPromptExecuted;
  for (const payload of payloads) {
    const rendered = renderPrompt(scene, { task: payload });
    assert.equal(typeof rendered, 'string');
    assert.ok(rendered.includes(`我的任务：${payload}`));
    assert.equal(globalThis.__jargonPromptExecuted, before);
  }
  // DOM rendering/escaping is deliberately outside this pure-function suite.
});

test('renderPrompt: does not mutate a frozen catalog item or user values', () => {
  const item = freezeDeep(structuredClone(scene));
  const values = freezeDeep({ task: '保持输入不变', tool_adapter: 'midjourney' });
  const before = JSON.stringify({ item, values });
  renderPrompt(item, values);
  assert.equal(JSON.stringify({ item, values }), before);
});

test('checkSelection: empty combinations are rejected by both checking and composition', () => {
  assertRejected([], /至少一个|先选择/);
});

test('checkSelection: duplicate ids are rejected even when objects are distinct', () => {
  assertRejected([compatible[0], { ...compatible[0] }], /重复|已在组合/);
});

test('checkSelection: cross-domain modules cannot be combined', () => {
  assertRejected([compatible[0], otherDomain], /同一领域|跨领域/);
});

test('checkSelection: all reference-only items are excluded from executable combinations', () => {
  const references = items.filter(item => item.status === 'reference');
  assert.ok(references.length);
  for (const item of references) assertRejected([item], /待核验|待确认/);
});

test('checkSelection: different published modules in the same exclusive group conflict', () => {
  const groups = new Set(items.map(item => item.exclusiveGroup).filter(Boolean));
  let exercised = 0;
  for (const group of groups) {
    const members = items.filter(item => item.status === 'published' && item.exclusiveGroup === group);
    if (members.length < 2) continue;
    assertRejected(members.slice(0, 2), /互斥|只保留/);
    exercised++;
  }
  assert.ok(exercised >= 2, 'cover both visual directions and AIGC scenes');
});

test('checkSelection: differing providers conflict independently of reference and exclusivity', () => {
  // Orthogonal provider fixtures derived from real, otherwise compatible modules.
  const fixtures = compatible.slice(0, 2).map((item, index) => ({
    ...item, provider: index === 0 ? 'midjourney' : 'stable_diffusion',
  }));
  assertRejected(fixtures, /不同工具|工具专属/);
});

test('checkSelection: matching providers and a general module are compatible', () => {
  const fixtures = compatible.slice(0, 3).map((item, index) => ({
    ...item, provider: index < 2 ? 'midjourney' : null,
  }));
  assert.deepEqual(checkSelection(fixtures), { ok: true, message: '' });
  assert.doesNotThrow(() => composePrompts(fixtures));
});

test('checkSelection: exactly eight independent modules pass; a ninth fails', () => {
  assert.equal(MAX_SELECTION, 8, 'architecture fixes the limit at eight');
  assert.deepEqual(checkSelection(compatible.slice(0, MAX_SELECTION)), { ok: true, message: '' });
  assertRejected(compatible.slice(0, MAX_SELECTION + 1), new RegExp(`最多.*${MAX_SELECTION}`));
});

test('checkSelection: legitimate single and multi-module requests remain possible', () => {
  for (const selection of [[compatible[0]], compatible.slice(0, 3), [scene], [dashboard]]) {
    assert.deepEqual(checkSelection(selection), { ok: true, message: '' });
    assert.doesNotThrow(() => composePrompts(selection));
  }
});

test('composePrompts: per-id parameters do not leak between modules and order is stable', () => {
  const selection = compatible.slice(0, 2);
  const values = {
    goal: '  同一产品的交互升级  ',
    [selection[0].id]: { task: 'only-first-module' },
    [selection[1].id]: { task: 'only-second-module' },
  };
  const text = composePrompts(selection, values);
  assert.ok(text.includes('目标：同一产品的交互升级'));
  for (const item of selection) assert.ok(text.includes(renderPrompt(item, values[item.id])));
  assert.ok(text.indexOf('only-first-module') < text.indexOf('only-second-module'));
  assert.equal(count(text, 'only-first-module'), 1);
  assert.equal(count(text, 'only-second-module'), 1);
  assert.equal(count(text, separator), selection.length - 1);
  assert.match(text, /冲突.*澄清/);
});

test('composePrompts: absent goal stays unfilled and shared warnings are deduplicated', () => {
  const warning = '本回归夹具的共同边界，必须先核验。';
  const selection = compatible.slice(0, 2).map(item => ({ ...item, warnings: [warning] }));
  const text = composePrompts(selection);
  assert.match(text, /目标：\[待填写：/);
  assert.equal(count(text, warning), 1);
});

test('composePrompts: source catalog and input values remain immutable', () => {
  const selection = freezeDeep(structuredClone(compatible.slice(0, 2)));
  const values = freezeDeep({ goal: 'immutable goal', [selection[0].id]: { task: 'immutable task' } });
  const before = JSON.stringify({ selection, values });
  composePrompts(selection, values);
  assert.equal(JSON.stringify({ selection, values }), before);
});

test('exportCollection: incompatible sources remain separate references, not one execution task', () => {
  const selection = [compatible[0], otherDomain, reference, scene];
  const text = exportCollection(selection);
  assert.ok(text.includes(COLLECTION_NOTICE));
  assert.match(text, /不是一个.*同时执行的任务/);
  assert.match(text, /勿混用互斥风格或工具参数/);
  assert.match(text, /共 4 条/);
  assert.equal(count(text, separator), selection.length - 1);
  for (const item of selection) {
    assert.ok(text.includes(`## ${item.title}`));
    assert.ok(text.includes(renderPrompt(item)));
    assert.ok(text.includes(`来源：${item.sourceUrl}`));
  }
});

test('exportCollection: all 129 catalog items, source boundaries and placeholders survive export', () => {
  const text = exportCollection(items);
  assert.match(text, /共 129 条/);
  assert.equal(count(text, separator), items.length - 1);
  for (const item of items) assert.ok(text.includes(renderPrompt(item)), item.id);
  assert.match(text, /\[待填写：/);
});

test('exportCollection: empty selection is a truthful zero-item collection', () => {
  const text = exportCollection([]);
  assert.match(text, /共 0 条/);
  assert.ok(text.includes(COLLECTION_NOTICE));
  assert.ok(!text.includes(separator));
});

test('composePrompts: each module inherits the global goal as task when it has no override', () => {
  const selection = compatible.slice(0, 3);
  const goal = 'global-goal-inherited-by-every-module';
  const text = composePrompts(selection, { goal: `  ${goal}  ` });
  assert.ok(text.includes(`目标：${goal}`));
  for (const item of selection) {
    assert.ok(text.includes(renderPrompt(item, { task: goal })), item.id);
    const task = item.fields.find(field => field.key === 'task');
    assert.ok(!text.includes(`[待填写：${task.label}]`), item.id);
  }
  assert.equal(count(text, `我的任务：${goal}`), selection.length);
});

test('composePrompts: one per-item task override wins without replacing another module’s inherited goal', () => {
  const selection = compatible.slice(0, 2);
  const goal = 'global-shared-goal';
  const override = 'specific-task-for-first-module';
  const text = composePrompts(selection, {
    goal,
    [selection[0].id]: { task: ` ${override} ` },
    [selection[1].id]: {},
  });
  assert.ok(text.includes(`目标：${goal}`));
  assert.ok(text.includes(renderPrompt(selection[0], { task: override })));
  assert.ok(text.includes(renderPrompt(selection[1], { task: goal })));
  assert.equal(count(text, `我的任务：${override}`), 1);
  assert.equal(count(text, `我的任务：${goal}`), 1);
});

test('composePrompts: unrelated per-item fields and provider choices do not mask the inherited task', () => {
  const goal = 'generate-a-character-action-sheet';
  const overrides = { reference_image: '已上传的蓝色恐龙参考图', tool_adapter: 'midjourney' };
  const text = composePrompts([scene], { goal, [scene.id]: overrides });
  assert.ok(text.includes(renderPrompt(scene, { task: goal, ...overrides })));
  assert.ok(text.includes(`我的任务：${goal}`));
  assert.ok(text.includes(overrides.reference_image));
  assert.match(text, /--ar 3:4 --stylize 150/);
});

test('composePrompts: a missing or whitespace-only global goal stays visibly unresolved in every module', () => {
  const selection = compatible.slice(0, 2);
  const placeholder = '[待填写：本次任务的目标、输入与限制]';
  for (const goal of [undefined, '', '  \n\t ']) {
    const text = composePrompts(selection, { goal });
    assert.ok(text.includes(`目标：${placeholder}`));
    for (const item of selection) assert.ok(text.includes(renderPrompt(item, { task: placeholder })), item.id);
    assert.equal(count(text, placeholder), selection.length + 1);
    assert.doesNotMatch(text, /我的任务：(undefined|null)\b/);
  }
});
