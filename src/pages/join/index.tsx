import InputWithTitle from "@/components/InputWithTitle";
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
      // const res = await fetch(`http://localhost:3000/members/emailCheck`);
      // const data = await res.json();

      // 서버 없어서 임시 로직 적용(5자 이상일시 valid)
      if (currentEmail.length < 5) {
        setEmailMessage("중복된 이메일 입니다.");
        setIsEmailValid(false);
      } else {
        // 중복이 없을때 사용가능
        setEmailMessage("");
        setIsEmailValid(true);
        setEmail(currentEmail);
      }
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
    const nicknameRegrex = /^[가-힣A-Za-z0-9_]{3,}$/;

    if (!nicknameRegrex.test(currentNickname)) {
      setNicknameMessage("닉네임은 3자이상이어야 합니다.");
      setIsNicknameValid(false);
    } else {
      // const res = await fetch(`http://localhost:3000/members/emailCheck`);
      // const data = await res.json();

      // 서버 없어서 임시 로직 적용(5자 이상일시 valid)
      if (currentNickname.length < 5) {
        setNicknameMessage("중복된 닉네임 입니다.");
        setIsNicknameValid(false);
      } else {
        // 중복이 없을때 사용가능
        setNicknameMessage("");
        setIsNicknameValid(true);
        setNickname(currentNickname);
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const credentials = {
      username: { label: email, type: "email" },
      password: { label: password, type: "password" },
      nickname: { label: nickname, type: "nickname" },
    };

    const response = await fetch("http://localhost:3000/members/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.ok) {
      //정상적 회원가입
      // return {
      //   name: data.name,
      //   email: data.email,
      //   token: data.token,
      // };
    } else {
      return null as any;
    }
  };

  return (
    <S.Wrapper>
      <S.JoinForm className="container" onSubmit={handleSubmit}>
        <InputWithTitle
          name="email"
          type="email"
          title="아이디(이메일)"
          onChange={handleEmailChange}
          message={emailMessage}
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
            isEmailValid &&
            isNicknameValid &&
            isPasswordValid &&
            isReEnterPasswordValid
              ? false
              : true
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
