"use client";

import { Center, Flex, Stack } from "styled-system/jsx";
import { Word } from "./word";
import { useWords } from "@/contexts/words-context";

const rows = 6;
const columns = 5;
const matrix = Array.from({ length: rows }, () => Array(columns).fill(""));

export function Words() {
  const { words } = useWords();

  return (
    <Center w="full">
      <Stack gap={"1"}>
        {matrix.map((row, colun) => {
          return (
            <Flex gap={"1"} key={Math.random()}>
              {row.map((_, colunR) => {
                const word = words[colun] && words[colun][colunR];
                return <Word key={Math.random()} {...word} />;
              })}
            </Flex>
          );
        })}
      </Stack>
    </Center>
  );
}
