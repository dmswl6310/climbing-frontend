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
      <h1>
        회원가입이 <S.CompleteText>완료</S.CompleteText> 되었습니다.
      </h1>
      <h4>
        {query.nickname || "tempNickname"}님의 회원가입을 축하합니다.
        <br />
        가입하신 아이디는 <S.IdText>{query.email || "tempEmail"}</S.IdText>
        입니다.
      </h4>
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
  IdText: styled.span`
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
  // DetailText: styled.div`
  //   font-size: 10px;
  // `,
};

export default JoinResult;
