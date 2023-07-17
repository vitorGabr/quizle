import { Letter } from "@/types/letter";
import { css } from "@styled-system/css";
import { Center } from "@styled-system/jsx";

type Props = {
  letter: Letter;
  selected?: boolean;
  onClick: () => void;
};

export function Letter({ letter, selected, onClick }: Props) {
  return (
    <Center
      w={14}
      h={14}
      textAlign={"center"}
      rounded={"xl"}
      data-state={letter.status}
      data-selected={selected}
      cursor={"pointer"}
      onClick={onClick}
      borderWidth={selected ? 2 : 0}
      borderColor={"neutral.500"}
      fontWeight={"semibold"}
      fontSize={"xl"}
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
