import styled from "styled-components";
import { signIn } from "next-auth/react";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { COLOR } from "@/styles/global-color";
import getLoginInfos from "@/service/api/login";
import router from "next/router";
import { useState } from "react";

const GeneralLogin = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let callbackUrl = "/";

    if (router.query.callbackUrl) {
      callbackUrl = router.query.callbackUrl as string;
    }

    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await getLoginInfos(email, password).then((user) => {
      if (user) {
        return signIn("credentials", {
          email: email,
          nickname: user.user.nickname,
          accessToken: user.jwt.accessToken,
          refreshToken: user.jwt.refreshToken,
          loginType: "general",
          redirect: true,
          callbackUrl: callbackUrl,
        });
      } else {
        // 로그인 에러시
        setLoginMessage("아이디 혹은 비밀번호를 잘못 입력했습니다.");
      }
    });

    if (result?.error) {
      console.log("login error");
    } else {
      console.log("login success");
    }
  };

  return (
    <S.Wrapper>
      <S.LoginForm onSubmit={handleSubmit}>
        <S.Container>
          <S.IconWrapper>
            <IoPersonOutline size="20px" />
          </S.IconWrapper>
          <S.InputBox
            type="email"
            name="email"
            placeholder="아이디(이메일)"
            required
          />
        </S.Container>
        <S.Container>
          <S.IconWrapper>
            <IoLockClosedOutline size="20px" />
          </S.IconWrapper>
          <S.InputBox
            type="password"
            name="password"
            placeholder="비밀번호"
            required
          />
        </S.Container>
        {loginMessage != "" && (
          <S.MessageBox>
            {loginMessage}
            {"\n"}입력하신 내용을 확인해주세요.
          </S.MessageBox>
        )}
        <S.ButtonBox type="submit">로그인</S.ButtonBox>
      </S.LoginForm>
      <S.OptionContainer>
        {/* <S.Option className="link-plain" href={"/find/id"}>
          아이디 찾기
        </S.Option>
        <S.Divider>|</S.Divider> */}
        <S.Option className="link-plain" href={"/login/find"}>
          비밀번호 찾기
        </S.Option>
        <S.Divider>|</S.Divider>
        <S.Option className="link-plain" href={"/join"}>
          회원가입
        </S.Option>
      </S.OptionContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    padding: 0;
    margin-bottom: 30px;
  `,
  LoginForm: styled.form`
    display: flex;
    flex-direction: column;
  `,
  Container: styled.div`
    & :focus {
      border: 1px solid ${COLOR.BORDER_UNFOCUSED};
      border-radius: 3px;
    }
    display: flex;
    border-radius: 5px;
    border: 1px solid ${COLOR.LIGHT_MAIN};
    padding: 10px;
    margin-bottom: 10px;
  `,
  IconWrapper: styled.div`
    padding-right: 10px;
  `,
  InputBox: styled.input`
    border: none;
    outline: none;
    width: 100%;
  `,
  ButtonBox: styled.button`
    cursor: pointer;
    border-radius: 5px;
    height: 40px;
    background-color: ${COLOR.MAIN};
    border: none;
    color: white;
    font-weight: bold;
  `,
  MessageBox: styled.div`
    white-space: pre-wrap;
    color: red;
    margin-bottom: 10px;
    font-size: 14px;
  `,
  OptionContainer: styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  `,
  Option: styled(Link)`
    font-size: 12px;
    color: black;
  `,
  Divider: styled.div`
    margin-left: 10px;
    margin-right: 10px;
    color: lightgrey;
    font-size: 12px;
  `,
};

export default GeneralLogin;
