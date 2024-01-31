import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

const OtherLogin = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>다른 방법으로 로그인</button>
    </>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default OtherLogin;
