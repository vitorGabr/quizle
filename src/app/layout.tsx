import { WordsProvider } from "@/contexts/word-context";
import { supabase } from "@/lib/supabase";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
	title: "Quizle - Sua dose diária de palavras",
	description:
		"Aprenda novas palavras todos os dias com o Quizle. Amplie seu vocabulário e melhore suas habilidades linguísticas.",
};

const body = Outfit({ subsets: ["latin"] });

export default async function RootLayout({ children }: PropsWithChildren) {
	const currentDate = new Date().toISOString();

	const { data } = await supabase
		.from("words")
		.select("*")
		.eq("date", currentDate)
		.limit(1)
		.single();

	let word = data?.word ?? "teste";

	if (!data) {
		const { data: lastWord } = await supabase
			.from("words")
			.select("*")
			.order("date", { ascending: false })
			.limit(1)
			.single();
		word = lastWord?.word ?? word;
	}

	return (
		<html lang="pt-BR">
			<body className={`${body.className} dark`}>
				<WordsProvider correctWord={word}>
					{children}
					<Toaster theme="dark" />
				</WordsProvider>
				<Analytics />
			</body>
		</html>
	);
}
