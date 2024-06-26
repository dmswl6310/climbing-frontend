import { SocialType, socialTypeToKorean } from "@/constants/login/type";
import { COLOR } from "@/styles/global-color";
import router, { useRouter } from "next/router";
import { FaCircleExclamation } from "react-icons/fa6";
import { styled } from "styled-components";

const AlreadyExistPage = () => {
  const { query } = useRouter();
  const email = query.email as string;
  const socialTypeString = socialTypeToKorean(query.socialType as SocialType);

  const handleHomeBtn = () => {
    router.push("/home");
  };
  const handleLoginBtn = () => {
    router.push("/login");
  };

  return (
    <S.Container>
      <S.IconWrapper>
        <FaCircleExclamation size="50" color={COLOR.MAIN} />
      </S.IconWrapper>
      <S.Title>이미 가입된 {socialTypeString} 계정입니다.</S.Title>
      <S.SubTitle>{email} 계정으로 로그인하시기 바랍니다.</S.SubTitle>
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
    border: 1px solid ${COLOR.MAIN};
    flex-grow: 1;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  `,
  LoginButton: styled.button`
    cursor: pointer;
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

export default AlreadyExistPage;
