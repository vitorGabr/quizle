"use client";

import { validateWord } from "@/utils/game-utils";
import React, { createContext, useContext, useEffect, useReducer } from "react";

export type LetterStatus = "correct" | "incorrect" | "unanswered" | "disabled";
export type GameStatus = "win" | "lose" | "playing";

export type Word = {
  letter: string;
  status: LetterStatus;
};

type GameState = {
  gameStatus: GameStatus;
  letters: Word[];
  currentPosition: { row: number; col: number };
  words: Word[][];
};

type Action =
  | { type: "SET_GAME_STATUS"; payload: GameStatus }
  | { type: "SET_LETTERS"; payload: Word[] }
  | { type: "SET_CURRENT_POSITION"; payload: GameState["currentPosition"] }
  | { type: "SET_WORDS"; payload: Word[][] };

const initialGameState: GameState = {
  gameStatus: "playing",
  letters: [],
  currentPosition: { row: 0, col: 0 },
  words: [],
};

const WordsContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
  handleKeyPress: (event: KeyboardEvent | { key: string }) => void;
}>({
  state: initialGameState,
  dispatch: () => null,
  handleKeyPress: () => null,
});

function wordsReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_GAME_STATUS":
      return { ...state, gameStatus: action.payload };
    case "SET_LETTERS":
      return { ...state, letters: action.payload };
    case "SET_CURRENT_POSITION":
      return { ...state, currentPosition: action.payload };
    case "SET_WORDS":
      return { ...state, words: action.payload };
    default:
      return state;
  }
}

const statusOrder: LetterStatus[] = [
  "disabled",
  "incorrect",
  "unanswered",
  "correct",
];

export function WordsProvider({
  children,
  correctWord,
}: {
  children: React.ReactNode;
  correctWord: string;
}) {
  const maxWordLength = correctWord.length;

  const [state, dispatch] = useReducer(wordsReducer, {
    ...initialGameState,
    words: Array.from(
      { length: 6 },
      () =>
        Array.from({ length: maxWordLength }, () => ({
          letter: "",
          status: "disabled",
        })) as Word[]
    ),
  });

  const handleKeyPress = (event: KeyboardEvent | { key: string }) => {
    const { currentPosition, letters } = state;

    let newWords = [...state.words];
    let gameStatus = state.gameStatus;

    if (gameStatus !== "playing") return;

    if (event.key === "Backspace") {
      newWords[currentPosition.row][currentPosition.col] = {
        letter: "",
        status: "disabled",
      };
      changePosition("prev-col");
    }

    if (event.key === "Enter") {
      const wordValidation = validateWord(
        newWords[currentPosition.row].map((l) => l.letter),
        correctWord
      );
      let newLetters = [...letters] as Word[];

      wordValidation.word.forEach((l) => {
        const existingLetterIndex = newLetters.findIndex(
          (lt) => lt.letter === l.letter
        );
        if (existingLetterIndex === -1) {
          newLetters.push(l);
          return;
        }

        const existingLetter = newLetters[existingLetterIndex];
        if (
          existingLetter &&
          statusOrder.indexOf(l.status) >
            statusOrder.indexOf(existingLetter.status)
        ) {
          newLetters[existingLetterIndex] = l;
        }
      });

      newWords[currentPosition.row] = wordValidation.word;
      gameStatus = wordValidation.win ? "win" : "playing";

      if (state.currentPosition.row === 5 && gameStatus === "playing") {
        gameStatus = "lose";
      }
      dispatch({
        type: "SET_LETTERS",
        payload: newLetters,
      });
      changePosition("next-row");
    }

    if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
      changePosition(event.key === "ArrowLeft" ? "prev-col" : "next-col");
    }

    if (/^[a-zA-Z]$/.test(event.key)) {
      newWords[currentPosition.row][currentPosition.col] = {
        letter: event.key,
        status: "disabled",
      };
      changePosition("next-col");
    }

    dispatch({
      type: "SET_WORDS",
      payload: newWords,
    });
    dispatch({
      type: "SET_GAME_STATUS",
      payload: gameStatus,
    });
  };

  function changePosition(type: "next-col" | "prev-col" | "next-row") {
    switch (type) {
      case "next-col":
        if (state.currentPosition.col < maxWordLength - 1) {
          dispatch({
            type: "SET_CURRENT_POSITION",
            payload: {
              ...state.currentPosition,
              col: state.currentPosition.col + 1,
            },
          });
        }
        break;
      case "prev-col":
        if (state.currentPosition.col > 0) {
          dispatch({
            type: "SET_CURRENT_POSITION",
            payload: {
              ...state.currentPosition,
              col: state.currentPosition.col - 1,
            },
          });
        }
        break;
      case "next-row":
        if (state.currentPosition.row < 5) {
          dispatch({
            type: "SET_CURRENT_POSITION",
            payload: { col: 0, row: state.currentPosition.row + 1 },
          });
        }
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [state, dispatch]);

  return (
    <WordsContext.Provider value={{ state, dispatch, handleKeyPress }}>
      {children}
    </WordsContext.Provider>
  );
}

export const useWords = () => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error("useWords must be used within a WordsProvider");
  }
  return context;
};
