'use client';

import { GameResult } from '@/components/game-result';
import {
  GameState,
  GameStatus,
  LetterStatus,
  Word
} from '@/schemas/word-schema';
import { initGameState, validateWord } from '@/utils/game-utils';
import { setLocalStorage } from '@/utils/local-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

type Action =
  | { type: 'SET_GAME_STATUS'; payload: GameStatus }
  | { type: 'SET_LETTERS'; payload: Word[] }
  | { type: 'SET_CURRENT_POSITION'; payload: GameState['currentPosition'] }
  | { type: 'SET_WORDS'; payload: Word[][] };

const STATUS_ORDER: LetterStatus[] = [
  'disabled',
  'incorrect',
  'unanswered',
  'correct'
];

const WordsContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
  handleKeyPress: (event: KeyboardEvent | { key: string }) => void;
}>({
  state: {} as GameState,
  dispatch: () => null,
  handleKeyPress: () => null
});

function wordsReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_GAME_STATUS':
      return { ...state, gameStatus: action.payload };
    case 'SET_LETTERS':
      return { ...state, letters: action.payload };
    case 'SET_CURRENT_POSITION':
      return { ...state, currentPosition: action.payload };
    case 'SET_WORDS':
      return { ...state, words: action.payload };
    default:
      return state;
  }
}

export function WordsProvider({
  children,
  correctWord
}: {
  children: React.ReactNode;
  correctWord: string;
}) {
  const maxWordLength = correctWord.length;

  const [state, dispatch] = useReducer(wordsReducer, {
    gameStatus: 'playing',
    letters: [],
    currentPosition: { row: 0, col: 0 },
    words: Array.from(
      { length: 6 },
      () =>
        Array.from({ length: maxWordLength }, () => ({
          letter: '',
          status: 'disabled'
        })) as Word[]
    )
  });

  const handleKeyPress = (event: KeyboardEvent | { key: string }) => {
    const { currentPosition, letters } = state;

    const newWords = [...state.words];
    let gameStatus = state.gameStatus;

    if (gameStatus !== 'playing') return;

    if (event.key === 'Backspace') {
      newWords[currentPosition.row][currentPosition.col] = {
        letter: '',
        status: 'disabled'
      };
      changePosition('prev-col');
    }

    if (event.key === 'Enter') {
      const typedWord = newWords[currentPosition.row].map((l) => l.letter);
      if (typedWord.join('').length < maxWordLength) return;

      const wordValidation = validateWord(typedWord, correctWord);
      const newLetters = [...letters] as Word[];

      wordValidation.word.forEach((l) => {
        const existingLetterIndex = newLetters.findIndex(
          (lt) => lt.letter === l.letter
        );
        if (existingLetterIndex === -1) {
          newLetters.push(l);
          return;
        }

        const existingLetter = newLetters[existingLetterIndex];
        if (
          existingLetter &&
          STATUS_ORDER.indexOf(l.status) >
            STATUS_ORDER.indexOf(existingLetter.status)
        ) {
          newLetters[existingLetterIndex] = l;
        }
      });

      newWords[currentPosition.row] = wordValidation.word;
      gameStatus = wordValidation.win ? 'win' : 'playing';

      if (state.currentPosition.row === 5 && gameStatus === 'playing') {
        gameStatus = 'lose';
      }
      const position = changePosition('next-row');
      setLocalStorage({
        data: {
          words: newWords,
          gameStatus,
          letters: newLetters,
          currentPosition: position
        },
        date: new Date()
      });
      dispatch({
        type: 'SET_LETTERS',
        payload: newLetters
      });
    }

    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      changePosition(event.key === 'ArrowLeft' ? 'prev-col' : 'next-col');
    }

    if (/^[a-zA-Z]$/.test(event.key)) {
      newWords[currentPosition.row][currentPosition.col] = {
        letter: event.key,
        status: 'disabled'
      };
      changePosition('next-col');
    }

    dispatch({
      type: 'SET_WORDS',
      payload: newWords
    });
    dispatch({
      type: 'SET_GAME_STATUS',
      payload: gameStatus
    });
  };

  function changePosition(type: 'next-col' | 'prev-col' | 'next-row') {
    let position = state.currentPosition;
    switch (type) {
      case 'next-col':
        if (state.currentPosition.col < maxWordLength - 1) {
          position = {
            ...state.currentPosition,
            col: state.currentPosition.col + 1
          };
        }
        break;
      case 'prev-col':
        if (state.currentPosition.col > 0) {
          position = {
            ...state.currentPosition,
            col: state.currentPosition.col - 1
          };
        }
        break;
      case 'next-row':
        if (state.currentPosition.row < 5) {
          position = {
            col: 0,
            row: state.currentPosition.row + 1
          };
        }
        break;
    }
    dispatch({
      type: 'SET_CURRENT_POSITION',
      payload: position
    });
    return position;
  }

  useEffect(() => {
    const data = initGameState();
    if (!data) return;
    dispatch({
      type: 'SET_WORDS',
      payload: data.words
    });
    dispatch({
      type: 'SET_LETTERS',
      payload: data.letters
    });
    dispatch({
      type: 'SET_CURRENT_POSITION',
      payload: data.currentPosition
    });
    dispatch({
      type: 'SET_GAME_STATUS',
      payload: data.gameStatus
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [state, dispatch]);

  return (
    <WordsContext.Provider value={{ state, dispatch, handleKeyPress }}>
      {children}
      <GameResult open={state.gameStatus !== 'playing'} />
    </WordsContext.Provider>
  );
}

export const useWords = () => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error('useWords must be used within a WordsProvider');
  }
  return context;
};
