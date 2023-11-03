"use client";

import { Center, Flex, Stack, styled } from "styled-system/jsx";
import { useEffect } from "react";
import { type Status, useWords } from "@/contexts/words";
import { type SystemStyleObject } from "styled-system/types";

export function Words() {
  const { words, currentPosition, changePosition, gameStatus, handleKeyPress } =
    useWords();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPosition, gameStatus]);

  return (
    <Center w="full">
      <Stack gap={"1"}>
        {words.map((row, rowIdx) => {
          return (
            <Flex gap={"1"} key={Math.random()}>
              {row.map((word, colIdx) => {
                const selected =
                  rowIdx === currentPosition.row &&
                  colIdx === currentPosition.col
                    ? "true"
                    : null;
                return (
                  <Letter
                    key={Math.random()}
                    status={word.status}
                    data-selected={selected}
                    onClick={() => changePosition({ col: colIdx })}
                  >
                    {word.letter.toUpperCase()}
                  </Letter>
                );
              })}
            </Flex>
          );
        })}
      </Stack>
    </Center>
  );
}

const Letter = styled(Center, {
  base: {
    borderWidth: "1px",
    borderColor: "neutral.700",
    bgColor: "transparent",
    rounded: "lg",
    w: "12",
    h: "12",
    color: "white",
    fontSize: "xl",
    fontWeight: "bold",
    _selected: {
      borderWidth: "2px",
      borderColor: "white",
    },
  },
  variants: {
    status: {
      correct: {
        bgColor: "green.700",
      },
      incorrect: {
        bgColor: "red.700",
      },
      unanswered: {
        bgColor: "yellow.700",
      },
    } as {
      [key in Status]: SystemStyleObject;
    },
  },
});
