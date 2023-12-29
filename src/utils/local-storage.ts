import {
  type GameState,
  type WordDictionary,
  wordDictionary,
} from "@/schemas/word-schema";
import { parse, safeParse } from "valibot";

export function getLocalStorage(date: Date) {
  const value = safeParse(
    wordDictionary,
    JSON.parse(localStorage.getItem("words") ?? "{}")
  );
  if (value.success) {
    return value.output[date.toISOString().slice(0, 10)] ?? null;
  }
  return null;
}

export function setLocalStorage({
  data,
  date,
}: {
  data: GameState;
  date: Date;
}): void {
  const storage = localStorage.getItem("words");
  let value = {} as WordDictionary;
  if (storage !== null) {
    value = parse(wordDictionary, JSON.parse(storage));
  }
  value[date.toISOString().slice(0, 10)] = data;
  localStorage.setItem("words", JSON.stringify(value));
}

export function getHistory(): WordDictionary {
  const storage = localStorage.getItem("words");
  if (storage !== null) {
    return parse(wordDictionary, JSON.parse(storage));
  }
  return {};
}
