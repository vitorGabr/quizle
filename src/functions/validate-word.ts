import { Word, Status } from "@/contexts/words-context";

export function validateWord(word: string, correctWord: string) {
  const splitedWord = word.split("");
  const correctWordSplited = correctWord.split("");
  let validWord: Word = [];

  splitedWord.forEach((letter, index) => {
    const typedCorrectWords = validWord.filter(
      (_word) => _word.letter === letter
    ).length;
    const howManyRepet = correctWordSplited.filter((l) => l === letter).length;

    let status = "incorrect" as Status;

    if (typedCorrectWords < howManyRepet && letter !== correctWord[index]) {
      status = "unanswered";
    }
    if (letter === correctWord[index]) {
      status = "correct";
    }

    validWord.push({
      letter,
      status,
    });
  });

  return validWord;
}
