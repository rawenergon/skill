# 🧠 Universal Agent Skills (`skill`)

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![Skills Count](https://img.shields.io/badge/Skills-45%20Curated-ff6a00.svg)](#-skills-catalog)
[![Agent Support](https://img.shields.io/badge/Agents-Antigravity%20%7C%20Gemini%20%7C%20Claude%20%7C%20Cursor%20%7C%20Codex-emerald.svg)](#-how-to-use-inside-your-repo)

A production-grade, open-source library of **45 specialized AI agent skills** for engineering, motion design, reverse engineering, multi-agent swarms, code auditing, and architecture workflows.

Each skill is self-contained with its instruction manifest (`SKILL.md`), reference recipes, configuration schemas, and executable scripts ready to drop into any repository or agent workspace.

---

## ⚡ How to Use Inside Your Repo

You can install all skills or cherry-pick specific ones into your project's agent directory.

### Standard Agent Discovery Paths
Agents automatically discover and load skills placed in:
* **Antigravity / Gemini CLI:** `.gemini/skills/<skill-name>/`
* **Claude Code / Cursor / Codex:** `.agents/skills/<skill-name>/` or `skills/<skill-name>/`

---

### Method 1: Install with One-Liner (Fastest)

#### Install All Skills into Your Project:
```bash
# Linux / macOS (Installs into .gemini/skills/ and .agents/skills/)
curl -fsSL https://raw.githubusercontent.com/rawenergon/skill/main/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/rawenergon/skill/main/install.ps1 | iex
```

#### Install a Single Skill:
```bash
# Example: Install 'reverse-engineer-anything' only
curl -fsSL https://raw.githubusercontent.com/rawenergon/skill/main/install.sh | bash -s reverse-engineer-anything

# Windows PowerShell:
irm https://raw.githubusercontent.com/rawenergon/skill/main/install.ps1 | iex -ArgumentList "reverse-engineer-anything"
```

---

### Method 2: Git Clone or Submodule

```bash
# As a Git submodule inside your repository:
git submodule add https://github.com/rawenergon/skill.git .gemini/skills/universal-skills

# Or direct clone:
git clone https://github.com/rawenergon/skill.git temp-skills
cp -r temp-skills/skills/* .gemini/skills/
rm -rf temp-skills
```

---

## 📚 Skills Catalog

### 🎨 Frontend & Motion Design

> Production motion engineering, Apple HIG ergonomics, Emil Kowalski polish, and interactive UI systems.

| Skill | Description | Manifest |
| :--- | :--- | :--- |
| **`animate`** | Build an animation from scratch, making the decisions in the order that determines whether it feels right — should it animate at all, what p... | [Manifest](skills/animate/SKILL.md) |
| **`animate-expo`** | Build animations in React Native and Expo, making the decisions in the order that determines whether they feel right — should it animate, wh... | [Manifest](skills/animate-expo/SKILL.md) |
| **`animation-performance`** | Keep web animations inside the frame budget — animate composite-only properties, keep motion off the main thread when the page is busy, and ... | [Manifest](skills/animation-performance/SKILL.md) |
| **`animation-vocabulary`** | Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term ("the bouncy thing when a pop... | [Manifest](skills/animation-vocabulary/SKILL.md) |
| **`apple-design`** | Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, s... | [Manifest](skills/apple-design/SKILL.md) |
| **`ask-sonner`** | Guide to Sonner, the React toast library — install and wire up the Toaster, pick the right toast() call, promise and loading toasts, updatin... | [Manifest](skills/ask-sonner/SKILL.md) |
| **`break-ui`** | Try to break a piece of UI by feeding it worst-case data — long names, unbreakable emails, one-letter names, missing fields, huge counts, ze... | [Manifest](skills/break-ui/SKILL.md) |
| **`choreograph`** | Coordinate several elements that animate together — decide what moves, in what order, how much they overlap, and what stays still — so a gro... | [Manifest](skills/choreograph/SKILL.md) |
| **`design-taste-frontend`** | tasteskill 2.5.0, the anti-slop frontend skill. Builds professional company websites at the level of figma.com and x.ai: plain copy, one sys... | [Manifest](skills/design-taste-frontend/SKILL.md) |
| **`dithered-isometric-scenes`** | Build animated isometric miniature scenes and longer staged 3D sequences with matte low-poly geometry, ordered pixel dithering, and a quiet ... | [Manifest](skills/dithered-isometric-scenes/SKILL.md) |
| **`emil-design-eng`** | This skill encodes Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make softw... | [Manifest](skills/emil-design-eng/SKILL.md) |
| **`find-animation-opportunities`** | Search a codebase or UI for places that don't animate but should, and reject everything that shouldn't. Read-only; it proposes motion with e... | [Manifest](skills/find-animation-opportunities/SKILL.md) |
| **`impeccable`** | Use when the user wants to design, redesign, shape, critique, audit, polish, simplify, harden, animate, or otherwise improve a frontend inte... | [Manifest](skills/impeccable/SKILL.md) |
| **`improve-animations`** | Survey a codebase's animation and motion code as a senior motion advisor, then produce a prioritized audit and self-contained implementation... | [Manifest](skills/improve-animations/SKILL.md) |
| **`mobile-native`** | Make a web app feel native on a phone — the small CSS and meta-tag fixes that separate "a website in a browser" from something that feels in... | [Manifest](skills/mobile-native/SKILL.md) |
| **`pick-ui-library`** | Pick the right library for a given frontend task from a curated, opinionated list — numbers, OTP inputs, charts, command menus, virtualizati... | [Manifest](skills/pick-ui-library/SKILL.md) |
| **`prototype`** | Build multiple genuinely different versions of a UI piece you describe, rendered behind a visual picker so you can flip through them live an... | [Manifest](skills/prototype/SKILL.md) |
| **`remove-animations`** | Find the animations an interface doesn't need and remove them — motion on keyboard actions, high-frequency surfaces, functional data, and de... | [Manifest](skills/remove-animations/SKILL.md) |
| **`review-animations`** | Reviews animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy. Default to flagging; ... | [Manifest](skills/review-animations/SKILL.md) |
| **`sticker-craft`** | Design, construct, vectorize, and animate interactive 3D peelable vinyl stickers, die-cut decals, and SVG components with physics-based peel... | [Manifest](skills/sticker-craft/SKILL.md) |

---

### ⚙️ Engineering & Reversing

> Binary reversing, AST & architecture knowledge graphs, technical physical diagrams, and vulnerability auditing.

| Skill | Description | Manifest |
| :--- | :--- | :--- |
| **`anatomy`** | Build crafted, highly detailed, interactive isometric SVG figures that explain a technical idea as a real physical object (a test rig, a dia... | [Manifest](skills/anatomy/SKILL.md) |
| **`graphify`** | Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, wher... | [Manifest](skills/graphify/SKILL.md) |
| **`phpcheck-server`** | Check PHP2Shell patch status with local or server access. | [Manifest](skills/phpcheck-server/SKILL.md) |
| **`phpcheck-url`** | Check the advertised PHP version from a URL or hostname. | [Manifest](skills/phpcheck-url/SKILL.md) |
| **`reverse-engineer-anything`** | Reverse engineer native, managed, Electron/JavaScript, packaged, firmware, and browser targets with REA. Use shipped-artifact or requested r... | [Manifest](skills/reverse-engineer-anything/SKILL.md) |

---

### 🤖 Agent Orchestration & Swarms

> Dynamic Python workflows, multi-agent swarms, background automation, and generative chat interfaces.

| Skill | Description | Manifest |
| :--- | :--- | :--- |
| **`automation`** | Interactive guide to design and create a scheduled background automation. Use this skill when the user wants to create an automated or recur... | [Manifest](skills/automation/SKILL.md) |
| **`generative-ui`** | How to render rich interactive HTML widgets inline in the chat or as standalone artifacts. Use this skill when you want to show the user dia... | [Manifest](skills/generative-ui/SKILL.md) |
| **`mcp-app-development`** | Build, package, and debug MCP Apps for Antigravity: MCP server tools whose results render as interactive UI in the conversation, in the side... | [Manifest](skills/mcp-app-development/SKILL.md) |
| **`native-swarm`** | (Preview & Quota Heavy) Run a swarm: several agents working in parallel on one task, each in its own conversation, collaborating through a s... | [Manifest](skills/native-swarm/SKILL.md) |
| **`permissioned-github`** | Guidelines for interacting with GitHub and request permissions from the user when commands fail due to restrictions in the agent environment... | [Manifest](skills/permissioned-github/SKILL.md) |
| **`run-workflow`** | How to write and run a dynamic workflow script with the `run_workflow` tool: a Python script that orchestrates many agents with `agent`, `pa... | [Manifest](skills/run-workflow/SKILL.md) |
| **`swarm-monitor`** | ONLY for the native-swarm worker whose brief says it is the monitor. On a timer, it checks whether the whole swarm has stalled and calls on ... | [Manifest](skills/swarm-monitor/SKILL.md) |
| **`swarm-narrator`** | ONLY for the native-swarm worker whose brief says it is the narrator. It watches the board and keeps the facts behind the user's Overview (v... | [Manifest](skills/swarm-narrator/SKILL.md) |

---

### 🧩 Customizations & Extensibility

> Plugin development, agent configuration migration, UI panels, and environment tailoring.

| Skill | Description | Manifest |
| :--- | :--- | :--- |
| **`agy-customizations`** | Comprehensive guide and reference for the Antigravity Customization System. Use to explain how customizations work, their loading priority, ... | [Manifest](skills/agy-customizations/SKILL.md) |
| **`antigravity-guide`** | Provides a comprehensive guide, quick reference, and sitemap for Google Antigravity (AGY), including the Antigravity CLI (agy), Antigravity ... | [Manifest](skills/antigravity-guide/SKILL.md) |
| **`migrate-agent-settings`** | Migrates the user's MCP servers, skills, slash commands, subagents, and instruction files from other coding agents (Claude Code, Codex, Curs... | [Manifest](skills/migrate-agent-settings/SKILL.md) |
| **`migrate-workflows`** | Automatically migrate legacy workflows to modern skills across global and workspace configurations. Scans for existing workflows, creates ta... | [Manifest](skills/migrate-workflows/SKILL.md) |
| **`plugin`** | How to manage and create plugins — namespaced bundles of skills, agents, rules, MCP servers and hooks that install, enable and disable as a ... | [Manifest](skills/plugin/SKILL.md) |
| **`ui-plugin-navigation`** | Discover UI plugin panels relevant to the current task and surface a one-click pill in chat to open (toggle) them in the side pane. Use when... | [Manifest](skills/ui-plugin-navigation/SKILL.md) |

---

### 🛡️ Architecture & Code Quality

> Repository health, debt tracking, architectural auditing, Swift 6 safety, and high-standard PR reviews.

| Skill | Description | Manifest |
| :--- | :--- | :--- |
| **`ponytail`** | Lazy senior dev mode: the smallest change that fully solves the task, and a reply a busy human understands in one read. Use on any coding ta... | [Manifest](skills/ponytail/SKILL.md) |
| **`ponytail-audit`** | Quality audit of a whole repo: bugs, security holes, what breaks under real load, risky code without tests, slow paths, and what to delete, ... | [Manifest](skills/ponytail-audit/SKILL.md) |
| **`ponytail-debt`** | List every `shortcut:` comment (and older `ponytail:` ones) as a debt ledger. One-shot report, changes nothing. Use for "ponytail debt", "wh... | [Manifest](skills/ponytail-debt/SKILL.md) |
| **`ponytail-gain`** | Show ponytail's measured savings (code, cost, speed) from the benchmark. One-shot display. Use for /ponytail-gain, "what does ponytail save"... | [Manifest](skills/ponytail-gain/SKILL.md) |
| **`ponytail-help`** | Quick reference for ponytail levels, skills and commands. One-shot display. Use for /ponytail-help, "ponytail help", "how do I use ponytail"... | [Manifest](skills/ponytail-help/SKILL.md) |
| **`ponytail-review`** | Quality review of a change: is the logic right, is it safe, does it hold under real load, is risky code tested, is it fast enough, and is ev... | [Manifest](skills/ponytail-review/SKILL.md) |
| **`write-swift`** | How to write modern Swift well — modeling with value types, Swift 6 data-race safety and approachable concurrency (@concurrent, main-actor-b... | [Manifest](skills/write-swift/SKILL.md) |

---

## 🛠️ Anatomy of a Skill

Every skill in this repository follows the strict specification:

```
skills/<skill-name>/
├── SKILL.md          # Primary instruction prompt with YAML frontmatter
├── references/       # (Optional) Deep documentation, API specifications, cheat sheets
├── scripts/          # (Optional) Helper utilities executed during skill execution
└── examples/         # (Optional) Worked implementations & golden recipes
```

### Frontmatter Standard:
```yaml
---
name: skill-name
description: Clear, action-oriented trigger description telling agents exactly when and how to activate.
---
```

---

## 🤝 Contributing

Have an elite agent skill or refined workflow? Contributions are welcome!
1. Fork the repository: `https://github.com/rawenergon/skill`
2. Create your branch: `git checkout -b feat/add-my-skill`
3. Add your skill folder under `skills/<skill-name>/SKILL.md`
4. Commit & push: `git push origin feat/add-my-skill`
5. Open a Pull Request!

---

## 📄 License

MIT License © 2026 [Aditya Raj (@rawenergon)](https://github.com/rawenergon). Free for commercial and personal usage.
