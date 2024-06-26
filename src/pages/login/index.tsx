import styled from "styled-components";
import GeneralLogin from "../../components/login/GeneralLogin";
import OtherLogin from "../../components/login/OtherLogin";
import { COLOR } from "@/styles/global-color";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query?.accessToken) {
      const saveTokens = async () => {
        const email = router.query.email;
        const nickname = router.query.nickname;
        const accessToken = router.query.accessToken;
        const refreshToken = router.query.refreshToken;
        const result = await signIn("credentials", {
          email: email,
          nickname: nickname,
          accessToken: accessToken,
          refreshToken: refreshToken,
          loginType: "oauth",
          redirect: true,
          callbackUrl: "/",
        });
        if (result?.error) {
          console.log("login fail");
        } else {
          console.log("login success");
        }
      };
      saveTokens();
    }
  }, [router.query]);
  return (
    <S.Wrapper>
      <S.Title>오르리</S.Title>
      <GeneralLogin />
      <S.Divider />
      <OtherLogin />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 600px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    padding: 0 50px;
  `,
  Title: styled.h1`
    color: ${COLOR.MAIN};
  `,
  Container: styled.div`
    display: flex;
  `,
  Divider: styled.hr`
    margin-top: 30px;
    width: 370px;
    border: none;
    border-top: 1px solid lightgray;
    text-align: center;
    overflow: visible;
    &:after {
      content: "간편 로그인 / 회원가입";
      font-size: 12px;
      color: gray;
      position: relative;
      top: -15px;
      background-color: white;
      padding: 0 10px;
    }
  `,
};
export default Login;
