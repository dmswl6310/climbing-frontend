import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import CommentTextarea from "./CommentTextarea";
import ReactIcon from "../common/ReactIcon";
import { SERVER_ADDRESS, TEST_ADDRESS } from "@/constants/constants";
import { DEVICE_SIZE } from "@/constants/styles";
import { COLOR } from "@/styles/global-color";
import type { CommentsProps, UserComment } from "@/constants/gyms/types";

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const date = currentDate.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${date}`;
};

const Comments = ({ id, comments, session }: CommentsProps) => {
  const [currentComments, setCurrentComments] = useState<UserComment[]>(comments || []);

  const handleAddComment = async (input: string) => {
    if (!session || !session.user) return "login";

    const newComment = {
      user: session.user.nickname,
      createdAt: getCurrentDate(),
      text: input,
    };

    // 댓글 API가 준비되면 수정
    try {
      const response = await Promise.race([
        fetch(`${TEST_ADDRESS}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newComment }),
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Response(null, { status: 503 })), 3000),
        ),
      ]);
      console.log(response);
      if (!response.ok) throw new Error(`${response.status}`);
      setCurrentComments((prev) => [newComment, ...prev]);
      return "successful";
    } catch (e) {
      // 에러 종류에 따라 핸들링
      return "server";
    }
  };

  const handleDeleteComment = async () => {};

  return (
    <S.Wrapper>
      <S.Container>
        {session ? (
          <>
            <CommentTextarea handleAddComment={handleAddComment} />
            {currentComments &&
              currentComments.length > 0 &&
              currentComments.map(({ user, createdAt, text }, i) => (
                <S.Comment key={i}>
                  <div style={{ display: "flex" }}>
                    <span className="comment__user">{user}</span>
                    <span className="comment__date">{createdAt}</span>
                    {session.user.nickname === user && (
                      <ReactIcon clickable={true}>
                        <IoTrash onClick={handleDeleteComment} />
                      </ReactIcon>
                    )}
                  </div>
                  <div>{text}</div>
                </S.Comment>
              ))}
          </>
        ) : (
          <div className="login-prompt">
            로그인해서 후기를 남겨주세요!
            <S.Link href={"/login"}>로그인하기</S.Link>
          </div>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    box-sizing: border-box;
    align-self: flex-start;
    padding: 0 18px;
    @media ${DEVICE_SIZE.desktop} {
      width: calc(1200px - 430px - 18px);
    }
    @media ${DEVICE_SIZE.laptop} {
      margin-top: 40px;
      width: inherit;
      padding: 0;
    }
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    .login-prompt {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }
  `,
  Comment: styled.div`
    display: flex;
    flex-direction: column;
    white-space: pre-wrap;
    margin: 26px 0px;
    gap: 12px;
    .comment__user {
      font-weight: 700;
      margin-right: 16px;
    }
    .comment__date {
      color: #c3c3c3;
      margin-right: 1.25rem;
    }
  `,
  Link: styled(Link)`
    background: ${COLOR.MAIN};
    border-radius: 8px;
    color: white;
    width: 120px;
    text-align: center;
    padding: 6px 12px;
    text-decoration: none;
  `,
};

export default Comments;
