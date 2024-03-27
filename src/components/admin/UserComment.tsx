import styled from "styled-components";
import { MdAccessTime, MdPerson } from "react-icons/md";
import type { UserCommentProps } from "@/constants/admin/types";

const UserComment = ({ user, date, text }: UserCommentProps) => {
  return (
    <S.Wrapper>
      <S.Row>
        <MdPerson />
        {user}
      </S.Row>
      <S.Row>
        <MdAccessTime />
        {date}
      </S.Row>
      <S.TextField>{text}</S.TextField>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    min-height: 50px;
    gap: 8px;
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  TextField: styled.div`
    padding: 12px;
    border-radius: 8px;
    background: white;
    border: 1px solid #d0d0d0;
  `,
};

export default UserComment;
