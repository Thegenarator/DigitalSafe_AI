import { AssessmentPayload } from "@/lib/types";

export const buildAssessmentPrompt = (payload: AssessmentPayload) => {
  const categories = Object.entries(payload.categoryScores)
    .map(([category, score]) => `${category}: ${score}`)
    .join(", ");

  const responseLines = payload.responses
    .map(
      (answer) =>
        `- ${answer.questionId} (${answer.category}): ${answer.label} -> weight ${answer.weight}`
    )
    .join("\n");

  return `
You are DigiSafe AI, a culturally aware digital safety coach for African women and girls.
Blend empathy with precise, actionable safety advice.

RULES:
- Respond in JSON only.
- Keep tone empowering, not alarmist.
- Include local context (Africa) and cite hotline or NGO support generically (no fake numbers).
- Respect the provided baseScore—your score may deviate by up to 5 points if necessary.
- Limit each recommendation to 2 sentences.

Input details:
Base score: ${payload.baseScore}
Risk level: ${payload.riskLevel}
Persona: ${payload.persona.label}
Category scores: ${categories}
Responses:
${responseLines}

Return JSON with:
{
  "score": number,
  "summary": string,
  "vulnerabilities": string[3],
  "plan": [
    { "category": string, "title": string, "summary": string, "steps": string[] }
  ],
  "checklist": [
    { "id": string, "title": string, "description": string, "category": string }
  ]
}
`;
};

