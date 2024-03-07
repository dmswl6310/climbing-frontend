import Mypage from "@/components/settings/Mypage";
import { useState } from "react";
import { styled } from "styled-components";

const Settings = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (currentPage == page) return;
    setCurrentPage(page);
  };

  return (
    <S.Wrapper>
      <S.Sidebar>
        <h3>설정</h3>
        <S.Link onClick={() => handlePageChange(1)}>내 정보</S.Link>
        <S.Link onClick={() => handlePageChange(2)}>1:1 문의</S.Link>
      </S.Sidebar>
      <S.Main>{currentPage === 1 ? <Mypage /> : <>1:1문의</>}</S.Main>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Sidebar: styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 20vw;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    gap: 36px;
    background: #fafaf8;
    padding: 36px;
  `,
  Link: styled.div`
    cursor: pointer;
    margin: 10px 0;

    &:hover {
      color: #1aabff;
    }
  `,
};

export default Settings;
