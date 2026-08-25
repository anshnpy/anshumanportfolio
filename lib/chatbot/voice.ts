export type SpeechVoicePreference = {
  primaryLanguage?: string;
  fallbackLanguage?: string;
};

export function isSpeechSupported(): boolean {
  if (typeof window === "undefined") return false;

  return (
    "speechSynthesis" in window ||
    "SpeechRecognition" in window ||
    "webkitSpeechRecognition" in window
  );
}

export function getSpeechRecognitionConstructor(): any | null {
  if (typeof window === "undefined") return null;

  return (
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    null
  );
}

export function getPreferredSpeechVoice(
  preference: SpeechVoicePreference = {
    primaryLanguage: "en-IN",
    fallbackLanguage: "en-US",
  }
): SpeechSynthesisVoice | null {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();

  if (!voices.length) return null;

  const primary = preference.primaryLanguage?.toLowerCase() ?? "en-in";
  const fallback = preference.fallbackLanguage?.toLowerCase() ?? "en-us";

  const femaleHints = [
    "female",
    "samantha",
    "ava",
    "sara",
    "sarah",
    "karen",
    "victoria",
    "susan",
    "hazel",
    "zira",
    "aria",
    "jenny",
    "sonia",
    "libby",
    "sophie",
  ];

  const scoreVoice = (voice: SpeechSynthesisVoice) => {
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();

    let score = 0;

    if (lang === primary) score += 100;
    if (lang.startsWith(primary.split("-")[0])) score += 60;
    if (lang === fallback) score += 50;
    if (lang.startsWith(fallback.split("-")[0])) score += 30;

    if (femaleHints.some((hint) => name.includes(hint))) {
      score += 80;
    }

    if (
      name.includes("natural") ||
      name.includes("online") ||
      name.includes("neural")
    ) {
      score += 25;
    }

    return score;
  };

  return [...voices]
    .map((voice) => ({
      voice,
      score: scoreVoice(voice),
    }))
    .sort((a, b) => b.score - a.score)[0]?.voice ?? null;
}

export function prepareSpeechText(text: string): string {
  return text
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, " or ")
    .replace(/\s*·\s*/g, ", ")
    .replace(/\s*•\s*/g, ", ")
    .replace(/\s*[-–—]\s*/g, ", ")
    .replace(/\bSOC\b/g, "S O C")
    .replace(/\bSIEM\b/g, "S I E M")
    .replace(/\bCV\b/g, "C V")
    .trim();
}
export function cancelSpeech(): void {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return;
  }

  window.speechSynthesis.cancel();
}

export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    voice?: SpeechSynthesisVoice | null;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): SpeechSynthesisUtterance | null {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    !text.trim()
  ) {
    return null;
  }

  cancelSpeech();

  const utterance = new SpeechSynthesisUtterance(
    text
  );

  utterance.rate = options?.rate ?? 0.95;
  utterance.pitch = options?.pitch ?? 1;

  if (options?.voice) {
    utterance.voice = options.voice;
  }

  if (options?.onStart) {
    utterance.onstart = options.onStart;
  }

  if (options?.onEnd) {
    utterance.onend = options.onEnd;
  }

  if (options?.onError) {
    utterance.onerror = options.onError;
  }

  window.speechSynthesis.speak(utterance);

  return utterance;
}

