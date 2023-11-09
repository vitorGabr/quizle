import type { GameState, LetterStatus, Word } from "@/schemas/word-schema";
import { getLocalStorage } from "./local-storage";

export function validateWord(
  currentWordRow: string[],
  correctWord: string
): {
  word: Word[];
  win: boolean;
} {
  const correctWordLetters = correctWord.split("");
  const wordValidation: Word[] = [];

  if (currentWordRow.join("") === correctWord) {
    return {
      word: currentWordRow.map((letter) => ({
        letter,
        status: "correct",
      })),
      win: true,
    };
  }

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

    let letterStatus: LetterStatus = "incorrect";

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

  return {
    word: wordValidation,
    win: false,
  };
}

export function initGameState(wordLenght: number): GameState {
  const storage = getLocalStorage(new Date());
  return {
    gameStatus: storage?.gameStatus || "playing",
    letters: storage?.letters || [],
    currentPosition: storage?.currentPosition || { row: 0, col: 0 },
    words:
      storage?.words ||
      Array.from(
        { length: 6 },
        () =>
          Array.from({ length: wordLenght }, () => ({
            letter: "",
            status: "disabled",
          })) as Word[]
      ),
  };
}
