#!/usr/bin/env node

/**
 * Universal AI Agent Skills CLI
 * https://github.com/rawenergon/skill
 * Author: Aditya Raj (@rawenergon)
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

const REPO_OWNER = "rawenergon";
const REPO_NAME = "skill";
const GITHUB_RAW = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main`;
const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

// Load catalog
let catalog = [];
try {
  const jsonPath = path.join(__dirname, "..", "skills.json");
  if (fs.existsSync(jsonPath)) {
    catalog = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  }
} catch (e) {
  catalog = [];
}

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
};

function banner() {
  console.log(`
${colors.cyan}${colors.bold}⚡ Universal AI Agent Skills Collection${colors.reset} ${colors.dim}(v1.0.0)${colors.reset}
${colors.dim}Curated production-ready skills for Antigravity, Claude, Cursor, Codex & Swarms${colors.reset}
`);
}

function printHelp() {
  banner();
  console.log(`${colors.bold}USAGE:${colors.reset}`);
  console.log(`  npx @rawenergon/skills <command> [options]`);
  console.log(`  skills <command> [options]\n`);
  console.log(`${colors.bold}COMMANDS:${colors.reset}`);
  console.log(`  ${colors.green}list${colors.reset}                List all 46 available agent skills by category`);
  console.log(`  ${colors.green}search <term>${colors.reset}       Search skills by keyword or category`);
  console.log(`  ${colors.green}info <skill>${colors.reset}        Show detailed overview and file manifest for a skill`);
  console.log(`  ${colors.green}add <skill>${colors.reset}         Install a skill into .gemini/skills or .agents/skills`);
  console.log(`  ${colors.green}add all${colors.reset}             Install all 46 skills into current repository`);
  console.log(`  ${colors.green}init${colors.reset}                Initialize agent skills directory in current project`);
  console.log(`  ${colors.green}web${colors.reset}                 Open the interactive skills directory website\n`);
  console.log(`${colors.bold}OPTIONS:${colors.reset}`);
  console.log(`  --dir <path>        Custom destination directory (e.g. --dir .agents/skills)`);
  console.log(`  --help, -h          Show this help message\n`);
  console.log(`${colors.bold}EXAMPLES:${colors.reset}`);
  console.log(`  npx @rawenergon/skills list`);
  console.log(`  npx @rawenergon/skills add reverse-engineer-anything`);
  console.log(`  npx @rawenergon/skills add sticker-craft --dir .gemini/skills\n`);
}

function resolveDestDir(customDir) {
  if (customDir) {
    return path.resolve(process.cwd(), customDir);
  }
  // Detect existing structure
  if (fs.existsSync(path.join(process.cwd(), ".gemini", "skills"))) {
    return path.join(process.cwd(), ".gemini", "skills");
  }
  if (fs.existsSync(path.join(process.cwd(), ".agents", "skills"))) {
    return path.join(process.cwd(), ".agents", "skills");
  }
  // Default to .agents/skills
  return path.join(process.cwd(), ".agents", "skills");
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    
    https.get(url, { headers: { "User-Agent": "skills-cli" } }, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function installSkill(skillName, destBaseDir) {
  const item = catalog.find((s) => s.name.toLowerCase() === skillName.toLowerCase());
  if (!item && skillName !== "all") {
    console.error(`${colors.red}Error: Skill '${skillName}' not found in catalog.${colors.reset}`);
    console.log(`Run ${colors.cyan}npx @rawenergon/skills list${colors.reset} to view all available skills.`);
    return false;
  }

  // Check if we have local package source
  const localSkillDir = path.join(__dirname, "..", "skills", skillName);
  const targetDir = path.join(destBaseDir, skillName);

  console.log(`${colors.cyan}Installing ${colors.bold}${skillName}${colors.reset} -> ${colors.dim}${targetDir}${colors.reset}...`);

  if (fs.existsSync(localSkillDir)) {
    copyRecursive(localSkillDir, targetDir);
    console.log(`${colors.green}✓ Successfully installed ${skillName}!${colors.reset}`);
    return true;
  }

  // Fallback to downloading via GitHub API / Raw
  if (item && item.files) {
    for (const relFile of item.files) {
      const fileUrl = `${GITHUB_RAW}/skills/${skillName}/${encodeURI(relFile)}`;
      const outPath = path.join(targetDir, relFile);
      try {
        await downloadFile(fileUrl, outPath);
      } catch (e) {
        console.warn(`${colors.yellow}Warning: Failed to fetch ${relFile}: ${e.message}${colors.reset}`);
      }
    }
    console.log(`${colors.green}✓ Successfully installed ${skillName} (${item.files.length} files)!${colors.reset}`);
    return true;
  } else {
    // Single file SKILL.md fallback
    const skillMdUrl = `${GITHUB_RAW}/skills/${skillName}/SKILL.md`;
    await downloadFile(skillMdUrl, path.join(targetDir, "SKILL.md"));
    console.log(`${colors.green}✓ Installed ${skillName}/SKILL.md${colors.reset}`);
    return true;
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  const cmd = args[0].toLowerCase();
  
  // Custom directory flag
  let customDir = null;
  const dirIdx = args.indexOf("--dir");
  if (dirIdx !== -1 && args[dirIdx + 1]) {
    customDir = args[dirIdx + 1];
  }

  if (cmd === "list" || cmd === "ls") {
    banner();
    const categories = {};
    catalog.forEach((s) => {
      if (!categories[s.category]) categories[s.category] = [];
      categories[s.category].push(s);
    });

    for (const [cat, skills] of Object.entries(categories)) {
      console.log(`\n${colors.bold}${colors.magenta}${cat}${colors.reset} ${colors.dim}(${skills.length})${colors.reset}`);
      skills.forEach((s) => {
        console.log(`  ${colors.green}${s.name.padEnd(28)}${colors.reset} ${colors.dim}${s.description.slice(0, 75)}${s.description.length > 75 ? "..." : ""}${colors.reset}`);
      });
    }

    console.log(`\n${colors.dim}Total: ${catalog.length} production-grade agent skills.${colors.reset}`);
    console.log(`To install: ${colors.cyan}npx @rawenergon/skills add <skill-name>${colors.reset}\n`);
    return;
  }

  if (cmd === "search") {
    const term = args[1]?.toLowerCase();
    if (!term) {
      console.error(`${colors.red}Please provide a search keyword.${colors.reset}`);
      return;
    }
    banner();
    const matches = catalog.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.category.toLowerCase().includes(term)
    );

    console.log(`${colors.bold}Search results for "${term}":${colors.reset} (${matches.length} found)\n`);
    matches.forEach((s) => {
      console.log(`  ${colors.green}${colors.bold}${s.name}${colors.reset} [${colors.cyan}${s.category}${colors.reset}]`);
      console.log(`    ${colors.dim}${s.description}${colors.reset}\n`);
    });
    return;
  }

  if (cmd === "info") {
    const skillName = args[1];
    if (!skillName) {
      console.error(`${colors.red}Please provide a skill name.${colors.reset}`);
      return;
    }
    const item = catalog.find((s) => s.name.toLowerCase() === skillName.toLowerCase());
    if (!item) {
      console.error(`${colors.red}Skill '${skillName}' not found.${colors.reset}`);
      return;
    }
    banner();
    console.log(`${colors.bold}Skill:${colors.reset}       ${colors.green}${colors.bold}${item.name}${colors.reset}`);
    console.log(`${colors.bold}Category:${colors.reset}    ${colors.cyan}${item.category}${colors.reset}`);
    console.log(`${colors.bold}Files:${colors.reset}       ${item.fileCount} items`);
    console.log(`${colors.bold}Description:${colors.reset} ${item.description}\n`);
    console.log(`${colors.bold}Install:${colors.reset}`);
    console.log(`  ${colors.yellow}npx @rawenergon/skills add ${item.name}${colors.reset}\n`);
    if (item.overview) {
      console.log(`${colors.bold}Overview:${colors.reset}`);
      console.log(`${colors.dim}${item.overview}...${colors.reset}\n`);
    }
    return;
  }

  if (cmd === "add" || cmd === "install") {
    const target = args[1];
    if (!target) {
      console.error(`${colors.red}Please specify a skill name (or 'all').${colors.reset}`);
      console.log(`Usage: ${colors.cyan}npx @rawenergon/skills add <skill-name>${colors.reset}`);
      return;
    }

    const destDir = resolveDestDir(customDir);
    fs.mkdirSync(destDir, { recursive: true });

    if (target.toLowerCase() === "all") {
      banner();
      console.log(`${colors.bold}Installing all ${catalog.length} skills into ${destDir}...${colors.reset}\n`);
      for (const s of catalog) {
        await installSkill(s.name, destDir);
      }
      console.log(`\n${colors.bold}${colors.green}✓ All ${catalog.length} skills installed successfully!${colors.reset}`);
      return;
    }

    banner();
    await installSkill(target, destDir);
    return;
  }

  if (cmd === "init") {
    banner();
    const destDir = resolveDestDir(customDir);
    fs.mkdirSync(destDir, { recursive: true });
    const agentsMdPath = path.join(process.cwd(), "AGENTS.md");
    if (!fs.existsSync(agentsMdPath)) {
      fs.writeFileSync(
        agentsMdPath,
        `# Agent Guidelines & Skills\n\nSkills in this repository are managed via [\`@rawenergon/skills\`](https://github.com/rawenergon/skill).\nSkills directory: \`${path.relative(process.cwd(), destDir)}\`\n`,
        "utf-8"
      );
      console.log(`${colors.green}✓ Created AGENTS.md${colors.reset}`);
    }
    console.log(`${colors.green}✓ Initialized skills directory at ${destDir}${colors.reset}`);
    console.log(`Run ${colors.cyan}npx @rawenergon/skills add <skill>${colors.reset} to install skills.`);
    return;
  }

  if (cmd === "web") {
    const url = "https://rawenergon.github.io/skill/";
    console.log(`Opening skills directory: ${url}`);
    const startCmd = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
    try {
      execSync(`${startCmd} ${url}`);
    } catch (e) {
      console.log(`Visit: ${url}`);
    }
    return;
  }

  console.error(`${colors.red}Unknown command: ${cmd}${colors.reset}`);
  printHelp();
}

main().catch((err) => {
  console.error(`${colors.red}Fatal error: ${err.message}${colors.reset}`);
  process.exit(1);
});
