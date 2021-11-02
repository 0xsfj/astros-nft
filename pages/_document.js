import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import styled from '@emotion/styled';

import { theme } from '../components/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preload" href="/fonts/astro.ttf" as="font" crossOrigin="" />
        </Head>
        <Body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

const Body = styled.body`
  background: url('/images/sky-background.svg') #180d2a no-repeat center center fixed;
  background-size: cover;
  backdrop-filter: saturate(1) brightness(20%) hue-rotate(296deg);
  min-height: 100vh;
`;
