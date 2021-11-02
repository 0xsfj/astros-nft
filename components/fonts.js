import { Global } from '@emotion/react';

console.log('Fonts');

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Astro";
        src: url("/fonts/astro.ttf");
        font-style: medium;
        font-weight: 500;
        font-display: block;
      }
      `}
  />
);
export default Fonts;
