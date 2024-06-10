import { requestData } from "@/service/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { styled } from "styled-components";
import InputWithTitle from "../common/InputWithTitle";
import { IoWarning } from "react-icons/io5";
import { COLOR } from "@/styles/global-color";
import { FaCircleCheck } from "react-icons/fa6";
import handleSignOut from "@/service/api/logout";

const DeleteAccount = () => {
  const { data: session, status } = useSession();

  const [isChecked, setIsChecked] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: { target: { value: any } }) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteAccount = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const onSuccess = () => {
      //TODO: 삭제후 로그아웃 논의필요
      alert("계정이 삭제되었습니다.");
      return handleSignOut();
    };

    const onError = (error: Error) => {
      if (error.message === "400") {
        setPasswordMessage("입력하신 내용을 다시 확인해주세요.");
      }
    };

    requestData({
      option: "DELETE",
      url: "/members",
      token: session!.jwt.accessToken,
      data: {
        checkPassword: password,
      },
      onSuccess,
      onError,
      hasBody: false,
    });
  };
  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    // 체크박스 추가 필요
    <S.Wrapper>
      <S.IconWrapper>
        <IoWarning size="50" color={COLOR.WARNING} />
      </S.IconWrapper>
      <h1>오르리 탈퇴</h1>
      <h4>
        본 서비스를 탈퇴하시면, 암장 등록 및 관리, 채팅, 북마크 기능을 사용하실
        수 없습니다.
        <br />
        <br />
        탈퇴 신청 즉시, 저장된 모든 정보가 삭제되며, 삭제한 정보는 다시 복구할
        수 없습니다.
      </h4>
      <S.CheckContainer>
        <FaCircleCheck
          size="50"
          color={isChecked ? COLOR.LIGHT_MAIN : COLOR.DISABLED}
          onClick={handleCheckClick}
        />
        <div>안내사항을 확인하였으며, 이에 동의합니다.</div>
      </S.CheckContainer>
      <InputWithTitle
        name="password"
        title=""
        type="password"
        placeholder="비밀번호 입력"
        onChange={handlePasswordChange}
        message={passwordMessage}
      />
      <S.ButtonBox
        onClick={handleDeleteAccount}
        disabled={!isChecked || password === ""}
      >
        회원 탈퇴
      </S.ButtonBox>
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
  IconWrapper: styled.div``,
  CheckContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ButtonBox: styled.button`
    height: 40px;
    background-color: #f9f2f2;
    border: none;
  `,
};
export default DeleteAccount;
