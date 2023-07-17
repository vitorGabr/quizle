"use client";

import { isValidWord } from "@/services/isValidWord";
import { Letter } from "@/types/letter";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { P, match } from "ts-pattern";

type Matriz = {
  column: number;
  row: number;
};

type Props = {
  words: Letter[][];
  matriz: Partial<Matriz>;
  onChangeWord: (word: string) => void;
  onChangeMatriz: (matriz: Partial<Matriz>) => void;
};

export const WordsContext = createContext({} as Props);
export const useWords = () => useContext(WordsContext);

export function WordsProvider({
  correctWord,
  children,
}: {
  correctWord: string;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<"win" | "lose" | "playing">("playing");
  const [words, setWords] = useState<Letter[][]>([[]]);
  const [matriz, setMatriz] = useState<Matriz>({
    column: 0,
    row: 0,
  });

  const onChangeLetter = (word: string, action: "add" | "remove" = "add") => {
    const { column, row } = matriz;
    const newWords = [...words];
    const _row = match([action, row])
      .with(["remove", P.lt(2)], () => row)
      .otherwise(() => row);

    if (!newWords[column]) {
      newWords[column] = [];
    }
    newWords[column][_row] = {
      key: word,
      status: "unchecked",
    };

    setWords(newWords);
    onChangeMatriz({
      row: match([action, row])
        .with(["add", P.lt(3)], () => row + 1)
        .with(["remove", P.gt(0)], () => row - 1)
        .otherwise(() => row),
    });
  };

  const onValidateLetter = () => {
    const { column, row } = matriz;
    const _words = [...words];
    const rowWords = _words[row];
    _words[column] = rowWords.map((i, index) => ({
      ...i,
      status: match<string, Letter["status"]>(i.key)
        .with(correctWord[index], () => "valid")
        .with(
          P.when((l) => l !== correctWord[index] && !correctWord.includes(l)),
          () => "invalid"
        )
        .otherwise(() => "checking"),
    }));
    setWords(_words);
    return _words.every((i) => i.every((j) => j.status === "valid"));
  };

  const handleKeyDown = async (event: KeyboardEvent | string) => {
    if (status !== "playing") return;

    const { column, row } = matriz;
    const key = typeof event === "string" ? event : event.key;

    if (key === "Enter") {
      const word = words[column].map((i) => i.key).join("");
      const isValid = await isValidWord(word);
      if (isValid) {
        setMatriz({
          column: column + 1,
          row: 0,
        });
        const result = onValidateLetter();
        setStatus(result ? "win" : column === 4 ? "lose" : "playing");
      } else {
        toast.error("Palavra inválida");
      }
    }
    if (key === "ArrowRight" || key === "ArrowLeft") {
      const idx = (key === "ArrowRight" ? 1 : -1) + row;
      onChangeMatriz({
        row: match(idx)
          .with(P.lt(0), () => 0)
          .with(P.gt(3), () => 3)
          .otherwise(() => idx),
      });
    }
    if (key === "Backspace") {
      onChangeLetter("", "remove");
    }
    if (/^[a-zA-Z]$/.test(key)) {
      onChangeLetter(key);
    }
  };

  const onChangeMatriz = (matriz: Partial<Matriz>) => {
    setMatriz({
      column: matriz.column ?? 0,
      row: matriz.row ?? 0,
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, status]);

  return (
    <WordsContext.Provider
      value={{
        words,
        matriz: matriz,
        onChangeWord: handleKeyDown,
        onChangeMatriz: onChangeMatriz,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}
