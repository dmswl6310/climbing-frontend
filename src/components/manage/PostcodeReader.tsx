import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import type { PostcodeReaderProps } from "@/constants/manage/types";

const PostcodeReader = ({ handleClose, handleComplete }: PostcodeReaderProps) => {
  return (
    <S.Wrapper>
      <S.Foreground>
        <S.EmbedContainer>
          <IoIosCloseCircle className="btn__close" onClick={() => handleClose()} />
          <DaumPostcodeEmbed onComplete={(data) => handleComplete(data)} />
        </S.EmbedContainer>
      </S.Foreground>
      <S.Background />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  `,
  Foreground: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Background: styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  `,
  EmbedContainer: styled.div`
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;

    .btn__close {
      font-size: 24pt;
      color: white;
      cursor: pointer;
    }
  `,
};

export default PostcodeReader;
