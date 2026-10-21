import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, posix } from 'node:path';
import { buildCatalog, readJSON, readLock, SNAPSHOT, validateSnapshot } from '../../scripts/jargon/normalize.mjs';

const PINNED_COMMIT = '4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d';
const REPOSITORY = 'https://github.com/konglong87/feeling-to-jargon';
const EXPECTED = Object.freeze({ domains: 19, leaves: 105, entries: 120, templates: 9, legacy: 19, drafts: 15 });
const EXPECTED_ITEMS = EXPECTED.entries + EXPECTED.templates;
const EXPECTED_FILES = 215;
const lock = readLock();
const catalog = buildCatalog();
const leaves = readJSON('index/leaves.json').leaves;
const rootDomains = readJSON('index/root.json').domains;
const templates = Object.keys(lock.files).filter(path => /^templates\/.+\.json$/.test(path)).sort();
const legacy = Object.keys(lock.files).filter(path => /^terms\/[^/]+\.json$/.test(path)).sort();
const sorted = values => [...values].sort();

function snapshotFiles(directory = SNAPSHOT, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const relative = posix.join(prefix, entry.name);
    assert.ok(!entry.isSymbolicLink(), `snapshot must contain bytes, not a symlink: ${relative}`);
    return entry.isDirectory() ? snapshotFiles(join(directory, entry.name), relative) : [relative];
  });
}

function nonemptyString(value, context) {
  assert.equal(typeof value, 'string', context);
  assert.ok(value.trim(), context);
}

function stringArray(value, context) {
  assert.ok(Array.isArray(value), context);
  for (const entry of value) nonemptyString(entry, context);
}

test('lock: repository, immutable commit, license, dates and SHA256 schema are pinned', () => {
  assert.equal(lock.schemaVersion, 1);
  assert.equal(lock.repository, REPOSITORY);
  assert.equal(lock.commit, PINNED_COMMIT);
  assert.equal(lock.license, 'MIT');
  assert.ok(Number.isFinite(Date.parse(lock.committedAt)));
  assert.ok(Number.isFinite(Date.parse(lock.importedAt)));
  assert.equal(Object.keys(lock.files).length, EXPECTED_FILES);
  for (const [path, sha] of Object.entries(lock.files)) {
    assert.ok(!path.startsWith('/') && !path.split('/').includes('..'), path);
    assert.match(sha, /^[a-f0-9]{64}$/, path);
  }
  const license = readFileSync(join(SNAPSHOT, 'LICENSE'), 'utf8');
  assert.match(license, /MIT License/);
  assert.match(license, /Permission is hereby granted/);
});

test('snapshot: every physical file is locked exactly once, with no omitted or phantom files', () => {
  assert.deepEqual(sorted(snapshotFiles()), sorted(Object.keys(lock.files)));
});

test('snapshot: every pinned byte stream matches its SHA256 independently of validateSnapshot', () => {
  for (const [path, expected] of Object.entries(lock.files)) {
    const actual = createHash('sha256').update(readFileSync(join(SNAPSHOT, path))).digest('hex');
    assert.equal(actual, expected, path);
  }
  assert.equal(validateSnapshot(), EXPECTED_FILES);
});

test('validateSnapshot: a corrupt declared digest cannot be accepted', () => {
  const forged = { ...lock, files: { ...lock.files, LICENSE: '0'.repeat(64) } };
  assert.throws(() => validateSnapshot(forged), /Pinned snapshot changed.*LICENSE/);
});

test('validateSnapshot: unsafe source paths are rejected before reading outside the snapshot', () => {
  for (const path of ['../lock.json', '/etc/passwd', 'terms/../../lock.json']) {
    assert.throws(() => validateSnapshot({ ...lock, files: { [path]: '0'.repeat(64) } }), /Unsafe source path/);
  }
});

test('validateSnapshot: omitting a source file from the manifest must not silently bypass integrity checks', () => {
  const incomplete = { ...lock, files: { ...lock.files } };
  delete incomplete.files['templates/aigc/base-ip.json'];
  assert.throws(() => validateSnapshot(incomplete), undefined,
    'base-ip.json still exists but is no longer hashed; incomplete manifests must be rejected');
});

test('validateSnapshot: an empty manifest must not report successful snapshot validation', () => {
  assert.throws(() => validateSnapshot({ ...lock, files: {} }), undefined,
    'zero checked files is not a validated pinned snapshot');
});

