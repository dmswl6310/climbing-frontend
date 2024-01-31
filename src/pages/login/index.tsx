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
  `,
};

export default Login;
