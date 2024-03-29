import styled from "styled-components";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import NaverIcon from "../../../public/naver_rec.png";
import GoogleIcon from "../../../public/google_rec.png";
import KakaoIcon from "../../../public/kakao_rec.png";
import Link from "next/link";

// 세션 사용시의 코드
// const OtherLogin = () => {
//   const { data: session } = useSession();

//   if (session) {
//     return (
//       <>
//         Signed in as {session?.user?.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     );
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>다른 방법으로 로그인</button>
//     </>
//   );
// };

// 백엔드에서 세션 처리시 사용할 코드
const OtherLogin = () => {
  return (
    <S.Wrapper>
      <div>간편로그인</div>
      <S.IconContainer>
        <Link href={"/oauth2/authorization/naver"}>
          <Image src={NaverIcon} alt="네이버 아이콘" height={30} />
        </Link>
        <Link href={"/oauth2/authorization/google"}>
          <Image src={GoogleIcon} alt="구글 아이콘" height={30} />
        </Link>
        <Link href={"/oauth2/authorization/kakao"}>
          <Image src={KakaoIcon} alt="카카오 아이콘" height={30} />
        </Link>
      </S.IconContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  IconContainer: styled.div`
    margin-top: 10px;
    display: flex;
    width: 450px;
    justify-content: space-between;
  `,
};
export default OtherLogin;
