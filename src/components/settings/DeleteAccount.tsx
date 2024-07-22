import { requestData } from "@/service/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { styled } from "styled-components";
import InputWithTitle from "../common/InputWithTitle";
import { IoWarning } from "react-icons/io5";
import { COLOR } from "@/styles/global-color";
import { FaCircleCheck } from "react-icons/fa6";
import handleSignOut from "@/service/api/logout";
import sha256 from "crypto-js/sha256";

const DeleteAccount = () => {
  const { data: session, status, update } = useSession();

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
      session,
      data: {
        checkPassword: sha256(password).toString(),
      },
      onSuccess,
      onError,
      hasBody: false,
      update,
    });
  };
  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    // 체크박스 추가 필요
    <S.Wrapper>
      <S.TitleContainer>
        <S.IconWrapper>
          <IoWarning size="50" color={COLOR.WARNING} />
        </S.IconWrapper>
        <S.Title>오르리 탈퇴</S.Title>
      </S.TitleContainer>
      <S.SubTitle>
        본 서비스를 탈퇴하시면, 암장 등록 및 관리, 채팅, 북마크 기능을 사용하실
        수 없습니다.
      </S.SubTitle>
      <S.SubTitle>
        탈퇴 신청 즉시, 저장된 모든 정보가 삭제되며, 삭제한 정보는 다시 복구할
        수 없습니다.
      </S.SubTitle>
      <S.CheckContainer onClick={handleCheckClick} $isChecked={isChecked}>
        <FaCircleCheck
          size="20"
          color={isChecked ? COLOR.WARNING : COLOR.BORDER_UNFOCUSED}
        />
        <div>안내사항을 확인하였으며, 이에 동의합니다.</div>
      </S.CheckContainer>
      <S.InputWrapper>
        <InputWithTitle
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          onChange={handlePasswordChange}
          message={passwordMessage}
        />
      </S.InputWrapper>
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
    height: 500px;
    width: 700px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 30px;
    border-radius: 5px;
    border: 1px solid ${COLOR.BORDER_UNFOCUSED};
  `,
  TitleContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  `,
  Title: styled.h1``,
  SubTitle: styled.h4`
    padding: 0;
    margin: 10px 0;
  `,
  IconWrapper: styled.div``,
  CheckContainer: styled.div<{ $isChecked: boolean }>`
    border-radius: 5px;
    border: 1px solid
      ${({ $isChecked }) =>
        $isChecked ? COLOR.WARNING : COLOR.BORDER_UNFOCUSED};
    border-width: ${({ $isChecked }) => ($isChecked ? "2px" : "1px")};
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 5px;
  `,
  InputWrapper: styled.div`
    width: 250px;
    margin: 10px;
    justify-content: center;
    align-items: center;
  `,
  ButtonBox: styled.button`
    &:disabled {
      opacity: 0.3;
    }
    cursor: pointer;
    width: 320px;
    background-color: ${COLOR.WARNING};
    border: 1px solid ${COLOR.WARNING};
    color: white;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    // font-weight: bold;
  `,
};
export default DeleteAccount;
