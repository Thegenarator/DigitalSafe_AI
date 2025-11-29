import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { buildAssessmentPrompt } from "@/lib/prompts";
import { createDefaultAssessment } from "@/lib/recommendations";
import { AssessmentPayload, AssessmentResult, SafetyPlanSection } from "@/lib/types";

const requestSchema = z.object({
  payload: z.object({
    baseScore: z.number(),
    riskLevel: z.enum(["low", "moderate", "high"]),
    categoryScores: z.record(
      z.enum(["privacy", "harassment", "data", "footprint", "emotional"]),
      z.number()
    ),
    persona: z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      highlights: z.array(z.string()),
    }),
    responses: z.array(
      z.object({
        questionId: z.string(),
        category: z.enum(["privacy", "harassment", "data", "footprint", "emotional"]),
        value: z.string(),
        label: z.string(),
        weight: z.number(),
        tip: z.string(),
      })
    ),
  }),
});

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = requestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const payload: AssessmentPayload = parsed.data.payload;
  const baseline = createDefaultAssessment(payload);

  if (!client) {
    return NextResponse.json({
      assessment: baseline,
      source: "rules-only",
    });
  }

  try {
    const prompt = buildAssessmentPrompt(payload);
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const aiText = response.choices[0]?.message?.content;
    if (!aiText) throw new Error("Empty AI response");
    const parsedAi = JSON.parse(aiText);

    type AiPlanSection = Partial<SafetyPlanSection> & {
      steps?: string[];
    };
    type AiChecklistItem = {
      id?: string;
      title?: string;
      description?: string;
      category?: string;
    };

    const assessment: AssessmentResult = {
      ...baseline,
      score: Math.round(
        Math.min(
          100,
          Math.max(payload.baseScore - 5, parsedAi.score ?? payload.baseScore)
        )
      ),
      summary:
        parsedAi.summary ??
        "Here is your personalized safety plan combining AI insights with the core rules engine.",
      vulnerabilities:
        parsedAi.vulnerabilities?.slice(0, 3) ?? baseline.vulnerabilities,
      plan: Array.isArray(parsedAi.plan) && parsedAi.plan.length
        ? parsedAi.plan.map((section: AiPlanSection) => ({
            category: section.category ?? "privacy",
            title: section.title ?? "Action Plan",
            summary:
              section.summary ??
              "Focus on strengthening this area to reduce risk.",
            steps: Array.isArray(section.steps)
              ? section.steps.slice(0, 4)
              : ["Adopt safer behaviors in this category."],
          }))
        : baseline.plan,
      checklist: Array.isArray(parsedAi.checklist) && parsedAi.checklist.length
        ? parsedAi.checklist.slice(0, 5).map((item: AiChecklistItem) => ({
            id: item.id ?? crypto.randomUUID(),
            title: item.title ?? "Follow through on your safety routine",
            description:
              item.description ??
              "Complete this action to strengthen your protection.",
            category: item.category ?? "privacy",
            status: "pending",
          }))
        : baseline.checklist,
    };

    return NextResponse.json({ assessment, source: "ai" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      assessment: baseline,
      source: "rules-fallback",
      error: "AI generation failed.",
    });
  }
}

