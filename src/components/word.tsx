import { Word } from "@/contexts/words-context";
import { Box } from "styled-system/jsx";

export function Word({
  letter,
  status,
}: {
  letter: string;
  status: "correct" | "incorrect" | "unanswered";
}) {
  return (
    <Box
      borderWidth="1px"
      borderColor={"neutral.800"}
      bgColor={"neutral.950"}
      rounded="lg"
      w="12"
      h="12"
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
    </Box>
  );
}
