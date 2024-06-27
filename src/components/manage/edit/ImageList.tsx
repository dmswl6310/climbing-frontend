import Image from "next/image";
import styled from "styled-components";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { COLOR } from "@/styles/global-color";
import type { ImageListProps } from "@/constants/manage/types";

const ImageList = ({ images, handleS3Delete }: ImageListProps) => {
  return (
    <S.Wrapper>
      {images.map((image, i) => (
        <S.Image key={i}>
          <S.DeleteButton onClick={() => handleS3Delete(image, "display")}>
            <RiDeleteBin6Fill color="#ffffff" />
          </S.DeleteButton>
          <Image src={image} fill alt={image} />
        </S.Image>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 12px;
    max-width: 700px;
    overflow-x: auto;
    scrollbar-width: thin;
  `,
  Image: styled.div`
    box-sizing: border-box;
    position: relative;
    border: 1px solid ${COLOR.DISABLED};
    width: 140px;
    height: 80px;
    flex-shrink: 0;

    img {
      object-fit: cover;
    }
  `,
  DeleteButton: styled.div`
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 30px;
    height: 30px;
  `,
};

export default ImageList;
