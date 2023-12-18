import { Portal } from '@ark-ui/react';
import { Flex, Stack, styled } from 'styled-system/jsx';
import { getHistory } from '@/utils/local-storage';
import { useWords } from '@/contexts/word-context';
import * as Dialog from '@/components/ui/dialog'
import type { DialogProps } from '@/components/ui/dialog';

export function GameResult(props: DialogProps) {
  const { state } = useWords();
  const gameHistory = getHistory();
  //const gameList = Object.values(gameHistory);

  // const totalWins = gameList.filter((item) => item.gameStatus === 'win').length;
  // const totalLoses = gameList.filter(
  //   (item) => item.gameStatus === 'lose'
  // ).length;

  return <Dialog.Root {...props}>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Stack gap="8" p="6" textAlign="center">
          <styled.h1 fontSize="xl" fontWeight="bold">
            {state.gameStatus === 'win'
              ? 'Parabéns, você ganhou!'
              : 'Você perdeu!'}
          </styled.h1>
          <Flex>
            {[...Array(5)].map((_, i) => (
              <Stack key={i}>
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
};