"use client";

import { Center, Flex, Stack, styled } from "styled-system/jsx";
import { type SystemStyleObject } from "styled-system/types";
import { useWords, LetterStatus } from "@/contexts/word-context";

export function Words() {
  const { state, dispatch } = useWords();
  const { words, currentPosition } = state;

  return (
    <Center w="full" flex="1">
      <Stack gap={"1.5"}>
        {words.map((row, rowIdx) => {
          return (
            <Flex gap={"1.5"} key={Math.random()}>
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
                    onClick={() => {
                      dispatch({
                        type: "SET_CURRENT_POSITION",
                        payload: { row: currentPosition.row, col: colIdx },
                      });
                    }}
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
    borderWidth: "2px",
    borderColor: "neutral.700",
    bgColor: "transparent",
    rounded: "xl",
    w: "12",
    h: "12",
    color: "white",
    fontSize: "xl",
    fontWeight: "bold",
    _selected: {
      borderWidth: "2px",
      borderColor: "neutral.200",
    },
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    status: {
      correct: {
        borderColor: "letterStatus.correct",
        _selected: {
          borderColor: "letterStatus.correct",
        },
      },
      incorrect: {
        bgColor: "letterStatus.incorrect",
        borderColor: "letterStatus.incorrect",
        _selected: {
          borderColor: "letterStatus.incorrect",
        },
      },
      unanswered: {
        borderColor: "letterStatus.unanswered",
        borderStyle: "dashed",
        _selected: {
          borderColor: "letterStatus.unanswered",
        },
      },
    } as {
      [key in LetterStatus]: SystemStyleObject;
    },
  },
});
