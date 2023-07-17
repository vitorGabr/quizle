import { Box } from "@styled-system/jsx";
import { Words } from "./components/words";
import { Keyboard } from "./components/keyboard";

export default function Home() {
  return (
    <Box minH={"100vh"}>
      <Words />
      <Keyboard />
    </Box>
  );
}
