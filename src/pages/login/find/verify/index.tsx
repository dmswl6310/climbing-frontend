import InputWithTitle from "@/components/common/InputWithTitle";
import { requestData } from "@/service/api";
import { COLOR } from "@/styles/global-color";
import { useRouter } from "next/router";
import { useState } from "react";
import { styled } from "styled-components";

const VerifyPassword = () => {
  const router = useRouter();
  const [emailMessage, setEmailMessage] = useState("");

  const email = router.query.email as string;

  const handleSubmit = (event: any) => {
    // input 비활성화
    const passwordField = event.target.parentElement.querySelector(
      'input[name="password"]'
    );
    const passwordValue = passwordField.value;
    passwordField.disabled = true;

    // 임시비밀번호 맞을시 다음페이지로
    const onSuccess = (isCorrect: boolean) => {
      if (isCorrect) {
        router.push({
          pathname: "/login/find/result",
          query: { email: email },
        });
      } else {
        setEmailMessage("만료되었거나 잘못된 비밀번호 입니다.");
        passwordField.disabled = false;
      }
    };

    requestData({
      option: "GET",
      url: `/members/temp-password-check/${email}/${passwordValue}`,
      onSuccess,
      hasBody: true,
    });
  };

  return (
    <S.Container>
      <S.SubTitle>임시 비밀번호로 변경</S.SubTitle>
      <S.Title>
        {email} 메일로 받은 <S.HighlightText>임시 비밀번호</S.HighlightText>를
        입력해주세요.
      </S.Title>
      <S.InputWrapper>
        <InputWithTitle
          name="password"
          type="password"
          title=""
          message={emailMessage}
          placeholder="임시 비밀번호"
        />
      </S.InputWrapper>
      <S.SubmitButton onClick={handleSubmit}>임시 비밀번호 확인</S.SubmitButton>
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
  SubTitle: styled.h4`
    margin: 0;
  `,
  Title: styled.h3`
    margin: 5px 0 40px 0;
  `,
  InputWrapper: styled.div`
    width: 300px;
    margin: 0 auto;
    justify-content: center;
  `,
  HighlightText: styled.span`
    color: ${COLOR.MAIN};
  `,
  SubmitButton: styled.button`
    margin-top: 30px;
  `,
};

export default VerifyPassword;
