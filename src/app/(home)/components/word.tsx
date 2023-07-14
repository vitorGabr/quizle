import { Word } from "@/types/word";
import { css } from "@styled-system/css";
import { Center } from "@styled-system/jsx";

type Props = {
  word: Word;
  selected?: boolean;
  onClick: () => void;
};

export function Word({ word,selected, onClick }: Props) {
  return (
    <Center
      w={12}
      h={12}
      textAlign={"center"}
      rounded={"xl"}
      data-state={word.status}
      data-selected={selected}
      cursor={"pointer"}  
      onClick={onClick}
      borderWidth={selected ? 2 : 0}
      className={css({
        "&[data-state=unchecked]": {
          bg: "gray.200",
        },
        "&[data-state=correct]": {
          bg: "green.200",
        },
      })}
    >
      {word.letter}
    </Center>
  );
}
