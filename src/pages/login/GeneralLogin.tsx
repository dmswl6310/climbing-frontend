import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

const GeneralLogin = () => {
  return (
    <S.Wrapper>
      <form>
        <input type="id" name="id" placeholder="Id" required />
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
