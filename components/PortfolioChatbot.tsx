import { getKnowledgeReply } from "../lib/chatbot/knowledge";
import {
  addMessage,
  createConversationContext,
  updateConversationContext,
} from "../lib/chatbot/conversation-manager";
import { routeIntent } from "../lib/chatbot/intent-router";
import { buildAnswer } from "../lib/chatbot/answer-builder";
import { createPortfolioActions } from "../lib/chatbot/actions";
import { useEffect, useRef, useState } from "react";
import {
  UserRound,
  Code2,
  FolderOpen,
  FileText,
  Mail,
  AudioLines, Send,
  X,
  ExternalLink, Globe2,
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

type CyberItem = {
  id: string;
  description: string;
  url: string;
  published?: string | null;
  lastModified?: string | null;
  vendor?: string;
  product?: string;
  vulnerabilityName?: string;
  dateAdded?: string;
  requiredAction?: string;
  dueDate?: string;
};

type CyberData = {
  updated: string;
  sources: {
    nvd: string;
    cisaKev: string;
  };
  vulnerabilities: CyberItem[];
  exploited: CyberItem[];
};
type Reply = {
  text: string;
  actions?: Action[];
};

async function getCyberIntelligence(): Promise<CyberData> {
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const apiUrl = isLocal
    ? "/api/cyber"
    : "/api/cyber";

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Cyber intelligence request failed");
  }

  return response.json();
}

