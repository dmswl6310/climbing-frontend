import { ChangeEvent, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {
  HiOutlineChat,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlinePencil,
} from "react-icons/hi";
import { MdOutlineComment } from "react-icons/md";
import { requestData } from "@/service/api";
import { NavContext, type NavStateProps } from "@/NavContext";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";

const ManageLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const { gymList, setGymList, selectedGymId, setSelectedGymId } = useContext(
    NavContext,
  ) as NavStateProps;

  useEffect(() => {
    if (!selectedGymId) {
      const onFetch = (data: any) => {
        console.log(data);
        const gymList = data && data.length >= 1 ? data : [];
        setGymList(gymList);
        if (router.query.id) setSelectedGymId(router.query.id as string);
        else if (selectedGymId) setSelectedGymId(selectedGymId);
        else setSelectedGymId(data[0].id);
      };
      requestData({
        option: "GET",
        url: "/gyms", // 백엔드 준비되면 수정
        onSuccess: onFetch,
        onError: (e) => {
          console.log(e);
          setGymList([]);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGymId(e.target.value);
  };

  return (
    <S.Wrapper>
      <S.Menu>
        {!gymList || gymList.length < 1 ? null : (
          <select
            className="desktop-view"
            value={selectedGymId ?? ""}
            onChange={handleSelectChange}
            style={{ width: "224px" }}
          >
            {gymList.map(({ id, name }, i) => (
              <option key={i} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
        <S.Links>
          <Link href="/manage">
            <S.Header $visiting={router.route === "/manage"}>
              <HiOutlineHome className="desktop-view" size="1.3rem" />
              <HiOutlineHome className="mobile-view" size="2rem" />
              <strong className="desktop-view">내 암장</strong>
              <span className="mobile-view">내 암장</span>
            </S.Header>
          </Link>
          <Link href={{ pathname: `/manage/edit/${selectedGymId}`, query: { p: "1" } }}>
            <S.Header $visiting={router.route.includes("edit") && router.query.p === "1"}>
              <HiOutlinePencil className="desktop-view" size="1.3rem" />
              <HiOutlinePencil className="mobile-view" size="2rem" />
              <strong className="desktop-view">기본 정보 수정</strong>
              <span className="mobile-view">기본 정보</span>
            </S.Header>
          </Link>
          <Link href={{ pathname: `/manage/edit/${selectedGymId}`, query: { p: "2" } }}>
            <S.Header $visiting={router.route.includes("edit") && router.query.p === "2"}>
              <HiOutlineDocumentText className="desktop-view" size="1.3rem" />
              <HiOutlineDocumentText className="mobile-view" size="2rem" />
              <strong className="desktop-view">상세 정보 수정</strong>
              <span className="mobile-view">상세 정보</span>
            </S.Header>
          </Link>
          <Link href={`/manage/comments/${selectedGymId}`}>
            <S.Header $visiting={router.route.includes("comments")}>
              <MdOutlineComment className="desktop-view" size="1.3rem" />
              <MdOutlineComment className="mobile-view" size="2rem" />
              <strong className="desktop-view">댓글 관리</strong>
              <span className="mobile-view">댓글 관리</span>
            </S.Header>
          </Link>
          <Link href={`/manage/chat/${selectedGymId}`}>
            <S.Header $visiting={router.route.includes("chat")}>
              <HiOutlineChat className="desktop-view" size="1.3rem" />
              <HiOutlineChat className="mobile-view" size="2rem" />
              <strong className="desktop-view">1:1 문의</strong>
              <span className="mobile-view">1:1 문의</span>
            </S.Header>
          </Link>
        </S.Links>
      </S.Menu>
      <S.MobileSelect className="mobile-view">
        {!gymList || gymList.length < 1 ? null : (
          <select
            value={selectedGymId ?? ""}
            onChange={handleSelectChange}
            style={{ width: "100%" }}
          >
            {gymList.map(({ id, name }, i) => (
              <option key={i} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
      </S.MobileSelect>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: fixed;
    top: 53px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    border-top: 1px solid ${COLOR.DISABLED};
    a {
      text-decoration: none;
    }
    span.mobile-view {
      font-size: 0.7rem;
    }
    select {
      border-radius: 0.4rem;
      padding: 0.4rem;
      margin-left: auto;
      margin-right: auto;
      text-overflow: ellipsis;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
    }
  `,
  Menu: styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    width: 280px;
    gap: 2rem;
    @media ${DEVICE_SIZE.laptop} {
      padding: 0.5rem 0;
      gap: 0;
      width: 100%;
      border-bottom: 1px solid ${COLOR.DISABLED};
    }
  `,
  Links: styled.div`
    width: 100%;
    @media ${DEVICE_SIZE.desktop} {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    @media ${DEVICE_SIZE.laptop} {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  `,
  MobileSelect: styled.div`
    background: ${COLOR.BACKGROUND_LIGHT};
    padding: 0.75rem;
  `,
  Header: styled.div<{ $visiting: boolean }>`
    display: flex;
    align-items: center;
    text-align: center;
    margin: auto;
    width: 200px;
    gap: 6px;
    padding: 0.3rem 0.75rem;
    color: ${({ $visiting }) => ($visiting ? COLOR.MAIN : "black")};
    transition: 100ms;
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
      width: fit-content;
      border-radius: 0.5rem;
    }
  `,
  Content: styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    gap: 36px;
    background: ${COLOR.BACKGROUND_LIGHT};
    padding: 36px 63px;
    border-left: 1px solid ${COLOR.DISABLED};
    overflow: auto;
    scrollbar-gutter: stable;
    & input:focus,
    textarea:focus,
    select:focus {
      outline: none;
    }
    @media ${DEVICE_SIZE.laptop} {
      padding: 0.75rem;
      gap: 1rem;
      scrollbar-gutter: auto;
      border: none;
    }
  `,
};

export default ManageLayout;
