import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: "Quizle",
	description: "Sua dose diária de palavras",
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
				<Providers correctedWord={word}>{children}</Providers>
			</body>
		</html>
	);
}
