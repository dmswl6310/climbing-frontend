import styled from "styled-components";
import type { ReactNode } from "react";

const LoadContainer = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center center;
`;

export default LoadContainer;
