import { useRouter } from "next/router";
import styled from "styled-components";

const LoginPrompt = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <span>로그인이 필요한 서비스입니다.</span>
      <button className="btn-primary" onClick={() => router.push("/login")}>
        로그인하기
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  place-content: center center;
  gap: 12px;
`;
export default LoginPrompt;
