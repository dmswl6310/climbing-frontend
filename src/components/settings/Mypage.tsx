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

const Mypage = () => {
  // 현재 정보업데이트시 비밀번호 미사용

  const { data: session, status } = useSession();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  // const [passwordMessage, setPasswordMessage] = useState("");

  const [isNicknameValid, setIsNicknameValid] = useState(true);
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
      token: `${session?.jwt.accessToken}`,
      hasBody: true,
      onSuccess,
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
      token: session!.jwt.accessToken,
      data: { nickname: nickname },
      hasBody: false,
      onSuccess,
    });
  };

  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <S.Wrapper>
      <S.JoinForm className="container" onSubmit={handleSubmit}>
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
          저장 후 로그아웃
        </S.ButtonBox>
      </S.JoinForm>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 700px;
    width: 600px;
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
export default Mypage;
