import { theme } from '@chakra-ui/core';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    transparentwhite: {
      100: 'rgba(255, 255, 255, .1)',
      200: 'rgba(255, 255, 255, .2)',
      300: 'rgba(255, 255, 255, .3)',
      400: 'rgba(255, 255, 255, .4)',
      500: 'rgba(255, 255, 255, .5)',
      600: 'rgba(255, 255, 255, .6)',
      700: 'rgba(255, 255, 255, .7)',
      800: 'rgba(255, 255, 255, .8)',
      900: 'rgba(255, 255, 255, .9)',
    },
  },
};

export default customTheme;
