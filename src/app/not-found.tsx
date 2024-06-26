"use client";
import { COLOR } from "@/styles/global-color";
import { useRouter } from "next/navigation";
import { IoWarning } from "react-icons/io5";
import { styled } from "styled-components";

const NotFound = () => {
  const router = useRouter();

  const handleHomeBtn = () => {
    router.replace("/home");
  };
  const handleBackBtn = () => {
    router.back();
  };
  return (
    <S.Container>
      <S.IconWrapper>
        <IoWarning size="50" color={COLOR.WARNING} />
      </S.IconWrapper>
      <S.Title>잘못된 페이지주소 입니다.</S.Title>
      <S.SubTitle>에러코드 : 404</S.SubTitle>
      <S.ButtonContainer>
        <S.HomeButton onClick={handleHomeBtn}>홈으로</S.HomeButton>
        <S.BackButton onClick={handleBackBtn}>이전 페이지로</S.BackButton>
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
  ButtonContainer: styled.div`
    width: 380px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 30px;
  `,
  HomeButton: styled.button`
    cursor: pointer;
    background-color: white;
    border: 1px solid ${COLOR.DISABLED};
    flex-grow: 1;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  `,
  BackButton: styled.button`
    cursor: pointer;
    background-color: ${COLOR.DISABLED};
    border: 1px solid ${COLOR.DISABLED};
    color: white;
    font-weight: bold;
    flex-grow: 3;
    margin-left: 30px;
    padding: 10px;
    font-weight: bold;
    border-radius: 5px;
  `,
};

export default NotFound;
