import InputWithTitle from "@/components/common/InputWithTitle";
import { COLOR } from "@/styles/global-color";
import { useState } from "react";
import styled from "styled-components";
import { CONFIRM_MESSAGE, NICKNAME_REGREX } from "@/constants/login/constants";
import { requestData } from "@/service/api";
import router, { useRouter } from "next/router";

const AdditionalJoin = () => {
  const { query } = useRouter();

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nickname, setNickname] = useState("");

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const credentials = {
      email: query.email,
      nickname: nickname,
    };

    const onSuccess = () => {
      router.push({
        pathname: "/join/result",
        query: { nickname: nickname, email: query.email },
      });
    };

    requestData({
      option: "PUT",
      url: "/members/oauth2/update",
      data: credentials,
      onSuccess,
      hasBody: false,
    });
  };

  return (
    <S.Container>
      <S.Title>간편 회원가입</S.Title>
      <S.SubTitle>서비스 가입이 거의 완료 되었습니다.</S.SubTitle>
      <S.SubTitle>
        사용하실 <S.HighlightText>닉네임</S.HighlightText>을 입력해주세요.
      </S.SubTitle>
      <S.InputWrapper>
        <InputWithTitle
          name="nickname"
          title=""
          onChange={handleNicknameChange}
          message={nicknameMessage}
          placeholder="닉네임"
        />
      </S.InputWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton disabled={!isNicknameValid} onClick={handleSubmit}>
          가입하기
        </S.SubmitButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    height: 500px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
  `,
  SubTitle: styled.div`
    margin-bottom: 5px;
  `,
  Title: styled.h2``,
  InputWrapper: styled.div`
    width: 350px;
    margin: 30px auto;
    margin-bottom: 5px;
  `,
  HighlightText: styled.span`
    color: ${COLOR.MAIN};
  `,
  ButtonWrapper: styled.div``,
  SubmitButton: styled.button`
    &:disabled {
      opacity: 0.3;
    }
    cursor: pointer;
    width: 350px;
    background-color: ${COLOR.MAIN};
    border: 1px solid ${COLOR.MAIN};
    color: white;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  `,
};

export default AdditionalJoin;
