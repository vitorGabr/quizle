import { z } from "zod";

export const wordStatus = z.enum([
  "correct",
  "incorrect",
  "unanswered",
  "disabled",
]);

export const gameStatus = z.enum(["win", "lose", "playing"]);

export const word = z.object({
  letter: z.string(),
  status: wordStatus,
});

export const gameState = z.object({
  words: z.array(z.array(word)),
  currentPosition: z.object({
    row: z.number(),
    col: z.number(),
  }),
  letters: z.array(word),
  gameStatus,
});

export const wordDictionary = z.record(z.string(), gameState);

export type LetterStatus = z.infer<typeof wordStatus>;
export type GameStatus = z.infer<typeof gameStatus>;
export type Word = z.infer<typeof word>;
export type GameState = z.infer<typeof gameState>;
export type WordDictionary = z.infer<typeof wordDictionary>;
