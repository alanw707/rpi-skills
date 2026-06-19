#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const skillsDir = path.resolve(__dirname, '..', 'skills');
const packageName = '@alanw707/rpi-skills';
const repoUrl = 'https://github.com/alanw707/rpi-skills#installation';

const HARNESS_DEFS = {
  pi: {
    label: 'Pi',
    description: 'Pi coding agent skills directory',
    defaultTarget: () => path.join(os.homedir(), '.pi', 'agent', 'skills'),
    detected: () => exists(path.join(os.homedir(), '.pi')) || commandExists('pi')
  },
  claude: {
    label: 'Claude Code',
    description: 'Claude Code local skills directory',
    defaultTarget: () => path.join(os.homedir(), '.claude', 'skills'),
    detected: () => exists(path.join(os.homedir(), '.claude'))
  },
  openai: {
    label: 'OpenAI Codex',
    description: 'OpenAI Codex local skills directory',
    defaultTarget: () => path.join(os.homedir(), '.openai-codex', 'skills'),
    detected: () => exists(path.join(os.homedir(), '.openai-codex'))
  },
  generic: {
    label: 'Generic Agent Skills',
    description: 'Generic ~/.agents/skills directory',
    defaultTarget: () => path.join(os.homedir(), '.agents', 'skills'),
    detected: () => exists(path.join(os.homedir(), '.agents'))
  },
  custom: {
    label: 'Custom path',
    description: 'Choose any skills directory',
    defaultTarget: () => process.cwd(),
    detected: () => false
  }
};

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  printHeader();

  if (!exists(skillsDir)) {
    fail(`Skills directory not found: ${skillsDir}`);
  }

  const availableSkills = listSkills();
  const config = args.yes || args.nonInteractive
    ? buildConfigFromFlags(args, availableSkills)
    : await promptForConfig(args, availableSkills);

  const plan = buildPlan(config, availableSkills);
  printPlan(plan);

  if (config.mode === 'print' || args.dryRun) {
    printCommands(plan);
    console.log(`\nNo files changed (${config.mode === 'print' ? 'print mode' : 'dry run'}).`);
    return;
  }

  if (!config.yes && !args.yes) {
    const { confirm } = await loadPrompts();
    const ok = await confirm({ message: 'Install these skills now?', default: true });
    if (!ok) {
      console.log('\nCancelled. No files changed.');
      return;
    }
  }

  const results = applyPlan(plan);
  printResults(results);
  console.log(`\nDone. Learn more: ${repoUrl}\n`);
}

function printHeader() {
  console.log(`\n${packageName} Setup`);
  console.log('='.repeat(60));
}

function printHelp() {
  printHeader();
  console.log(`\nUsage:\n  npx ${packageName} setup [options]\n  npx ${packageName} [options]\n\nOptions:\n  --harness <name>     pi, claude, openai, generic, custom\n  --target <path>      Install destination for custom/noninteractive use\n  --all                Install all skills\n  --skills <list>      Comma-separated skill names to install\n  --copy               Copy selected skills (default for npx)\n  --symlink            Symlink selected skills\n  --print              Print commands only\n  --yes, -y            Noninteractive; apply without prompts\n  --dry-run            Show plan without changing files\n  --help, -h           Show this help\n\nExamples:\n  npx ${packageName} setup\n  npx ${packageName} setup --harness pi --all --copy --yes\n  npx ${packageName} setup --target ~/.config/my-agent/skills --skills rpi-spec,rpi-plan --copy --yes\n`);
}

