"use client";

import { WordsProvider } from "@/contexts/words";

export function Providers({
  children,
  correctedWord,
}: {
  children: React.ReactNode;
  correctedWord: string;
}) {
  return <WordsProvider correctWord={correctedWord}>{children}</WordsProvider>;
}
