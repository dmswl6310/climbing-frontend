import { COLOR } from "@/styles/global-color";
import router from "next/router";
import { IoWarning } from "react-icons/io5";
import { styled } from "styled-components";

const LockedPage = () => {
  //   const { query } = useRouter();
  //   const email = query.email as string;

  const handleHomeBtn = () => {
    router.push("/home");
  };
  const handleLoginBtn = () => {
    router.push("/login");
  };

  return (
    <S.Container>
      <S.IconWrapper>
        <IoWarning size="50" color={COLOR.WARNING} />
      </S.IconWrapper>
      <S.Title>비정상적인 활동으로 정지된 계정입니다.</S.Title>
      <S.SubTitle>자세한 내용은 고객센터에 문의바랍니다.</S.SubTitle>
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

export default LockedPage;
