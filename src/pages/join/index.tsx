import InputWithTitle from "@/components/InputWithTitle";
import styled from "styled-components";

const Join = () => {
  return (
    <S.Wrapper>
      <InputWithTitle title="아이디" />
      <InputWithTitle title="비밀번호" />
      <InputWithTitle title="비밀번호 재확인" />
      <InputWithTitle title="닉네임" />
      <InputWithTitle title="휴대전화" />
      <button>가입하기</button>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 400px;
  `,
};

export default Join;
