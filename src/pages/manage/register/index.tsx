import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import NewGymForm from "@/components/manage/NewGymForm";
import { requestData } from "@/service/api";
import { COLOR } from "@/styles/global-color";
import type { BaseGymData } from "@/constants/gyms/types";

const GymRegistration = () => {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [newGymId, setNewGymId] = useState();

  const handleSubmit = async (formData: BaseGymData) => {
    if (!session) return;
    setIsLoading(true);
    requestData({
      option: "POST",
      url: "/gyms",
      session,
      update,
      data: formData,
      onSuccess: (response) => {
        setIsRegistered(true);
        setIsLoading(false);
        setNewGymId(response.id);
      },
      onError: () => {
        setIsLoading(false);
        return alert("암장 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      },
    });
  };

  if (!session) return null;
  return isRegistered && newGymId ? (
    <S.Wrapper $isRegistered={isRegistered}>
      <div>
        <FaBuildingCircleCheck size="5rem" />
        <p>암장을 생성했습니다!</p>
      </div>
      <S.Container>
        <Link href={`/manage`} replace>
          <S.Button>홈으로 돌아가기</S.Button>
        </Link>
        <Link
          href={`/gyms/${newGymId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <S.Button>내 암장 페이지 보기</S.Button>
        </Link>
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
    a {
      text-decoration: none;
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
