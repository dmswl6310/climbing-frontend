import React from "react";
import router, { useRouter } from "next/router";
import styled from "styled-components";
import { FaCircleCheck } from "react-icons/fa6";
import { COLOR } from "@/styles/global-color";

const JoinResult = () => {
  const { query } = useRouter();

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
      <S.Title>
        회원가입이 <S.CompleteText>완료</S.CompleteText> 되었습니다.
      </S.Title>
      <S.SubTitle>
        {query.nickname || "tempNickname"}님의 회원가입을 축하합니다.
      </S.SubTitle>
      <S.SubTitle>
        가입하신 아이디는 <S.IdText>{query.email || "tempEmail"}</S.IdText>
        입니다.
      </S.SubTitle>
      {/* <S.DetailText>
        오르리는 항상 회원님들 입장에서 보다 좋은 서비스를 제공하도록
        노력하겠습니다. :)
      </S.DetailText> */}
      <S.ButtonContainer>
        <S.HomeButton onClick={handleHomeBtn}>홈으로</S.HomeButton>
        <S.LoginButton onClick={handleLoginBtn}>로그인하기</S.LoginButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    height: 500px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
  `,
  Title: styled.h2``,
  SubTitle: styled.div`
    margin-bottom: 5px;
  `,
  IconWrapper: styled.div``,
  CompleteText: styled.span`
    color: ${COLOR.MAIN};
  `,
  IdText: styled.span`
    color: ${COLOR.MAIN};
  `,
  ButtonContainer: styled.div`
    width: 380px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 30px;
  `,
  HomeButton: styled.button`
    background-color: white;
    border: 1px solid ${COLOR.MAIN};
    flex-grow: 1;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  `,
  LoginButton: styled.button`
    background-color: ${COLOR.MAIN};
    border: 1px solid ${COLOR.MAIN};
    color: white;
    font-weight: bold;
    flex-grow: 3;
    margin-left: 30px;
    padding: 10px;
    font-weight: bold;
    border-radius: 5px;
  `,
};

export default JoinResult;
