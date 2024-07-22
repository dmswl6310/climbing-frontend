import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import React from "react";
import { requestData } from "@/service/api";
import InputWithTitle from "@/components/common/InputWithTitle";
import {
  CONFIRM_MESSAGE,
  NICKNAME_REGREX,
  PASSWORD_REGREX,
} from "@/constants/login/constants";
import handleSignOut from "@/service/api/logout";
import { COLOR } from "@/styles/global-color";

const ChangeNickname = () => {
  // 현재 정보업데이트시 비밀번호 미사용

  const { data: session, update } = useSession();
  //   const [isPasswordValid, setIsPasswordValid] = useState(false);
  // const [passwordMessage, setPasswordMessage] = useState("");

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");

  // const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [infoFromServer, setInfoFromServer] = useState({
    email: "",
    nickname: "",
  });

  useEffect(() => {
    const onSuccess = (data: { email: string; nickname: string }) => {
      setInfoFromServer({ email: data.email, nickname: data.nickname });
    };
    requestData({
      option: "GET",
      url: "/members/myInfo",
      session,
      hasBody: true,
      onSuccess,
      update,
    });
  }, [session]);

  // const handlePasswordChange = (event: {
  //   target: {
  //     value: string;
  //   };
  // }) => {
  //   const currentPassword = event.target.value;

  //   if (!PASSWORD_REGREX.test(currentPassword)) {
  //     setPasswordMessage(
  //       "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
  //     );
  //     setIsPasswordValid(false);
  //   } else {
  //     setPasswordMessage("");
  //     setIsPasswordValid(true);
  //     setPassword(currentPassword);
  //   }
  // };

  const handleNicknameChange = async (event: {
    target: {
      value: string;
    };
  }) => {
    const currentNickname = event.target.value;

    if (!NICKNAME_REGREX.test(currentNickname)) {
      setNicknameMessage("닉네임은 2자이상이어야 합니다.");
      setIsNicknameValid(false);
    } else if (currentNickname === infoFromServer.nickname) {
      setNicknameMessage("기존 닉네임(변경 풀필요)");
      setIsNicknameValid(true);
      setNickname(currentNickname);
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const onSuccess = () => {
      handleSignOut();
      // .then(() => getLoginInfos(infoFromServer.email, password))
      // .then((user) => {
      //   signIn("credentials", {
      //     email: infoFromServer.email,
      //     nickname: user.user.nickname,
      //     accessToken: user.jwt.accessToken,
      //     refreshToken: user.jwt.refreshToken,
      //     loginType: "general",
      //     redirect: true,
      //     callbackUrl: "/settings",
      //   });
      // });
    };
    return requestData({
      option: "PUT",
      url: "/members/update",
      session,
      data: { nickname: nickname },
      hasBody: false,
      onSuccess,
      update,
    });
  };

  return (
    <S.Wrapper>
      <S.Title>닉네임 변경</S.Title>
      <S.JoinForm onSubmit={handleSubmit}>
        <InputWithTitle
          name="email"
          type="email"
          title="아이디(이메일)"
          isDisabled={true}
          defaultValue={infoFromServer.email}
        />
        {/* <InputWithTitle
          name="password"
          type="password"
          title="비밀번호"
          onChange={handlePasswordChange}
          message={passwordMessage}
        /> */}
        <InputWithTitle
          name="nickname"
          title="닉네임"
          onChange={handleNicknameChange}
          message={nicknameMessage}
          defaultValue={infoFromServer.nickname}
        />
        <S.ButtonBox type="submit" disabled={!isNicknameValid}>
          저장하기
        </S.ButtonBox>
      </S.JoinForm>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 400px;
    width: 500px;
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    border: 1px solid ${COLOR.BORDER_UNFOCUSED};
    margin-bottom: 20px;
  `,
  Title: styled.h2`
    text-align: left;
  `,
  JoinForm: styled.form`
    display: flex;
    flex-direction: column;
    height: 250px;
    padding: 30px;
    margin-bottom: 30px;
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
export default ChangeNickname;
