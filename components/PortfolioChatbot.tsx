import { useState } from "react";
import {
  UserRound,
  Code2,
  FolderOpen,
  FileText,
  Mail,
  Send,
  X,
  ExternalLink,
} from "lucide-react";

const profile = {
  name: "Anshuman Pandey",

  about:
    "Anshuman Pandey is a BCA graduate focused on Cybersecurity and Security Operations. He is building practical security knowledge around defensive security, SOC workflows and security-focused projects.",

  education: "BCA graduate.",

  focus:
    "Cybersecurity, Security Operations, SOC and Blue Team security.",

  location: "Delhi, India",

  skills: [
    "Networking",
    "Linux",
    "Python",
    "Cybersecurity",
    "SIEM",
    "Windows Event Logs",
    "Threat Detection",
    "Incident Response",
    "Web Security",
    "Wireshark",
  ],

  projects: [
    "SOC Home Lab",
    "Windows Event Log Analysis",
    "Network Traffic Analysis",
    "Phishing Email Analysis",
    "SIEM Log Analysis",
    "Linux Security Practice",
  ],

  learning: [
    "Blue Team Operations",
    "Log Analysis",
    "Security Fundamentals",
    "Threat Hunting",
    "Malware Analysis",
    "Cloud Security",
  ],

  career:
    "Anshuman is building a career in Cybersecurity and Security Operations, with a long-term goal of growing toward Security Engineering.",

  cv: "/resume.pdf",

  email: "anshn.py@gmail.com",

  linkedin:
    "https://www.linkedin.com/in/anshuman-pandey-b847b5287",

  github: "https://github.com/anshnpy",
};

const hinglishWords = [
  "kya",
  "kaise",
  "kon",
  "kaun",
  "kaha",
  "kahan",
  "bta",
  "bata",
  "batao",
  "mere",
  "mera",
  "meri",
  "mujhe",
  "kr",
  "kar",
  "hai",
  "hain",
  "chahiye",
  "wala",
  "wali",
  "kyu",
  "kyon",
  "achha",
  "accha",
  "apne",
  "iske",
  "uske",
  "bhi",
  "kitna",
  "kitne",
  "karta",
  "karte",
  "kiya",
  "btao",
];

function isHinglish(text: string) {
  const words = text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/);

  return hinglishWords.some((word) => words.includes(word));
}

type Action = {
  label: string;
  href: string;
  external?: boolean;
};

type Reply = {
  text: string;
  actions?: Action[];
};

