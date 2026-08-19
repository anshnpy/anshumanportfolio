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

  "profile": "/data/profile.md",
  "about anshuman": "/data/profile.md",
};

export function getKnowledgePath(
  input: string
): string | null {
  const q = input.toLowerCase().trim();

  const matches = Object.entries(knowledgeAliases)
    .filter(([alias]) => q.includes(alias))
    .sort((a, b) => b[0].length - a[0].length);

  return matches[0]?.[1] ?? null;
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

  const findSection = (...names: string[]) =>
    sections.find((section) => {
      const normalized = section.toLowerCase();
      return names.some((name) =>
        normalized.includes(`## ${name}`)
      );
    });

  let preferredSection: string | undefined;

  if (
    q.includes("interview") ||
    q.includes("interview answer") ||
    q.includes("explain for interview")
  ) {
    preferredSection = findSection(
      "interview explanation"
    );
  } else if (
    q.includes("detail") ||
    q.includes("detailed") ||
    q.includes("deep dive") ||
    q.includes("deep explanation") ||
    q.includes("explain fully")
  ) {
    preferredSection = findSection(
      "detailed answer"
    );
  } else if (
    q.includes("how") ||
    q.includes("workflow") ||
    q.includes("process") ||
    q.includes("investigation") ||
    q.includes("approach")
  ) {
    preferredSection = findSection(
      "investigation workflow",
      "analysis workflow"
    );
  } else if (
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("what did he learn") ||
    q.includes("what was learned")
  ) {
    preferredSection = findSection(
      "skills demonstrated"
    );
  } else if (
    q.includes("objective") ||
    q.includes("goal") ||
    q.includes("purpose")
  ) {
    preferredSection = findSection(
      "objective"
    );
  } else if (
    q.includes("tool") ||
    q.includes("tools") ||
    q.includes("technology") ||
    q.includes("technologies")
  ) {
    preferredSection = findSection(
      "tool",
      "skills demonstrated",
      "analysis areas"
    );
  }

  if (!preferredSection) {
    preferredSection = findSection(
      "short answer",
      "overview"
    );
  }

  if (!preferredSection) {
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



