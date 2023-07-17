import { styled } from "@styled-system/jsx";
import { Content } from "./content";

export function Navbar() {
  return (
    <styled.nav py={5}>
      <Content>
        <styled.h1 color={"white"} fontSize={"2xl"}>
          Desafio
        </styled.h1>
      </Content>
    </styled.nav>
  );
}
