export type AnswerAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type BuiltAnswer = {
  text: string;
  actions?: AnswerAction[];
};

export function buildAnswer(
  text: string,
  actions?: AnswerAction[]
): BuiltAnswer {
  return {
    text: text.trim(),
    ...(actions && actions.length > 0
      ? { actions }
      : {}),
  };
}
