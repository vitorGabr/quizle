import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Providers } from "./providers";

export const revalidate = false;
export const metadata: Metadata = {
  title: "Quizle",
  description: "Sua dose diária de palavras",
};

const body = Outfit({ subsets: ["latin"], variable: "--font-body" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let word = await prisma.word.findUnique({
  //   where: {
  //     date: dayjs().startOf("day").toISOString(),
  //   },
  // });

  // if (!word) {
  //   word = await prisma.word.findFirstOrThrow({
  //     orderBy: {
  //       date: "desc",
  //     },
  //     take: 1,
  //   });
  // }

  return (
    <html lang="pt-BR">
      <body className={`${body.variable}`}>
        <Providers correctedWord={"teste"}>{children}</Providers>
      </body>
    </html>
  );
}
