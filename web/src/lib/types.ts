export type QuestionCategory =
  | "privacy"
  | "harassment"
  | "data"
  | "footprint"
  | "emotional";

export type RiskLevel = "low" | "moderate" | "high";

export type AnswerOption = {
  label: string;
  value: string;
  weight: number; // Higher weight = safer behavior
  tip: string;
};

export type Question = {
  id: string;
  prompt: string;
  intent: string;
  category: QuestionCategory;
  options: AnswerOption[];
};

export type SelectedAnswer = {
  questionId: string;
  category: QuestionCategory;
  value: string;
  label: string;
  weight: number;
  tip: string;
};

export type CategoryScores = Record<QuestionCategory, number>;

export type PersonaSummary = {
  id: string;
  label: string;
  description: string;
  highlights: string[];
};

export type SafetyPlanSection = {
  category: QuestionCategory;
  title: string;
  summary: string;
  steps: string[];
};

export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  category: QuestionCategory;
  status: "pending" | "done";
};

export type AssessmentResult = {
  id: string;
  score: number;
  riskLevel: RiskLevel;
  persona: PersonaSummary;
  summary: string;
  vulnerabilities: string[];
  plan: SafetyPlanSection[];
  checklist: ChecklistItem[];
  createdAt: string;
};

export type AssessmentPayload = {
  responses: SelectedAnswer[];
  baseScore: number;
  riskLevel: RiskLevel;
  categoryScores: CategoryScores;
  persona: PersonaSummary;
};

