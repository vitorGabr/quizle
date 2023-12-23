import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const revalidate = false;
export const metadata: Metadata = {
	title: "Quizle",
	description: "Sua dose diária de palavras",
};

const body = Outfit({ subsets: ["latin"] });

export default async function RootLayout({ children }: PropsWithChildren) {
	// const { data } = await supabase
	//   .from('words')
	//   .select('*')
	//   .eq('date', new Date().toISOString())
	//   .single();

	const word = "teste"; //data?.word || 'teste';

	return (
		<html lang="pt-BR">
			<body className={`${body.className} dark`}>
				<Providers correctedWord={word}>{children}</Providers>
			</body>
		</html>
	);
}
