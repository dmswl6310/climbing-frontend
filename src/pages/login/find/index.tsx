import InputWithTitle from "@/components/common/InputWithTitle";
import { EMAIL_REGREX } from "@/constants/login/constants";
import { EmailCheckResponse } from "@/constants/login/type";
import { requestData } from "@/service/api";
import { COLOR } from "@/styles/global-color";
import router from "next/router";
import { useState } from "react";
import { styled } from "styled-components";

const FindPassword = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = async (event: {
    target: {
      value: string;
    };
  }) => {
    const currentEmail = event.target.value;

    if (!EMAIL_REGREX.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmailValid(false);
    } else {
      const onSuccess = ({ check }: EmailCheckResponse) => {
        if (!check) {
          setEmailMessage("");
          setIsEmailValid(true);
          setEmail(currentEmail);
        } else {
          setEmailMessage(`존재하지 않는 계정입니다.`);
          setIsEmailValid(false);
        }
      };

      return requestData({
        option: "GET",
        url: `/members/email-check/${currentEmail}`,
        hasBody: true,
        onSuccess,
      });
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const onSuccess = () => {
      router.push({
        pathname: "/login/find/verify",
        query: { email: email },
      });
    };

    requestData({
      option: "POST",
      url: "/members/temp-password",
      data: { email: email },
      onSuccess,
      hasBody: false,
    });
  };

  return (
    <S.Container>
      <S.Title>비밀번호 찾기</S.Title>
      <S.SubTitle>
        가입한 <S.HighlightText>아이디(이메일)</S.HighlightText>를 입력해주세요.
      </S.SubTitle>
      <S.SubTitle>이메일을 통해 임시 비밀번호가 전송됩니다.</S.SubTitle>
      <S.InputWrapper>
        <InputWithTitle
          name="email"
          type="email"
          placeholder="아이디(이메일)"
          onChange={handleEmailChange}
          message={emailMessage}
        />
      </S.InputWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton disabled={!isEmailValid} onClick={handleSubmit}>
          임시 비밀번호 전송하기
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

export default FindPassword;
