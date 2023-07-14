"use client";

import { isValidWord } from "@/services/isValidWord";
import { Word } from "@/types/word";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { P, match } from "ts-pattern";

type Props = {
  words: Word[][];
  column: number;
  index: number;
  onChangeWord: (word: string) => void;
  onChangeIndex: (index: number) => void;
  onChangeColumn: (column: number) => void;
};

export const WordContext = createContext({} as Props);
export const useWord = () => useContext(WordContext);

export function WordProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[][]>([[]]);
  const [column, setColumn] = useState(0);
  const [index, setIndex] = useState(0);

  const onChangeWord = (word: string, action: "add" | "remove" = "add") => {
    const newWords = [...words];
    const idx = match([action, index])
      .with(["remove", P.lt(2)], () => index)
      .otherwise(() => index);

    if (!newWords[column]) newWords[column] = [];
    newWords[column][idx] = {
      letter: word,
      status: 'unchecked'
    };

    setWords(newWords);
    if(idx >= 0 && idx <= 3){
      setIndex(
        match([action, index])
          .with(['remove', P._], () => 
              (index - 1) < 0 ? 0 : (index - 1))
          .with(['add', P.lte(2)], () => index + 1)
          .otherwise(() => index)
      );
    }
   
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    if (key === "Enter") {isValidWord(words[column].join("")).then((isValid) => {
        if (isValid) {
          setColumn(column + 1);
          setIndex(0);
        } else {
          toast.error("Palavra inválida");
        }
      })
    }
    if (key === "Backspace") {
      onChangeWord("", "remove");
    }
    if (/^[a-zA-Z]$/.test(key)) {
      onChangeWord(key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <WordContext.Provider
      value={{
        words,
        column,
        index,
        onChangeWord,
        onChangeIndex: setIndex,
        onChangeColumn: setColumn,
      }}
    >
      {children}
    </WordContext.Provider>
  );
}
