"use client";

import { Box, HStack, VStack } from "@styled-system/jsx";
import { Word } from "./word";
import { useWord } from "@/contexts/word-provider";

export function Words() {
  const { words,column,index } = useWord();
  return (
    <Box mx={"auto"}>
      <VStack gap={2} justifyContent={"center"} alignItems={"center"}>
        {[...Array(5)].map((_, i) => {
          return (  <HStack gap={2} key={i}>
              {[...Array(4)].map((_, j) => (
                <Word
                  key={j}
                  selected={column === i && index === j}
                  word={words[i]?.[j] || { letter: "", status: "unchecked" }}
                  onClick={() => {}}
                />
              ))}
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
}
