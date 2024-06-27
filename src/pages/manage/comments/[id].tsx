import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import { IoTrash } from "react-icons/io5";
import Comment from "@/components/manage/comments/Comment";
import LoadContainer from "@/components/manage/LoadContainer";
import ManageLayout from "@/components/manage/ManageLayout";
import ErrorFallback from "@/components/common/ErrorFallback";
import { requestData } from "@/service/api";
import { NavContext, type NavStateProps } from "@/NavContext";
import { SERVER_ADDRESS } from "@/constants/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { UserComment } from "@/constants/gyms/types";

const CommentsPage = ({ id }: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedGymId } = useContext(NavContext) as NavStateProps;

  useEffect(() => {
    requestData({
      option: "GET",
      url: `/gyms/${id}`, // 백엔드 확정 시 수정 필요
      onSuccess: (data) => {
        const comments = data.comments ?? [];
        setComments(comments);
      },
      onError: (e) => {
        console.log(e);
        setComments([]);
      },
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (selectedGymId !== null && selectedGymId !== id) {
      setIsLoading(true);
      router.push(`/manage/comments/${selectedGymId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGymId]);

  const updateDatabase = async (comments: UserComment[]) => {
    try {
      const response = await Promise.race([
        fetch(`${SERVER_ADDRESS}/gyms/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments }),
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Response(null, { status: 503 })), 3000),
        ),
      ]);
      if (!response.ok) throw new Error(`${response.status}`);
      setComments(comments);
    } catch (e) {
      // 에러 핸들링
      alert("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const handleDelete = (index: number) => {
    const response = confirm("삭제한 댓글은 복구할 수 없습니다. 댓글을 삭제하시겠습니까?");
    if (!response) return;
    const remainingComments = comments.filter((_, i) => index !== i);
    updateDatabase(remainingComments);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ManageLayout>
        <h1 className="desktop-view" style={{ margin: 0 }}>
          댓글 관리
        </h1>
        <h2 className="mobile-view" style={{ margin: 0 }}>
          댓글 관리
        </h2>
        {isLoading ? (
          <LoadContainer>
            <BarLoader />
          </LoadContainer>
        ) : (
          <div className="editor-wrapper">
            <S.Content $direction="column">
              {comments.length > 0 ? (
                comments.map(({ user, createdAt, text }, i) => (
                  <S.Row key={i}>
                    <Comment user={user} createdAt={createdAt} text={text} />
                    <S.Icon size="1.3rem" onClick={() => handleDelete(i)} />
                  </S.Row>
                ))
              ) : (
                <div>관리할 댓글이 없습니다.</div>
              )}
            </S.Content>
          </div>
        )}
      </ManageLayout>
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  return { props: { id } };
};

const S = {
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
    }
  `,
  Link: styled.div`
    cursor: pointer;
    &:hover {
      color: #1aabff;
    }
  `,
  Row: styled.div`
    border: 1px solid ${COLOR.DISABLED};
    background: ${COLOR.BACKGROUND_LIGHT};
    border-radius: 12px;
    padding: 16px;
    display: flex;
    gap: 36px;
    @media ${DEVICE_SIZE.laptop} {
      gap: 0;
    }
  `,
  Icon: styled(IoTrash)`
    cursor: pointer;
  `,
};

export default CommentsPage;
