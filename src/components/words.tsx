'use client';

import { Center, Flex, Stack } from 'styled-system/jsx';
import { useWords } from '@/contexts/word-context';
import { Letter } from './ui/letter';

export function Words() {
  const { state, dispatch } = useWords();
  const { words, currentPosition } = state;

  return (
    <Center w="full" flex="1">
      <Stack gap={'1.5'}>
        {words.map((row, rowIdx) => {
          return (
            <Flex gap={'1.5'} key={Math.random()}>
              {row.map((word, colIdx) => {
                const selected =
                  rowIdx === currentPosition.row &&
                  colIdx === currentPosition.col
                    ? 'true'
                    : null;
                return (
                  <Letter
                    key={Math.random()}
                    status={word.status}
                    data-selected={selected}
                    onClick={() => {
                      dispatch({
                        type: 'SET_CURRENT_POSITION',
                        payload: { row: currentPosition.row, col: colIdx }
                      });
                    }}
                  >
                    {word.letter.toUpperCase()}
                  </Letter>
                );
              })}
            </Flex>
          );
        })}
      </Stack>
    </Center>
  );
}