test('catalog: all requested coverage totals agree with independently enumerated snapshot contents', () => {
  const derived = {
    domains: rootDomains.length,
    leaves: leaves.length,
    entries: leaves.reduce((total, meta) => total + readJSON(meta.path).entries.length, 0),
    templates: templates.length,
    legacy: legacy.length,
    drafts: legacy.filter(path => readJSON(path).status === 'draft').length,
  };
  assert.deepEqual(derived, EXPECTED);
  assert.deepEqual(catalog.stats, EXPECTED);
  assert.equal(catalog.items.length, EXPECTED_ITEMS);
  assert.equal(new Set(catalog.items.map(item => item.id)).size, EXPECTED_ITEMS);
});

test('catalog: all 120 source entries appear exactly once, with no synthetic or duplicate cases', () => {
  const expected = [];
  for (const meta of leaves) {
    const document = readJSON(meta.path);
    assert.equal(document.entries.length, meta.entry_count, meta.path);
    assert.equal(document.leaf_id, meta.leaf_id, meta.path);
    assert.equal(document.domain_id, meta.domain_id, meta.path);
    assert.equal(document.subdomain_id, meta.subdomain_id, meta.path);
    for (const entry of document.entries) {
      const id = `${document.leaf_id}--${entry.id}`;
      expected.push(id);
      const matching = catalog.items.filter(item => item.id === id);
      assert.equal(matching.length, 1, id);
      assert.equal(matching[0].title, entry.name);
      assert.equal(matching[0].sourcePath, meta.path);
      assert.equal(matching[0].domainId, document.domain_id);
      assert.equal(matching[0].kind, document.knowledge_type);
    }
  }
  const actual = catalog.items.filter(item => !templates.includes(item.sourcePath)).map(item => item.id);
  assert.deepEqual(sorted(actual), sorted(expected));
});

test('catalog: all nine independent templates are imported once and legacy packages are not duplicated', () => {
  assert.deepEqual(sorted(catalog.items.filter(item => templates.includes(item.sourcePath)).map(item => item.sourcePath)), templates);
  const packages = readJSON('index/packages.json').packages;
  assert.deepEqual(sorted(packages.map(item => item.term_path)), legacy);
  for (const path of legacy) {
    assert.ok(!catalog.items.some(item => item.sourcePath === path), `legacy leaked as a new executable item: ${path}`);
  }
  const draftDomains = legacy.filter(path => readJSON(path).status === 'draft').map(path => readJSON(path).domain_id);
  assert.equal(new Set(draftDomains).size, EXPECTED.drafts);
  for (const domainId of draftDomains) {
    assert.ok(!catalog.items.some(item => item.domainId === domainId), `draft domain manufactured published items: ${domainId}`);
  }
});

test('catalog: all 19 domains retain their titles and honest per-domain counts', () => {
  assert.deepEqual(sorted(catalog.domains.map(domain => domain.id)), sorted(rootDomains.map(domain => domain.domain_id)));
  let total = 0;
  for (const domain of catalog.domains) {
    const source = rootDomains.find(original => original.domain_id === domain.id);
    assert.equal(domain.title, source.title);
    assert.equal(domain.description, source.description);
    assert.equal(domain.count, catalog.items.filter(item => item.domainId === domain.id).length);
    total += domain.count;
  }
  assert.equal(total, EXPECTED_ITEMS);
  assert.equal(catalog.domains.filter(domain => domain.count === 0).length, EXPECTED.drafts);
});

test('catalog schema: item text, enums, arrays, stable identifiers and detail paths are well-formed', () => {
  // The pinned index omits principle although six leaves use it; a separate
  // source audit asserts that exact discrepancy. Validate the public item schema
  // independently rather than treating a known-incomplete source enum as truth.
  const kinds = new Set(leaves.map(meta => readJSON(meta.path).knowledge_type));
  assert.equal(kinds.size, 8, 'use the actual eight source kinds, including principle');
  assert.ok(kinds.has('principle'));
  const domains = new Map(catalog.domains.map(domain => [domain.id, domain]));
  for (const item of catalog.items) {
    for (const key of ['id', 'title', 'domainId', 'domainTitle', 'subdomainId', 'subdomainTitle',
      'kind', 'status', 'description', 'whenToUse', 'prompt', 'sourcePath', 'sourceUrl', 'detailPath']) {
      nonemptyString(item[key], `${item.id}.${key}`);
    }
    assert.match(item.id, /^[a-z0-9]+(?:-[a-z0-9-]+)*$/, item.id);
    assert.equal(item.detailPath, `/prompts/jargon/scenes/${item.id}.html`);
    assert.ok(kinds.has(item.kind), `${item.id}: unknown kind ${item.kind}`);
    assert.ok(['published', 'reference'].includes(item.status), item.id);
    assert.equal(item.domainTitle, domains.get(item.domainId)?.title, item.id);
    for (const key of ['aliases', 'warnings', 'sourceFiles']) stringArray(item[key], `${item.id}.${key}`);
    for (const key of ['provider', 'exclusiveGroup']) {
      assert.ok(item[key] === null || (typeof item[key] === 'string' && item[key].trim()), `${item.id}.${key}`);
    }
    assert.deepEqual(JSON.parse(JSON.stringify(item)), item, `${item.id}: undefined/non-JSON data`);
  }
});

