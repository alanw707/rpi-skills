#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const skillsDir = path.resolve(__dirname, '..', 'skills');
const packageName = '@alanw707/rpi-skills';

console.log(`\n${packageName} Setup\n${'='.repeat(60)}`);

// Detect harness
const harnesses = {
  pi: {
    check: () => {
      try { require.resolve('@earendil-works/pi-coding-agent'); return true; } catch { return false; }
    },
    install: () => {
      console.log(`\n✓ Pi detected.\n\nRun:\n  pi install ${packageName}\n`);
    }
  },
  claude: {
    check: () => {
      const claude = path.join(os.homedir(), '.claude');
      return fs.existsSync(claude);
    },
    install: () => {
      const claude = path.join(os.homedir(), '.claude', 'skills');
      console.log(`\n✓ Claude Code detected.\n\nSymlink skills directory:\n  ln -s ${skillsDir} ${claude}/rpi-skills\n\nOr copy:\n  cp -r ${skillsDir}/* ${claude}/\n`);
    }
  },
  openai: {
    check: () => {
      const openai = path.join(os.homedir(), '.openai-codex');
      return fs.existsSync(openai);
    },
    install: () => {
      const openai = path.join(os.homedir(), '.openai-codex', 'skills');
      console.log(`\n✓ OpenAI Codex detected.\n\nSymlink skills directory:\n  ln -s ${skillsDir} ${openai}/rpi-skills\n`);
    }
  }
};

// Run detection
let found = false;
for (const [name, harness] of Object.entries(harnesses)) {
  if (harness.check()) {
    harness.install();
    found = true;
    break;
  }
}

if (!found) {
  console.log(`\nNo supported harness detected locally.\n\nManual setup options:\n`);
  console.log(`1. Git clone:\n   git clone https://github.com/alanw707/rpi-skills.git`);
  console.log(`   # Configure your harness to load: ./rpi-skills/skills\n`);
  console.log(`2. NPM install:\n   npm install ${packageName}`);
  console.log(`   # Reference: node_modules/${packageName}/skills\n`);
  console.log(`3. Symlink (if your harness supports ~/.agents/skills):\n   ln -s ${skillsDir} ~/.agents/skills/rpi-skills\n`);
}

console.log(`Learn more: https://github.com/alanw707/rpi-skills#installation\n`);
