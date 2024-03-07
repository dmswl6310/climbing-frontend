import { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import { CgProfile } from "react-icons/cg";
import { MdNavigateNext } from "react-icons/md";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { signOut } from "next-auth/react";

interface SidebarDetailProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  account: String;
}

const SidebarDetails = ({
  showSidebar,
  setShowSidebar,
  account,
}: SidebarDetailProps) => {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    showSidebar && (
      <S.SidebarWrapper>
        <S.CloseButton onClick={() => setShowSidebar(false)}>
          <IoClose size="20" />
        </S.CloseButton>
        <S.ProfileContainer
          href={"/settings"}
          onClick={() => setShowSidebar(false)}
        >
          <CgProfile size="50" />
          <S.TextWrapper>{account}님!</S.TextWrapper>
          <MdNavigateNext size="30" />
        </S.ProfileContainer>
        <S.CategoryContainer>
          <S.ItemWrapper>
            <S.Link href={"/"}>1:1 문의</S.Link>
          </S.ItemWrapper>
          <hr />
          <S.ItemWrapper>
            <S.Link href={"/"}>FAQ</S.Link>
          </S.ItemWrapper>
          <hr />
          <S.ItemWrapper>
            <S.Link href={"/"}>공지사항</S.Link>
          </S.ItemWrapper>
        </S.CategoryContainer>
        <S.ButtonBox onClick={handleSignOut}>로그아웃</S.ButtonBox>
      </S.SidebarWrapper>
    )
  );
};

const S = {
  SidebarWrapper: styled.div`
    border: 3px solid #f9f2f2;
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 500px;
    padding: 50px;
  `,
  ProfileContainer: styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    text-decoration: none;
    color: inherit;
  `,
  TextWrapper: styled.h3`
    margin-left: 10px;
  `,
  CategoryContainer: styled.ul`
    padding: 10px;
    background-color: #f9f2f2;
    border-radius: 5px;
  `,
  ItemWrapper: styled.li`
    list-style: none;
  `,
  Link: styled(Link)`
    text-decoration: none;
    color: inherit;
  `,
  ButtonBox: styled.div`
    border-radius: 5px;
    background-color: #f9f2f2;
    border: none;
    padding: 10px;
    text-align: center;

    cursor: pointer;
  `,
  CloseButton: styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
  `,
};

export default SidebarDetails;
