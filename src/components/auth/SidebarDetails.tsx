import { styled } from "styled-components";
import { CgProfile } from "react-icons/cg";
import { MdNavigateNext } from "react-icons/md";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import handleSignOut from "@/service/api/logout";
import { COLOR } from "@/styles/global-color";
import { SidebarDetailProps } from "@/constants/sideBar/type";

const SidebarDetails = ({
  showSidebar,
  setShowSidebar,
  account,
}: SidebarDetailProps) => {
  return (
    <S.SidebarWrapper
      className={`container sliding ${showSidebar ? "sideOpen" : "sideClose"}`}
    >
      <S.BarContainer>
        {showSidebar && (
          <S.CloseButton onClick={() => setShowSidebar(!showSidebar)}>
            <IoClose size="20" />
          </S.CloseButton>
        )}
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
            <S.Link href={"/manage"}>관리자 페이지</S.Link>
          </S.ItemWrapper>
          <hr />
          <S.ItemWrapper>
            <S.Link href={"/"}>공지사항</S.Link>
          </S.ItemWrapper>
          <hr />
          <S.ItemWrapper>
            <S.Link href={"/settings"}>설정</S.Link>
          </S.ItemWrapper>
        </S.CategoryContainer>
        <S.ButtonBox onClick={handleSignOut}>로그아웃</S.ButtonBox>
      </S.BarContainer>
    </S.SidebarWrapper>
  );
};

const S = {
  SidebarWrapper: styled.div`
    &.sliding {
      transition: 0.8s ease-in-out;
    }
    &.sideOpen {
      width: 400px;
    }
    &.sideClose {
      width: 0px;
    }
    border-top-right-radius: 0px;
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    height: 450px;
  `,
  BarContainer: styled.div`
    padding: 40px;
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
    border: 3px solid ${COLOR.LIGHT_MAIN};
    background-color: white;
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
    background-color: ${COLOR.MAIN};
    color: white;
    font-weight: bold;
    border: none;
    padding: 10px;
    text-align: center;
    margin-top: 50px;

    cursor: pointer;
  `,
  CloseButton: styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
  `,
};

export default SidebarDetails;
