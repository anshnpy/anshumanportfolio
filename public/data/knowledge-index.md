# Anshuman Portfolio — Knowledge Index

This file maps visitor questions to the relevant knowledge sources.

## 1. Personal Profile
Source:
- data/profile.md

Use for:
- Who is Anshuman?
- Tell me about Anshuman
- Education
- Location
- Background

## 2. Skills
Source:
- data/skills.md

Use for:
- What are Anshuman's skills?
- What technologies does he know?
- What is his technical stack?
- Cybersecurity skills
- Networking
- Linux
- Python
- SIEM

## 3. Career
Source:
- data/career.md

Use for:
- Career goals
- What role is Anshuman looking for?
- What does he want to become?
- Career direction
- Security Engineering

## 4. Current Learning
Source:
- data/learning.md

Use for:
- What is Anshuman learning?
- What is he currently studying?
- What cybersecurity topics is he exploring?

## 5. Projects Overview
Source:
- data/projects.md

Use for:
- What projects has Anshuman built?
- Tell me about his projects
- Portfolio projects
- Cybersecurity projects

## 6. SOC Home Lab
Source:
- data/projects/soc-home-lab.md

Use for:
- SOC Home Lab
- SOC lab
- SOC project
- Security monitoring
- SOC investigation
- Defensive security project

## 7. Network Traffic Analysis
Source:
- data/projects/network-traffic-analysis.md

Use for:
- Wireshark
- Network analysis
- Packet analysis
- Network traffic
- Protocol analysis

## 8. Phishing Email Analysis
Source:
- data/projects/phishing-email-analysis.md

Use for:
- Phishing
- Phishing project
- Phishing detection
- Email security
- Social engineering
- Suspicious email analysis

## 9. SIEM Log Analysis
Source:
- data/projects/siem-log-analysis.md

Use for:
- SIEM
- Log analysis
- Security logs
- Event correlation
- SOC monitoring
- Security telemetry

## 10. Windows Event Log Analysis
Source:
- data/projects/windows-event-log-analysis.md

Use for:
- Windows Event Logs
- Event IDs
- Authentication events
- Windows security
- Windows investigation

## 11. Linux Security Practice
Source:
- data/projects/linux-security-practice.md

Use for:
- Linux
- Linux security
- Linux command line
- Linux permissions
- Linux logs
- Linux processes

## 12. Chatbot Behavior
Source:
- data/chatbot-personality.md

Use for:
- Response style
- Tone
- Accuracy rules
- What the chatbot should or should not claim

# Source Priority

When answering a question:

1. Use the most specific project file available.
2. Use the general profile/skills/career files for broader questions.
3. Combine multiple relevant sources when a question covers multiple topics.
4. Never invent missing project details.
5. Never present portfolio projects as professional employment unless explicitly documented.
6. If information is unavailable, clearly say that the portfolio knowledge base does not currently contain that information.

# Example Routing

Question:
"Tell me about Anshuman's SOC Home Lab."

Use:
- data/projects/soc-home-lab.md

Question:
"What cybersecurity skills does Anshuman have?"

Use:
- data/skills.md

Question:
"How does his Wireshark project relate to SOC?"

Use:
- data/projects/network-traffic-analysis.md
- data/projects/soc-home-lab.md

Question:
"What is Anshuman currently learning?"

Use:
- data/learning.md

Question:
"Why is Anshuman interested in cybersecurity?"

Use:
- data/profile.md
- data/career.md
- data/learning.md
