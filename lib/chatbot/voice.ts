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

  return (
    voices.find(
      (voice) =>
        voice.lang.toLowerCase() ===
        preference.primaryLanguage?.toLowerCase()
    ) ??
    voices.find(
      (voice) =>
        voice.lang.toLowerCase() ===
        preference.fallbackLanguage?.toLowerCase()
    ) ??
    voices.find((voice) =>
      voice.lang
        .toLowerCase()
        .startsWith(
          preference.primaryLanguage
            ?.split("-")[0]
            .toLowerCase() ?? "en"
        )
    ) ??
    null
  );
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
