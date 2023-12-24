"use client";

import { WordsProvider } from "@/contexts/word-context";
import { Toaster } from "sonner";

export function Providers({
	children,
	correctedWord,
}: {
	children: React.ReactNode;
	correctedWord: string;
}) {
	return (
		<WordsProvider correctWord={correctedWord}>
			{children}
			<Toaster theme="dark" />
		</WordsProvider>
	);
}
