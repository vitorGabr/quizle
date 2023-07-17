import { Container } from "@styled-system/jsx";
import { ComponentProps } from "react";

type Props = {
  children: React.ReactNode;
} & ComponentProps<typeof Container>;

export function Content({ children, ...rest }: Props) {
  return (
    <Container maxW={"6xl"} {...rest}>
      {children}
    </Container>
  );
}
