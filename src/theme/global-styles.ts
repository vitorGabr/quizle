import { defineGlobalStyles } from '@pandacss/dev';

export const globalStyles = defineGlobalStyles({
  'html, body': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  body: {
    bg: '{colors.gray.1}'
  }
});
