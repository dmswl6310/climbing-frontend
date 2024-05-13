import { ChangeEvent, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { HiOutlineChat, HiOutlineCog, HiOutlineHome } from "react-icons/hi";
import { MdOutlineComment } from "react-icons/md";
import { requestData } from "@/service/api";
import { NavContext, type NavStateProps } from "@/NavContext";

const ManageLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const { gymList, setGymList, selectedGymId, setSelectedGymId } = useContext(
    NavContext,
  ) as NavStateProps;

  useEffect(() => {
    // const onSuccess = (data: any) => {
    //   if (data.length < 1) return setGymList([]);
    //   setGymList(data[0].gyms);
    //   if (router.query.id) {
    //     setSelectedGymId(router.query.id as string);
    //   } else {
    //     setSelectedGymId(data[0].gyms[0].id);
    //   }
    // };
    // const onError = (e: Error) => {};
    // requestData({
    //   option: "GET",
    //   url: `/gymids?user=${"userid"}`,
    //   onSuccess,
    //   onError,
    // });
    if (!selectedGymId) {
      // 백엔드 준비되면 수정
      const onFetch = (data: any) => {
        const init = data[0].gyms ?? [];
        setGymList(init);
        if (router.query.id) setSelectedGymId(router.query.id as string);
        else if (!selectedGymId) setSelectedGymId(selectedGymId);
        else setSelectedGymId(data[0].gyms[0].id);
      };
      fetch("http://localhost:8000/gymids?user=hopp")
        .then((res) => res.json())
        .then(onFetch)
        .catch((e) => console.log(e));
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
          <select value={selectedGymId ?? ""} onChange={handleSelectChange}>
            {gymList.map(({ id, name }, i) => (
              <option key={i} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
        <S.Header>
          <HiOutlineHome size="1.3rem" />
          <Link href="/manage">
            <strong>메인 화면</strong>
          </Link>
        </S.Header>
        <div>
          <S.Header>
            <HiOutlineCog size="1.3rem" />
            <strong>암장 정보 관리</strong>
          </S.Header>
          <S.Links>
            <li>
              <Link href={{ pathname: `/manage/edit/${selectedGymId}`, query: { p: "1" } }}>
                기본 정보
              </Link>
            </li>
            <li>
              <Link href={{ pathname: `/manage/edit/${selectedGymId}`, query: { p: "2" } }}>
                상세 정보
              </Link>
            </li>
          </S.Links>
        </div>
        <S.Header>
          <MdOutlineComment size="1.3rem" />
          <Link href={`/manage/comments/${selectedGymId}`}>
            <strong>댓글 관리</strong>
          </Link>
        </S.Header>
        <S.Header>
          <HiOutlineChat size="1.3rem" />
          <Link href={`/manage/chat/${selectedGymId}`}>
            <strong>1:1 문의</strong>
          </Link>
        </S.Header>
      </S.Menu>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    min-height: calc(100vh - 82px);
    border-top: 1px solid #d0d0d0;
    border-bottom: 1px solid #d0d0d0;
    a {
      text-decoration: none;
    }
  `,
  Menu: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 36px 42px;
    min-width: 230px;
    max-width: 280px;
    gap: 1.3rem;
    border-right: 1px solid #d0d0d0;
    select {
      border-radius: 0.4rem;
      padding: 0 0.4rem;
      width: 100%;
      text-overflow: ellipsis;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  Content: styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    gap: 36px;
    background: #fafaf8;
    padding: 36px 63px;
    & input:focus,
    textarea:focus,
    select:focus {
      outline: none;
    }
  `,
  Links: styled.ul`
    margin: 0;
    margin-top: 0.8rem;
    list-style-type: circle;
    & li {
      margin-bottom: 10px;
    }
  `,
};

export default ManageLayout;
