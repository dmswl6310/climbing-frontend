import InputWithTitle from "@/components/common/InputWithTitle";
import EmailVerification from "@/components/login/EmailVerification";
import { requestData } from "@/service/api";
import router from "next/router";
import { useState } from "react";
import styled from "styled-components";
import {
  CONFIRM_MESSAGE,
  EMAIL_REGREX,
  NICKNAME_REGREX,
  PASSWORD_REGREX,
} from "@/constants/login/constants";
import { EmailCheckResponse, socialTypeToKorean } from "@/constants/login/type";
import { COLOR } from "@/styles/global-color";
import sha256 from "crypto-js/sha256";

const Join = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isReEnterPasswordValid, setIsReEnterPasswordValid] = useState(false);
  const [reEnterPasswordMessage, setReEnterPasswordMessage] = useState("");

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [remainingTime, setRemainingTime] = useState(0);
  const [isSendDisabled, setIsSendDisabled] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

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
      const onSuccess = ({ check, socialType }: EmailCheckResponse) => {
        if (check) {
          setEmailMessage(CONFIRM_MESSAGE);
          setIsEmailValid(true);
          setEmail(currentEmail);
        } else {
          const socialTypeString = socialTypeToKorean(socialType);
          setEmailMessage(
            `이미 ${socialTypeString} 계정(으)로 가입된 메일입니다.`
          );
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

  const handlePasswordChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentPassword = event.target.value;

    if (!PASSWORD_REGREX.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPasswordValid(false);
    } else {
      setPasswordMessage("");
      setIsPasswordValid(true);
      setPassword(currentPassword);
    }
  };

  const handleReEnterPasswordChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentReEnterpassword = event.target.value;
    if (currentReEnterpassword !== password) {
      setReEnterPasswordMessage("비밀번호가 같지 않습니다.");
      setIsReEnterPasswordValid(false);
    } else {
      setReEnterPasswordMessage("");
      setIsReEnterPasswordValid(true);
    }
  };

  const handleNicknameChange = async (event: {
    target: {
      value: string;
    };
  }) => {
    const currentNickname = event.target.value;

    if (!NICKNAME_REGREX.test(currentNickname)) {
      setNicknameMessage("닉네임의 형식이 올바르지 않습니다.");
      setIsNicknameValid(false);
    } else {
      const onSuccess = (canUse: boolean) => {
        if (canUse) {
          setNicknameMessage(CONFIRM_MESSAGE);
          setIsNicknameValid(true);
          setNickname(currentNickname);
        } else {
          setNicknameMessage("중복된 닉네임 입니다.");
          setIsNicknameValid(false);
        }
      };
      requestData({
        option: "GET",
        url: `/members/nickname-check/${currentNickname}`,
        onSuccess,
      });
    }
  };

  const handleSendClick = async (event: {
    preventDefault(): unknown;
    target: {
      parentElement: {
        querySelector: (arg0: string) => {
          (): any;
          new (): any;
          disabled: boolean;
        };
      };
    };
  }) => {
    event.preventDefault();

    const onSuccess = () => {
      // input 비활성화
      event.target.parentElement.querySelector('input[name="email"]').disabled =
        true;

      // 타이머 세팅
      setRemainingTime(300);
      setIsSendDisabled(true);
    };

    requestData({
      option: "POST",
      url: `/members/email-auth`,
      data: { email: email },
      onSuccess,
      hasBody: false,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const credentials = {
      email: email,
      password: sha256(password).toString(),
      nickname: nickname,
    };

    const onSuccess = () => {
      router.push({
        pathname: "/join/result",
        query: { nickname: nickname, email: email },
      });
    };

    requestData({
      option: "POST",
      url: "/members/join",
      data: credentials,
      onSuccess,
      hasBody: false,
    });
  };

  return (
    <S.Wrapper>
      <S.Title>회원가입</S.Title>
      <S.JoinForm onSubmit={handleSubmit}>
        <InputWithTitle
          name="email"
          type="email"
          title="아이디(이메일)"
          placeholder="수신 가능한 이메일을 입력해주세요."
          onChange={handleEmailChange}
          message={emailMessage}
          buttonText="인증번호 받기"
          onClick={handleSendClick}
          onDisabled={isSendDisabled || isCodeValid || !isEmailValid}
        />
        <EmailVerification
          enteredEmail={email}
          remainingTime={remainingTime}
          setTime={setRemainingTime}
          isBtnDisabled={isSendDisabled}
          setBtnDisabled={setIsSendDisabled}
          isCodeValid={isCodeValid}
          setIsCodeValid={setIsCodeValid}
        />
        <InputWithTitle
          name="password"
          type="password"
          title="비밀번호"
          onChange={handlePasswordChange}
          message={passwordMessage}
        />
        <InputWithTitle
          name="reEnterPassword"
          type="password"
          title="비밀번호 재확인"
          onChange={handleReEnterPasswordChange}
          message={reEnterPasswordMessage}
        />
        <InputWithTitle
          name="nickname"
          title="닉네임"
          onChange={handleNicknameChange}
          message={nicknameMessage}
        />
        <S.ButtonBox
          type="submit"
          disabled={
            !(
              isEmailValid &&
              isCodeValid &&
              isNicknameValid &&
              isPasswordValid &&
              isReEnterPasswordValid
            )
          }
        >
          가입하기
        </S.ButtonBox>
      </S.JoinForm>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 700px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  `,
  Title: styled.h2`
    text-align: center;
  `,
  JoinForm: styled.form`
    margin-top: 15px;
  `,
  ButtonBox: styled.button`
    &:disabled {
      opacity: 0.3;
    }
    cursor: pointer;
    background-color: ${COLOR.MAIN};
    border: 1px solid ${COLOR.MAIN};
    color: white;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
    margin-top: 15px;
    width: 100%;
  `,
};

export default Join;
