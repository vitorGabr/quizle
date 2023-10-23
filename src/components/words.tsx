import { Word } from "./word";

export function Words() {
  return (
    <>
      {[1, 2, 3, 4].map((word, index) => {
        return <Word key={index} letter={""} status="correct" />;
      })}
    </>
  );
}
