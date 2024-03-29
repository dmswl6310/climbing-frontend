import { styled } from "styled-components";

const SearchLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <S.Wrapper>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    margin-left: 10%;
    margin-right: 10%;
  `,
  Content: styled.div``,
};

export default SearchLayout;
