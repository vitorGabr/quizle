"use client";

import { validateWord } from "@/functions/validate-word";
import { createContext, useContext, useEffect, useState } from "react";

export type Status = "correct" | "incorrect" | "unanswered";

export type Word = {
  letter: string;
  status: Status;
};

type Props = {
  words: Word[][];
  handleKeyPress: (event: KeyboardEvent) => void;
};

export const WordsContext = createContext({} as Props);

export function WordsProvider({
  children,
  correctWord,
  initialWord,
}: {
  children: React.ReactNode;
  correctWord: string;
  initialWord?: string;
}) {
  const [typedWord, setTypedWord] = useState<string>("");
  const [words, setWords] = useState<Word[][]>([]);

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Backspace") {
      setTypedWord((prev) => prev.slice(0, -1));
      return;
    }
    if (event.key === "Enter") {
      validateWord(typedWord, correctWord);
      setTypedWord("");
      return;
    }
    if (/^[a-zA-Z]$/.test(event.key)) {
      setTypedWord((prev) => prev + event.key);
    }
  }

  useEffect(() => {
    if (initialWord) {
      validateWord(correctWord, initialWord);
    }
  }, []);

  return (
    <WordsContext.Provider
      value={{
        words,
        handleKeyPress,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}

export const useWords = () => {
  const context = useContext(WordsContext);
  if (context === undefined) {
    throw new Error("useWords must be used within a WordsProvider");
  }
  return context;
};
