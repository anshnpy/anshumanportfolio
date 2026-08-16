"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const replies: Record<string, string> = {
  "who is anshuman":
    "Anshuman Pandey is a cybersecurity-focused BCA graduate building skills in SOC operations, threat detection and defensive security.",
  "about anshuman":
    "Anshuman is focused on Cybersecurity / SOC, with hands-on work around networking, Linux, SIEM, security monitoring and blue-team concepts.",
  "skills":
    "Core areas include Networking, Linux, Python, Security, SIEM and Web Security. Tools include Wireshark, Splunk and Elastic.",
  "projects":
    "Featured projects include Windows Event Log Analysis, Network Traffic Analysis, Security Monitoring Dashboard, SOC Investigation Lab and Web Security Testing.",
  "contact":
    "You can contact Anshuman through the Contact section, email or LinkedIn on this website.",
  "cv":
    "You can download Anshuman's CV using the DOWNLOAD CV button on the website.",
  "github":
    "You can explore Anshuman's code and projects through the GitHub link in the Contact section.",
};

function getReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("who") && text.includes("anshuman")) return replies["who is anshuman"];
  if (text.includes("about") || text.includes("anshuman")) return replies["about anshuman"];
  if (text.includes("skill") || text.includes("tool")) return replies["skills"];
  if (text.includes("project")) return replies["projects"];
  if (text.includes("contact") || text.includes("email")) return replies["contact"];
  if (text.includes("cv") || text.includes("resume")) return replies["cv"];
  if (text.includes("github")) return replies["github"];

  return "I can help you explore Anshuman's profile, skills, projects, CV, GitHub and contact information. Try asking about his skills or projects.";
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "SYSTEM ONLINE. 👋 Ask me about Anshuman, his skills, projects, CV or cybersecurity journey.",
    },
  ]);

  const playReplySound = () => {
    const audio = new Audio("/message-sent.wav");
    audio.volume = 0.7;
    audio.play().catch(() => {});
  };
  const sendMessage = () => {
    const value = input.trim();
    if (!value) return;

    const audio = new AudioContext();
    audio.resume();

    setMessages((prev) => [
      ...prev,
      { from: "user", text: value },
      { from: "bot", text: "THINKING..." },
    ]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "bot",
          text: getReply(value),
        };
        return updated;
      });

      playReplySound(audio);
    }, 2000);
  };
  return (
    <>
      <button
        className="ai-chat-trigger"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant"
      >
        <MessageCircle size={18} />
        <span>AI ASSISTANT</span>
      </button>

      {open && (
        <div className="ai-chatbot">
          <button
            className="ai-chat-backdrop"
            type="button"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          />

          <div className="ai-chat-window">
            <div className="ai-chat-header">
              <div>
                <span className="ai-status-dot" />
                <strong>AI ASSISTANT</strong>
                <small>PORTFOLIO SYSTEM / ONLINE</small>
              </div>

              <button type="button" onClick={() => setOpen(false)}>
                <X size={17} />
              </button>
            </div>

            <div className="ai-chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`ai-message ai-message-${message.from}`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="ai-chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="ASK SOMETHING..."
              />
              <button type="button" onClick={sendMessage} aria-label="Send">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
