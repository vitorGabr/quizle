import { Letter } from "@/types/letter";
import { css } from "@styled-system/css";
import { Center } from "@styled-system/jsx";

type Props = {
  letter: Letter;
  onClick: () => void;
};

export function Key({ letter, onClick }: Props) {
  return (
    <Center
      w={12}
      h={12}
      textAlign={"center"}
      rounded={"xl"}
      data-state={letter.status}
      cursor={"pointer"}
      onClick={onClick}
      borderColor={"neutral.500"}
      fontWeight={"semibold"}
      fontSize={"lg"}
      color={"white"}
      className={css({
        "&[data-state=invalid]": {
          bg: "red.400",
        },
        "&[data-state=valid]": {
          bg: "green.400",
        },
        "&[data-state=checking]": {
          bg: "yellow.400",
        },
        "&[data-state=unchecked]": {
          bg: "neutral.700",
        },
        "&[data-state=correct]": {
          bg: "green.400",
        },
      })}
    >
      {letter.key}
    </Center>
  );
}
