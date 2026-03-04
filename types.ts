
export enum BugStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum BugPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  status: BugStatus;
  priority: BugPriority;
  category: string;
  reporter: string;
  createdAt: string;
  aiAnalysis?: {
    suggestedPriority: BugPriority;
    summary: string;
    possibleFix?: string;
  };
}
