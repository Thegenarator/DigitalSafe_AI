import { QUESTION_BANK } from "@/data/questions";
import { pickPersona } from "@/data/personas";
import {
  AssessmentPayload,
  CategoryScores,
  QuestionCategory,
  RiskLevel,
  SelectedAnswer,
} from "@/lib/types";

const MAX_CATEGORY_WEIGHT: Record<QuestionCategory, number> =
  QUESTION_BANK.reduce(
    (acc, question) => {
      const maxWeight = Math.max(...question.options.map((o) => o.weight));
      acc[question.category] += maxWeight;
      return acc;
    },
    {
      privacy: 0,
      harassment: 0,
      data: 0,
      footprint: 0,
      emotional: 0,
    } satisfies CategoryScores
  );

const MAX_TOTAL_WEIGHT = Object.values(MAX_CATEGORY_WEIGHT).reduce(
  (sum, value) => sum + value,
  0
);

export const inferRiskLevel = (score: number): RiskLevel => {
  if (score >= 80) return "low";
  if (score >= 55) return "moderate";
  return "high";
};

export const scoreResponses = (
  responses: Record<string, SelectedAnswer | undefined>
) => {
  const totals: CategoryScores = {
    privacy: 0,
    harassment: 0,
    data: 0,
    footprint: 0,
    emotional: 0,
  };

  Object.values(responses).forEach((answer) => {
    if (!answer) return;
    totals[answer.category] += answer.weight;
  });

  const normalized: CategoryScores = {
    privacy: Math.round((totals.privacy / MAX_CATEGORY_WEIGHT.privacy) * 100),
    harassment: Math.round(
      (totals.harassment / MAX_CATEGORY_WEIGHT.harassment) * 100
    ),
    data: Math.round((totals.data / MAX_CATEGORY_WEIGHT.data) * 100),
    footprint: Math.round(
      (totals.footprint / MAX_CATEGORY_WEIGHT.footprint) * 100
    ),
    emotional: Math.round(
      (totals.emotional / MAX_CATEGORY_WEIGHT.emotional) * 100
    ),
  };

  const totalWeight = (Object.values(totals) as number[]).reduce(
    (sum, value) => sum + value,
    0
  );
  const baseScore = Math.round((totalWeight / MAX_TOTAL_WEIGHT) * 100);
  const riskLevel = inferRiskLevel(baseScore);

  const persona = pickPersona(normalized, Object.values(responses).filter(Boolean) as SelectedAnswer[]);

  const payload: AssessmentPayload = {
    responses: Object.values(responses).filter(Boolean) as SelectedAnswer[],
    baseScore,
    riskLevel,
    categoryScores: normalized,
    persona,
  };

  return payload;
};

