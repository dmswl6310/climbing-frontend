import { useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MAX_WIDTH } from "@/constants/admin/constants";
import type { ImageCarouselProps } from "@/constants/gyms/types";

const ImageCarousel = ({ defaultImage, imageList }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = useRef(
    defaultImage && defaultImage !== "" ? [defaultImage, ...imageList] : [...imageList],
  );

  return (
    <S.Wrapper>
      <S.Overlay>
        <S.OverlayButtons>
          <S.Button
            $direction="left"
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
          >
            <IoIosArrowBack color="white" size="3rem" />
          </S.Button>{" "}
          <S.Button
            $direction="right"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            disabled={currentIndex === images.current.length - 1}
          >
            <IoIosArrowForward color="white" size="3rem" />
          </S.Button>
        </S.OverlayButtons>
        <S.OverlayText>
          {currentIndex + 1}/{images.current.length} | 전체사진
        </S.OverlayText>
      </S.Overlay>
      <S.Container $shift={`-${currentIndex * MAX_WIDTH}px`}>
        {images.current.map((image, i) => (
          <S.Image key={i}>
            <Image src={image} alt={`암벽센터 제공 사진 (${(i + 1).toString()})`} fill />
          </S.Image>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    overflow: hidden;
    height: 568px;
    width: 1200px;
    border-radius: 8px;
  `,
  Overlay: styled.div`
    overflow: hidden;
    border-radius: 8px;
    position: absolute;
    width: inherit;
    height: inherit;
    z-index: 5;
    display: grid;
  `,
  OverlayButtons: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-self: center;
  `,
  Button: styled.button<{ $direction: string }>`
    border: none;
    height: 125px;
    width: 80px;
    background: #7be1ff;
    opacity: 0.7;
    border-radius: ${({ $direction }) =>
      $direction === "left" ? "0px 8px 8px 0px" : "8px 0px 0px 8px"};
    cursor: pointer;
  `,
  Container: styled.div<{ $shift: string }>`
    display: flex;
    position: relative;
    left: ${({ $shift }) => $shift};
  `,
  OverlayText: styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    height: 18px;
    background: #1c1c1c;
    color: white;
    padding: 6px 8px;
    cursor: default;
  `,
  Image: styled.div`
    position: relative;
    width: 1200px;
    height: 568px;
    flex-shrink: 0;
    img {
      object-fit: cover;
    }
  `,
};

export default ImageCarousel;
