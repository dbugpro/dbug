import { Bug, BugPriority, BugStatus } from "./types";

export const MOCK_BUGS: Bug[] = [
  {
    id: "BUG-001",
    title: "Auth token expiration race condition",
    description: "When the token expires exactly during a fetch call, the retry logic fails to refresh correctly.",
    status: BugStatus.OPEN,
    priority: BugPriority.CRITICAL,
    category: "Security",
    reporter: "dbugx",
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "BUG-002",
    title: "Sidebar layout shift on mobile",
    description: "The sidebar jumps 20px to the left when the keyboard opens on iOS Safari.",
    status: BugStatus.IN_PROGRESS,
    priority: BugPriority.MEDIUM,
    category: "UI/UX",
    reporter: "dbugx",
    createdAt: "2026-03-02T14:30:00Z",
  },
  {
    id: "BUG-003",
    title: "Memory leak in StatsVisualizer",
    description: "Recharts instances are not being properly disposed of on component unmount.",
    status: BugStatus.OPEN,
    priority: BugPriority.HIGH,
    category: "Performance",
    reporter: "dbugx",
    createdAt: "2026-03-03T09:15:00Z",
  },
  {
    id: "BUG-004",
    title: "Incorrect CSV export headers",
    description: "The 'Date' column is missing from the CSV export tool.",
    status: BugStatus.RESOLVED,
    priority: BugPriority.LOW,
    category: "Features",
    reporter: "dbugx",
    createdAt: "2026-02-28T11:20:00Z",
  }
];
