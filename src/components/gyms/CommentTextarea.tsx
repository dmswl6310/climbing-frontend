import { useState } from "react";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";
import { COLOR } from "@/styles/global-color";
import type { ChangeEvent } from "react";
import type { CommentTextareaProps } from "@/constants/gyms/types";

const CommentTextarea = ({ handleAddComment }: CommentTextareaProps) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length > 200) return;
    setComment(input);
  };

  const handleCancel = () => setComment("");

  const handlePost = async () => {
    if (comment.trim() === "") return;
    setIsLoading(true);
    const response = await handleAddComment(comment);
    setIsLoading(false);

    switch (response) {
      case "login": {
        return alert("로그인 후 후기를 남겨주세요.");
      }
      case "server": {
        return alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
      case "successful": {
        return setComment("");
      }
      default: {
        return alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        한줄평 <span>{comment.length}</span>
      </S.Header>
      <S.Textarea placeholder="소중한 후기를 남겨주세요 :)" value={comment} onChange={onChange} />
      <S.Buttons>
        <button className="btn-unfilled" onClick={handleCancel}>
          취소
        </button>
        <button className="btn-filled" onClick={handlePost} disabled={isLoading}>
          {isLoading ? <PulseLoader color="white" size="0.3rem" /> : "댓글"}
        </button>
      </S.Buttons>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Header: styled.div`
    display: flex;
    gap: 8px;
    font-weight: 700;
    span {
      color: ${COLOR.MAIN};
    }
  `,
  Textarea: styled.textarea`
    box-sizing: border-box;
    width: inherit;
    height: 120px;
    resize: none;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${COLOR.BACKGROUND_LIGHT};
    box-shadow: 0 0 15px rgba(29, 101, 122, 0.15);
    & :focus {
      border: 1px solid blue;
    }
  `,
  Buttons: styled.div`
    align-self: flex-end;
    button {
      width: 3.3rem;
    }
    .btn-unfilled {
      border: none;
      background: transparent;
      padding: 8px 10px;
      margin-right: 6px;
      cursor: pointer;
    }
    .btn-filled {
      border: none;
      background: ${COLOR.MAIN};
      padding: 8px 10px;
      color: white;
      border-radius: 8px;
      cursor: pointer;
    }
    button:disabled {
      background: #bbc3cd;
    }
  `,
};

export default CommentTextarea;
