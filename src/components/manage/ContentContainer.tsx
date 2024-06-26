import styled from "styled-components";
import { DEVICE_SIZE } from "@/constants/styles";
import type { ContentContainerProps } from "@/constants/manage/types";

const ContentContainer = ({ direction, gap, children }: ContentContainerProps) => {
  return (
    <Wrapper $direction={direction} $gap={gap}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $direction?: string; $gap?: string }>`
  padding: 32px 40px;
  display: flex;
  flex-direction: ${(props) => props.$direction};
  flex-wrap: wrap;
  gap: ${(props) => props.$gap};
  @media ${DEVICE_SIZE.laptop} {
    padding: 1.3rem 1rem;
  }
`;

export default ContentContainer;
