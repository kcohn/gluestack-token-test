import { config } from '@gluestack-ui/themed';
import { tokens } from '../tokens/js/tokens';

// Extend the default Gluestack config with your design tokens
export const customConfig = {
  ...config,
  tokens: {
    ...config.tokens,
    colors: {
      ...config.tokens.colors,
      ...tokens.colors,
    },
    space: {
      ...config.tokens.space,
      ...tokens.spacing,
    },
    fontSizes: {
      ...config.tokens.fontSizes,
      ...tokens.fontSize,
    },
    // Add other token categories as needed
  },
};