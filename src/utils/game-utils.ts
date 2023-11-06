import { LetterStatus, Word } from "@/contexts/word-context";

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
