import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { CommentTextareaProps } from '@/constants/gyms/types';

const CommentTextarea = ({ handleAddComment }: CommentTextareaProps) => {
  const [comment, setComment] = useState('');

  const onChange: ChangeEventHandler = (e) => {
    const input = (e.target as HTMLTextAreaElement).value;
    if (input.length > 200) return;
    setComment(input);
  };

  const handleCancel = () => setComment('');

  const handlePost = () => {
    handleAddComment(comment);
    setComment('');
  };

  return (
    <S.Wrapper>
      <S.Header>
        한줄평 <span>{comment.length}</span>
      </S.Header>
      <S.Textarea
        placeholder="소중한 후기를 남겨주세요 :)"
        value={comment}
        onChange={onChange}
      />
      <S.Buttons>
        <button className="btn-unfilled" onClick={handleCancel}>
          취소
        </button>
        <button className="btn-filled" onClick={handlePost}>
          댓글
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
      color: #307fe5;
    }
  `,
  Textarea: styled.textarea`
    box-sizing: border-box;
    width: inherit;
    height: 120px;
    resize: none;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #fafafa;
    box-shadow: 0 0 15px rgba(29, 101, 122, 0.15);

    & :focus {
      border: 1px solid blue;
    }
  `,
  Buttons: styled.div`
    align-self: flex-end;

    .btn-unfilled {
      border: none;
      background: transparent;
      padding: 8px 10px;
      margin-right: 6px;
      cursor: pointer;
    }

    .btn-filled {
      border: none;
      background: #307fe5;
      padding: 8px 10px;
      color: white;
      border-radius: 8px;
      cursor: pointer;
    }
  `,
};

export default CommentTextarea;
