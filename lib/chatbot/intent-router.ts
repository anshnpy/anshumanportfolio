export type ChatIntent =
  | "portfolio"
  | "cyber-news"
  | "action"
  | "general"
  | "unknown";

export type IntentResult = {
  intent: ChatIntent;
  topic: string | null;
  confidence: number;
};

const cyberNewsPatterns = [
  /\bcyber news\b/i,
  /\bsecurity news\b/i,
  /\blatest cybersecurity\b/i,
  /\blatest vulnerabilities?\b/i,
  /\blatest cve(s)?\b/i,
];

const actionPatterns = [
  /\b(open|download|view|show)\b.*\b(cv|resume)\b/i,
  /\b(open|visit|go to)\b.*\bgithub\b/i,
  /\b(open|visit|go to)\b.*\blinkedin\b/i,
  /\b(contact|email|mail)\b/i,
];

const portfolioPatterns: Array<{
  topic: string;
  patterns: RegExp[];
}> = [
  {
    topic: "profile",
    patterns: [
      /\bwho is anshuman\b/i,
      /\babout anshuman\b/i,
      /\btell me about anshuman\b/i,
      /\bprofile\b/i,
      /\bbackground\b/i,
    ],
  },
  {
    topic: "skills",
    patterns: [
      /\bskills?\b/i,
      /\btechnologies\b/i,
      /\btech stack\b/i,
    ],
  },
  {
    topic: "projects",
    patterns: [
      /\bprojects?\b/i,
      /\bproject work\b/i,
      /\bportfolio projects\b/i,
    ],
  },
  {
    topic: "career",
    patterns: [
      /\bcareer\b/i,
      /\bexperience\b/i,
      /\binternship\b/i,
      /\bjob\b/i,
      /\bgoals?\b/i,
    ],
  },
  {
    topic: "learning",
    patterns: [
      /\blearning\b/i,
      /\bcurrently learning\b/i,
      /\bstudying\b/i,
    ],
  },
];

export function routeIntent(input: string): IntentResult {
  const query = input.trim();

  if (!query) {
    return {
      intent: "unknown",
      topic: null,
      confidence: 0,
    };
  }

  if (cyberNewsPatterns.some((pattern) => pattern.test(query))) {
    return {
      intent: "cyber-news",
      topic: "cyber-news",
      confidence: 0.98,
    };
  }

  if (actionPatterns.some((pattern) => pattern.test(query))) {
    return {
      intent: "action",
      topic: null,
      confidence: 0.95,
    };
  }

  for (const item of portfolioPatterns) {
    if (item.patterns.some((pattern) => pattern.test(query))) {
      return {
        intent: "portfolio",
        topic: item.topic,
        confidence: 0.9,
      };
    }
  }

  return {
    intent: "general",
    topic: null,
    confidence: 0.4,
  };
}
