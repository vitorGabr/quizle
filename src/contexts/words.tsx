"use client";

import { createContext, useContext, useState } from "react";

export type Status = "correct" | "incorrect" | "unanswered";

export type Word = {
  letter: string;
  status?: Status;
};

type Props = {
  words: Word[][];
  currentPosition: {
    row: number;
    col: number;
  };
  gameStatus: "win" | "lose" | "playing";
  changePosition: (position: { col: number }) => void;
  handleKeyPress: (event: KeyboardEvent | { key: string }) => void;
};

export const WordsContext = createContext({} as Props);

export function WordsProvider({
  children,
  correctWord,
}: {
  children: React.ReactNode;
  correctWord: string;
}) {
  const [gameStatus, setGameStatus] = useState<Props["gameStatus"]>("playing");
  const [currentPosition, setCurrentPosition] = useState<
    Props["currentPosition"]
  >({
    row: 0,
    col: 0,
  });

  const [words, setWords] = useState<Word[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: "" }))
    )
  );

  function handleKeyPress(event: KeyboardEvent | { key: string }) {
    let newWords = [...words];
    if (gameStatus !== "playing") return;
    if (
      event.key === "Enter" &&
      newWords[currentPosition.row].filter((l) => l.letter.length > 0)
        .length === 5
    ) {
      const validWord = validateWord();
      newWords[currentPosition.row] = validWord;
      setWords(newWords);
      if (validWord.filter((l) => l.status === "correct").length === 5) {
        setGameStatus("win");
        return;
      }
      if (currentPosition.row < 5) {
        setCurrentPosition((prev) => ({ col: 0, row: prev.row + 1 }));
      }
      return;
    }

    if (event.key === "ArrowRight" && currentPosition.col < 4) {
      setCurrentPosition((prev) => ({ ...prev, col: prev.col + 1 }));
    }
    if (event.key === "ArrowLeft" && currentPosition.col > 0) {
      setCurrentPosition((prev) => ({ ...prev, col: prev.col - 1 }));
    }
    if (event.key === "Backspace") {
      newWords[currentPosition.row][currentPosition.col] = {
        letter: "",
      };
      if (currentPosition.col > 0) {
        setCurrentPosition((prev) => ({ ...prev, col: prev.col - 1 }));
      }
    }

    if (/^[a-zA-Z]$/.test(event.key)) {
      newWords[currentPosition.row][currentPosition.col] = {
        letter: event.key,
      };
      if (currentPosition.col < 4) {
        setCurrentPosition((prev) => ({ ...prev, col: prev.col + 1 }));
      }
    }
    setWords(newWords);
  }

  function validateWord() {
    const currentWordRow = words[currentPosition.row].map(
      (word) => word.letter
    );
    const correctWordLetters = correctWord.split("");
    const wordValidation: Word[] = [];

    currentWordRow.forEach((letter, index) => {
      const correctPositionCount = currentWordRow.filter(
        (l, i) => l === letter && l === correctWordLetters[i]
      ).length;

      const letterRepetitions = correctWordLetters.filter(
        (l) => l === letter
      ).length;
      const typedLetterCount = wordValidation.filter(
        (l) => l.letter === letter
      ).length;

      let letterStatus: Status = "incorrect";

      if (
        typedLetterCount < letterRepetitions &&
        letter !== correctWord[index] &&
        correctPositionCount < letterRepetitions
      ) {
        letterStatus = "unanswered";
      }
      if (letter === correctWord[index]) {
        letterStatus = "correct";
      }
      wordValidation.push({
        letter,
        status: letterStatus,
      });
    });
    return wordValidation;
  }

  function changePosition(col: number) {
    setCurrentPosition((prev) => ({ ...prev, col }));
  }

  return (
    <WordsContext.Provider
      value={{
        words,
        gameStatus,
        currentPosition,
        changePosition: (position) => changePosition(position.col),
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
