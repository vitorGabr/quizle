"use client";

import { useWords } from "@/contexts/words-provider";
import { HStack, VStack } from "@styled-system/jsx";
import { Key } from "./key";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function Keyboard() {
  const { words, onChangeWord } = useWords();
  return (
    <VStack gap={2} mt={3}>
      {keys.map((row, i) => (
        <HStack key={i} gap={2}>
          {row.map((key, j) => (
            <Key
              key={j}
              letter={{
                key,
                status: words[i]?.[j]?.status || "unchecked",
              }}
              onClick={() => {
                onChangeWord(key);
              }}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
