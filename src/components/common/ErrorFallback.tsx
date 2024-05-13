import styled from "styled-components";
import { CgUnavailable } from "react-icons/cg";
import type { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error }: FallbackProps) => {
  // 에러 로깅
  console.log(error);
  return (
    <Wrapper>
      <div>
        <CgUnavailable size="2rem" />
      </div>
      오류로 인해 페이지를 불러올 수 없습니다. 관리자에게 문의해주세요.
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-content: center center;
  gap: 12px;
  font-weight: 700;
  min-height: 60vh;
  text-align: center;
`;

export default ErrorFallback;
