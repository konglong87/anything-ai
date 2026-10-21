#!/usr/bin/env node
/** Explicit, commit-pinned import. Build never fetches or follows main. */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync, rmSync, renameSync, lstatSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../../', import.meta.url));
const args = process.argv.slice(2);
const option = name => args[args.indexOf(name) + 1];
if (!args.includes('--repo') || !args.includes('--ref')) throw new Error('Usage: node scripts/jargon/sync.mjs --repo /path/to/feeling-to-jargon --ref <full-commit-sha>');
const repo = resolve(option('--repo')); const requested = option('--ref');
if (!/^[a-f0-9]{40}$/.test(requested)) throw new Error('Require a full immutable 40-character commit SHA.');
const revision = execFileSync('git', ['-C',repo,'rev-parse',`${requested}^{commit}`], {encoding:'utf8'}).trim();
const target = join(root,'.data/jargon'); const staging = mkdtempSync(join(tmpdir(),'jargon-public-import-'));
try {
  const archive = execFileSync('git',['-C',repo,'archive',revision],{maxBuffer:20*1024*1024});
  execFileSync('tar',['-x','-C',staging],{input:archive});
  const files = {};
  const scan = dir => { for(const name of readdirSync(dir).sort()) { const file=join(dir,name); const stat=lstatSync(file); if(stat.isSymbolicLink()) throw new Error('Source symlinks are not allowed'); if(stat.isDirectory()) scan(file); else {const path=relative(staging,file).split('\\').join('/');files[path]=createHash('sha256').update(readFileSync(file)).digest('hex');} } };
  scan(staging);
  for (const file of ['LICENSE','index/root.json','index/leaves.json','index/runtime.json','skills/feeling-to-jargon/SKILL.md']) if(!files[file]) throw new Error(`Required source file missing: ${file}`);
  for (const path of Object.keys(files).filter(path=>path.endsWith('.json'))) JSON.parse(readFileSync(join(staging,path),'utf8'));
  mkdirSync(target,{recursive:true});
  const backup=join(target,'upstream.previous'); rmSync(backup,{recursive:true,force:true});
  try {renameSync(join(target,'upstream'),backup);} catch(error) {if(error.code!=='ENOENT') throw error;}
  try {
    // Copy via tar supports cross-filesystem staging without relying on rename.
    mkdirSync(join(target,'upstream'),{recursive:true});execFileSync('tar',['-x','-C',join(target,'upstream')],{input:archive});
    const lock={schemaVersion:1,repository:'https://github.com/konglong87/feeling-to-jargon',commit:revision,committedAt:execFileSync('git',['-C',repo,'show','-s','--format=%cI',revision],{encoding:'utf8'}).trim(),importedAt:new Date().toISOString(),license:'MIT',files};
    writeFileSync(join(target,'lock.json'),JSON.stringify(lock,null,2)+'\n');rmSync(backup,{recursive:true,force:true});
    console.log(`Imported ${Object.keys(files).length} files from ${revision}; dirty working files excluded.`);
  } catch(error) {rmSync(join(target,'upstream'),{recursive:true,force:true});renameSync(backup,join(target,'upstream'));throw error;}
} finally {rmSync(staging,{recursive:true,force:true});}
