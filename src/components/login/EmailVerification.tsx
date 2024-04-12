import { useEffect } from "react";
import { styled } from "styled-components";
import InputWithTitle from "../common/InputWithTitle";
import { EmailVerificationProps } from "@/constants/login/type";

const EmailVerification = ({
  remainingTime,
  setTime,
  isBtnDisabled,
  setBtnDisabled,
  verificationNum,
  isCodeValid,
  setIsCodeValid,
}: EmailVerificationProps) => {
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setTimeout(() => {
        setTime((prevTime: number) => prevTime - 1); // 1초마다 유효시간을 감소
      }, 1000);
    } else {
      setBtnDisabled(false);
    }
    return () => clearTimeout(remainingTime);
  }, [remainingTime, setBtnDisabled, setTime]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const message = "인증코드 유효시간 : " + formatTime(remainingTime);

  const handleBtnClick = (event: {
    preventDefault(): unknown;
    target: { parentElement: { querySelector: (arg0: string) => any } };
  }) => {
    event.preventDefault();
    
    const inputTag = event.target.parentElement.querySelector(
      'input[name="verificationNumber"]'
    );
    const enteredNum = inputTag.value;
    if (enteredNum == verificationNum) {
      setIsCodeValid(true);
      inputTag.disabled = true;
      setTime(0);
    }
  };

  return (
    <InputWithTitle
      name="verificationNumber"
      title="인증코드"
      message={remainingTime > 0 ? message : ""}
      buttonText={isCodeValid ? "✔" : "확인"}
      onClick={handleBtnClick}
      onDisabled={!isBtnDisabled}
    />
  );
};

const S = {
  Container: styled.div``,
};

export default EmailVerification;
