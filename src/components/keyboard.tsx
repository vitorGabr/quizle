"use client";

import { useWords } from "@/contexts/word-context";
import { Center, Flex, Stack, styled } from "styled-system/jsx";
import { match } from "ts-pattern";
import { Key } from "./ui/key";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "Backspace"],
  ["z", "x", "c", "v", "b", "n", "m", "Enter"],
];

export function Keyboard() {
  const { handleKeyPress, state } = useWords();

  const { letters } = state;

  return (
    <Center
      w="full"
      flexWrap="wrap"
      gap="1"
      smDown={{
        px: "2",
      }}
    >
      <Stack gap="1.5" w="full" alignItems="center" justifyContent="center">
        {keyboard.map((row, rowIdx) => {
          return (
            <Flex
              w="full"
              key={rowIdx}
              gap="1.5"
              alignItems="center"
              justifyContent="center"
            >
              {row.map((key) => {
                const k = key.toLowerCase();
                const status = letters.find(
                  (word) => word.letter === k
                )?.status;

                return (
                  <Key
                    key={key}
                    status={status}
                    type={
                      ["backspace", "enter"].includes(k) ? "other" : "default"
                    }
                    onClick={() => handleKeyPress({ key })}
                  >
                    {match(k)
                      .with("backspace", () => "⌫")
                      .with("enter", () => "Enter")
                      .otherwise(() => key.toUpperCase())}
                  </Key>
                );
              })}
            </Flex>
          );
        })}
      </Stack>
    </Center>
  );
}
