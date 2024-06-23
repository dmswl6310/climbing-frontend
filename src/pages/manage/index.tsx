import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import ManageLayout from "@/components/manage/ManageLayout";
import ErrorFallback from "@/components/common/ErrorFallback";
import Overview from "@/components/manage/Overview";
import { requestData } from "@/service/api";
import { COLOR } from "@/styles/global-color";
import GymList from "@/components/manage/GymList";
import { SERVER_ADDRESS } from "@/constants/constants";

type GymListItem = {
  name: string;
  id: number;
};

const ManageHome = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gymList, setGymList] = useState<GymListItem[] | null>(null);

  // console.log(isError);

  useEffect(() => {
    // if (!session) router.push({ pathname: "/login" });

    const handleSuccess = (data: GymListItem[]) => {
      setGymList(data);
      setIsLoading(false);
    };

    const handleError = (e: Error) => {
      // console.log(e);
      setIsLoading(false);
      setIsError(true);
    };

    fetch(`${SERVER_ADDRESS}/gyms`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length < 1) return handleSuccess([]);
        handleSuccess(data);
      })
      .catch((e) => handleError(e));

    // requestData({
    //   option: "GET",
    //   url: `/${session?.user.email}`,
    //   // token: session.jwt.accessToken,
    //   onSuccess: handleSuccess,
    //   onError: handleError,
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return null;
  if (isError)
    return (
      <ManageLayout>
        <ErrorFallback error={"Server error"} resetErrorBoundary={() => {}} />
      </ManageLayout>
    );
  return (
    <ManageLayout>
      <h1 style={{ margin: 0 }}>내 암장</h1>
      <Wrapper>
        {gymList && gymList.length >= 1 ? (
          <>
            {gymList?.map((gym) => <GymList key={gym.id} id={gym.id.toString()} name={gym.name} />)}
            <br />
            <Btn onClick={() => router.push("/manage/register")}>+ 암장 등록</Btn>
          </>
        ) : (
          <>
            <Message>현재 관리하고 있는 암장이 없습니다.</Message>
            <Btn onClick={() => router.push("/manage/register")}>+ 암장 등록</Btn>
          </>
        )}
      </Wrapper>
    </ManageLayout>
  );
};

const Wrapper = styled.div`
  background: white;
  border: 1px solid #d0d0d0;
  padding: 32px 40px;
`;

const Message = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Btn = styled.div`
  background: ${COLOR.MAIN};
  color: white;
  padding: 1rem;
  border-radius: 12px;
  display: grid;
  width: 160px;
  place-content: center center;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;

export default ManageHome;
