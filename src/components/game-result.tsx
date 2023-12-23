import * as Dialog from "@/components/ui/dialog";
import { useWords } from "@/contexts/word-context";
import { Flex, Stack, styled } from "styled-system/jsx";

type Props = {
	open: boolean;
};

export function GameResult({ open }: Props) {
	const { state } = useWords();
	// const gameHistory = getHistory();
	//const gameList = Object.values(gameHistory);

	// const totalWins = gameList.filter((item) => item.gameStatus === 'win').length;
	// const totalLoses = gameList.filter(
	//   (item) => item.gameStatus === 'lose'
	// ).length;

	return (
		<Dialog.Root trapFocus={false} open={open} closeOnInteractOutside={false}>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Stack
						colorPalette={"accent"}
						gap="8"
						p="6"
						textAlign="center"
						color="colorPalette.fg"
					>
						<styled.h1 fontSize="xl" fontWeight="bold">
							{state.gameStatus === "win"
								? "Parabéns, você ganhou!"
								: "Você perdeu!"}
						</styled.h1>
						<Flex>
							{[...Array(5)].map((_, i) => (
								<Stack key={Math.random()}>
									<styled.h2 fontSize="lg" fontWeight="bold">
										{i + 1}º ano
									</styled.h2>
									<Stack gap="2">
										<styled.p>
											<strong>Palavras:</strong> 0/10
										</styled.p>
										<styled.p>
											<strong>Letras:</strong> 0/10
										</styled.p>
									</Stack>
								</Stack>
							))}
						</Flex>
					</Stack>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
