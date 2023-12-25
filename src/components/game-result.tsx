import * as Dialog from "@/components/ui/dialog";
import { Word } from "@/schemas/word-schema";
import { getHistory } from "@/utils/local-storage";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Box, Flex, Grid, Stack } from "styled-system/jsx";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

export function GameResult() {
	const gameHistory = getHistory();
	const gameList = Object.values(gameHistory);
	const winGames = gameList.filter((item) => item.gameStatus === "win");
	const lastWord = gameList[gameList.length - 1];

	const data = [
		{ label: "jogos", value: gameList.length },
		{
			label: "de vitórias",
			value: `${Math.round((winGames.length / gameList.length) * 100)}%`,
		},
		{
			label: "sequência de vitórias",
			value: winGames.reduce((acc, item) => {
				if (item.gameStatus === "win") {
					return acc + 1;
				}
				return 0;
			}, 0),
		},
		{
			label: "melhor sequência",
			value: Math.max(
				...winGames.reduce(
					(acc, item) => {
						if (item.gameStatus === "win") {
							acc[acc.length - 1] += 1;
						} else {
							acc.push(0);
						}
						return acc;
					},
					[0],
				),
			),
		},
	];

	return (
		<Dialog.Root trapFocus={false} open={true} closeOnInteractOutside={false}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Stack
						colorPalette="accent"
						color="colorPalette.fg"
						alignItems="center"
						justifyContent="center"
						py="8"
						px="10"
						gap="8"
						mdDown={{
							px: "5",
							py: "6",
						}}
					>
						<Stack alignItems="center" gap="6">
							<Text fontSize="2xl" fontWeight="bold">
								progresso
							</Text>
							<Grid columns={4} gap="3">
								{data.map((item) => (
									<Stack
										key={Math.random()}
										gap="2"
										alignItems="center"
										justifyContent="flex-start"
										textAlign="center"
									>
										<Text
											fontSize={{
												base: "3xl",
												md: "4xl",
											}}
											lineHeight={"1"}
											fontWeight={"bold"}
										>
											{item.value}
										</Text>
										<Text fontSize="sm">{item.label}</Text>
									</Stack>
								))}
							</Grid>
						</Stack>

						<Stack w="full">
							<Text fontSize="md" fontWeight="semibold">
								Distribuição das tentativas
							</Text>
							{lastWord.words.map((item, index) => {
								const win = item.every((l) => l.status === "correct");
								return (
									<Flex
										key={Math.random()}
										alignItems="center"
										w="full"
										gap="3"
									>
										<Text as="span">{index + 1}</Text>
										<Flex
											bgColor={"bg.muted"}
											rounded="l2"
											h="4"
											flex="1"
											px="1"
											alignItems="center"
										>
											<Box
												h="2"
												w={win ? "full" : "3%"}
												rounded="l1"
												bgColor="letterStatus.correct"
											/>
										</Flex>
										<Text as="span">{win ? "✅" : "❌"}</Text>
									</Flex>
								);
							})}
						</Stack>

						<Flex
							alignItems="center"
							justifyContent="space-between"
							w="full"
							smDown={{ flexDirection: "column", gap: "8" }}
						>
							<TimeRemaining />
							<ShareButton words={lastWord.words} />
						</Flex>
					</Stack>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}

function TimeRemaining() {
	const now = new Date();
	const midnight = new Date().setHours(24, 0, 0, 0);

	const [hoursToNextWord, setHoursToNextWord] = useState(
		Math.floor((midnight - now.getTime()) / 1000),
	);

	const time = {
		hour: `${Math.floor(hoursToNextWord / 3600)}`.padStart(2, "0"),
		minutes: `${Math.floor((hoursToNextWord % 3600) / 60)}`.padStart(2, "0"),
		seconds: `${Math.floor((hoursToNextWord % 3600) % 60)}`.padStart(2, "0"),
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setHoursToNextWord((prev) => prev - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Stack
			gap="1"
			textAlign="center"
			alignItems="center"
			justifyContent="center"
		>
			<Text
				fontSize={{
					base: "sm",
					md: "md",
				}}
				fontWeight="medium"
			>
				próxima palavra em
			</Text>
			<Text
				fontSize={{
					base: "3xl",
					md: "4xl",
				}}
				fontWeight={"bold"}
				lineHeight={"1"}
			>
				{time.hour} : {time.minutes} : {time.seconds}
			</Text>
		</Stack>
	);
}

function ShareButton({ words }: { words: Word[][] }) {
	const lastWordIndex = words.findLastIndex((item) =>
		item.some(({ letter }) => !!letter.length),
	);
	const wordsNowEmpty = [...words].splice(0, lastWordIndex + 1);

	const onShare = () => {
		const status = `${wordsNowEmpty.length}/6 🔥 ${wordsNowEmpty
			.map((item) => {
				return item
					.map((l) => {
						if (l.status === "correct") return "🟩";
						if (l.status === "unanswered") return "🟨";
						return "⬛";
					})
					.join("");
			})
			.join(" ")}`;

		navigator.clipboard.writeText(`joguei quizle ${status}`);
		toast.success("Texto copiado para área de transferência");
	};

	return (
		<Button size="xl" onClick={onShare}>
			<Flex gap="2" alignItems="center">
				<Share2 size={18} />
				Compartilhar
			</Flex>
		</Button>
	);
}
