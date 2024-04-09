import InputWithTitle from "@/components/common/InputWithTitle";
import EmailVerification from "@/components/login/EmailVerification";
import { requestData } from "@/service/api";
import { useState } from "react";
import styled from "styled-components";

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
  const [verificationNumber, setVerificationNumber] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);

  const confirmMessage = "사용 가능";

  const handleEmailChange = async (event: {
    target: {
      value: string;
    };
  }) => {
    const currentEmail = event.target.value;
    const emailRegrex =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegrex.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmailValid(false);
    } else {
      const onSuccess = (canUse: boolean) => {
        if (canUse) {
          setEmailMessage(confirmMessage);
          setIsEmailValid(true);
          setEmail(currentEmail);
        } else {
          setEmailMessage("중복된 이메일 입니다.");
          setIsEmailValid(false);
        }
      };

      requestData({
        option: "GET",
        url: `/members/email-check/${currentEmail}`,
        onSuccess,
      });
      // setEmailMessage("");
      // setIsEmailValid(true);
      // setEmail(currentEmail);
    }
  };

  const handlePasswordChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentPassword = event.target.value;
    const passwordRegrex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegrex.test(currentPassword)) {
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
    const nicknameRegrex = /^[가-힣A-Za-z0-9_]{2,}$/;

    if (!nicknameRegrex.test(currentNickname)) {
      setNicknameMessage("닉네임의 형식이 올바르지 않습니다.");
      setIsNicknameValid(false);
    } else {
      const onSuccess = (canUse: boolean) => {
        if (canUse) {
          setNicknameMessage(confirmMessage);
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
      // setNicknameMessage("");
      // setIsNicknameValid(true);
      // setNickname(currentNickname);
    }
  };

  const handleSendClick = (event: {
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
    //임시
    // setVerificationNumber("00000");
    // event.target.parentElement.querySelector('input[name="email"]').disabled =
    //   true;
    // setRemainingTime(10);
    // setIsSendDisabled(true);

    const onSuccess = (verficationNum: string) => {
      // input 비활성화
      event.target.parentElement.querySelector('input[name="email"]').disabled =
        true;

      // 타이머 세팅
      setRemainingTime(30);
      setIsSendDisabled(true);

      // 인증번호 세팅
      setVerificationNumber(verficationNum);
    };

    requestData({
      option: "POST",
      url: `/members/email-auth`,
      data: { email: email },
      onSuccess,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const credentials = {
      email: email,
      password: password,
      nickname: nickname,
    };

    const onSuccess = () => {
      console.log("회원가입 onSuccess");
    };

    requestData({
      option: "POST",
      url: "/members/join",
      data: credentials,
      onSuccess,
    });
  };

  return (
    <S.Wrapper>
      <S.JoinForm className="container" onSubmit={handleSubmit}>
        <InputWithTitle
          name="email"
          type="email"
          title="아이디(이메일)"
          placeholder="사용하실 ID를 입력해주세요.(수신 가능 E-mail)"
          onChange={handleEmailChange}
          message={emailMessage}
          buttonText="인증번호 받기"
          onClick={handleSendClick}
          onDisabled={isSendDisabled || isCodeValid}
        />
        <EmailVerification
          remainingTime={remainingTime}
          setTime={setRemainingTime}
          isBtnDisabled={isSendDisabled}
          setBtnDisabled={setIsSendDisabled}
          verificationNum={verificationNumber}
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
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  `,
  JoinForm: styled.form`
    display: flex;
    flex-direction: column;
    height: 500px;
    padding: 50px;
    margin-bottom: 30px;
  `,
  ButtonBox: styled.button`
    height: 40px;
    background-color: #f9f2f2;
    border: none;
  `,
};

export default Join;
