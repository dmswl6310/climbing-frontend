import { useRouter } from "next/router";
import { styled } from "styled-components";

const AlreadyExistPage = () => {
  const { query } = useRouter();

  const handleLoginBtn = () => {
    alert("카카오로그인");
  };

  return (
    <S.Container>
      <h1>이미 가입된 카카오 계정입니다.</h1>
      <h4>{query.nickname}으로 로그인 해주세요.</h4>
      <S.ButtonContainer>
        <S.LoginButton onClick={handleLoginBtn}>
          카카오로 로그인하기
        </S.LoginButton>
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
  LoginButton: styled.button`
    flex-grow: 3;
    margin: 0 10px;
  `,
};

export default AlreadyExistPage;
