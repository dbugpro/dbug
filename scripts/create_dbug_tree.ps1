Param(
    [string] $Root = "$PWD\dbug",
    [string] $RemoteRepo = "",    # e.g. "yourname/dbug" (for gh) or "https://github.com/yourname/dbug.git"
    [switch] $Private            # use --private with gh when creating the repo
)

function Ensure-Dir { param($p) if (-not (Test-Path $p)) { New-Item -ItemType Directory -Force -Path $p | Out-Null } }

# root
Ensure-Dir $Root

# top-level directories
$dirs = @(
    ".github\ISSUE_TEMPLATE",
    ".github\workflows",
    "core",
    "bugworld2026\-\q",
    "bugworld2026\SDK\v1.0",
    "bugbase2026\Source",
    "bugbase2026\Content",
    "bugbase2026\Config",
    "tools\bugworld-mcp",
    "tools\tga",
    "sessions",
    "docs"
)

foreach ($d in $dirs) {
    Ensure-Dir (Join-Path $Root $d)
}

# Create files with minimal placeholder content
Set-Content -Path (Join-Path $Root ".github\TEMPLATE_GUIDE.md") -Value "# Template guide" -Encoding UTF8
Set-Content -Path (Join-Path $Root ".github\ISSUE_TEMPLATE\bug_report.md") -Value "# Bug report template" -Encoding UTF8
Set-Content -Path (Join-Path $Root ".github\workflows\ci.yml") -Value "# CI workflow placeholder" -Encoding UTF8

# core JSON files
$coreFiles = @{
    "core\identity.json" = "{`n  ""id"": ""identity-placeholder""`n}"
    "core\privilege_gates.json" = "{`n  ""gates"": []`n}"
    "core\geo_fence.json" = "{`n  ""fences"": []`n}"
    "core\session_protocol.json" = "{`n  ""protocol"": ""v1""`n}"
    "core\core_manifest.json" = "{`n  ""manifest"": {} `n}"
}
foreach ($k in $coreFiles.Keys) {
    $path = Join-Path $Root $k
    Set-Content -Path $path -Value $coreFiles[$k] -Encoding UTF8
}

# bugworld2026 placeholders
Set-Content -Path (Join-Path $Root "bugworld2026\-\q\q.uproject") -Value "{}" -Encoding UTF8
Ensure-Dir (Join-Path $Root "bugworld2026\SDK\v1.0")

# bugbase2026 structure already created; add placeholder README files
Set-Content -Path (Join-Path $Root "bugbase2026\Source\README.md") -Value "# Source" -Encoding UTF8
Set-Content -Path (Join-Path $Root "bugbase2026\Content\README.md") -Value "# Content" -Encoding UTF8
Set-Content -Path (Join-Path $Root "bugbase2026\Config\README.md") -Value "# Config" -Encoding UTF8

# tools
Set-Content -Path (Join-Path $Root "tools\bugworld-mcp\message_bus.py") -Value "# message_bus placeholder" -Encoding UTF8
Set-Content -Path (Join-Path $Root "tools\bugworld-mcp\config.json") -Value "{`n  `""config``: { }`n}" -Encoding UTF8
Set-Content -Path (Join-Path $Root "tools\tga\tiangan_architecture.md") -Value "# Tiangan architecture" -Encoding UTF8
Set-Content -Path (Join-Path $Root "tools\tga\cell_labeling_protocol.py") -Value "# cell labeling protocol" -Encoding UTF8
Set-Content -Path (Join-Path $Root "tools\bugworld_glossary_builder.py") -Value "# glossary builder" -Encoding UTF8
Set-Content -Path (Join-Path $Root "tools\cube_stabilizer.py") -Value "# cube stabilizer" -Encoding UTF8
Set-Content -Path (Join-Path $Root "tools\scan_china_dependencies.py") -Value "# scan china dependencies" -Encoding UTF8

# sessions (template only)
Set-Content -Path (Join-Path $Root "sessions\README.md") -Value "📋 TEMPLATE ONLY (No Sync)" -Encoding UTF8

# docs
Set-Content -Path (Join-Path $Root "docs\bugworld_glossary.md") -Value "# Bugworld Glossary" -Encoding UTF8
Set-Content -Path (Join-Path $Root "docs\SESSION_PROTOCOL.md") -Value "# Session Protocol" -Encoding UTF8
Set-Content -Path (Join-Path $Root "docs\IDENTITY_ENFORCEMENT.md") -Value "# Identity Enforcement" -Encoding UTF8

# top-level files
Set-Content -Path (Join-Path $Root ".gitattributes") -Value "* text=auto" -Encoding UTF8
Set-Content -Path (Join-Path $Root ".gitignore") -Value @"
# Visual Studio and general
.vs/
bin/
obj/
*.user
*.suo
"@ -Encoding UTF8
Set-Content -Path (Join-Path $Root "README.md") -Value "# dbug" -Encoding UTF8
Set-Content -Path (Join-Path $Root "LICENSE") -Value "MIT License. See project owner for exact license text." -Encoding UTF8

# Initialize Git and commit
Push-Location $Root
if (-not (Test-Path ".git")) {
    git init
    git add .
    git commit -m "Initial import of dbug tree"
}

# Remote handling
if ($RemoteRepo -ne "") {
    $gh = Get-Command gh -ErrorAction SilentlyContinue
    if ($gh) {
        $privateFlag = $Private.IsPresent ? "--private" : "--public"
        # If RemoteRepo looks like "owner/name", use gh to create; if it's a URL, skip gh creation and add remote
        if ($RemoteRepo -match "^[^/]+/[^/]+$") {
            gh repo create $RemoteRepo $privateFlag --source=. --push
        } else {
            git remote add origin $RemoteRepo
            git branch -M main
            git push -u origin main
        }
    } else {
        git remote add origin $RemoteRepo
        git branch -M main
        git push -u origin main
    }
}

Pop-Location

Write-Output "Done. Created tree at: $Root"
if ($RemoteRepo -eq "") {
    Write-Output "No remote configured. Create a GitHub repo and push, or run this script with -RemoteRepo to push automatically."
}