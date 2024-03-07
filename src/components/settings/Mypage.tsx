import { useSession } from "next-auth/react";
import { useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import React from "react";

const Mypage = () => {
  // 현재는 세션이 있을때 메이페이지가 보이지만 추후 백엔드 요청시 정보가 있을때만 표시
  const { data: session, status } = useSession();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isReEnterPasswordValid, setIsReEnterPasswordValid] = useState(false);
  const [reEnterPasswordMessage, setReEnterPasswordMessage] = useState("");

  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState("");

  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const router = useRouter();

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
      username: { label: session!.user!.email, type: "email" },
      password: { label: password, type: "password" },
      nickname: { label: nickname, type: "nickname" },
    };

    const response = await fetch("http://localhost:3000/members/update", {
      method: "UPDATE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // const data = await response.json();

    router.reload();
    // if (data.ok) {
    //   //정상적 업데이트 => 현재페이지 재표시
    //   router.reload();
    // } else {
    //   return null as any;
    // }
  };

  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <S.TableContainer onSubmit={handleSubmit}>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td width="150px">아이디(이메일)</td>
            <td>서버에서 준 아이디</td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <S.Input
                name="password"
                type="password"
                $hasMessage={passwordMessage !== ""}
                onChange={handlePasswordChange}
              ></S.Input>
              <S.Warning>{passwordMessage}</S.Warning>
            </td>
          </tr>
          <tr>
            <td>비밀번호 재확인</td>
            <td>
              <S.Input
                name="reEnterPassword"
                type="password"
                $hasMessage={reEnterPasswordMessage !== ""}
                onChange={handleReEnterPasswordChange}
              ></S.Input>
              <S.Warning>{reEnterPasswordMessage}</S.Warning>
            </td>
          </tr>
          <tr>
            <td>닉네임</td>
            <td>
              <S.Input
                name="nickname"
                type="text"
                $hasMessage={nicknameMessage !== ""}
                onChange={handleNicknameChange}
                defaultValue={"서버로 부터 받은 닉네임"}
              ></S.Input>
              <S.Warning>{nicknameMessage}</S.Warning>
            </td>
          </tr>
        </tbody>
      </table>
      <S.ButtonBox
        type="submit"
        disabled={
          isNicknameValid && isPasswordValid && isReEnterPasswordValid
            ? false
            : true
        }
      >
        저장하기
      </S.ButtonBox>
    </S.TableContainer>
  );
};

const S = {
  TableContainer: styled.form`
    table {
      width: 600px;
      border-collapse: collapse;
      table-layout: fixed;
    }

    td {
      padding: 5px;
      border: 1px solid black;
      height: 40px;
      padding-left: 10px;
    }
  `,
  ButtonBox: styled.button`
    height: 40px;
    background-color: #f9f2f2;
    border: none;
    margin-top: 10px;
  `,
  Input: styled.input<{ $hasMessage: boolean }>`
    height: 30px;
    outline-color: ${(props) => (props.$hasMessage ? "red" : "green")};
  `,
  Warning: styled.div`
    height: 10px;
    font-size: 12px;
    color: red;
  `,
};
export default Mypage;
