import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import NewGymForm from "@/components/admin/NewGymForm";
import { SERVER_ADDRESS } from "@/constants/constants";
import type { GymData } from "@/constants/gyms/types";

const GymRegistration = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!session) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (formData: GymData) => {
    setIsLoading(true);
    try {
      const id = await createData(formData);
      setIsRegistered(true);
      setIsLoading(false);
      router.push(`/admin/register?id=${id}`);
    } catch (e) {
      // 필요 시 응답 유형에 따른 에러 핸들링
      setIsLoading(false);
      return alert("암장 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const createData = async (input: GymData) => {
    const response = await fetch(`${SERVER_ADDRESS}/gyms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Bearer token
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error();
    const newGym = await response.json();
    return newGym.id; // 추후 서버에서 response로 오는 데이터의 구조에 맞게 수정
  };

  if (status === "loading" || status === "unauthenticated") return null;
  return isRegistered ? (
    <S.Wrapper $isRegistered={isRegistered}>
      <div>
        <FaBuildingCircleCheck size="5rem" />
        <p>암장을 생성했습니다!</p>
      </div>
      <S.Container>
        <S.Button>
          <Link href={`/admin`} replace>홈으로 돌아가기</Link>
        </S.Button>
        <S.Button>
          <Link href={`/gyms/${router.query.id}`} rel="noopener noreferrer" target="_blank">
            내 암장 페이지 보기
          </Link>
        </S.Button>
      </S.Container>
    </S.Wrapper>
  ) : (
    <S.Wrapper $isRegistered={isRegistered}>
      {router.query.id}
      <h1>내 암장 등록하기</h1>
      <NewGymForm handleSubmit={handleSubmit} disableForm={isLoading} />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ $isRegistered: boolean }>`
    border-radius: 6px;
    padding: 24px;
    width: 500px;
    margin: auto;
    margin-top: ${({ $isRegistered }) => ($isRegistered ? "120px" : null)};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ $isRegistered }) => ($isRegistered ? "50px" : "30px")};
    text-align: center;
    & p {
      font-size: 1.2rem;
      font-weight: 700;
    }
  `,
  Container: styled.div`
    display: flex;
    gap: 24px;
  `,
  Button: styled.div`
    background: #307fe5;
    color: white;
    padding: 24px;
    border-radius: 12px;
    display: grid;
    width: 160px;
    place-content: center center;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    & a {
      color: white;
      text-decoration: none;
    }
  `,
};

export default GymRegistration;
