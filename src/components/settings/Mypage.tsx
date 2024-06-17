import { useSession } from "next-auth/react";
import { styled } from "styled-components";
import ChangeNickname from "./ChangeNickname";
import ChangePassword from "./ChangePassword";

const Mypage = () => {
  const { status } = useSession();

  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <S.Container>
      <ChangeNickname />
      <ChangePassword />
    </S.Container>
  );
};

const S = {
  Container: styled.div``,
};
export default Mypage;
