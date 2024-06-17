import styled from "styled-components";
import Image from "next/image";
import NaverIcon from "../../../public/naver_medium.png";
import GoogleIcon from "../../../public/google_rec.png";
import KakaoIcon from "../../../public/kakao_medium.png";
import { useRouter } from "next/router";

// 백엔드로 리다이렉트(백엔드에서 인가코드->토큰받고 프론트로 보내줌)
const OtherLogin = () => {
  const router = useRouter();

  const handleNaverLogin = () => {
    //     router.push(`https://nid.naver.com/oauth2.0/authorize?
    // response_type=code
    // &client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}
    // &redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}
    // &state=${process.env.NEXT_PUBLIC_NAVER_STATE}`);
    router.push(
      `http://ec2-3-37-207-190.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver`
    );
  };

  const handleGoogleLogin = () => {
    //     router.push(`https://accounts.google.com/o/oauth2/v2/auth?
    // client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
    // &redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
    // &response_type=code
    // &scope=email profile`);
    router.push(
      `http://ec2-3-37-207-190.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google`
    );
  };

  const handleKakaoLogin = () => {
    //     router.push(`https://kauth.kakao.com/oauth/authorize?
    // client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}
    // &redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}
    // &response_type=code
    // &scope=account_email`);
    router.push(
      `http://ec2-3-37-207-190.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao`
    );
  };

  return (
    <S.Wrapper>
      <S.IconContainer>
        <S.Icon className="btn-plain" onClick={handleNaverLogin}>
          <Image src={NaverIcon} alt="네이버 아이콘" height={35} />
        </S.Icon>
        <S.Icon className="btn-plain" onClick={handleKakaoLogin}>
          <Image src={KakaoIcon} alt="카카오 아이콘" height={35} />
        </S.Icon>
        <S.Icon className="btn-plain" onClick={handleGoogleLogin}>
          <Image src={GoogleIcon} alt="구글 아이콘" height={35} />
        </S.Icon>
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
  Icon: styled.button``,
  IconContainer: styled.div`
    margin-top: 10px;
    display: flex;
    width: 360px;
    justify-content: space-between;
  `,
};
export default OtherLogin;
