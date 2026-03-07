# dbug — BUGWORLD 2026

> Public Template Repository for BUGWORLD 2026 Session Development  
> **Spec:** `v260303.1` | **Sync Root:** `C:\dbug` | **Session:** `DBUG 260303 (1)`

## 🔐 Core Rules

- `dbug.` and `admin.` **must** include trailing periods (non-negotiable)
- `zero_china_dependencies` is mandatory for global distribution
- Admin Triad (`adminx`, `admin.`, `adminq`) required for `session_init`

## 🗂️ Synchronization with Google AI Studio

UPDATING DBUG PROJECT ON GOOGLE AI STUDIO
https://ai.studio/apps/e712dc26-20a3-4ad6-97c4-bf53afb81451

# DBUG Repository — v260307.3
> **Session:** DBUG 260307 (1)  
> **Location:** England (zero_china_dependencies enforced)  
> **Identity:** dbug. (trailing period enforced)  
> **Authority:** adminx directive

## 🗂️ Repository Structure

dbug/
├── .stem/ # ✅ Singularity structure (renamed from .beta/)
│ ├── .stem.code-workspace
│ ├── i/ i.code-workspace
│ ├── ii/ ii.code-workspace
│ ├── iii/ iii.code-workspace
│ ├── iv/ iv.code-workspace
│ ├── v/ v.code-workspace
│ ├── vi/ vi.code-workspace
│ ├── vii/ vii.code-workspace
│ ├── viii/ viii.code-workspace
│ ├── ix/ ix.code-workspace
│ └── x/ x.code-workspace
│
├── core/ # 🔒 Immutable identity layer
│ ├── .structure/ # 🧭 Conceptual structural framework
│ │ ├── README.md # Schema documentation
│ │ └── navigator.py # Path resolution script
│ ├── core.code-workspace
│ ├── identity.json
│ ├── privilege_gates.json
│ ├── geo_fence.json
│ ├── session_protocol.json
│ └── core_manifest.json
│
├── bugworld2026/ # 🎮 Primary project (Unity 6.3 LTS + UE5.7)
├── bugbase2026/ # 🐛 Rust modules
├── 0/ - 9/ # 🎬 DBUG productions
├── tools/ # 🛠️ MCP, Slack, utilities
├── docs/ # 📚 Documentation
├── sessions/ # 📜 Local-only session data (excluded from Git)
├── dbug.code-workspace
├── .gitignore
├── LICENSE
└── README.md

## 🔐 Core Constraints

| Constraint | Status |
|------------|--------|
| `trailing_period_enforced` | ✅ `dbug.` ≠ `dbug`, `admin.` ≠ `admin` |
| `admin_triad_required_for_init` | ✅ `adminx` + `admin.` + `adminq` |
| `zero_china_dependencies` | ✅ England location, no CN paths |
| `session_260307_active` | ✅ DBUG 260307 (1) |

## 🧭 Structural Schema

### `.stem/` Directory
- **Purpose:** Singularity structure for DDBAC / Base-2 precedence alignment
- **Roots:** Roman numerals `i` through `x` (10 folders)
- **Pattern:** Conceptual axial addressing (base-27: `a-m`, `.alpha`, `n-z`)
- **Instantiation:** Conceptual only (not physically created beyond roots)

### `.structure/` Directory (System [1] + System [2])
- **System [1] — Structural Path:** Fixed base-10 branching container
  - Pattern: `N-N\Value\N-(N-1)\Value...\N-1\Value`
  - Example: `3-3\000\3-2\00\3-1\0\.gitkeep` (Cell 000 in Magicube #0)
- **System [2] — MIN/MCN Identification:** Variable-length incremental addressing
  - MIN Format: `{prefix}{Index}` where `prefix=000000`
  - MCN Format: `{MIN}{Cell}` where `Cell=000-999`
  - Example: `0000000000` = Magicube #0, Cell 000

## 📜 Session Protocol

See `core/session_protocol.json` for:
- Parallel topology (Browser/Desktop sync)
- Privilege gates (role-based operations)
- Log aggregation paths
- Structural schema registration

## 🚀 Quick Start

1. Click **"Use this template"** → **"Create a new repository"**
2. Clone this repo: `git clone https://github.com/dbugpro/dbug.git`
3. Name your new repo: `git clone https://github.com/YOU/NEW-REPO.git`
4. Open in VS Code or GitHub Codespaces
5. Load the appropriate `.code-workspace` file:
   - `dbug.code-workspace` (root workspace)
   - `core/core.code-workspace` (core identity layer)
   - `.stem/i/i.code-workspace` (Roman numeral branch workspace)
6. Install Git LFS: `git lfs install`
7. Configure local paths in `core/session_protocol.json`
8. Initialize session with admin triad

## 🎮 Engine Support

- **Unity:** 6.3 LTS (6000.3.10f1) — Primary
- **Unreal Engine:** 5.7 — Secondary

## 🔄 Sync Configuration

- **Local Root:** `C:\dbug`
- **Remote:** `https://github.com/dbugpro/dbug`
- **Branches:** `main` (template), `session/<SESSION_ID>` (isolated work)

## 📜 License

DBUG LICENSE. See `LICENSE` for details.

*Generated: 2026-03-07*  
*Spec: v260307.3*  
*Authority: adminx directive*
