import { globalStyles } from '@/theme/global-styles';
import { dialog } from '@/theme/recipes/dialog';
import { semanticTokens } from '@/theme/semantic-tokens';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}'
  ],
  exclude: [],
  jsxFramework: 'react',
  outExtension: 'js',
  globalCss: globalStyles,
  theme: {
    semanticTokens,
    slotRecipes: {
      dialog
    }
  },
  outdir: 'styled-system'
});
