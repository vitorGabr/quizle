"use client";

import { WordsProvider } from "@/contexts/words-context";

export function Providers(props: {
  children: React.ReactNode;
  correctedWord: string;
}) {
  return <WordsProvider correctWord="test">{props.children}</WordsProvider>;
}
