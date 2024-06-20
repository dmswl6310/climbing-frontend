import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import NewGymForm from "@/components/manage/NewGymForm";
import { SERVER_ADDRESS } from "@/constants/constants";
import { COLOR } from "@/styles/global-color";
import type { BaseGymData } from "@/constants/gyms/types";

const GymRegistration = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (formData: BaseGymData) => {
    setIsLoading(true);
    try {
      const id = await createData(formData);
      setIsRegistered(true);
      setIsLoading(false);
      router.push(`/manage/register?id=${id}`);
    } catch (e) {
      // 필요 시 응답 유형에 따른 에러 핸들링
      setIsLoading(false);
      return alert("암장 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const createData = async (input: BaseGymData) => {
    if (!session) throw new Error("로그인한 유저가 아닙니다.");
    const response = await fetch(`${SERVER_ADDRESS}/gyms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.jwt.accessToken}`,
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("문제가 발생했습니다.");
    const newGym = await response.json();
    return newGym.id;
  };

  if (!session) return null;
  return isRegistered ? (
    <S.Wrapper $isRegistered={isRegistered}>
      <div>
        <FaBuildingCircleCheck size="5rem" />
        <p>암장을 생성했습니다!</p>
      </div>
      <S.Container>
        <S.Button>
          <Link href={`/manage`} replace>
            홈으로 돌아가기
          </Link>
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
    background: ${COLOR.MAIN};
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
