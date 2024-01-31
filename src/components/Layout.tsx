import GlobalStyle from "@/styles/global-styles";
import Footer from "./Footer";
import Navbar from "./Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { styled } from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "오르리",
  description: "암장 찾기 사이트-오르리",
};

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Styled.TotalWrapper>
      <GlobalStyle />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Styled.TotalWrapper>
  );
};

const Styled = {
  TotalWrapper: styled.div`
    padding-left: 10%; // 추후 모바일 고려시, 전환필요
    padding-right: 10%;
  `,
};

export default Layout;
