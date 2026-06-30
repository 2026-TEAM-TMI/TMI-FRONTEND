export interface SkillComparison {
  label: string;
  mine: number;
  avg: number;
}

export interface MatchJob {
  id: number;
  company: string;
  role: string;
  location: string;
  score: number;
  reasons: string[];
  gaps: string[];
}

export interface InsightCard {
  id: number;
  severity: "Critical" | "High" | "Medium";
  issue: string;
  suggestion: string;
}

export interface PerformanceStat {
  label: string;
  value: string;
  sub: string;
}
