import {
  AssessmentPayload,
  ChecklistItem,
  RiskLevel,
  SafetyPlanSection,
  SelectedAnswer,
} from "@/lib/types";
import { timestamp } from "@/lib/utils";

const CATEGORY_LIBRARY: Record<
  SafetyPlanSection["category"],
  { title: string; summary: string; steps: string[] }
> = {
  privacy: {
    title: "Privacy & Account Safety",
    summary:
      "Lock down access points, rotate passwords, and remove unnecessary exposure across apps.",
    steps: [
      "Switch on 2FA for email, social, and financial accounts.",
      "Adopt a password manager and unique passphrases.",
      "Audit connected apps and revoke stale permissions.",
    ],
  },
  harassment: {
    title: "Harassment Prevention",
    summary:
      "Prepare a response plan, curate safe communities, and reduce direct attack surfaces.",
    steps: [
      "Draft a harassment playbook with escalation contacts.",
      "Use platform tools (keyword filters, comment approvals).",
      "Store evidence templates and local hotline information.",
    ],
  },
  data: {
    title: "Data & Device Protection",
    summary:
      "Secure every device, encrypt storage, and keep backups plus recovery paths ready.",
    steps: [
      "Enable automatic OS/security updates on all devices.",
      "Encrypt drives and store recovery keys offline.",
      "Schedule monthly backups for critical documents and media.",
    ],
  },
  footprint: {
    title: "Digital Footprint",
    summary:
      "Reduce public breadcrumbs, verify new contacts, and monitor impersonation attempts.",
    steps: [
      "Review public posts for sensitive details and archive risky content.",
      "Use verification scripts before collaborations or data sharing.",
      "Enable alerts for new logins, mentions, or impersonation flags.",
    ],
  },
  emotional: {
    title: "Emotional Safety",
    summary:
      "Protect your energy with boundaries, restorative rituals, and trusted listeners.",
    steps: [
      "Set scheduled log-off windows and stick to them.",
      "Share your plan with two trusted allies for accountability.",
      "Keep helpline and counseling resources accessible.",
    ],
  },
};

export const deriveVulnerabilities = (
  payload: AssessmentPayload,
  answers: SelectedAnswer[]
) => {
  const weakestCategories = Object.entries(payload.categoryScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([category]) => category);

  const hints = answers
    .filter((answer) => weakestCategories.includes(answer.category))
    .map((answer) => answer.tip);

  return Array.from(new Set(hints)).slice(0, 5);
};

export const buildPlanFromRules = (
  payload: AssessmentPayload
): SafetyPlanSection[] => {
  return Object.entries(payload.categoryScores)
    .sort((a, b) => a[1] - b[1])
    .map(([category]) => category as SafetyPlanSection["category"])
    .map((category) => ({
      category,
      ...CATEGORY_LIBRARY[category],
    }));
};

export const buildChecklist = (
  plan: SafetyPlanSection[],
  riskLevel: RiskLevel
): ChecklistItem[] => {
  const focus = plan.slice(0, riskLevel === "high" ? 3 : 2);

  return focus.flatMap((section, idx) =>
    section.steps.slice(0, 2).map((step) => ({
      id: `${section.category}-${idx}-${step.length}`,
      title: step,
      description: section.summary,
      category: section.category,
      status: "pending" as const,
    }))
  );
};

export const createDefaultAssessment = (payload: AssessmentPayload) => {
  const plan = buildPlanFromRules(payload);
  const checklist = buildChecklist(plan, payload.riskLevel);
  const vulnerabilities = deriveVulnerabilities(
    payload,
    payload.responses
  );

  return {
    id: crypto.randomUUID(),
    score: payload.baseScore,
    riskLevel: payload.riskLevel,
    persona: payload.persona,
    summary:
      "Your baseline score blends privacy, harassment, data, footprint, and emotional safety. Focus on the priority areas below to boost resilience.",
    vulnerabilities,
    plan,
    checklist,
    createdAt: timestamp(),
  };
};

