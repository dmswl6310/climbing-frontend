import InputWithTitle from "@/components/common/InputWithTitle";
import { requestData } from "@/service/api";
import { COLOR } from "@/styles/global-color";
import { useRouter } from "next/router";
import { useState } from "react";
import { styled } from "styled-components";
import sha256 from "crypto-js/sha256";

const VerifyPassword = () => {
  const router = useRouter();
  const [passwordMessage, setPasswordMessage] = useState("");
  const [password, setPassword] = useState("");

  const email = router.query.email as string;

  const handlePasswordChange = (event: { target: { value: any } }) => {
    const currentPassword = event?.target.value;
    setPassword(currentPassword);
  };
  const handleSubmit = (event: any) => {
    // input 비활성화
    const passwordField =
      event.target.parentElement.parentElement.querySelector(
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
        setPasswordMessage("만료되었거나 잘못된 비밀번호입니다.");
        passwordField.disabled = false;
      }
    };

    requestData({
      option: "GET",
      url: `/members/temp-password-check/${email}/${sha256(
        passwordValue
      ).toString()}`,
      onSuccess,
      hasBody: true,
    });
  };

  return (
    <S.Container>
      <S.Title>비밀번호 찾기</S.Title>
      <S.SubTitle>이메일({email})로 받은</S.SubTitle>
      <S.SubTitle>
        <S.HighlightText>임시 비밀번호</S.HighlightText>를 입력해주세요.
      </S.SubTitle>
      <S.InputWrapper>
        <InputWithTitle
          name="password"
          type="password"
          message={passwordMessage}
          onChange={handlePasswordChange}
          placeholder="임시 비밀번호"
        />
      </S.InputWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton disabled={password.length == 0} onClick={handleSubmit}>
          임시 비밀번호로 변경
        </S.SubmitButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    height: 500px;
    width: 400px;
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
  InputWrapper: styled.div`
    width: 350px;
    margin: 30px auto;
    margin-bottom: 5px;
  `,
  HighlightText: styled.span`
    color: ${COLOR.MAIN};
  `,
  ButtonWrapper: styled.div``,
  SubmitButton: styled.button`
    &:disabled {
      opacity: 0.3;
    }
    cursor: pointer;
    width: 350px;
    background-color: ${COLOR.MAIN};
    border: 1px solid ${COLOR.MAIN};
    color: white;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  `,
};

export default VerifyPassword;
