import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FaRegHandRock } from "react-icons/fa";

// footer가 적용될 페이지(모두 양옆 마진 붙음)
const footerPage = ["/gyms"];

const Footer = () => {
  const pathName = usePathname();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const needFooter = footerPage.some((url) => pathName?.includes(url));
    setShowFooter(needFooter);
  }, [pathName]);

  if (!showFooter) return;

  return (
    <S.Wrapper $needMargin={true}>
      <S.TitleContainer href={"/"}>
        <FaRegHandRock />
        <S.Title>오르리</S.Title>
      </S.TitleContainer>
      <S.MenuContainer>
        <S.Link className="link-plain" href={"/"}>
          Home
        </S.Link>
        <S.Link className="link-plain" href={"/"}>
          About
        </S.Link>
        <S.Link className="link-plain" href={"/"}>
          Service
        </S.Link>
        <S.Link className="link-plain" href={"/"}>
          Contact us
        </S.Link>
      </S.MenuContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ $needMargin: boolean }>`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;

    padding-left: ${({ $needMargin }) =>
      $needMargin === true ? "10%" : "30px"};
    padding-right: ${({ $needMargin }) =>
      $needMargin === true ? "10%" : "20px"};
  `,
  TitleContainer: styled.a`
    display: flex;
    text-decoration: none;
    font-size: 20px;
    color: #307fe5;
    font-weight: bold;
    &:visited {
      color: #307fe5;
    }
    align-items: center;
  `,
  Title: styled.div`
    margin-left: 3px;
  `,
  MenuContainer: styled.div``,
  Link: styled.a`
    margin-left: 30px;
    font-weight: bold;
  `,
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
};

export default Footer;
