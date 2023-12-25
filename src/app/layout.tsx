import { WordsProvider } from "@/contexts/word-context";
import { createServerClient } from "@supabase/ssr";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

const supabase = createServerClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
	{
		cookies: {},
	},
);

export default async function RootLayout({ children }: PropsWithChildren) {
	const currentDate = new Date().toISOString();
	const { data } = await supabase
		.from("words")
		.select("word")
		.gte("date", currentDate)
		.limit(1)
		.single();
	const word = (data?.word ?? "teste").toLowerCase();

	return (
		<html lang="pt-BR">
			<body className={`${body.className} dark`}>
				<WordsProvider correctWord={word}>
					{children}
					<Toaster theme="dark" />
				</WordsProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
