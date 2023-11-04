"use client";

import { type Status, type Word, useWords } from "@/contexts/words";
import { type SystemStyleObject } from "@pandacss/dev";
import { useMemo } from "react";
import { Center, Flex, Stack, styled } from "styled-system/jsx";
import { match } from "ts-pattern";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "Backspace"],
  ["z", "x", "c", "v", "b", "n", "m", "Enter"],
];

function sortAndRemoveDuplicates(words: Word[][]) {
  const flatWords = words.flat().sort((a, b) => {
    const statusOrder = {
      correct: 1,
      incorrect: 2,
      unanswered: 3,
    } as { [key in Status]: number };

    const statusA = a.status ?? "unanswered";
    const statusB = b.status ?? "unanswered";

    if (statusOrder[statusA] < statusOrder[statusB]) {
      return -1;
    }
    if (statusOrder[statusA] > statusOrder[statusB]) {
      return 1;
    }

    return a.letter.localeCompare(b.letter);
  });
  const uniqueLettersSet = new Set();

  return flatWords.filter((word) => {
    if (uniqueLettersSet.has(word.letter)) {
      return false;
    }
    uniqueLettersSet.add(word.letter);
    return true;
  });
}

export function Keys() {
  const { handleKeyPress, words } = useWords();

  const sortedWords = useMemo(() => sortAndRemoveDuplicates(words), [words]);

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
                const status = sortedWords.find(
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

const Key = styled(Center, {
  base: {
    bgColor: "neutral.700",
    rounded: "lg",
    h: "10",
    color: "white",
    fontSize: "md",
    textTransform: "uppercase",
    fontWeight: "bold",
    _selected: {
      bgColor: "neutral.700",
    },
    _hover: {
      bgColor: "neutral.700",
    },
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    type: {
      other: {
        px: "2",
        minW: {
          base: "auto",
          md: "10",
        },
      },
      default: {
        w: {
          base: "full",
          md: "10",
        },
      },
    },
    status: {
      correct: {
        bgColor: "letterStatus.correct",
        color: "neutral.700",
        _hover: {
          bgColor: "letterStatus.correct",
        },
      },
      incorrect: {
        bgColor: "letterStatus.incorrect",
      },
      unanswered: {
        bgColor: "letterStatus.unanswered",
        color: "neutral.700",
        _hover: {
          bgColor: "letterStatus.unanswered",
        },
      },
    } as {
      [key in Status]: SystemStyleObject;
    },
  },
  defaultVariants: {
    type: "default",
  },
});
