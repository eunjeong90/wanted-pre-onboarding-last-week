import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html,
  body,
  #root {
    font-size: 100%;
    width: 100vw;
    height: 100vh;
    max-width: 1920px;
    overflow-x: hidden;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.15px;
    line-height: 1;

  }
  body, input, textarea, select, button, table {
    font-family: "Malgun Gothic", "맑은고딕", sans-serif;
  }
  body {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    font-family: 'Source Sans Pro', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  button {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    cursor: pointer;
    background: 0;
}
  input:focus {
    outline: none;
  }
  ul {
    list-style: none;
  }
  label {
    cursor: pointer;
  }
  .a11y-hidden {
     position: absolute;
     clip: rect(0 0 0 0);
     width: 1px;
     height: 1px;
     overflow: hidden;
     margin: -1px;
     border: 0;
     padding: 0;
     white-space: nowrap;
  }
  .label-hidden {
     color: transparent;
     overflow: hidden;
  }
`;

export default GlobalStyles;
