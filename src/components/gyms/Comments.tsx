import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import CommentTextarea from "./CommentTextarea";
import { CommentsProps, UserComments } from "@/constants/gyms/types";
import { GYM_API } from "@/constants/constants";

const Comments = ({ id, comments, session }: CommentsProps) => {
  const [currentComments, setCurrentComments] = useState<UserComments>(
    comments || [],
  );

  const handleAddComment = (input: string) => {
    if (!session) return;
    const newComment = {
      user: session.user!.name as string,
      date: getCurrentDate(),
      text: input,
    };

    setCurrentComments((prev) => [newComment, ...prev]);

    fetch(`${GYM_API}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comments: [newComment, ...currentComments] }),
    });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = currentDate.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${date}`;
  };

  return (
    <S.Wrapper>
      {session ? (
        <CommentTextarea handleAddComment={handleAddComment} />
      ) : (
        <div className="login-prompt">
          로그인해서 후기를 남겨주세요!
          <S.Link href={"/login"}>로그인하기</S.Link>
        </div>
      )}
      {currentComments && currentComments.length > 0
        ? currentComments.map(({ user, date, text }, i) => (
            <S.Comment key={i}>
              <div>
                <span className="comment__user">{user}</span>
                <span className="comment__date">{date}</span>
              </div>
              <div>{text}</div>
            </S.Comment>
          ))
        : null}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
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
    margin: 26px 0px;
    gap: 12px;

    .comment__user {
      font-weight: 700;
      margin-right: 16px;
    }

    .comment__date {
      color: #c3c3c3;
    }
  `,
  Link: styled(Link)`
    background: #307fe5;
    border-radius: 8px;
    color: white;
    width: 120px;
    text-align: center;
    padding: 6px 12px;
    text-decoration: none;
  `,
};

export default Comments;
