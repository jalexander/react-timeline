import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    overflow: hidden;

    letter-spacing: 0.06em;

    font-family: $oswald;
    font-weight: 400;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  * {
    &,
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }

  body.fontLoaded {
    font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background: -webkit-repeating-linear-gradient(45deg,#eeede8,#eeede8 18px,#f4f4f3 0,#f4f4f3 19px);
    background: repeating-linear-gradient(45deg,#eeede8,#eeede8 18px,#f4f4f3 0,#f4f4f3 19px);
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }
`;
