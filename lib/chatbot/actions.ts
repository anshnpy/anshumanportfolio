export type ChatAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type PortfolioActionProfile = {
  cv: string;
  github: string;
  linkedin: string;
  email: string;
};

export function createPortfolioActions(
  profile: PortfolioActionProfile
) {
  const openCv: ChatAction = {
    label: "OPEN CV",
    href: profile.cv,
  };

  const openGithub: ChatAction = {
    label: "OPEN GITHUB",
    href: profile.github,
    external: true,
  };

  const openLinkedin: ChatAction = {
    label: "OPEN LINKEDIN",
    href: profile.linkedin,
    external: true,
  };

  const sendEmail: ChatAction = {
    label: "SEND EMAIL",
    href: `mailto:${profile.email}`,
  };

  return {
    openCv,
    openGithub,
    openLinkedin,
    sendEmail,
  };
}

export function getActionForQuery(
  input: string,
  actions: ReturnType<typeof createPortfolioActions>
): ChatAction | null {
  const q = input.toLowerCase().trim();

  if (
    /\b(open|download|view|show)\b.*\b(cv|resume)\b/i.test(q) ||
    /\b(cv|resume)\b.*\b(open|download|view|show)\b/i.test(q)
  ) {
    return actions.openCv;
  }

  if (
    /\b(open|visit|go to|show)\b.*\bgithub\b/i.test(q) ||
    q === "github"
  ) {
    return actions.openGithub;
  }

  if (
    /\b(open|visit|go to|show)\b.*\blinkedin\b/i.test(q) ||
    q === "linkedin"
  ) {
    return actions.openLinkedin;
  }

  if (
    /\b(contact|contact me|email|email me|mail)\b/i.test(q)
  ) {
    return actions.sendEmail;
  }

  return null;
}
