
export type Frame<T> = {
  cursor: "subject" | "predicate" | "object";
  subject?: T;
  predicate?: T;
  object?: T;
};

export type TermParse = {
  term: string;
  index: number;
  line: string;
};
