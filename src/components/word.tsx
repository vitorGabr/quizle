import { Word } from "@/contexts/words-context";
import { styled } from "styled-system/jsx";

export function Word({
  letter,
  status,
}: {
  letter: string;
  status: "correct" | "incorrect" | "unanswered";
}) {
  return (
    <styled.p
      color={
        status === "correct"
          ? "green.500"
          : status === "incorrect"
          ? "red.500"
          : "black"
      }
      fontSize="xl"
      fontWeight="bold"
    >
      {letter}
    </styled.p>
  );
}
