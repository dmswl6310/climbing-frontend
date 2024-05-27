import styled from "styled-components";
import { signIn } from "next-auth/react";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { COLOR } from "@/styles/global-color";

const GeneralLogin = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await signIn("credentials", {
      email: email,
      password: password,
      type: "normal",
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      console.log("login fail");
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
        <S.ButtonBox type="submit">로그인</S.ButtonBox>
      </S.LoginForm>
      <S.OptionContainer>
        <S.Option className="link-plain" href={"/find/id"}>
          아이디 찾기
        </S.Option>
        <S.Divider>|</S.Divider>
        <S.Option className="link-plain" href={"/find/password"}>
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
    height: 160px;
    padding: 0;
    margin-bottom: 30px;
  `,
  LoginForm: styled.form`
    display: flex;
    flex-direction: column;
  `,
  Container: styled.div`
    display: flex;
    /* height: 40px; */
    border-radius: 5px;
    border: 3px solid ${COLOR.LIGHT_MAIN};
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
    /* height: 40px; */
    /* margin-bottom: 20px; */
  `,
  ButtonBox: styled.button`
    border-radius: 5px;
    height: 40px;
    background-color: ${COLOR.MAIN};
    border: none;
    color: white;
    font-weight: bold;
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