test('catalog schema: editable fields and choices match placeholders without key collisions', () => {
  for (const item of catalog.items) {
    const keys = [];
    for (const field of item.fields) {
      for (const key of ['key', 'label', 'placeholder']) nonemptyString(field[key], `${item.id}.field.${key}`);
      assert.match(field.key, /^[a-zA-Z0-9_]+$/);
      assert.ok(item.prompt.includes(`{{${field.key}}}`), `${item.id}: unused field ${field.key}`);
      keys.push(field.key);
    }
    for (const choice of item.choices) {
      nonemptyString(choice.key, item.id);
      nonemptyString(choice.label, item.id);
      assert.ok(item.prompt.includes(`{{${choice.key}}}`), `${item.id}: unused choice ${choice.key}`);
      assert.ok(Array.isArray(choice.options) && choice.options.length > 0, item.id);
      for (const option of choice.options) {
        for (const key of ['value', 'label', 'text']) nonemptyString(option[key], `${item.id}.option.${key}`);
      }
      assert.equal(new Set(choice.options.map(option => option.value)).size, choice.options.length, item.id);
      keys.push(choice.key);
    }
    assert.equal(new Set(keys).size, keys.length, `${item.id}: ambiguous field/choice key`);
    const placeholders = [...item.prompt.matchAll(/\{\{([a-zA-Z0-9_]+)\}\}/g)].map(match => match[1]);
    assert.deepEqual(sorted(new Set(placeholders)), sorted(keys), `${item.id}: undeclared placeholder`);
  }
});

test('catalog schema: every provenance path and dependency belongs to the pinned manifest', () => {
  assert.deepEqual(catalog.source, {
    repository: REPOSITORY, commit: PINNED_COMMIT, importedAt: lock.importedAt, license: lock.license,
  });
  for (const item of catalog.items) {
    assert.equal(item.sourceUrl, `${REPOSITORY}/blob/${PINNED_COMMIT}/${item.sourcePath}`);
    assert.ok(item.sourceFiles.includes(item.sourcePath), item.id);
    assert.equal(new Set(item.sourceFiles).size, item.sourceFiles.length, item.id);
    for (const path of item.sourceFiles) assert.ok(Object.hasOwn(lock.files, path), `${item.id}: ${path}`);
    assert.doesNotMatch(item.prompt, /(?:file:\/\/|\/Users\/|\/home\/|\/tmp\/)/, `${item.id}: local-only source leaked`);
  }
});

test('catalog: repeated construction is deterministic and does not mutate the pinned lock', () => {
  const before = JSON.stringify(readLock());
  assert.deepEqual(buildCatalog(), catalog);
  assert.equal(JSON.stringify(readLock()), before);
});

test('validateSnapshot: an extra phantom manifest entry is rejected without writing any source files', () => {
  const files = { ...lock.files, 'terms/not-in-pinned-snapshot.json': '0'.repeat(64) };
  assert.throws(() => validateSnapshot({ ...lock, files }), /manifest|unexpected|ENOENT/i);
});

test('validateSnapshot: equal-sized manifests with a substituted path cannot pass a count-only check', () => {
  const files = { ...lock.files };
  delete files['templates/aigc/base-ip.json'];
  files['templates/aigc/not-the-base-ip.json'] = lock.files['templates/aigc/base-ip.json'];
  assert.equal(Object.keys(files).length, Object.keys(lock.files).length);
  assert.throws(() => validateSnapshot({ ...lock, files }), /manifest|unexpected|ENOENT/i);
});
