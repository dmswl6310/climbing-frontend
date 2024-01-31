import { styled } from "styled-components";

const Footer = () => {
  return (
    <S.Wrapper>
      <button>오르리</button>
      <S.MenuContainer>
        <S.ButtonWrapper>Home</S.ButtonWrapper>
        <S.ButtonWrapper>About</S.ButtonWrapper>
        <S.ButtonWrapper>Service</S.ButtonWrapper>
        <S.ButtonWrapper>Contact us</S.ButtonWrapper>
      </S.MenuContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  MenuContainer: styled.div``,
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
};

export default Footer;
