import { Navbar } from "@/components/navbar";
import { Keys } from "@/components/keys";
import { Words } from "@/components/words";
import { Stack } from "styled-system/jsx";

export default function Home() {
  return (
    <Stack
      w="100%"
      h="100dvh"
      py="2"
      justifyContent={["center"]}
      alignItems={["center"]}
      gap={"10"}
      bgColor={"#2c2c2c"}
    >
      <Navbar />
      <Words />
      <Keys />
    </Stack>
  );
}
