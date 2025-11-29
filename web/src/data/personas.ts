import { PersonaSummary, QuestionCategory, SelectedAnswer } from "@/lib/types";

export type PersonaRule = {
  id: string;
  label: string;
  description: string;
  highlights: string[];
  match: (scores: Record<QuestionCategory, number>, answers: SelectedAnswer[]) => boolean;
};

export const PERSONA_LIBRARY: PersonaRule[] = [
  {
    id: "community-advocate",
    label: "Community Advocate",
    description:
      "You are a vocal voice online and need layered protection against harassment, doxxing, and coordinated attacks.",
    highlights: [
      "Prioritize rapid evidence capture & support networks.",
      "Rotate social settings and moderation teams.",
      "Automate takedown workflows with trusted partners.",
    ],
    match: (_scores, answers) => {
      const harassmentAnswers = answers.filter((a) => a.category === "harassment");
      return harassmentAnswers.some((a) => a.weight <= 0.25);
    },
  },
  {
    id: "student-creator",
    label: "Student Creator",
    description:
      "You are building your presence while balancing privacy, collaboration, and emotional wellbeing.",
    highlights: [
      "Set a recurring digital detox ritual.",
      "Use verification scripts before collaborations.",
      "Protect school and family data with backups.",
    ],
    match: (scores) => scores.emotional <= 60 && scores.footprint >= 50,
  },
  {
    id: "quiet-protector",
    label: "Quiet Protector",
    description:
      "You keep a low profile yet face data and device threats from close circles or shared devices.",
    highlights: [
      "Encrypt devices and hide sensitive apps.",
      "Educate household members about phishing.",
      "Store emergency contacts offline.",
    ],
    match: (scores) => scores.data <= 55 && scores.privacy <= 60,
  },
  {
    id: "resilient-guardian",
    label: "Resilient Guardian",
    description:
      "You already enforce strong habits and now focus on fine-tuning, mentoring others, and monitoring emerging threats.",
    highlights: [
      "Share your playbook with community members.",
      "Pilot advanced tools like hardware keys.",
      "Mentor peers on emotional resilience.",
    ],
    match: (scores) =>
      scores.privacy >= 80 &&
      scores.data >= 80 &&
      scores.harassment >= 70 &&
      scores.emotional >= 70,
  },
];

export const defaultPersona: PersonaSummary = {
  id: "balanced-user",
  label: "Balanced User",
  description:
    "You balance multiple roles online. Strengthen weak spots to stay confident and resilient against digital threats.",
  highlights: [
    "Layer privacy controls across every device.",
    "Document a safety response plan with trusted allies.",
    "Practice regular digital wellbeing check-ins.",
  ],
};

export const pickPersona = (
  scores: Record<QuestionCategory, number>,
  answers: SelectedAnswer[]
): PersonaSummary => {
  const persona =
    PERSONA_LIBRARY.find((rule) => rule.match(scores, answers)) || defaultPersona;

  return {
    id: persona.id,
    label: persona.label,
    description: persona.description,
    highlights: persona.highlights,
  };
};

