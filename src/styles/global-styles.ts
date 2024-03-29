import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
${normalize}
  .container {
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px #d0d0d0;
  }

  .btn-primary {
    border: none;
    background: #307fe5;
    padding: 8px 10px;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  .btn-secondary {
    border: none;
    background: #666666;
    padding: 8px 10px;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  .btn-plain{
    border: none;
    background:transparent;
    cursor: pointer;
  }

  .btn-plain-clicked{
    border: none;
    font-weight:bold;
    background:transparent;
    cursor: pointer;
  }

  .link-plain{
    text-decoration:none;
    &:visited { color:black; }
  }
`;

export default GlobalStyle;