function getReply(input: string): Reply {
  const q = input.toLowerCase().trim();
  const hinglish = isHinglish(input);

  const openCv: Action = {
    label: "OPEN CV",
    href: profile.cv,
  };

  const openGithub: Action = {
    label: "OPEN GITHUB",
    href: profile.github,
    external: true,
  };

  const openLinkedin: Action = {
    label: "OPEN LINKEDIN",
    href: profile.linkedin,
    external: true,
  };

  const sendEmail: Action = {
    label: "SEND EMAIL",
    href: `mailto:${profile.email}`,
  };

  if (
    q.includes("who is anshuman") ||
    q.includes("who is he") ||
    q.includes("about anshuman") ||
    q.includes("about him") ||
    q.includes("profile") ||
    q.includes("tell me about anshuman")
  ) {
    return {
      text: hinglish
        ? "Anshuman Pandey ek BCA graduate hain jo Cybersecurity aur Security Operations par focus kar rahe hain. Unka goal practical defensive security skills build karna aur long term mein Security Engineering ki taraf grow karna hai."
        : "Anshuman Pandey is a BCA graduate focused on Cybersecurity and Security Operations. He is building practical defensive security skills with a long-term goal of growing toward Security Engineering.",
      actions: [openCv, openLinkedin],
    };
  }

  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("qualification") ||
    q.includes("study") ||
    q.includes("bca")
  ) {
    return {
      text: hinglish
        ? "Anshuman ne BCA complete kiya hai. Ab unka primary career focus Cybersecurity aur Security Operations hai."
        : "Anshuman has completed his BCA. His current career focus is Cybersecurity and Security Operations.",
      actions: [openCv],
    };
  }

  if (
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tools") ||
    q.includes("tech stack")
  ) {
    return {
      text: hinglish
        ? `Anshuman ki core security skills mein ${profile.skills.join(", ")} shamil hain.`
        : `Anshuman's core security skills include ${profile.skills.join(", ")}.`,
    };
  }

  if (
    q.includes("project") ||
    q.includes("projects") ||
    q.includes("work") ||
    q.includes("build") ||
    q.includes("portfolio work")
  ) {
    return {
      text: hinglish
        ? `Portfolio mein current security builds ke roop mein ${profile.projects.join(", ")} listed hain. Ye portfolio builds hain; chatbot inhe professional work experience ke roop mein claim nahi karta.`
        : `The portfolio currently lists ${profile.projects.join(", ")} as security builds. These are portfolio builds and are not presented as professional work experience.`,
      actions: [openGithub],
    };
  }

  if (
    q.includes("learning") ||
    q.includes("currently learning") ||
    q.includes("exploring") ||
    q.includes("learn") ||
    q.includes("study now")
  ) {
    return {
      text: hinglish
        ? `Currently Anshuman ${profile.learning.join(", ")} par focus kar rahe hain.`
        : `Anshuman is currently focusing on ${profile.learning.join(", ")}.`,
    };
  }

  if (
    q.includes("career") ||
    q.includes("goal") ||
    q.includes("future") ||
    q.includes("become") ||
    q.includes("career goal")
  ) {
    return {
      text: hinglish
        ? "Anshuman ka current goal Cybersecurity aur SOC/Blue Team roles mein grow karna hai. Long term mein woh Security Engineering ki taraf jaana chahte hain."
        : "Anshuman's current goal is to grow in Cybersecurity and SOC/Blue Team roles, with a long-term direction toward Security Engineering.",
      actions: [openCv, openLinkedin],
    };
  }

  if (
    q.includes("role") ||
    q.includes("job") ||
    q.includes("looking for") ||
    q.includes("position") ||
    q.includes("hire") ||
    q.includes("hiring")
  ) {
    return {
      text: hinglish
        ? "Anshuman primarily entry-level SOC, Blue Team aur Cybersecurity opportunities ke liye focused hain. Long term goal Security Engineering mein grow karna hai."
        : "Anshuman is primarily focused on entry-level SOC, Blue Team and Cybersecurity opportunities, with a long-term goal of growing toward Security Engineering.",
      actions: [openCv, openLinkedin, sendEmail],
    };
  }

  if (
    q.includes("why should i hire") ||
    q.includes("why hire") ||
    q.includes("why him") ||
    q.includes("why anshuman")
  ) {
    return {
      text: hinglish
        ? "Anshuman ke paas BCA background hai aur unka focus practical Cybersecurity, SOC workflows, networking, Linux, SIEM aur defensive security par hai. Woh hands-on learning aur continuous improvement par focused hain."
        : "Anshuman combines a BCA background with a focused direction toward Cybersecurity and SOC operations. His portfolio emphasizes networking, Linux, SIEM, security monitoring and continuous hands-on learning.",
      actions: [openCv, openLinkedin],
    };
  }

  if (
    q.includes("available") ||
    q.includes("availability") ||
    q.includes("join")
  ) {
    return {
      text: hinglish
        ? "For current availability, role requirements ya joining details, Anshuman se directly contact karna best rahega."
        : "For current availability, role requirements or joining details, the best option is to contact Anshuman directly.",
      actions: [sendEmail, openLinkedin],
    };
  }

  if (
    q.includes("cv") ||
    q.includes("resume") ||
    q.includes("curriculum vitae")
  ) {
    return {
      text: hinglish
        ? "Anshuman ka latest CV yahan available hai."
        : "Anshuman's CV is available here.",
      actions: [openCv],
    };
  }

  if (
    q.includes("github") ||
    q.includes("code") ||
    q.includes("repository") ||
    q.includes("repo")
  ) {
    return {
      text: hinglish
        ? "Anshuman ka GitHub profile yahan hai."
        : "Anshuman's GitHub profile is available here.",
      actions: [openGithub],
    };
  }

  if (
    q.includes("linkedin") ||
    q.includes("linked in")
  ) {
    return {
      text: hinglish
        ? "Anshuman ka LinkedIn profile yahan hai."
        : "Anshuman's LinkedIn profile yahan available hai."
        ,
      actions: [openLinkedin],
    };
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("mail")
  ) {
    return {
      text: hinglish
        ? `Anshuman ko ${profile.email} par contact kar sakte ho. LinkedIn aur GitHub bhi available hain.`
        : `You can contact Anshuman at ${profile.email}. His LinkedIn and GitHub profiles are also available.`,
      actions: [sendEmail, openLinkedin, openGithub],
    };
  }

  if (
    q.includes("location") ||
    q.includes("where is he") ||
    q.includes("where does he live") ||
    q.includes("based")
  ) {
    return {
      text: hinglish
        ? `Anshuman ${profile.location} mein based hain.`
        : `Anshuman is based in ${profile.location}.`,
    };
  }

  if (
    q.includes("soc") ||
    q.includes("security operations") ||
    q.includes("blue team")
  ) {
    return {
      text: hinglish
        ? "SOC aur Blue Team Anshuman ke primary career focus areas hain. Woh monitoring, log analysis, threat detection aur incident-response fundamentals build kar rahe hain."
        : "SOC and Blue Team security are key areas of Anshuman's career focus. He is building skills around monitoring, log analysis, threat detection and incident-response fundamentals.",
    };
  }

  if (
    q.includes("cybersecurity") ||
    q.includes("cyber security") ||
    q.includes("security")
  ) {
    return {
      text: hinglish
        ? "Anshuman ka main focus Cybersecurity hai, especially SOC, Blue Team, defensive security, monitoring aur investigation."
        : "Anshuman's main focus is Cybersecurity, particularly SOC, Blue Team, defensive security, monitoring and investigation.",
    };
  }

  return {
    text: hinglish
      ? "Main Anshuman ke profile, education, skills, portfolio builds, learning areas, SOC career focus, CV, GitHub, LinkedIn aur contact information ke baare mein bata sakta hoon. Kuch specific poochho."
      : "I can tell you about Anshuman's profile, education, skills, portfolio builds, learning areas, SOC career focus, CV, GitHub, LinkedIn and contact information. Ask me something specific.",
  };
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const [messages, setMessages] = useState<
    { from: "bot" | "user"; text: string; actions?: Action[] }[]
  >([]);

  const playReplySound = () => {
    const audio = new Audio("/message-sent.wav");
    audio.volume = 0.18;
    audio.play().catch(() => {});
  };

  const sendMessage = (text = input) => {
    const value = text.trim();

    if (!value || thinking) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: value },
    ]);

    setInput("");
    setThinking(true);

    setTimeout(() => {
      const reply = getReply(value);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: reply.text,
          actions: reply.actions,
        },
      ]);

      setThinking(false);
      playReplySound();
    }, 900);
  };

  const quick = (text: string) => {
    sendMessage(text);
  };

  const openAction = (action: Action) => {
    if (action.href.startsWith("mailto:")) {
      window.location.href = action.href;
      return;
    }

    if (action.external) {
      window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    }

    window.open(action.href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          className="orbit-chat-node"
          onClick={() => setOpen(true)}
          aria-label="Open portfolio chat"
        >
          <span className="orbit-ring orbit-ring-1" />
          <span className="orbit-ring orbit-ring-2" />
          <span className="orbit-ring orbit-ring-3" />

          <span className="orbit-particle orbit-particle-1" />
          <span className="orbit-particle orbit-particle-2" />
          <span className="orbit-particle orbit-particle-3" />

          <span className="orbit-chat-icon">
            <span className="orbit-chat-dots">
              <i />
              <i />
              <i />
            </span>
          </span>

          <span className="orbit-chat-label">CHAT</span>
        </button>
      )}

      {open && (
        <div className="orbit-chat-overlay">
          <button
            className="orbit-chat-backdrop"
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          />

          <section className="orbit-chat-window">
            <div className="orbit-grid" />

            <header className="orbit-header">
              <div className="orbit-online">
                <span />
                ONLINE
              </div>

              <button
                type="button"
                className="orbit-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </header>

            <div className="orbit-chat-content">
              {messages.length === 0 && !thinking && (
                <div className="orbit-welcome">
                  <div className="orbit-mini-radar">
                    <span />
                  </div>

                  <div>
                    <h3>
                      Hey there <span>👋</span>
                    </h3>

                    <p>What do you want to know?</p>
                  </div>
                </div>
              )}

              {messages.length === 0 && !thinking && (
                <div className="orbit-quick-actions">
                  <button type="button" onClick={() => quick("Tell me about Anshuman")}>
                    <UserRound size={15} />
                    ABOUT ME
                  </button>

                  <button type="button" onClick={() => quick("What are Anshuman's skills?")}>
                    <Code2 size={15} />
                    SKILLS
                  </button>

                  <button type="button" onClick={() => quick("Tell me about the projects")}>
                    <FolderOpen size={15} />
                    PROJECTS
                  </button>

                  <button type="button" onClick={() => quick("Where is the CV?")}>
                    <FileText size={15} />
                    CV / RESUME
                  </button>

                  <button
                    type="button"
                    className="orbit-contact-button"
                    onClick={() => quick("How can I contact Anshuman?")}
                  >
                    <Mail size={15} />
                    CONTACT
                  </button>
                </div>
              )}

              {messages.length > 0 && (
                <div className="orbit-messages">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`orbit-message ${
                        message.from === "user"
                          ? "orbit-user-message"
                          : "orbit-bot-message"
                      }`}
                    >
                      <small>
                        {message.from === "user" ? "YOU" : "SYSTEM"}
                      </small>

                      <p>{message.text}</p>

                      {message.actions && message.actions.length > 0 && (
                        <div className="orbit-message-actions">
                          {message.actions.map((action) => (
                            <button
                              type="button"
                              key={action.label}
                              onClick={() => openAction(action)}
                            >
                              {action.label}
                              <ExternalLink size={12} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {thinking && (
                <div className="orbit-thinking">
                  <div className="orbit-thinking-radar">
                    <span />
                  </div>

                  <strong>ANALYZING YOUR QUERY</strong>

                  <div className="orbit-thinking-dots">
                    <i />
                    <i />
                    <i />
                  </div>

                  <small>Please wait a moment</small>
                </div>
              )}
            </div>

            <div className="orbit-secure-line">
              <span />
              SECURE CHANNEL
              <span />
            </div>

            <div className="orbit-input-area">
              <input
                value={input}
                disabled={thinking}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder={thinking ? "Please wait..." : "Ask anything..."}
              />

              <button
                type="button"
                disabled={thinking}
                onClick={() => sendMessage()}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            <footer className="orbit-footer">
              <span>SECURE & PRIVATE</span>
              <span>SMART RESPONSES</span>
              <span>ALWAYS ONLINE</span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
