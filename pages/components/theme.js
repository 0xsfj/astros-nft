// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Astro',
    body: 'Syne',
  },
  fonts: {
    body: {
      fontFamily: 'Astro, sans-serif',
    },
    heading: {
      fontFamily: 'Syne sans-serif',
    },
  },
};
// 3. extend the theme
const theme = extendTheme({
  fonts: {
    heading: 'Astro',
    body: 'Syne',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});
export default theme;
