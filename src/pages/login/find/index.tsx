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
          setEmailMessage(`가입되어 있지 않은 계정입니다.`);
          setIsEmailValid(false);
        }
      };

      requestData({
        option: "GET",
        url: `/members/email-check/${currentEmail}`,
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
      <S.SubTitle>비밀번호 찾기</S.SubTitle>
      <S.Title>
        해당 계정의 <S.HighlightText>아이디(이메일)</S.HighlightText>를
        입력해주세요.
      </S.Title>
      <S.InputWrapper>
        <InputWithTitle
          name="email"
          type="email"
          title=""
          placeholder="아이디(이메일)"
          onChange={handleEmailChange}
          message={emailMessage}
        />
      </S.InputWrapper>
      <S.SubmitButton disabled={!isEmailValid} onClick={handleSubmit}>
        임시 비밀번호 전송
      </S.SubmitButton>
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

export default FindPassword;
