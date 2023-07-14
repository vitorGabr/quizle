'use server'

import ky from "ky";
import { match } from "ts-pattern";

export async function isValidWord(word: string): Promise<boolean> {
  try {
    await ky.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return true;
  } catch (error) {
    return false;
  }
  // const response = await ky.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).json();
  // return  match(response)
  // .with({ title: "No Definitions Found" }, () => false)
  // .otherwise(() => true);
}