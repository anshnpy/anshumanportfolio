"use client";

import { useState } from "react";
import { UserRound, Code2, FolderOpen, FileText, Mail, Send, X } from "lucide-react";

const profile = {
  name: "Anshuman Pandey",
  education: "BCA graduate",
  focus: "Cybersecurity, SOC Operations, Threat Detection and Blue Team security",
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
    "Wireshark"
  ],
  projects: [
    "SOC Home Lab",
    "Windows Event Log Analysis",
    "Network Traffic Analysis",
    "Phishing Email Analysis",
    "SIEM Log Analysis",
    "Linux Security Practice"
  ],
  interests: [
    "SOC Operations",
    "Threat Hunting",
    "Blue Team Operations",
    "Malware Analysis",
    "Cloud Security"
  ]
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
  "accha",
  "achha",
  "apne",
  "iske",
  "uske"
];

function isHinglish(text: string) {
  const q = text.toLowerCase();

  return hinglishWords.some((word) => {
    return new RegExp(`\\b${word}\\b`, "i").test(q);
  });
}

function getReply(input: string) {
  const q = input.toLowerCase();
  const hinglish = isHinglish(input);

  if (
    q.includes("who") ||
    q.includes("about") ||
    q.includes("anshuman") ||
    q.includes("profile")
  ) {
    return hinglish
      ? `Anshuman Pandey ek BCA graduate hain jo currently Cybersecurity aur SOC Operations par focus kar rahe hain. Unka main focus threat detection, security monitoring, Blue Team operations aur practical cybersecurity projects par hai.`
      : `Anshuman Pandey is a BCA graduate focused on Cybersecurity and SOC Operations. His current focus includes threat detection, security monitoring, Blue Team operations and practical cybersecurity projects.`;
  }

  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("study") ||
    q.includes("qualification") ||
    q.includes("bca")
  ) {
    return hinglish
      ? `Anshuman ne BCA complete kiya hai aur ab apna career Cybersecurity aur SOC domain mein build kar rahe hain.`
      : `Anshuman has completed his BCA and is building his career in Cybersecurity and SOC Operations.`;
  }

  if (
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tools")
  ) {
    return hinglish
      ? `Anshuman ki core skills hain: Networking, Linux, Python, Cybersecurity, SIEM, Windows Event Logs, Threat Detection, Incident Response, Web Security aur Wireshark.`
      : `Anshuman's core skills include Networking, Linux, Python, Cybersecurity, SIEM, Windows Event Logs, Threat Detection, Incident Response, Web Security and Wireshark.`;
  }

  if (
    q.includes("project") ||
    q.includes("projects") ||
    q.includes("work") ||
    q.includes("build")
  ) {
    return hinglish
      ? `Unke portfolio mein SOC Home Lab, Windows Event Log Analysis, Network Traffic Analysis, Phishing Email Analysis, SIEM Log Analysis aur Linux Security Practice jaise projects hain.`
      : `His portfolio includes a SOC Home Lab, Windows Event Log Analysis, Network Traffic Analysis, Phishing Email Analysis, SIEM Log Analysis and Linux Security Practice.`;
  }

  if (
    q.includes("soc") ||
    q.includes("security operations") ||
    q.includes("cybersecurity") ||
    q.includes("cyber security")
  ) {
    return hinglish
      ? `Anshuman ka current career focus Cybersecurity aur SOC Operations hai. Woh defensive security, monitoring, threat detection aur Blue Team concepts par focus kar rahe hain.`
      : `Anshuman's current career focus is Cybersecurity and SOC Operations, with an emphasis on defensive security, monitoring, threat detection and Blue Team concepts.`;
  }

  if (
    q.includes("goal") ||
    q.includes("career") ||
    q.includes("future") ||
    q.includes("want to become")
  ) {
    return hinglish
      ? `Anshuman ka goal Cybersecurity domain mein grow karna aur SOC/Security Engineering side par strong practical experience build karna hai.`
      : `Anshuman's goal is to grow in Cybersecurity and build strong practical experience in SOC and Security Engineering.`;
  }

  if (
    q.includes("interest") ||
    q.includes("learning") ||
    q.includes("learn")
  ) {
    return hinglish
      ? `Currently woh Threat Hunting, Blue Team Operations, Malware Analysis aur Cloud Security jaise areas explore kar rahe hain.`
      : `He is currently exploring Threat Hunting, Blue Team Operations, Malware Analysis and Cloud Security.`;
  }

  if (
    q.includes("cv") ||
    q.includes("resume")
  ) {
    return hinglish
      ? `Anshuman ka latest CV portfolio ke homepage par DOWNLOAD CV button se access kiya ja sakta hai.`
      : `Anshuman's latest CV is available through the DOWNLOAD CV button on the portfolio homepage.`;
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("linkedin") ||
    q.includes("reach")
  ) {
    return hinglish
      ? `Anshuman se contact karne ke liye portfolio ke Contact section mein email, LinkedIn aur GitHub links available hain.`
      : `You can contact Anshuman through the email, LinkedIn and GitHub links available in the Contact section.`;
  }

  if (q.includes("github")) {
    return hinglish
      ? `Anshuman ka GitHub link portfolio ke Contact section mein available hai, jahan aap unke builds aur code explore kar sakte ho.`
      : `Anshuman's GitHub link is available in the Contact section, where you can explore his builds and code.`;
  }

  if (q.includes("location") || q.includes("where")) {
    return hinglish
      ? `Anshuman India mein based hain.`
      : `Anshuman is based in India.`;
  }

  return hinglish
    ? `Main Anshuman ke profile, education, cybersecurity skills, SOC journey, projects, CV, GitHub aur contact information ke baare mein bata sakta hoon. Kuch specific poochho 😊`
    : `I can tell you about Anshuman's profile, education, cybersecurity skills, SOC journey, projects, CV, GitHub and contact information. Ask me something specific.`;
}
export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const [messages, setMessages] = useState<
    { from: "bot" | "user"; text: string }[]
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
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: getReply(value) },
      ]);

      setThinking(false);
      playReplySound();
    }, 2000);
  };

  const quick = (text: string) => {
    sendMessage(text);
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
