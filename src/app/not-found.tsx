"use client";
import { useRouter } from "next/navigation";
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
      <h1>잘못된 페이지주소 입니다.</h1>
      <h4>에러코드 : 404</h4>
      <S.ButtonContainer>
        <S.HomeButton onClick={handleHomeBtn}>홈으로</S.HomeButton>
        <S.LoginButton onClick={handleBackBtn}>이전 페이지로</S.LoginButton>
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

export default NotFound;
