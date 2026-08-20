export type KnowledgeAction = {
  label: string;
  href: string;
};

export type KnowledgeReply = {
  text: string;
  actions?: KnowledgeAction[];
  cyber?: unknown;
};

const knowledgeAliases: Record<string, string> = {
  "windows logs": "/data/projects/windows-event-log-analysis.md",
  "event logs": "/data/projects/windows-event-log-analysis.md",

  "wireshark": "/data/projects/network-traffic-analysis.md",
  "packet analysis": "/data/projects/network-traffic-analysis.md",
  "network traffic": "/data/projects/network-traffic-analysis.md",
  "network analysis": "/data/projects/network-traffic-analysis.md",

  "phishing": "/data/projects/phishing-email-analysis.md",
  "phishing email": "/data/projects/phishing-email-analysis.md",
  "email security": "/data/projects/phishing-email-analysis.md",

  "siem": "/data/projects/siem-log-analysis.md",
  "siem logs": "/data/projects/siem-log-analysis.md",
  "log analysis": "/data/projects/siem-log-analysis.md",

  "linux security": "/data/projects/linux-security-practice.md",
  "linux practice": "/data/projects/linux-security-practice.md",

  "skills": "/data/skills.md",
  "technologies": "/data/skills.md",
  "tech stack": "/data/skills.md",

  "learning": "/data/learning.md",
  "currently learning": "/data/learning.md",

  "career": "/data/career.md",
  "career goal": "/data/career.md",

  "identity": "/data/identity.md",
  "who is anshuman": "/data/identity.md",


  "contact": "/data/contact.md",
  "contact details": "/data/contact.md",
  "how to contact": "/data/contact.md",

  "portfolio": "/data/portfolio.md",
  "portfolio overview": "/data/portfolio.md",
  "what is this portfolio": "/data/portfolio.md",

  "faq": "/data/faq.md",
  "frequently asked": "/data/faq.md",
  "profile": "/data/profile.md",
  "about anshuman": "/data/profile.md",
};

export function getKnowledgePath(
  input: string
): string | null {
  const q = input.toLowerCase().trim();

  if (!q) return null;

  const normalized = q.replace(/\s+/g, " ");

  const matches = Object.entries(knowledgeAliases)
    .filter(([alias]) => {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`\\b${escaped}\\b`, "i");

      return pattern.test(normalized);
    })
    .map(([alias, path]) => {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`\\b${escaped}\\b`, "i");

      let score = alias.length;

      // Exact phrase match gets the strongest preference.
      if (normalized === alias) {
        score += 1000;
      }

      // Phrase appearing as a clean word-boundary match.
      if (pattern.test(normalized)) {
        score += 100;
      }

      // Project-specific phrases are more valuable than broad topics.
      if (
        path.includes("/projects/") &&
        alias.length >= 6
      ) {
        score += 150;
      }

      // Broad one-word aliases should not easily hijack a specific query.
      if (
        alias === "skills" ||
        alias === "learning" ||
        alias === "career" ||
        alias === "profile" ||
        alias === "portfolio" ||
        alias === "contact"
      ) {
        score -= 40;
      }

      return {
        alias,
        path,
        score,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return b.alias.length - a.alias.length;
    });

  return matches[0]?.path ?? null;
}

export async function getKnowledgeFile(
  path: string
): Promise<string | null> {
  try {
    const response = await fetch(path, {
      cache: "force-cache",
    });

    if (!response.ok) return null;

    return await response.text();
  } catch {
    return null;
  }
}

export function extractKnowledgeAnswer(
  knowledge: string,
  input: string
): string | null {
  const q = input.toLowerCase().trim();

  const sections = knowledge
    .split(/\n(?=## )/g)
    .map((section) => section.trim())
    .filter(Boolean);

  const findSection = (...names: string[]) => {
    const normalizedNames = names.map((name) =>
      name.toLowerCase().trim()
    );

    return sections.find((section) => {
      const normalized = section.toLowerCase();

      return normalizedNames.some((name) => {
        const heading = normalized.match(/^##\s+(.+)$/m)?.[1]?.trim();

        if (!heading) return false;

        if (heading === name) return true;
        if (heading.includes(name)) return true;
        if (name.includes(heading)) return true;

        return false;
      });
    });
  };

  let preferredSection: string | undefined;

  // Most specific question types first.
  if (
    q.includes("interview") ||
    q.includes("interview answer") ||
    q.includes("explain for interview")
  ) {
    preferredSection = findSection(
      "interview explanation"
    );
  } else if (
    q.includes("tool") ||
    q.includes("tools") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tech stack") ||
    q.includes("what did you use")
  ) {
    preferredSection = findSection(
      "tools",
      "tool",
      "technologies",
      "technology",
      "skills demonstrated",
      "analysis areas"
    );
  } else if (
    q.includes("objective") ||
    q.includes("goal") ||
    q.includes("purpose") ||
    q.includes("why")
  ) {
    preferredSection = findSection(
      "objective",
      "goal",
      "purpose"
    );
  } else if (
    q.includes("how") ||
    q.includes("workflow") ||
    q.includes("process") ||
    q.includes("investigation") ||
    q.includes("approach") ||
    q.includes("steps")
  ) {
    preferredSection = findSection(
      "investigation workflow",
      "analysis workflow",
      "workflow",
      "process",
      "approach"
    );
  } else if (
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("what did he learn") ||
    q.includes("what was learned") ||
    q.includes("learned")
  ) {
    preferredSection = findSection(
      "skills demonstrated",
      "skills",
      "learning"
    );
  } else if (
    q.includes("detail") ||
    q.includes("detailed") ||
    q.includes("deep dive") ||
    q.includes("deep explanation") ||
    q.includes("explain fully")
  ) {
    preferredSection = findSection(
      "detailed answer",
      "detailed explanation",
      "overview"
    );
  }

  if (!preferredSection) {
    preferredSection = findSection(
      "short answer",
      "overview"
    );
  }  if (!preferredSection) {
    return null;
  }

  return preferredSection
    .replace(/^##\s+.*$/m, "")
    .trim();
}

export type KnowledgeContext = {
  messages?: Array<{
    role: "user" | "assistant";
    text: string;
  }>;
  currentTopic?: string | null;
};

export async function getKnowledgeReply(
  input: string,
  context?: KnowledgeContext
): Promise<KnowledgeReply | null> {
  const userMessages =
    (context?.messages ?? [])
      .filter((message) => message.role === "user")
      .map((message) => message.text);

  const previousUserMessage =
    userMessages.length > 1
      ? userMessages[userMessages.length - 2]
      : "";

  const retrievalQuery = [
    previousUserMessage,
    input,
  ]
    .filter(Boolean)
    .join(" ");

  const path =
    getKnowledgePath(input) ??
    getKnowledgePath(retrievalQuery);

  if (!path) return null;

  const knowledge = await getKnowledgeFile(path);

  if (!knowledge) return null;

  const answer = extractKnowledgeAnswer(
    knowledge,
    input
  );

  if (!answer) return null;

  return {
    text: answer,
  };
}








