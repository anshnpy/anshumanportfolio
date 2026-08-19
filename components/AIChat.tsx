"use client"

import { useEffect, useRef, useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Anshuman's AI assistant. Ask me about his cybersecurity skills, projects, CV, or SOC career.",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const recognitionRef = useRef<any>(null)

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const sendMessage = async (text?: string) => {
    const message = (text ?? input).trim()

    if (!message || loading) return

    setInput("")

    const newMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]

    setMessages(newMessages)
    setLoading(true)

    try {
      const response = await fetch(
        "https://anshuman-ai.anshn-py.workers.dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: newMessages,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("AI request failed")
      }

      const data = await response.json()

      const answer =
        data?.response ||
        data?.result?.response ||
        data?.answer ||
        "Sorry, I couldn't generate a response."

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ])

      speak(answer)
    } catch (error) {
      console.error(error)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "AI connection is temporarily unavailable. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const startListening = () => {
    if (typeof window === "undefined") return

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = "en-IN"
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onstart = () => {
      setListening(true)
    }

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript
      setInput(spokenText)
      sendMessage(spokenText)
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel()
      }

      recognitionRef.current?.stop()
    }
  }, [])

  return (
    <>
      {!open && (
        <button
          className="ai-chat-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open AI assistant"
        >
          <span className="ai-chat-dot" />
          AI
        </button>
      )}

      {open && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <div>
              <span className="ai-chat-label">AP // AI ASSISTANT</span>
              <span className="ai-chat-status">
                <i /> ONLINE
              </span>
            </div>

            <button
              className="ai-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close AI assistant"
            >
              ×
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-chat-message ${
                  message.role === "user"
                    ? "ai-chat-user"
                    : "ai-chat-assistant"
                }`}
              >
                <span className="ai-chat-role">
                  {message.role === "user" ? "YOU" : "AP_AI"}
                </span>

                <p>{message.content}</p>

                {message.role === "assistant" && index > 0 && (
                  <button
                    className="ai-speak-button"
                    onClick={() => speak(message.content)}
                    title="Listen to response"
                  >
                    🔊
                  </button>
                )}
              </div>
            ))}

            {loading && (
              <div className="ai-chat-message ai-chat-assistant">
                <span className="ai-chat-role">AP_AI</span>
                <p className="ai-thinking">
                  THINKING<span>.</span><span>.</span><span>.</span>
                </p>
              </div>
            )}
          </div>

          <div className="ai-chat-input-area">
            <button
              className={`ai-mic-button ${listening ? "active" : ""}`}
              onClick={startListening}
              title="Speak"
              type="button"
            >
              {listening ? "●" : "🎙"}
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage()
                }
              }}
              placeholder={
                listening ? "LISTENING..." : "ASK SOMETHING..."
              }
              disabled={loading}
            />

            <button
              className="ai-send-button"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              type="button"
            >
              ↗
            </button>
          </div>

          {speaking && (
            <div className="ai-speaking">
              🔊 AI SPEAKING...
            </div>
          )}
        </div>
      )}
    </>
  )
}