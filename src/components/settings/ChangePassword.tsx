import { useSession } from "next-auth/react";
import { useState } from "react";
import InputWithTitle from "../common/InputWithTitle";
import { PASSWORD_REGREX } from "@/constants/login/constants";
import { styled } from "styled-components";
import { requestData } from "@/service/api";
import handleSignOut from "@/service/api/logout";
import { COLOR } from "@/styles/global-color";
import sha256 from "crypto-js/sha256";

const ChangePassword = () => {
  const { status, data: session, update } = useSession();

  const [isCurrentValid, setIsCurrentValid] = useState(false);
  const [CurrentMessage, setCurrentMessage] = useState("");

  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [newPasswordMessage, setNewPasswordMessage] = useState("");

  const [isReEnterPasswordValid, setIsReEnterPasswordValid] = useState(false);
  const [reEnterPasswordMessage, setReEnterPasswordMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCurrentChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentPassword = event.target.value;

    if (currentPassword.length <= 0) {
      setIsCurrentValid(false);
    } else {
      setCurrentMessage("");
      setIsCurrentValid(true);
      setCurrentPassword(currentPassword);
    }
  };

  const handleNewPasswordChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentNewPassword = event.target.value;

    if (!PASSWORD_REGREX.test(currentNewPassword)) {
      setNewPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsNewPasswordValid(false);
    } else {
      setNewPasswordMessage("");
      setIsNewPasswordValid(true);
      setNewPassword(currentNewPassword);
    }
  };

  const handleReEnterPasswordChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentReEnterpassword = event.target.value;
    if (currentReEnterpassword !== newPassword) {
      setReEnterPasswordMessage("비밀번호가 같지 않습니다.");
      setIsReEnterPasswordValid(false);
    } else {
      setReEnterPasswordMessage("");
      setIsReEnterPasswordValid(true);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const onSuccess = () => {
      alert(`비밀번호가 변경되었습니다.
재로그인 하시기 바랍니다.`);
      return handleSignOut();
    };

    requestData({
      option: "PUT",
      url: "/members/update-password",
      data: {
        beforePassword: sha256(currentPassword).toString(),
        afterPassword: sha256(newPassword).toString(),
      },
      session,
      onSuccess,
      hasBody: false,
      update,
    });
  };

  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }
  return (
    <S.Wrapper>
      <S.Title>비밀번호 변경</S.Title>
      <S.JoinForm onSubmit={handleSubmit}>
        <InputWithTitle
          name="currentPassword"
          type="password"
          title="현재 비밀번호"
          onChange={handleCurrentChange}
          message={CurrentMessage}
        />
        <InputWithTitle
          name="newPassword"
          type="password"
          title="새 비밀번호"
          onChange={handleNewPasswordChange}
          message={newPasswordMessage}
        />
        <InputWithTitle
          name="reEnterNewPassword"
          type="password"
          title="새 비밀번호 확인"
          onChange={handleReEnterPasswordChange}
          message={reEnterPasswordMessage}
        />
        <S.ButtonBox
          type="submit"
          disabled={
            !(isCurrentValid && isNewPasswordValid && isReEnterPasswordValid)
          }
        >
          저장하기
        </S.ButtonBox>
      </S.JoinForm>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 500px;
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
    height: 350px;
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
export default ChangePassword;
