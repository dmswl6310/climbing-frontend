import styled from "styled-components";
import GeneralLogin from "../../components/login/GeneralLogin";
import OtherLogin from "../../components/login/OtherLogin";

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
