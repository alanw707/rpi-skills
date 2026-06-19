#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '..', 'skills');
const passed = [];
const failed = [];

function validateSkill(skillDir) {
  const name = path.basename(skillDir);
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  
  if (!fs.existsSync(skillMdPath)) {
    failed.push(`${name}: missing SKILL.md`);
    return;
  }
  
  const text = fs.readFileSync(skillMdPath, 'utf8');
  
  // Check frontmatter (handle both LF and CRLF)
  if (!/^---[\r\n]/.test(text)) {
    failed.push(`${name}: SKILL.md missing frontmatter`);
    return;
  }
  
  const endIdx = text.indexOf('\n---', 4);
  if (endIdx === -1) {
    failed.push(`${name}: SKILL.md frontmatter not closed`);
    return;
  }
  
  const frontmatter = text.slice(4, endIdx);
  const hasFrontmatterName = /^name:/m.test(frontmatter);
  const hasFrontmatterDesc = /^description:/m.test(frontmatter);
  
  if (!hasFrontmatterName) {
    failed.push(`${name}: missing frontmatter field 'name'`);
    return;
  }
  
  if (!hasFrontmatterDesc) {
    failed.push(`${name}: missing frontmatter field 'description'`);
    return;
  }
  
  // Check for stale references
  if (text.includes('.github/project-context.md') || text.includes('.github\project-context.md')) {
    failed.push(`${name}: contains stale .github/project-context.md reference`);
    return;
  }
  
  if (text.includes('root_policy') || text.includes('canonical_root') || text.includes('mirror_roots')) {
    failed.push(`${name}: contains maintainer-local metadata`);
    return;
  }
  
  // Check for absolute paths
  const absPathPattern = /[A-Z]:\|%USERPROFILE%|\$HOME|\/home\/|\/Users\//;
  if (absPathPattern.test(text)) {
    failed.push(`${name}: contains absolute or machine-specific paths`);
    return;
  }
  
  passed.push(name);
}

// Scan skills directory
if (!fs.existsSync(skillsDir)) {
  console.error(`Skills directory not found: ${skillsDir}`);
  process.exit(1);
}

const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
for (const ent of entries) {
  if (ent.isDirectory() && ent.name.startsWith('rpi-')) {
    validateSkill(path.join(skillsDir, ent.name));
  }
}

// Report
console.log(`\nValidation Results\n${'='.repeat(50)}`);
console.log(`Passed: ${passed.length}`);
passed.forEach(s => console.log(`✓ ${s}`));

if (failed.length > 0) {
  console.log(`\nFailed: ${failed.length}`);
  failed.forEach(f => console.log(`✗ ${f}`));
  process.exit(1);
} else {
  console.log(`\nAll skills validated.`);
  process.exit(0);
}
