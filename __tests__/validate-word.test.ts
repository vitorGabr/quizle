import { Status } from "../src/contexts/words-context";
import { validateWord } from "../src/functions/validate-word";
import { describe, expect, it } from "vitest";

describe("Validate Word", () => {
  it("validates word 'test' with 'tesg' input", () => {
    const result = validateWord("test", "tesg").map(({ status }) => status);
    expect(result).toEqual<Status[]>([
      "correct",
      "correct",
      "correct",
      "incorrect",
    ]);
  });
  it("validates word 'test' with 'ttte' input", () => {
    const result = validateWord("test", "ttte").map(({ status }) => status);
    expect(result).toEqual<Status[]>([
      "correct",
      "unanswered",
      "incorrect",
      "unanswered",
    ]);
  });
});
