# dbug — BUGWORLD 2026

> Public Template Repository for BUGWORLD 2026 Session Development  
> **Spec:** `v260303.1` | **Sync Root:** `C:\dbug`

## 🔐 Core Rules
- `dbug.` and `admin.` **must** include trailing periods (non-negotiable)
- `zero_china_dependencies` is mandatory for global distribution
- Admin Triad (`adminx`, `admin.`, `adminq`) required for `session_init`

## 🗂️ Structure
C:\dbug
├── core/ # Identity layer (v260303.1)
├── bugworld-mcp/ # Message bus service
├── docs/ # Documentation
├── .github/ # Template config + workflows
├── .gitattributes # LFS configuration
├── .gitignore # UE5 + Unity exclusions
├── README.md # This file
└── LICENSE # MIT License

## 🚀 Quick Start
1. Click **"Use this template"** → **"Create a new repository"**
2. Clone your new repo: `git clone https://github.com/YOU/NEW-REPO.git`
3. Install Git LFS: `git lfs install`
4. Configure local paths in `core/session_protocol.json`
5. Initialize session with admin triad

## 🔄 Sync Configuration
- **Local Root:** `C:\dbug`
- **Remote:** `https://github.com/dbugpro/dbug`
- **Branches:** `main` (template), `session/<SESSION_ID>` (isolated work)

## 🎮 Engine Support
- **Unreal Engine:** 5.7 (`C:\EpicGames\UE_5.7\...`)
- **Unity:** 6.3 LTS (`C:\bugworld2026\bugapp000-999`)

## 📜 License
MIT License. See `LICENSE` for details.
