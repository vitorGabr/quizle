"use client";

import { useWords } from "@/contexts/words";
import { Center, Flex, Stack, styled } from "styled-system/jsx";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

export function Keys() {
  const { handleKeyPress } = useWords();

  return (
    <Center w="full" flexWrap="wrap" gap="1">
      <Stack gap="1.5" alignItems="center" justifyContent="center">
        {keyboard.map((row, rowIdx) => {
          return (
            <Flex
              key={rowIdx}
              gap="1.5"
              alignItems="center"
              justifyContent="center"
            >
              {row.map((key) => (
                <Key
                  key={key}
                  type={
                    key.toLowerCase() === "backspace" ? "backspace" : "default"
                  }
                  onClick={() => handleKeyPress({ key })}
                >
                  {key}
                </Key>
              ))}
            </Flex>
          );
        })}
      </Stack>
    </Center>
  );
}

const Key = styled(Center, {
  base: {
    bgColor: "neutral.800",
    rounded: "lg",
    h: "9",
    color: "white",
    fontSize: "lg",
    textTransform: "uppercase",
    fontWeight: "semibold",
    _selected: {
      bgColor: "neutral.700",
    },
    _hover: {
      bgColor: "neutral.700",
    },
    cursor: "pointer",
  },
  variants: {
    type: {
      backspace: {
        px: "2",
      },
      default: {
        w: "9",
      },
    },
  },
  defaultVariants: {
    type: "default",
  },
});
