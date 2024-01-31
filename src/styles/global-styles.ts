import { createGlobalStyle } from "styled-components";
import {normalize} from "styled-normalize";

const GlobalStyle = createGlobalStyle`
${normalize}
  .container {
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px #d0d0d0;
  }
`;

export default GlobalStyle;
