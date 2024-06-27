import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { COLOR } from "./global-color";
import { DEVICE_SIZE } from "@/constants/styles";

const GlobalStyle = createGlobalStyle`
${normalize}
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-style: normal;
  }

  * {
  font-family: 'Pretendard-Regular', sans-serif;
  }

  a {
    color: black;
  }

  .container {
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px #d0d0d0;
  }

  .btn-primary {
    border: none;
    background: ${COLOR.MAIN};
    padding: 8px 10px;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  .btn-primary:disabled {
    background: ${COLOR.DISABLED};
    cursor: default;
    &:hover {
      opacity: 1;
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

  ::placeholder {
    color: #979797;
  }

  .editor-wrapper {
    background: white;
    border: 1px solid ${COLOR.DISABLED};
  }

  .editor-header {
    @media ${DEVICE_SIZE.desktop} {
      border-bottom: 1px solid #d0d0d0;
      font-weight: 700;
      font-size: 24px;
      padding: 32px 40px;
    }
    @media ${DEVICE_SIZE.laptop} {
      font-size: 19px;
      padding: 1rem;
    }
  }

  .editor-removable {
    display: flex;
    justify-content: space-between;
  }

  .mobile-view {
    display: none;
    @media ${DEVICE_SIZE.laptop} {
      display: block;
    }
  }

  .desktop-view {
    display: block;
    @media ${DEVICE_SIZE.laptop} {
      display: none;
    } 
  }
`;

export default GlobalStyle;
