// Comprehensive mental health knowledge base for fallback responses
// This ensures the chatbot can provide helpful information even when API is unavailable

export interface KnowledgeEntry {
  keywords: string[];
  topic: string;
  response: string;
  relatedTopics?: string[];
}

export const MENTAL_HEALTH_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ["anxiety", "anxious", "worried", "panic", "nervous", "stressed"],
    topic: "Anxiety Management",
    response: `Anxiety is a natural response to stress, but when it becomes overwhelming, there are effective strategies to manage it:

**Immediate Techniques:**
1. **4-7-8 Breathing**: Inhale through your nose for 4 counts, hold for 7, exhale through your mouth for 8. Repeat 4 times.
2. **5-4-3-2-1 Grounding**: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
3. **Progressive Muscle Relaxation**: Tense and release each muscle group from toes to head.

**Long-term Strategies:**
- Regular exercise (even 10 minutes helps)
- Limit caffeine and alcohol
- Practice mindfulness meditation daily
- Challenge anxious thoughts by asking "What's the evidence?"
- Maintain a consistent sleep schedule

If anxiety significantly impacts your daily life, consider speaking with a mental health professional who can provide personalized strategies.`,
    relatedTopics: ["stress", "panic attacks", "breathing exercises"],
  },
  {
    keywords: ["stress", "overwhelmed", "pressure", "burnout"],
    topic: "Stress Management",
    response: `Stress is your body's response to challenges. Here are evidence-based ways to manage it:

**Quick Stress Relievers:**
1. **Deep Breathing**: Take 5 deep breaths, focusing on slow exhales
2. **Take a Break**: Step away for 5-10 minutes, even if just to walk around
3. **Write It Down**: Journaling for 10 minutes can help process stressors

**Daily Stress Management:**
- **Time Management**: Break tasks into smaller steps, prioritize what's urgent
- **Physical Activity**: 30 minutes of moderate exercise reduces stress hormones
- **Social Support**: Talk to friends, family, or support groups
- **Healthy Boundaries**: Learn to say "no" when you're at capacity
- **Sleep**: Aim for 7-9 hours - poor sleep increases stress

**Mindfulness Practices:**
- 10-minute daily meditation
- Body scan exercises
- Mindful walking or eating

Remember: Some stress is normal, but chronic stress can impact your health. If stress feels unmanageable, professional support can help.`,
    relatedTopics: ["anxiety", "work-life balance", "self-care"],
  },
  {
    keywords: ["depression", "depressed", "sad", "hopeless", "empty", "worthless"],
    topic: "Depression Support",
    response: `Depression is more than feeling sad - it's a medical condition that affects how you think, feel, and function. Here's what can help:

**Understanding Depression:**
- It's not a character flaw or weakness
- Common symptoms: persistent sadness, loss of interest, fatigue, changes in sleep/appetite, difficulty concentrating
- It's treatable with the right support

**Self-Care Strategies:**
1. **Routine**: Maintain a daily schedule, even when motivation is low
2. **Physical Activity**: Start small - even 10 minutes of walking can help
3. **Social Connection**: Reach out to trusted friends or family, even if it's hard
4. **Sunlight**: Spend time outdoors or near windows
5. **Small Wins**: Celebrate small accomplishments
6. **Limit Isolation**: Force yourself to engage, even minimally

**When to Seek Help:**
- Symptoms last more than 2 weeks
- Thoughts of self-harm or suicide
- Difficulty functioning in daily life
- Professional help is essential - therapy and/or medication can be life-changing

**Crisis Support:**
If you're having thoughts of self-harm, contact a crisis hotline immediately. You deserve support and recovery is possible.`,
    relatedTopics: ["therapy", "self-care", "crisis support"],
  },
  {
    keywords: ["sleep", "insomnia", "tired", "exhausted", "can't sleep"],
    topic: "Sleep Hygiene",
    response: `Good sleep is essential for mental health. Here's how to improve your sleep:

**Sleep Hygiene Practices:**
1. **Consistent Schedule**: Go to bed and wake up at the same time daily (even weekends)
2. **Bedroom Environment**: Keep it cool (65-68°F), dark, and quiet
3. **No Screens**: Avoid phones/TV 1 hour before bed - blue light disrupts sleep
4. **Bedtime Routine**: Create a relaxing ritual (reading, gentle stretching, meditation)
5. **Limit Caffeine**: Avoid caffeine after 2 PM
6. **Avoid Large Meals**: Don't eat heavy meals 2-3 hours before bed

**If You Can't Sleep:**
- Get up after 20 minutes - don't stay in bed frustrated
- Do something calming (read, listen to soft music)
- Return to bed when sleepy
- Avoid checking the clock repeatedly

**Relaxation Techniques:**
- Progressive muscle relaxation
- 4-7-8 breathing exercise
- Body scan meditation
- Visualization of peaceful places

**When to Seek Help:**
If sleep problems persist for weeks or significantly impact your life, consider speaking with a healthcare provider about potential sleep disorders or underlying causes.`,
    relatedTopics: ["stress", "anxiety", "relaxation"],
  },
  {
    keywords: ["harassment", "online", "digital", "cyberbullying", "abuse", "stalking"],
    topic: "Digital Harassment Support",
    response: `Experiencing online harassment can be deeply distressing and impact your mental health. Here's how to cope:

**Immediate Safety Steps:**
1. **Document Everything**: Screenshot messages, save evidence
2. **Block and Report**: Use platform reporting tools
3. **Privacy Settings**: Review and tighten your privacy controls
4. **Take Breaks**: Step away from social media when needed
5. **Tell Someone**: Share with a trusted friend or family member

**Emotional Impact:**
- It's normal to feel anxious, angry, or violated
- Your feelings are valid - this is not your fault
- Harassment can trigger trauma responses

**Coping Strategies:**
- **Grounding Techniques**: Use 5-4-3-2-1 method when feeling overwhelmed
- **Limit Exposure**: Mute notifications, set app time limits
- **Support Networks**: Connect with others who've experienced similar situations
- **Professional Help**: Consider therapy to process the trauma

**Legal Resources:**
- Many countries have laws against cyberstalking and harassment
- Contact local authorities if you feel unsafe
- Reach out to digital safety organizations for guidance

Remember: You deserve to feel safe online. Don't hesitate to seek professional support to process these experiences.`,
    relatedTopics: ["trauma", "anxiety", "safety planning"],
  },
  {
    keywords: ["trauma", "traumatic", "PTSD", "flashback", "triggered"],
    topic: "Trauma Support",
    response: `Trauma responses are normal reactions to abnormal events. Here's how to support yourself:

**Understanding Trauma:**
- Trauma can result from single events or ongoing experiences
- Common responses: hypervigilance, flashbacks, avoidance, emotional numbness
- Healing is possible with time and support

**Grounding Techniques (When Triggered):**
1. **5-4-3-2-1**: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste
2. **Breathing**: Focus on slow, deep breaths
3. **Cold Water**: Splash face or hold ice cube
4. **Movement**: Gentle stretching or walking
5. **Affirmations**: "I am safe now" or "This feeling will pass"

**Healing Practices:**
- **Therapy**: Trauma-informed therapy (EMDR, CBT, somatic therapy) is highly effective
- **Support Groups**: Connect with others who understand
- **Self-Compassion**: Be patient with yourself - healing takes time
- **Routine**: Structure and predictability can help regulate your nervous system
- **Body-Based Practices**: Yoga, tai chi, or gentle exercise

**Important:**
Trauma therapy with a qualified professional is often essential for full recovery. You don't have to do this alone.`,
    relatedTopics: ["therapy", "PTSD", "grounding techniques"],
  },
  {
    keywords: ["self-care", "self love", "wellness", "healthy"],
    topic: "Self-Care Practices",
    response: `Self-care is essential for mental wellness. Here are practical strategies:

**Physical Self-Care:**
- Regular exercise (find what you enjoy)
- Nutritious meals
- Adequate sleep (7-9 hours)
- Regular health check-ups
- Hydration

**Emotional Self-Care:**
- Journaling your thoughts and feelings
- Therapy or counseling
- Setting healthy boundaries
- Saying "no" when needed
- Expressing emotions creatively (art, music, writing)

**Social Self-Care:**
- Nurturing relationships
- Spending time with supportive people
- Joining communities or groups
- Asking for help when needed
- Limiting time with toxic relationships

**Mental Self-Care:**
- Learning new skills
- Reading or engaging with media that enriches you
- Practicing mindfulness
- Taking breaks from work/social media
- Engaging in hobbies

**Spiritual Self-Care:**
- Meditation or prayer
- Time in nature
- Reflection and introspection
- Connecting with values and purpose

Remember: Self-care isn't selfish - it's necessary for your wellbeing and ability to care for others.`,
    relatedTopics: ["stress management", "mindfulness", "boundaries"],
  },
  {
    keywords: ["mindfulness", "meditation", "present", "awareness"],
    topic: "Mindfulness and Meditation",
    response: `Mindfulness is the practice of being present and aware without judgment. Here's how to start:

**Basic Mindfulness Practice:**
1. **Find a quiet space**: Sit comfortably
2. **Focus on breath**: Notice each inhale and exhale
3. **When mind wanders**: Gently return attention to breath (this is normal!)
4. **Start small**: 5-10 minutes daily is enough to begin

**Mindfulness Techniques:**
- **Body Scan**: Slowly notice sensations from head to toe
- **Walking Meditation**: Focus on each step, the ground beneath you
- **Mindful Eating**: Pay attention to taste, texture, smell
- **5-Minute Breathing**: Count breaths, return to 1 when mind wanders

**Benefits:**
- Reduces stress and anxiety
- Improves focus and attention
- Enhances emotional regulation
- Better sleep quality
- Increased self-awareness

**Apps and Resources:**
- Guided meditations (Headspace, Calm, Insight Timer)
- YouTube mindfulness videos
- Local meditation groups or classes

**Remember**: There's no "perfect" meditation. The practice of returning your attention is the skill. Be patient and kind with yourself.`,
    relatedTopics: ["stress", "anxiety", "self-care"],
  },
  {
    keywords: ["breathing", "breathe", "calm", "relax"],
    topic: "Breathing Exercises",
    response: `Breathing exercises are powerful tools for managing stress and anxiety. Here are effective techniques:

**4-7-8 Breathing (Calming):**
1. Inhale through nose for 4 counts
2. Hold breath for 7 counts
3. Exhale through mouth for 8 counts
4. Repeat 4-8 times

**Box Breathing (Focus):**
1. Inhale for 4 counts
2. Hold for 4 counts
3. Exhale for 4 counts
4. Hold for 4 counts
5. Repeat 4-6 times

**Diaphragmatic Breathing (Deep):**
1. Place hand on belly
2. Inhale deeply through nose, feel belly rise
3. Exhale slowly through mouth, feel belly fall
4. Focus on slow, deep breaths

**When to Use:**
- Before stressful situations
- When feeling anxious or panicked
- To help with sleep
- During moments of overwhelm
- As a daily practice for stress reduction

**Tips:**
- Practice when calm to build the skill
- Find a quiet space if possible
- Focus on the breath, not perfection
- Start with shorter sessions and build up

These techniques activate your body's relaxation response and can be done anywhere, anytime.`,
    relatedTopics: ["anxiety", "stress", "meditation"],
  },
  {
    keywords: ["crisis", "suicide", "self-harm", "hurt myself", "end it"],
    topic: "Crisis Support",
    response: `If you're in immediate danger or having thoughts of self-harm or suicide, please reach out for help right now:

**Immediate Crisis Resources:**
- **Emergency Services**: Call 911 (or your local emergency number)
- **Crisis Text Line**: Text HOME to 741741 (US) or your local crisis line
- **Suicide Prevention Lifeline**: 988 (US) or your local suicide prevention hotline
- **Go to your nearest emergency room**

**You Are Not Alone:**
- These feelings are temporary, even when they don't feel that way
- Help is available 24/7
- You deserve support and care
- Recovery is possible

**If You're Supporting Someone:**
- Take threats seriously
- Stay with them if possible
- Remove means of self-harm
- Encourage professional help
- Don't promise to keep it secret

**Remember:**
- Suicidal thoughts are a symptom, not a character flaw
- Professional help can provide the support you need
- Many people who've felt this way have found hope and healing

Please reach out - there are people who want to help you through this.`,
    relatedTopics: ["depression", "support", "therapy"],
  },
];

