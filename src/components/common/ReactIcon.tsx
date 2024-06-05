import styled from "styled-components";
import type { ReactIconProps } from "@/constants/types";

const ReactIcon = ({ clickable, children }: ReactIconProps) => {
  return <Wrapper $clickable={clickable}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ $clickable: boolean }>`
  display: grid;
  place-content: center center;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

export default ReactIcon;
