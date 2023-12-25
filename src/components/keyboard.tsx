"use client";

import { useWords } from "@/contexts/word-context";
import { Center, Flex, Stack } from "styled-system/jsx";
import { Key } from "./ui/key";

const keyboard = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", "Backspace"],
	["z", "x", "c", "v", "b", "n", "m", "Enter"],
];

export function Keyboard() {
	const { handleKeyPress, state } = useWords();
	const { letters } = state;

	return (
		<Center
			w="full"
			flexWrap="wrap"
			gap="1"
			smDown={{
				px: "2",
			}}
		>
			<Stack gap="1.5" w="full" alignItems="center" justifyContent="center">
				{keyboard.map((row) => {
					return (
						<Flex
							w="full"
							key={Math.random()}
							gap="1.5"
							alignItems="center"
							justifyContent="center"
						>
							{row.map((key) => {
								const k = key.toLowerCase();
								const status = letters.find(
									(word) => word.letter === k,
								)?.status;

								return (
									<Key
										key={key}
										status={status}
										type={
											["backspace", "enter"].includes(k) ? "other" : "default"
										}
										onClick={() => handleKeyPress({ key })}
									>
										{k === "backspace" && "⌫"}
										{k === "enter" && "Enter"}
										{k !== "backspace" && k !== "enter" && key.toUpperCase()}
									</Key>
								);
							})}
						</Flex>
					);
				})}
			</Stack>
		</Center>
	);
}
