import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaCircleCheck } from "react-icons/fa6";
import { COLOR } from "@/styles/global-color";

const ChangeReseult = () => {
  const router = useRouter();

  const handleHomeBtn = () => {
    router.push("/home");
  };
  const handleLoginBtn = () => {
    router.push("/login");
  };

  return (
    <S.Container>
      <S.IconWrapper>
        <FaCircleCheck size="50" color={COLOR.MAIN} />
      </S.IconWrapper>
      <h1>
        임시 비밀번호로 변경이 <S.CompleteText>완료</S.CompleteText> 되었습니다.
      </h1>
      <h4>{router.query.email} 계정으로 로그인하시기 바랍니다.</h4>

      <S.ButtonContainer>
        <S.HomeButton onClick={handleHomeBtn}>홈으로</S.HomeButton>
        <S.LoginButton onClick={handleLoginBtn}>로그인하기</S.LoginButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    height: 700px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
  `,
  IconWrapper: styled.div``,
  CompleteText: styled.span`
    color: ${COLOR.MAIN};
  `,
  ButtonContainer: styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
  `,
  HomeButton: styled.button`
    flex-grow: 1;
    margin: 0 10px;
  `,
  LoginButton: styled.button`
    flex-grow: 3;
    margin: 0 10px;
  `,
};

export default ChangeReseult;
