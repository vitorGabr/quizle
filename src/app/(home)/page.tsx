import { Words } from "@/components/words";
import { Box, Stack, styled } from "styled-system/jsx";

export default function Home() {
  return (
    <Stack w="100%" h="100dvh" pt={["4", "8"]}>
      <styled.h1 fontSize="4xl" fontWeight="bold" textAlign="center">
        QUIZLE
      </styled.h1>
      <Words />
    </Stack>
  );
}
