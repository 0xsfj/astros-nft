import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Astro',
    body: 'Syne',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export { theme };