function getReply(input: string): Reply {
  const q = input.toLowerCase().trim();
  const hinglish = isHinglish(input);

  const portfolioActions = createPortfolioActions(profile);

  const {
    openCv,
    openGithub,
    openLinkedin,
    sendEmail,
  } = portfolioActions;


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

    q.includes("experience") ||
    q.includes("cybersecurity experience") ||
    q.includes("security experience") ||
    q.includes("work experience")
  ) {
    return {
      text: hinglish
        ? "Anshuman ka current portfolio practical cybersecurity learning, hands-on security builds aur SOC-focused skill development ko highlight karta hai. In builds ko professional work experience ke roop mein present nahi kiya gaya hai."
        : "Anshuman's current portfolio highlights practical cybersecurity learning, hands-on security builds and SOC-focused skill development. These builds are not presented as professional work experience.",
      actions: [openCv, openGithub],
    };
  }

  if (
    q.includes("soc l1") ||
    q.includes("soc level 1") ||
    q.includes("soc analyst") ||
    q.includes("soc role")
  ) {
    return {
      text: hinglish
        ? "Anshuman entry-level SOC / SOC L1 aur Blue Team opportunities ko target kar rahe hain. Unka focus security monitoring, log analysis, threat detection aur incident-response fundamentals par hai."
        : "Anshuman is targeting entry-level SOC / SOC L1 and Blue Team opportunities. His focus includes security monitoring, log analysis, threat detection and incident-response fundamentals.",
      actions: [openCv, openLinkedin, sendEmail],
    };
  }

  if (
    q.includes("internship") ||
    q.includes("intern") ||
    q.includes("entry level") ||
    q.includes("entry-level")
  ) {
    return {
      text: hinglish
        ? "Anshuman entry-level Cybersecurity, SOC aur Blue Team opportunities ke liye open hain. Portfolio practical learning aur hands-on security builds ko showcase karta hai."
        : "Anshuman is open to entry-level Cybersecurity, SOC and Blue Team opportunities. His portfolio showcases practical learning and hands-on security builds.",
      actions: [openCv, openLinkedin, sendEmail],
    };
  }

  if (
    q.includes("currently building") ||
    q.includes("current build") ||
    q.includes("what is he building") ||
    q.includes("building now")
  ) {
    return {
      text: hinglish
        ? `Abhi portfolio mein ${profile.projects.join(", ")} jaise security builds aur visible learning experiments showcase kiye ja rahe hain.`
        : `The portfolio currently showcases security builds such as ${profile.projects.join(", ")} along with visible learning experiments.`,
      actions: [openGithub],
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
  const [listening, setListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const voiceModeRef = useRef(false);

  const setVoiceModeSafe = (value: boolean) => {
    voiceModeRef.current = value;
    setVoiceMode(value);
  };
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voiceRequestRef = useRef(false);
  const voiceGenerationRef = useRef(0);
  const speakingRef = useRef(false);

  // Text currently being spoken by the browser.
  // Used to prevent the microphone from hearing the bot's own voice.
  const spokenTextRef = useRef("");

  const normalizeVoiceText = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const looksLikeBotEcho = (heard: string) => {
    const spoken = normalizeVoiceText(spokenTextRef.current);
    const current = normalizeVoiceText(heard);

    if (!spoken || !current) return false;
    if (current.length < 2) return true;

    if (spoken.startsWith(current)) return true;

    const words = current.split(" ");
    if (words.length >= 2) {
      const spokenWords = spoken.split(" ");

      for (let i = 0; i <= spokenWords.length - words.length; i++) {
        const chunk = spokenWords
          .slice(i, i + words.length)
          .join(" ");

        if (chunk === current) {
          return true;
        }
      }
    }

    return false;
  };

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  const startSilenceTimer = () => {
    clearSilenceTimer();

    silenceTimerRef.current = setTimeout(() => {
      if (voiceModeRef.current && !speakingRef.current) {
        stopVoiceRecognition();
        setListening(false);
      }
    }, 10000);
  };

  const stopVoiceRecognition = () => {
    clearSilenceTimer();
    const recognition = recognitionRef.current;

    if (!recognition) return;

    recognitionRef.current = null;

    try {
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
      recognition.stop();
    } catch {}

    setListening(false);
  };

  const closeVoiceMode = () => {
    stopVoiceRecognition();

    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
    }

    voiceGenerationRef.current += 1;
    voiceRequestRef.current = false;
    speakingRef.current = false;
    spokenTextRef.current = "";


    setSpeaking(false);
    setListening(false);
    setVoiceModeSafe(false);
  };
  const speakReply = (text: string) => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      return;
    }

    const generation = voiceGenerationRef.current;

    // NEVER keep microphone active while TTS is speaking.
    stopVoiceRecognition();

    window.speechSynthesis.cancel();

    spokenTextRef.current = text;

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find(
        (voice) =>
          voice.lang.toLowerCase() === "en-in"
      ) ||
      voices.find(
        (voice) =>
          voice.lang.toLowerCase().startsWith("en-in")
      ) ||
      voices.find(
        (voice) =>
          voice.lang.toLowerCase().startsWith("en-us")
      ) ||
      voices.find(
        (voice) =>
          voice.lang.toLowerCase().startsWith("en-gb")
      );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => {
      if (
        voiceGenerationRef.current !== generation ||
        !voiceModeRef.current
      ) {
        window.speechSynthesis.cancel();
        return;
      }

      speakingRef.current = true;
      setSpeaking(true);

      // IMPORTANT:
      // Recognition stays OFF while the bot is speaking.
      stopVoiceRecognition();
    };

    utterance.onend = () => {
      if (
        voiceGenerationRef.current !== generation
      ) {
        return;
      }

      speakingRef.current = false;
      setSpeaking(false);
      spokenTextRef.current = "";

      if (voiceModeRef.current) {
        setTimeout(() => {
          if (
            voiceModeRef.current &&
            voiceGenerationRef.current === generation &&
            !speakingRef.current &&
            !window.speechSynthesis.speaking &&
            !recognitionRef.current
          ) {
            startVoiceInput();
          }
        }, 150);
      }
    };

    utterance.onerror = () => {
      if (
        voiceGenerationRef.current !== generation
      ) {
        return;
      }

      speakingRef.current = false;
      setSpeaking(false);
      spokenTextRef.current = "";

      if (voiceModeRef.current) {
        setTimeout(() => {
          if (
            voiceModeRef.current &&
            !speakingRef.current &&
            !window.speechSynthesis.speaking &&
            !recognitionRef.current
          ) {
            startVoiceInput();
          }
        }, 150);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
  if (
    typeof window === "undefined" ||
    !voiceModeRef.current ||
    speakingRef.current ||
    window.speechSynthesis?.speaking
  ) {
    return;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("SpeechRecognition is not supported by this browser.");
    return;
  }

  if (recognitionRef.current) return;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    if (recognitionRef.current === recognition) {
      setListening(true);
    }
  };

  recognition.onresult = (event: any) => {
    if (recognitionRef.current !== recognition) return;

    const result = event.results?.[event.resultIndex];
    if (!result) return;

    const transcript =
      result?.[0]?.transcript?.trim() || "";

    if (!transcript) return;

    console.log(
      "VOICE RESULT:",
      transcript,
      "FINAL:",
      result.isFinal
    );

    if (
      speakingRef.current ||
      window.speechSynthesis?.speaking
    ) {
      return;
    }

    if (!result.isFinal) return;

    const voiceCommand = transcript
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .trim();

    const closeVoicePhrases = [
      "stop",
      "bye",
      "goodbye",
      "close",
      "exit",
      "done",
      "im done",
      "i am done",
      "thats all",
      "that is all",
      "stop listening",
      "close voice",
      "close the voice",
      "close voice mode",
      "stop voice",
      "stop the voice",
      "end conversation",
      "end the conversation",
      "you can stop"
    ];

    const shouldCloseVoice =
      closeVoicePhrases.includes(voiceCommand);

    if (shouldCloseVoice) {
      console.log("VOICE COMMAND: Closing voice mode");

      closeVoiceMode();
      return;
    }

    try {
      recognition.stop();
    } catch {}

    if (recognitionRef.current === recognition) {
      recognitionRef.current = null;
    }

    setListening(false);

    voiceGenerationRef.current += 1;
    voiceRequestRef.current = true;

    sendMessage(transcript);
  };

  recognition.onend = () => {
    if (recognitionRef.current === recognition) {
      recognitionRef.current = null;
      setListening(false);
    }

    /*
     * Silence / timeout recovery.
     *
     * If the user simply stops talking and no request was sent,
     * give the microphone another listening session.
     *
     * Do NOT restart while the bot is speaking.
     */
    if (
      voiceModeRef.current &&
      !speakingRef.current &&
      !window.speechSynthesis?.speaking &&
      !voiceRequestRef.current
    ) {
      setTimeout(() => {
        if (
          voiceModeRef.current &&
          !recognitionRef.current &&
          !speakingRef.current &&
          !window.speechSynthesis?.speaking &&
          !voiceRequestRef.current
        ) {
          startVoiceInput();
        }
      }, 700);
    }
  };

  recognition.onerror = (event: any) => {
    console.log("VOICE ERROR:", event?.error);

    if (recognitionRef.current === recognition) {
      recognitionRef.current = null;
    }

    setListening(false);

    /*
     * Permission errors should stop the voice system.
     * Temporary errors such as no-speech/audio-capture can recover.
     */
    if (
      event?.error === "not-allowed" ||
      event?.error === "service-not-allowed"
    ) {
      return;
    }

    if (
      voiceModeRef.current &&
      !speakingRef.current &&
      !window.speechSynthesis?.speaking &&
      !voiceRequestRef.current
    ) {
      setTimeout(() => {
        if (
          voiceModeRef.current &&
          !recognitionRef.current &&
          !speakingRef.current &&
          !window.speechSynthesis?.speaking &&
          !voiceRequestRef.current
        ) {
          startVoiceInput();
        }
      }, 700);
    }
  };

  recognitionRef.current = recognition;

  try {
    recognition.start();
  } catch (error) {
    console.log("VOICE START ERROR:", error);

    if (recognitionRef.current === recognition) {
      recognitionRef.current = null;
    }

    setListening(false);
  }
};

useEffect(() => {
  if (voiceMode) {
    if (
      !speakingRef.current &&
      !window.speechSynthesis?.speaking &&
      !recognitionRef.current
    ) {
      setTimeout(() => {
        if (
          voiceModeRef.current &&
          !speakingRef.current &&
          !window.speechSynthesis?.speaking &&
          !recognitionRef.current
        ) {
          startVoiceInput();
        }
      }, 100);
    }

    return;
  }

  voiceGenerationRef.current += 1;

  stopVoiceRecognition();

  if (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {
    window.speechSynthesis.cancel();
  }

  spokenTextRef.current = "";
  speakingRef.current = false;

  setSpeaking(false);
  setListening(false);
}, [voiceMode]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    { from: "bot" | "user"; text: string; actions?: Action[]; cyber?: CyberData }[]
  >([]);

  const conversationRef = useRef(
    createConversationContext()
  );

  useEffect(() => {
    if (!open) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, thinking, open]);
  const playReplySound = () => {
    const audio = new Audio("/message-sent.wav");
    audio.volume = 0.18;
    audio.play().catch(() => {});
  };

  const sendMessage = async (text = input) => {
    const value = text.trim();

    const intentResult = routeIntent(value);

    conversationRef.current = addMessage(
      conversationRef.current,
      "user",
      value
    );

    conversationRef.current = updateConversationContext(
      conversationRef.current,
      {
        intent: intentResult.intent,
        topic: intentResult.topic,
      }
    );

    console.log(
      "CHAT CONTEXT:",
      conversationRef.current
    );

    if (!value || (thinking && !voiceRequestRef.current)) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: value },
    ]);

    setInput("");
    setThinking(true);
    const wasVoiceRequest = voiceRequestRef.current;
    const requestGeneration = voiceGenerationRef.current;
    voiceRequestRef.current = false;

    const isCyberNewsRequest =
      intentResult.intent === "cyber-news";

    if (isCyberNewsRequest) {
      try {
        const data = await getCyberIntelligence();

        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "LIVE CYBER INTELLIGENCE",
            cyber: data,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "I couldn't retrieve the live cybersecurity feed right now. Please try again shortly.",
          },
        ]);
      } finally {
        setThinking(false);
        playReplySound();
      }

      return;
    }

    setTimeout(async () => {
      let reply = await getKnowledgeReply(
        value,
        conversationRef.current
      );

      if (!reply) {
        reply = getReply(value);
      }

      const answer = buildAnswer(
        reply.text,
        reply.actions
      );


      conversationRef.current = addMessage(
        conversationRef.current,
        "assistant",
        reply.text
      );

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: answer.text,
          actions: answer.actions,
        },
      ]);

      setThinking(false);
      playReplySound();

      if (
        wasVoiceRequest &&
        voiceGenerationRef.current === requestGeneration
      ) {
        speakReply(answer.text);
      }
    }, 900);
  };
  const backToMenu = () => {
    setMessages([]);
    setThinking(false);
    setInput("");
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
            onClick={() => { closeVoiceMode(); setOpen(false); }}
          />

          <section className="orbit-chat-window">

      {voiceMode && (
        <div className="orbit-voice-mode">
          <div className="orbit-voice-panel">
            <button
              type="button"
              className="orbit-voice-close"
              onClick={() => {
                closeVoiceMode();
              }}
              aria-label="Close voice mode"
            >
              <X size={20} />
            </button>

            <div className={`orbit-voice-orb ${listening ? "is-listening" : ""} ${speaking ? "is-speaking" : ""}`}>
              <div className="orbit-voice-core">
                <AudioLines size={42} strokeWidth={1.8} />
              </div>
              <span className="orbit-voice-ring ring-one" />
              <span className="orbit-voice-ring ring-two" />
              <span className="orbit-voice-ring ring-three" />
            </div>

            <div className="orbit-voice-status">
              <span className="orbit-voice-dot" />
              <strong>{speaking ? "SPEAKING..." : listening ? "LISTENING..." : "READY"}</strong>
            </div>

            <p className="orbit-voice-caption">
              {speaking ? "Orbit AI is speaking" : listening ? "I am listening..." : "Tap the voice button and speak"}
            </p>
          </div>
        </div>
      )}

            <div className="orbit-grid" />

            <header className="orbit-header">
              <div className="orbit-online">
                <span />
                ONLINE
              </div>

              <button
                type="button"
                className="orbit-close"
                onClick={() => { closeVoiceMode(); setOpen(false); }}
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </header>

            {messages.length > 0 && (
              <div className="orbit-chat-topbar">
              <button
                type="button"
                className="orbit-back-button"
                onClick={backToMenu}
              >
                ← BACK TO MENU
              </button>
              </div>
            )}

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
                    className="orbit-news-button"
                    onClick={() => quick("Show me the latest cybersecurity news")}
                  >
                    <Globe2 size={15} />
                    CYBER NEWS
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
                      {message.cyber && (
                        <div className="orbit-cyber-feed">
                          <div className="orbit-cyber-feed-head">
                  <span>LIVE SECURITY FEED</span>
                            <small>NVD + CISA KEV</small>
                          </div>

                          {message.cyber.exploited.length > 0 && (
                            <div className="orbit-cyber-group">
                              <div className="orbit-cyber-group-title">
                                <span>01</span>
                                <strong>ACTIVELY EXPLOITED</strong>
                              </div>

                              {message.cyber.exploited.slice(0, 3).map((item) => (
                                <div className="orbit-cyber-card" key={item.id}>
                                  <div className="orbit-cyber-card-top">
                                    <strong>{item.id}</strong>
                                    <span>KEV</span>
                                  </div>

                                  <h4>
                                    {item.vulnerabilityName || item.description}
                                  </h4>

                                    <p>{item.vendor} · {item.product}</p>

                                  <div className="orbit-cyber-card-meta">
                                    <span>
                                    ADDED {item.dateAdded || "UNKNOWN"}
                                    </span>

                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      VIEW ADVISORY
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {message.cyber.vulnerabilities.length > 0 && (
                            <div className="orbit-cyber-group">
                              <div className="orbit-cyber-group-title">
                                <span>02</span>
                                <strong>RECENT CVEs</strong>
                              </div>

                              {message.cyber.vulnerabilities.slice(0, 3).map((item) => (
                                <div className="orbit-cyber-card" key={item.id}>
                                  <div className="orbit-cyber-card-top">
                                    <strong>{item.id}</strong>
                                    <span>NVD</span>
                                  </div>

                                  <p>{item.description}</p>

                                  <div className="orbit-cyber-card-meta">
                                    <span>
                                      {item.published
                                        ? new Date(item.published).toLocaleDateString()
                                        : "RECENT"}
                                    </span>

                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      VIEW CVE
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="orbit-cyber-updated">
                            UPDATED {new Date(message.cyber.updated).toLocaleString()}
                          </div>
                        </div>
                      )}

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

                  <div ref={messagesEndRef} />
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
                title="Send"
                className="send-btn"
              >
                <Send size={19} strokeWidth={2.3} />
              </button>

              <button
                type="button"
                onClick={async () => {
  if (voiceModeRef.current) {
    closeVoiceMode();
    return;
  }

  setVoiceModeSafe(true);

  setTimeout(() => {
    startVoiceInput();
  }, 300);
}} aria-label="Voice input"
                title={listening ? "Stop listening" : "Speak"}
                className={`voice-btn ${listening ? "voice-active" : ""}`}
              >
                <AudioLines size={21} strokeWidth={2.4} />
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





