function parseArgs(argv) {
  const args = {
    command: null,
    harness: null,
    target: null,
    skills: null,
    all: false,
    mode: null,
    yes: false,
    dryRun: false,
    help: false,
    nonInteractive: false
  };

  const values = [...argv];
  if (values[0] && !values[0].startsWith('-')) {
    args.command = values.shift();
  }

  for (let i = 0; i < values.length; i++) {
    const arg = values[i];
    switch (arg) {
      case '--harness':
        args.harness = requireValue(values, ++i, arg);
        break;
      case '--target':
        args.target = expandHome(requireValue(values, ++i, arg));
        break;
      case '--skills':
        args.skills = requireValue(values, ++i, arg).split(',').map(s => s.trim()).filter(Boolean);
        break;
      case '--all':
        args.all = true;
        break;
      case '--copy':
        args.mode = 'copy';
        break;
      case '--symlink':
        args.mode = 'symlink';
        break;
      case '--print':
        args.mode = 'print';
        break;
      case '--yes':
      case '-y':
        args.yes = true;
        args.nonInteractive = true;
        break;
      case '--dry-run':
        args.dryRun = true;
        break;
      case '--help':
      case '-h':
        args.help = true;
        break;
      default:
        fail(`Unknown option: ${arg}\nRun with --help for usage.`);
    }
  }

  if (args.command && args.command !== 'setup') {
    fail(`Unknown command: ${args.command}\nRun with --help for usage.`);
  }

  return args;
}

async function promptForConfig(args, availableSkills) {
  const { select, checkbox, input } = await loadPrompts();
  const detected = detectedHarnesses();
  const harnessChoices = Object.entries(HARNESS_DEFS).map(([value, def]) => ({
    value,
    name: `${def.label}${detected.includes(value) ? ' (detected)' : ''}`,
    description: def.description
  }));

  const harness = args.harness || await select({
    message: 'Select harness to install for',
    choices: orderHarnessChoices(harnessChoices, detected)
  });

  validateHarness(harness);

  const defaultTarget = args.target || HARNESS_DEFS[harness].defaultTarget();
  const target = harness === 'custom' || args.target
    ? expandHome(await input({ message: 'Skills install directory', default: defaultTarget }))
    : defaultTarget;

  const mode = args.mode || await select({
    message: 'Install method',
    default: defaultMode(),
    choices: [
      { value: 'copy', name: 'Copy skills', description: 'Recommended for npx; stable after npm cache cleanup' },
      { value: 'symlink', name: 'Symlink skills', description: 'Good for local development or stable installs' },
      { value: 'print', name: 'Print commands only', description: 'Show commands without changing files' }
    ]
  });

  const selectedSkills = args.all
    ? availableSkills.map(s => s.name)
    : args.skills || await checkbox({
      message: 'Select skills to install',
      instructions: 'Space to toggle, enter to confirm',
      required: true,
      choices: availableSkills.map(skill => ({ value: skill.name, name: skill.name, checked: true }))
    });

  return { harness, target, mode, selectedSkills, yes: false };
}

function buildConfigFromFlags(args, availableSkills) {
  const harness = args.harness || 'generic';
  validateHarness(harness);

  const target = args.target || HARNESS_DEFS[harness].defaultTarget();
  const mode = args.mode || defaultMode();
  const selectedSkills = args.all
    ? availableSkills.map(s => s.name)
    : args.skills || availableSkills.map(s => s.name);

  return { harness, target, mode, selectedSkills, yes: true };
}

function buildPlan(config, availableSkills) {
  const skillByName = new Map(availableSkills.map(skill => [skill.name, skill]));
  const missing = config.selectedSkills.filter(name => !skillByName.has(name));
  if (missing.length) {
    fail(`Unknown skill(s): ${missing.join(', ')}\nAvailable: ${availableSkills.map(s => s.name).join(', ')}`);
  }

  const target = path.resolve(expandHome(config.target));
  const skills = config.selectedSkills.map(name => {
    const skill = skillByName.get(name);
    return {
      name,
      source: skill.dir,
      destination: path.join(target, name)
    };
  });

  return {
    packageName,
    harness: config.harness,
    harnessLabel: HARNESS_DEFS[config.harness].label,
    target,
    mode: config.mode,
    skills
  };
}

function printPlan(plan) {
  console.log(`\nHarness: ${plan.harnessLabel}`);
  console.log(`Target:  ${plan.target}`);
  console.log(`Method:  ${plan.mode}`);
  console.log(`Skills:  ${plan.skills.length}`);
  plan.skills.forEach(skill => console.log(`  - ${skill.name}`));
}

