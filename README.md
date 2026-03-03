# dbug — BUGWORLD 2026

> Public Template Repository for BUGWORLD 2026 Session Development  
> **Spec:** `v260303.1` | **Sync Root:** `C:\dbug` | **Session:** `DBUG 260303 (1)`

## 🔐 Core Rules
- `dbug.` and `admin.` **must** include trailing periods (non-negotiable)
- `zero_china_dependencies` is mandatory for global distribution
- Admin Triad (`adminx`, `admin.`, `adminq`) required for `session_init`

## 🗂️ Structure
C:\dbug
├── core/ # Identity layer (v260303.1)
├── bugworld2026/ # Unity 6.3 LTS (bugapp000-999) + UE5.7 (-/q/)
├── bugbase2026/ # BugBase 2026 modules
├── 0/ - 9/ # DBUG PRODUCTIONS projects
├── tools/ # MCP, TGA, utilities
├── docs/ # Documentation
├── sessions/ # Local-only session data (EXCLUDED from sync)
├── .github/ # Template config + workflows
├── .gitattributes # LFS configuration
├── .gitignore # Unity/UE5 exclusions
├── README.md # This file
└── LICENSE # MIT License

## 🚀 Quick Start
1. Click **"Use this template"** → **"Create a new repository"**
2. Clone your new repo: `git clone https://github.com/YOU/NEW-REPO.git`
3. Install Git LFS: `git lfs install`
4. Configure local paths in `core/session_protocol.json`
5. Initialize session with admin triad

## 🎮 Engine Support
- **Unity:** 6.3 LTS (6000.3.10f1) — Primary
- **Unreal Engine:** 5.7 — Secondary

## 🔄 Sync Configuration
- **Local Root:** `C:\dbug`
- **Remote:** `https://github.com/dbugpro/dbug`
- **Branches:** `main` (template), `session/<SESSION_ID>` (isolated work)

## 📜 License
MIT License. See `LICENSE` for details.
