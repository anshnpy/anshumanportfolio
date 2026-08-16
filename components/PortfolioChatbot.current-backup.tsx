"use client";

import { useState } from "react";
import { ArrowUpRight, X, Send } from "lucide-react";

const replies: Record<string, string> = {
  skills:
    "CORE SYSTEMS: Networking, Linux, Python, Security, SIEM and Web Security. Current focus: SOC operations and defensive security.",
  projects:
    "FEATURED BUILDS: Windows Event Log Analysis, Network Traffic Analysis, Security Monitoring Dashboard and Web Security Testing.",
  about:
    "ANSHUMAN PANDEY — BCA graduate focused on Cybersecurity, SOC Operations, Threat Detection and Blue Team security.",
  cv:
    "CV ACCESS READY. Use the DOWNLOAD CV button on the portfolio to open Anshuman's latest resume.",
  contact:
    "CONTACT CHANNELS: Email, LinkedIn and GitHub are available in the Contact section.",
  github:
    "GITHUB CHANNEL ONLINE. Open the GitHub link in the Contact section to explore the builds.",
};

function getReply(input: string) {
  const q = input.toLowerCase();

  if (q.includes("skill") || q.includes("tool")) return replies.skills;
  if (q.includes("project") || q.includes("work")) return replies.projects;
  if (q.includes("who") || q.includes("about") || q.includes("anshuman"))
    return replies.about;
  if (q.includes("cv") || q.includes("resume")) return replies.cv;
  if (q.includes("contact") || q.includes("email")) return replies.contact;
  if (q.includes("github")) return replies.github;

  return "SYSTEM READY. Ask me about Anshuman's skills, projects, cybersecurity journey, CV, GitHub or contact channels.";
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "SYSTEM ONLINE. AP-01 READY.",
    },
  ]);

  const playSound = () => {
    const audio = new Audio("/message-sent.wav");
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  const sendMessage = () => {
    const value = input.trim();
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
      playSound();
    }, 2000);
  };

  return (
    <>
      {!open && (
        <button
          className="ap01-node"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open AP-01 system node"
        >
          <span className="ap01-ring ap01-ring-one" />
          <span className="ap01-ring ap01-ring-two" />
          <span className="ap01-core">AP<span>01</span></span>
          <span className="ap01-status">SYSTEM NODE</span>
          <span className="ap01-orbit-dot" />
        </button>
      )}

      {open && (
        <div className="ap01-overlay">
          <button
            className="ap01-backdrop"
            type="button"
            aria-label="Close AP-01"
            onClick={() => setOpen(false)}
          />

          <div className="ap01-panel">
            <div className="ap01-panel-grid" />

            <header className="ap01-header">
              <div>
                <span className="ap01-live">
                  <i /> ONLINE
                </span>
                <strong>AP-01 // SYSTEM NODE</strong>
                <small>ANSHUMAN PORTFOLIO INTELLIGENCE</small>
              </div>

              <button
                type="button"
                className="ap01-close"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </header>

            <div className="ap01-radar">
              <div className="ap01-radar-circle">
                <span />
                <b>AP</b>
              </div>
              <div className="ap01-radar-scan" />
              <em>SECURE CHANNEL / ACTIVE</em>
            </div>

            <div className="ap01-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`ap01-message ap01-${message.from}`}
                >
                  <span>{message.from === "bot" ? "AP-01" : "YOU"}</span>
                  <p>{message.text}</p>
                </div>
              ))}

              {thinking && (
                <div className="ap01-message ap01-bot ap01-thinking">
                  <span>AP-01</span>
                  <p>
                    ANALYZING QUERY
                    <i>.</i>
                    <i>.</i>
                    <i>.</i>
                  </p>
                </div>
              )}
            </div>

            <div className="ap01-input">
              <input
                value={input}
                disabled={thinking}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder={thinking ? "PROCESSING..." : "ENTER COMMAND..."}
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={thinking}
                aria-label="Send command"
              >
                <Send size={16} />
              </button>
            </div>

            <footer className="ap01-footer">
              <span>AP-01</span>
              <span>ENCRYPTED CHANNEL</span>
              <span>v1.0</span>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
