import { Box } from "@styled-system/jsx";
import { Words } from "./components/words";
import { WordProvider } from "../../contexts/word-provider";

export default function Home() {
  return (
    <Box w={"100vw"} minH={"100vh"}>
      <WordProvider>
        <Words />
      </WordProvider>
    </Box>
  );
}
