import styled from "styled-components";
import GeneralLogin from "../../components/login/GeneralLogin";
import OtherLogin from "../../components/login/OtherLogin";
import { COLOR } from "@/styles/global-color";

const Login = () => {
  return (
    <S.Wrapper>
      <S.Title>오르리</S.Title>
      <GeneralLogin />
      <OtherLogin />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 600px;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
  `,
  Title: styled.h1`
    color: ${COLOR.MAIN};
  `,
};
export default Login;
