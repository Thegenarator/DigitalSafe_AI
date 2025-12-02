import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { generateKnowledgeBaseResponse } from "@/lib/mental-health-knowledge";

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
});

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// System prompt for mental health wellness chatbot
const SYSTEM_PROMPT = `You are a knowledgeable, compassionate mental health wellness assistant with expertise in evidence-based mental health practices. You are designed to support women and girls, especially those navigating digital safety concerns, online harassment, stress, anxiety, depression, and other mental health challenges.

CORE EXPERTISE:
You provide accurate, evidence-based information about:
- Stress management and anxiety reduction techniques
- Depression symptoms and coping strategies
- Trauma responses and healing approaches
- Digital harassment and its psychological impact
- Self-care practices and emotional regulation
- Mindfulness, meditation, and breathing exercises
- Cognitive behavioral techniques (CBT)
- Building resilience and emotional strength
- Sleep hygiene and healthy routines
- Social support and relationship wellness

RESPONSE GUIDELINES:
1. Provide accurate, evidence-based information about mental health topics
2. Offer specific, actionable coping strategies (e.g., "Try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8")
3. Explain mental health concepts clearly (e.g., what anxiety is, how stress affects the body)
4. Suggest practical self-care activities with clear steps
5. Validate emotions while providing helpful context
6. Use culturally sensitive language, especially for African contexts
7. Provide detailed explanations when asked about mental health conditions or symptoms
8. Offer multiple strategies and techniques, not just generic advice
9. Reference evidence-based practices (CBT, mindfulness, grounding techniques, etc.)

CRISIS PROTOCOL:
- If user mentions self-harm, suicidal thoughts, or harm to others: Immediately encourage contacting emergency services (911, local crisis hotline) and provide specific crisis resources
- Never minimize serious mental health concerns
- Always recommend professional help for persistent or severe symptoms

RESPONSE STYLE:
- Warm, empathetic, and non-judgmental
- Educational and informative (explain "why" behind suggestions)
- Specific and actionable (give concrete steps, not vague advice)
- Appropriate length: 3-6 sentences for simple questions, up to 2 paragraphs for complex topics
- Use inclusive, supportive language
- Acknowledge cultural contexts and barriers to care when relevant

BOUNDARIES:
- Never diagnose specific mental health conditions
- Never prescribe medications or replace medical advice
- Always encourage professional help for persistent symptoms
- Respect user privacy and boundaries

Remember: Your goal is to provide accurate, helpful mental health information and support while encouraging professional care when needed.`;

export async function POST(request: Request) {
  let userMessages: Array<{ role: string; content: string }> = [];
  
  try {
    const json = await request.json();
    const parsed = requestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request format", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { messages } = parsed.data;

    // Filter out system messages from user input and ensure our system prompt is first
    userMessages = messages.filter((msg) => msg.role !== "system");

    // If no API client, use knowledge base fallback
    if (!client) {
      const lastMessage = userMessages[userMessages.length - 1]?.content || "";
      const fallbackResponse = generateKnowledgeBaseResponse(
        lastMessage,
        userMessages
      );
      
      return NextResponse.json({
        message: fallbackResponse,
        role: "assistant",
        source: "knowledge-base",
      });
    }
    
    // Limit conversation history to last 20 messages to avoid token limits
    const recentMessages = userMessages.slice(-20);
    
    // Ensure system prompt is included at the start
    const messagesWithSystem = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...recentMessages,
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messagesWithSystem,
      temperature: 0.6, // Lower temperature for more consistent, accurate responses
      max_tokens: 800, // Increased for more detailed, informative responses
      top_p: 0.9,
      frequency_penalty: 0.3, // Reduce repetition
      presence_penalty: 0.3, // Encourage diverse topics
    });

    const aiMessage = response.choices[0]?.message?.content;

    if (!aiMessage) {
      // Fallback to knowledge base if AI returns empty
      const lastMessage = userMessages[userMessages.length - 1]?.content || "";
      const fallbackResponse = generateKnowledgeBaseResponse(
        lastMessage,
        userMessages
      );
      
      return NextResponse.json({
        message: fallbackResponse,
        role: "assistant",
        source: "knowledge-base",
      });
    }

    return NextResponse.json({
      message: aiMessage,
      role: "assistant",
      source: "ai",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    
    // Use knowledge base as fallback instead of just error message
    const lastUserMessage = userMessages.length > 0 
      ? userMessages[userMessages.length - 1]?.content || "I need mental health support"
      : "I need mental health support";
    
    const fallbackResponse = generateKnowledgeBaseResponse(
      lastUserMessage,
      userMessages
    );
    
    // Log error but still provide helpful response
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (process.env.NODE_ENV === "development") {
      console.error("API Error Details:", errorMessage);
    }
    
    // Return knowledge base response instead of error
    return NextResponse.json({
      message: fallbackResponse,
      role: "assistant",
      source: "knowledge-base-fallback",
    });
  }
}

