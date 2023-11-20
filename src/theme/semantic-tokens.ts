import { defineSemanticTokens } from '@pandacss/dev';

export const semanticTokens = defineSemanticTokens({
  colors: {
    letterStatus: {
      correct: {
        value: '#34e54d'
      },
      incorrect: {
        value: '{colors.neutral.500}'
      },
      unanswered: {
        value: '#fdf00e'
      }
    }
  }
});
