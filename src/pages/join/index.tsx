import InputWithTitle from "@/components/InputWithTitle";
import styled from "styled-components";

const Join = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const credentials = {
      username: { label: event.target.username.value, type: "text" },
      password: { label: event.target.password.value, type: "password" },
      email: { label: event.target.email.value, type: "email" },
      nickName: { label: event.target.nickName.value, type: "nickName" },
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
        <InputWithTitle name="username" title="아이디" />
        <InputWithTitle name="password" title="비밀번호" />
        <InputWithTitle name="reEnterPassword" title="비밀번호 재확인" />
        <InputWithTitle name="nickName" title="닉네임" />
        <InputWithTitle name="email" title="이메일" />
        <S.ButtonBox type="submit">가입하기</S.ButtonBox>
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
