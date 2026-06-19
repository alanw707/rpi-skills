#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const setup = path.join(root, 'scripts', 'setup.js');

function run(args, options = {}) {
  const result = spawnSync(process.execPath, [setup, ...args], {
    cwd: root,
    encoding: 'utf8',
    ...options
  });
  return result;
}

function assertSuccess(result, label) {
  assert.strictEqual(result.status, 0, `${label} failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
}

function withTempDir(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rpi-skills-setup-test-'));
  try {
    return fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const help = run(['--help']);
assertSuccess(help, 'help');
assert.match(help.stdout, /--harness <name>/);
assert.match(help.stdout, /--skills <list>/);

withTempDir(dir => {
  const target = path.join(dir, 'skills');
  const result = run(['--harness', 'generic', '--target', target, '--skills', 'rpi-spec', '--copy', '--yes']);
  assertSuccess(result, 'copy single skill');
  assert.ok(fs.existsSync(path.join(target, 'rpi-spec', 'SKILL.md')), 'copied SKILL.md exists');
  assert.ok(!fs.existsSync(path.join(target, 'rpi-plan', 'SKILL.md')), 'unselected skill not copied');
});

withTempDir(dir => {
  const target = path.join(dir, 'skills');
  const result = run(['--harness', 'custom', '--target', target, '--skills', 'rpi-plan', '--symlink', '--yes']);
  assertSuccess(result, 'symlink single skill');
  const linkPath = path.join(target, 'rpi-plan');
  assert.ok(fs.lstatSync(linkPath).isSymbolicLink(), 'skill path is symlink');
  assert.ok(fs.existsSync(path.join(linkPath, 'SKILL.md')), 'symlinked SKILL.md resolves');
});

withTempDir(dir => {
  const target = path.join(dir, 'skills');
  const result = run(['--harness', 'pi', '--target', target, '--skills', 'rpi-review', '--print', '--yes']);
  assertSuccess(result, 'print mode');
  assert.match(result.stdout, /No files changed \(print mode\)/);
  assert.ok(!fs.existsSync(target), 'print mode does not create target');
});

const unknown = run(['--harness', 'unknown', '--yes']);
assert.notStrictEqual(unknown.status, 0, 'unknown harness fails');
assert.match(unknown.stderr, /Unknown harness/);

console.log('setup tests passed');