function printCommands(plan) {
  console.log('\nCommands:');
  console.log(`mkdir -p ${shellQuote(plan.target)}`);
  for (const skill of plan.skills) {
    if (plan.mode === 'symlink') {
      console.log(`rm -rf ${shellQuote(skill.destination)} && ln -s ${shellQuote(skill.source)} ${shellQuote(skill.destination)}`);
    } else {
      console.log(`rm -rf ${shellQuote(skill.destination)} && cp -R ${shellQuote(skill.source)} ${shellQuote(skill.destination)}`);
    }
  }
}

function applyPlan(plan) {
  ensureDir(plan.target);
  const results = [];

  for (const skill of plan.skills) {
    removePath(skill.destination);
    if (plan.mode === 'symlink') {
      fs.symlinkSync(skill.source, skill.destination, 'dir');
      results.push({ skill: skill.name, action: 'symlinked', destination: skill.destination });
    } else {
      copyDir(skill.source, skill.destination);
      results.push({ skill: skill.name, action: 'copied', destination: skill.destination });
    }
  }

  return results;
}

function printResults(results) {
  console.log('\nInstalled:');
  for (const result of results) {
    console.log(`  ✓ ${result.skill} ${result.action} -> ${result.destination}`);
  }
}

function listSkills() {
  return fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .filter(entry => exists(path.join(skillsDir, entry.name, 'SKILL.md')))
    .map(entry => ({ name: entry.name, dir: path.join(skillsDir, entry.name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function loadPrompts() {
  try {
    return await import('@inquirer/prompts');
  } catch (error) {
    fail(`Interactive prompts unavailable. Try noninteractive flags, e.g.\n  npx ${packageName} setup --harness pi --all --copy --yes\n\n${error.message}`);
  }
}

function detectedHarnesses() {
  return Object.entries(HARNESS_DEFS)
    .filter(([, def]) => safeBool(def.detected))
    .map(([name]) => name);
}

function orderHarnessChoices(choices, detected) {
  const rank = choice => detected.includes(choice.value) ? 0 : choice.value === 'custom' ? 2 : 1;
  return [...choices].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

function defaultMode() {
  return isNpxInstall() ? 'copy' : 'copy';
}

function isNpxInstall() {
  return __dirname.includes(`${path.sep}_npx${path.sep}`) || __dirname.includes(`${path.sep}.npm${path.sep}_npx${path.sep}`);
}

function validateHarness(harness) {
  if (!HARNESS_DEFS[harness]) {
    fail(`Unknown harness: ${harness}\nAvailable: ${Object.keys(HARNESS_DEFS).join(', ')}`);
  }
}

function requireValue(values, index, flag) {
  const value = values[index];
  if (!value || value.startsWith('-')) {
    fail(`${flag} requires a value`);
  }
  return value;
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function safeBool(fn) {
  try {
    return Boolean(fn());
  } catch {
    return false;
  }
}

function commandExists(command) {
  const pathVar = process.env.PATH || '';
  const extensions = process.platform === 'win32' ? ['', '.cmd', '.exe', '.bat'] : [''];
  for (const dir of pathVar.split(path.delimiter)) {
    for (const ext of extensions) {
      if (exists(path.join(dir, command + ext))) return true;
    }
  }
  return false;
}

function expandHome(value) {
  if (!value) return value;
  if (value === '~') return os.homedir();
  if (value.startsWith(`~${path.sep}`) || value.startsWith('~/')) {
    return path.join(os.homedir(), value.slice(2));
  }
  return value;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removePath(filePath) {
  fs.rmSync(filePath, { recursive: true, force: true });
}

function copyDir(source, destination) {
  fs.cpSync(source, destination, { recursive: true, force: true, errorOnExist: false });
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function fail(message) {
  console.error(`\nError: ${message}\n`);
  process.exit(1);
}

main().catch(error => {
  if (error && error.name === 'ExitPromptError') {
    console.log('\nCancelled.');
    process.exit(1);
  }
  console.error(error);
  process.exit(1);
});
