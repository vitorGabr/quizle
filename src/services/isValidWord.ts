"use server";

import ky from "ky";

export async function isValidWord(word: string): Promise<boolean> {
  try {
    await ky.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return true;
  } catch (error) {
    return false;
  }
}
