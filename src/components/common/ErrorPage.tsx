import styled from "styled-components";

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  return (
    <S.Wrapper>
      <S.Content>
        오류로 인해 페이지를 불러올 수 없습니다. (에러코드:{statusCode})
        <br />
        문제가 지속되면 관리자에게 문의해 주세요.
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: grid;
    place-content: center center;
    height: calc(100vh - 150px);
    text-align: center;
  `,
  Content: styled.div``,
};

export default ErrorPage;
