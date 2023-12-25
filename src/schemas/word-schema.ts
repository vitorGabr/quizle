import {
  type Input,
  array,
  number,
  object,
  picklist,
  record,
  string,
} from "valibot";

export const wordStatus = picklist([
  "correct",
  "incorrect",
  "unanswered",
  "disabled",
]);

export const gameStatus = picklist(["win", "lose", "playing"]);

export const word = object({
  letter: string(),
  status: wordStatus,
});

export const gameState = object({
  words: array(array(word)),
  currentPosition: object({
    row: number(),
    col: number(),
  }),
  letters: array(word),
  gameStatus,
});

export const wordDictionary = record(string(), gameState);

export type LetterStatus = Input<typeof wordStatus>;
export type GameStatus = Input<typeof gameStatus>;
export type Word = Input<typeof word>;
export type GameState = Input<typeof gameState>;
export type WordDictionary = Input<typeof wordDictionary>;
