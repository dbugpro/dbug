# DBUG Core Structure Schema — v260307.1

## Session Context
- **Session:** DBUG 260307 (1)
- **Date:** 2026-03-07
- **Location:** England (zero_china_dependencies enforced)
- **Authority:** adminx directive
- **Identity:** dbug. (trailing period enforced)

## Overview

This directory contains the **conceptual structural framework** for GAIAM (GAIA Machine) navigation. The schema separates **Physical/Conceptual Containers** (System [1]) from **Logical Identification Codes** (System [2]).

## System [1]: Structural Path (The Container)

**Purpose:** Defines the folder hierarchy for storing cells/magicubes on disk or conceptually.
**Logic:** Fixed base-10 branching (10 folders per depth level).

### Schema Pattern
```plaintext
core\.structure\N-N\Value\N-(N-1)\Value...\N-1\Value\.gitkeep

Component Definitions

Component,Format,Meaning
Scale Root,N-N,Scale 10^N", Depth "N (branch root)
Value Folder,0", "00", "000...,Coordinate digit(s) at this depth
Context Node,N-D,Scale N", Depth "D (parent pointer)
Terminal,.gitkeep,Git tracking placeholder

Scale Boundaries

Scale,Depth Levels,Branching Factor,Total Locations,Context
3,3 (3-3", "3-2", "3-1),10 × 10 × 10,"1,000",Cells within Magicube #0
7,7 (7-7 ... 7-1),10^7,"10,000,000",Magicube Indices (MIN)
10,10 (10-10 ... 10-1),10^10,"10,000,000,000",Global MCN (MIN + Cell)

Path Examples
plaintext
12345678
# Scale 3: Cell 000 in Magicube #0
core\.structure\3-3\000\3-2\00\3-1\0\.gitkeep

# Scale 7: Magicube #0 (MIN 0000000)
core\.structure\7-7\0000000\7-6\000000\...\3-1\0\.gitkeep

# Scale 10: Global MCN 0000000000 (Magicube #0, Cell 000)
core\.structure\10-10\0000000000\10-9\000000000\...\3-1\0\.gitkeep

System [2]: Identification Codes (The Address)

Purpose: Logical addressing for Magicubes and Cells within the GAIAM multiverse.
Logic: Variable-length incremental index with fixed prefix.

MIN (Magicube Identification Number)
- Format: {prefix}{Index}
- Prefix: 000000 (6 zeros, locked for v260307.1)
- Index: Incremental (0, 1, ... 9, 00, 01, ...)
- Example: 0000000 (Magicube #0), 0000001 (Magicube #1)

MCN (Magicube Cell Number)
- Format: {MIN}{Cell}
- Cell: 000–999 (3 digits)
- Example: 0000000000 (Magicube #0, Cell 000)

MIN/MCN Ranges by Depth

Depth Metric,Scale,MIN Range,GAIAM Context
Depth #3,10^3,{prefix}0,First MAGICUBE (Cells 000-999)
Depth #6,10^6,{prefix}1–{prefix}1000,"Set of 1,000 MAGICUBES"
Depth #9,10^9,{prefix}1001–{prefix}1000000,"Set of 1,000,000 MAGICUBES"
Depth #12,10^12,{prefix}1000001–{prefix}1000000000,"Set of 1,000,000,000 MAGICUBES"

Navigation Script
Use navigator.py to resolve between Structural Paths and MIN/MCN codes.
powershell
12345
# Resolve MIN + Cell to Structural Path
python core\.structure\navigator.py --min 0000000 --cell 000 --create

# Validate Structural Path
python core\.structure\navigator.py --path "core\.structure\3-3\000\3-2\00\3-1\0" --validate

Relationship to .paths/

Directory,Purpose
.structure/,Pure coordinate addressing (scalable container)
.paths/,Semantic context (MEGA/Elevation metadata)

Constraints & Compliance

Constraint,Status
trailing_period_enforced,✅ dbug. ≠ dbug
zero_china_dependencies,✅ England location enforced
admin_triad_required_for_init,"✅ Triad active (adminx, admin., adminq)"
session_260307_active,✅ Confirmed (DBUG 260307 (1))

Version History

Version,Date,Session,Changes
v260307.1,2026-03-07,DBUG 260307 (1),Initial schema lock (System [1] + [2] separation)
v260209.2,2026-02-09,DBUG 260209 (2),Legacy structure (deprecated)

Generated: 2026-03-07 07:30 GMT
Session: DBUG 260307 (1)
Authority: adminx directive