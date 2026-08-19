export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  text: string;
};

export type ConversationContext = {
  messages: ChatMessage[];
  currentTopic: string | null;
  lastIntent: string | null;
};

export function createConversationContext(): ConversationContext {
  return {
    messages: [],
    currentTopic: null,
    lastIntent: null,
  };
}

export function addMessage(
  context: ConversationContext,
  role: ChatRole,
  text: string
): ConversationContext {
  return {
    ...context,
    messages: [
      ...context.messages,
      { role, text },
    ].slice(-12),
  };
}

export function updateConversationContext(
  context: ConversationContext,
  values: {
    topic?: string | null;
    intent?: string | null;
  }
): ConversationContext {
  return {
    ...context,
    ...(values.topic !== undefined
      ? { currentTopic: values.topic }
      : {}),
    ...(values.intent !== undefined
      ? { lastIntent: values.intent }
      : {}),
  };
}
