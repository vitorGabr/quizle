"use client";

import { Box, HStack, VStack } from "@styled-system/jsx";
import { useWords } from "@/contexts/words-provider";
import { Letter } from "./letter";

export function Words() {
  const { words, matriz, onChangeMatriz } = useWords();
  return (
    <Box mx={"auto"}>
      <VStack gap={2} justifyContent={"center"} alignItems={"center"}>
        {[...Array(5)].map((_, i) => {
          return (
            <HStack gap={2} key={i}>
              {[...Array(4)].map((_, j) => (
                <Letter
                  key={j}
                  selected={matriz.column === i && matriz.row === j}
                  letter={words[i]?.[j] || { key: "", status: "unchecked" }}
                  onClick={() =>
                    onChangeMatriz({
                      row: j,
                    })
                  }
                />
              ))}
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
}
