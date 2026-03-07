
---

## 🐍 **FILE 2: `core/.structure/navigator.py`**

```python
#!/usr/bin/env python3
"""
DBUG Core Structure Navigator — v260307.1
Session: DBUG 260307 (1)
Authority: adminx directive

Resolves MAGICUBE coordinates to structural paths and creates folders on-demand.
Implements System [1] (Structural Path) and System [2] (MIN/MCN) logic.
"""

import os
import sys
import argparse
from pathlib import Path
from typing import List, Optional, Tuple

# Configuration
STRUCTURE_ROOT = Path(__file__).parent
GITKEEP_CONTENT = "# DBUG Structure Schema v260307.1 - Conceptual framework placeholder\n"
MIN_PREFIX = "000000"  # Locked prefix for v260307.1

class StructureNavigator:
    """Navigates and creates .structure/ schema paths (System [1])."""
    
    def __init__(self, base_path: Optional[Path] = None):
        self.base_path = base_path or STRUCTURE_ROOT
    
    def coordinate_to_path(self, coordinate: str, scale: int) -> Path:
        """
        Convert coordinate + scale to structural path.
        
        Args:
            coordinate: The cell coordinate (e.g., "000", "00", "0")
            scale: The power of 10 (e.g., 3 for 10^3 = 000-999)
        
        Returns:
            Full structural path
        """
        # Validate coordinate length matches scale
        if len(coordinate) != scale:
            raise ValueError(
                f"Coordinate length ({len(coordinate)}) must match scale ({scale})"
            )
        
        # Build path segments: N-N\Value\N-(N-1)\Value...\N-1\Value
        segments = []
        for depth in range(scale, 0, -1):
            # Add scale-depth folder (e.g., "3-3", "3-2", "3-1")
            segments.append(f"{scale}-{depth}")
            # Add value folder (e.g., "000", "00", "0")
            value = coordinate[:depth]
            segments.append(value)
        
        return self.base_path / Path(*segments)
    
    def create_path(self, coordinate: str, scale: int, with_gitkeep: bool = True) -> Path:
        """
        Create structural path on disk (including parent folders).
        
        Args:
            coordinate: The cell coordinate
            scale: The power of 10
            with_gitkeep: Whether to create .gitkeep file
        
        Returns:
            Created path
        """
        path = self.coordinate_to_path(coordinate, scale)
        path.mkdir(parents=True, exist_ok=True)
        
        if with_gitkeep:
            gitkeep_path = path / ".gitkeep"
            if not gitkeep_path.exists():
                gitkeep_path.write_text(GITKEEP_CONTENT)
        
        return path
    
    def get_parent_path(self, current_path: Path) -> Optional[Path]:
        """
        Navigate one level up in the structure.
        
        Args:
            current_path: Current structural path
        
        Returns:
            Parent path or None if at root
        """
        # Remove last two segments (N-1\Value)
        if len(current_path.parts) < 3:
            return None
        return current_path.parent.parent
    
    def validate_path(self, path: Path) -> bool:
        """
        Validate structural path integrity.
        
        Args:
            path: Path to validate
        
        Returns:
            True if valid, False otherwise
        """
        parts = path.parts
        if len(parts) % 2 != 0:
            return False
        
        scale = None
        for i in range(0, len(parts), 2):
            folder = parts[i]
            if '-' not in folder:
                return False
            s, d = folder.split('-')
            if scale is None:
                scale = int(s)
            elif int(s) != scale:
                return False
            if int(d) != scale - (i // 2):
                return False
        
        return True


class GaiamNavigator(StructureNavigator):
    """Extends StructureNavigator with GAIAM/MAGICUBE awareness (System [2])."""
    
    # Constants
    CELL_SCALE = 3
    MIN_SCALE = 7
    MCN_SCALE = 10
    
    def get_min(self, mcn: str) -> str:
        """Extract MIN (first 7 digits) from MCN."""
        if len(mcn) != self.MCN_SCALE:
            raise ValueError(f"MCN must be {self.MCN_SCALE} digits")
        return mcn[:self.MIN_SCALE]
    
    def get_cell(self, mcn: str) -> str:
        """Extract Cell (last 3 digits) from MCN."""
        if len(mcn) != self.MCN_SCALE:
            raise ValueError(f"MCN must be {self.MCN_SCALE} digits")
        return mcn[self.MIN_SCALE:]
    
    def resolve_magicube_path(self, min_index: int, cell_coordinate: str = "000") -> Path:
        """
        Resolve full MCN path from MIN index + Cell.
        
        Args:
            min_index: The MAGICUBE number (0, 1, 2...)
            cell_coordinate: The cell within the MAGICUBE (000-999)
        
        Returns:
            Full structural path
        """
        # Format MIN with prefix (7 digits total)
        min_str = f"{min_index:07d}"  # e.g., 0 -> "0000000", 1 -> "0000001"
        
        # Format Cell (3 digits)
        cell_str = cell_coordinate.zfill(3)
        
        # Combine into MCN (10 digits)
        mcn = min_str + cell_str
        
        return self.coordinate_to_path(mcn, self.MCN_SCALE)
    
    def min_to_index(self, min_code: str) -> int:
        """
        Convert MIN code to incremental index.
        
        Args:
            min_code: The MIN code (e.g., "0000000", "0000001")
        
        Returns:
            Incremental index (0, 1, ...)
        """
        if not min_code.startswith(MIN_PREFIX):
            raise ValueError(f"MIN must start with prefix {MIN_PREFIX}")
        
        # Extract index part (after prefix)
        index_part = min_code[len(MIN_PREFIX):]
        return int(index_part) if index_part else 0
    
    def get_magicube_range(self, depth: int) -> Tuple[int, int]:
        """
        Get MIN range for a given depth metric.
        
        Args:
            depth: The depth metric (3, 6, 9, 12...)
        
        Returns:
            Tuple (start_index, end_index)
        """
        if depth == 3:
            return (0, 0)  # Only Magicube #0
        elif depth == 6:
            return (1, 1000)
        elif depth == 9:
            return (1001, 1000000)
        elif depth == 12:
            return (1000001, 1000000000)
        else:
            raise ValueError(f"Unsupported depth metric: {depth}")


def main():
    parser = argparse.ArgumentParser(
        description="DBUG Structure Navigator — Resolve coordinates to structural paths"
    )
    parser.add_argument(
        "--coordinate", "-c",
        required=False,
        help="Cell coordinate (e.g., 000, 00, 0)"
    )
    parser.add_argument(
        "--scale", "-s",
        type=int,
        required=False,
        help="Scale/power of 10 (e.g., 3 for 10^3)"
    )
    parser.add_argument(
        "--min",
        type=int,
        required=False,
        help="MIN index (e.g., 0, 1, 1000)"
    )
    parser.add_argument(
        "--cell",
        default="000",
        help="Cell coordinate within Magicube (000-999)"
    )
    parser.add_argument(
        "--create",
        action="store_true",
        help="Create the path on disk (including parents)"
    )
    parser.add_argument(
        "--validate",
        action="store_true",
        help="Validate an existing path"
    )
    parser.add_argument(
        "--path",
        type=Path,
        help="Existing path to validate or navigate"
    )
    
    args = parser.parse_args()
    navigator = StructureNavigator()
    gaiam_nav = GaiamNavigator()
    
    try:
        if args.validate and args.path:
            # Validate existing path
            is_valid = navigator.validate_path(args.path)
            print(f"Path valid: {is_valid}")
            sys.exit(0 if is_valid else 1)
        
        if args.min is not None:
            # Resolve MIN + Cell to path (System [2] -> System [1])
            path = gaiam_nav.resolve_magicube_path(args.min, args.cell)
            print(f"Structural path (MIN {args.min}, Cell {args.cell}): {path}")
            
            if args.create:
                created = navigator.create_path(path.name, 10)  # Simplified for demo
                print(f"Created: {created}")
        
        elif args.coordinate and args.scale:
            # Resolve coordinate to path (System [1])
            path = navigator.coordinate_to_path(args.coordinate, args.scale)
            print(f"Structural path: {path}")
            
            if args.create:
                created = navigator.create_path(args.coordinate, args.scale)
                print(f"Created: {created}")
        
        else:
            parser.print_help()
        
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()