// Function to find relevant knowledge based on user input
export function findRelevantKnowledge(userMessage: string): KnowledgeEntry | null {
  const lowerMessage = userMessage.toLowerCase();
  
  // Score each knowledge entry based on keyword matches
  const scoredEntries = MENTAL_HEALTH_KNOWLEDGE.map((entry) => {
    const score = entry.keywords.reduce((acc, keyword) => {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return { entry, score };
  });

  // Find the entry with the highest score
  const bestMatch = scoredEntries.reduce((best, current) => {
    return current.score > best.score ? current : best;
  }, scoredEntries[0]);

  // Return the entry if it has at least one keyword match
  return bestMatch.score > 0 ? bestMatch.entry : null;
}

// Function to generate a helpful response using knowledge base
export function generateKnowledgeBaseResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>
): string {
  const relevantKnowledge = findRelevantKnowledge(userMessage);

  if (relevantKnowledge) {
    return relevantKnowledge.response;
  }

  // Generic helpful response if no specific match
  return `I understand you're looking for support. While I'd like to provide more personalized guidance, here are some general mental health resources:

**Immediate Support:**
- Crisis hotlines are available 24/7
- Emergency services for urgent situations
- Trusted friends or family members

**Self-Care Basics:**
- Practice deep breathing exercises
- Get adequate sleep (7-9 hours)
- Stay connected with supportive people
- Engage in activities you enjoy
- Consider professional mental health support

**Common Topics I Can Help With:**
- Anxiety and stress management
- Depression support
- Sleep issues
- Digital harassment and online safety
- Trauma and healing
- Self-care practices
- Breathing and mindfulness techniques

Could you tell me more specifically what you're experiencing? I'm here to listen and provide support.`;
}

