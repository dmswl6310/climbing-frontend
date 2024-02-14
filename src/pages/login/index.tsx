import styled from "styled-components";
import GeneralLogin from "./GeneralLogin";
import OtherLogin from "./OtherLogin";

const Login = () => {
  return (
    <S.Wrapper>
      <GeneralLogin />
      <OtherLogin />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 500px;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  `,
};

export default Login;
