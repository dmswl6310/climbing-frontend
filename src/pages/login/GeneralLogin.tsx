import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { FormEventHandler } from "react";

const GeneralLogin = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const result = await signIn("credentials", {
      username,
      password,
    });

    if (result?.error) {
      // 로그인 실패 시 오류 메시지
    } else {
      console.log("login success");
    }
  };

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <input type="id" name="username" placeholder="username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    margin-bottom: 100px;
  `,
};

export default GeneralLogin;
