import { Navbar } from "@/components/layout/navbar";
import { WordsProvider } from "@/contexts/word-context";
import { supabase } from "@/lib/supabase";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { stack } from "styled-system/patterns";
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
		.select("word")
		.lte("date", currentDate)
		.order("date", { ascending: false })
		.limit(1)
		.single();
	const word = (data?.word ?? "teste").toLowerCase();

	return (
		<html lang="pt-BR">
			<body className={`${body.className} dark`}>
				<WordsProvider correctWord={word}>
					<main
						className={stack({
							w: "100%",
							h: "100dvh",
							bgColor: "bg.surface",
							justifyContent: "center",
							alignItems: "center",
							gap: "10",
							py: "2",
						})}
					>
						<Navbar />
						{children}
					</main>
					<Toaster theme="dark" />
				</WordsProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
