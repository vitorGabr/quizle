import { WordsProvider } from "@/contexts/words-provider";
import { getWord } from "@/services/getWord";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getWord();
  if (!result) return notFound();
  return <WordsProvider correctWord={result.word}>{children}</WordsProvider>;
}
