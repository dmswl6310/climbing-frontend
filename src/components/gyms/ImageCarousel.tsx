import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DEVICE_SIZE } from "@/constants/styles";
import { IMAGE_SIZE } from "@/constants/gyms/constants";
import { IMG_URL_REGEX } from "@/constants/manage/constants";
import type { ImageCarouselProps } from "@/constants/gyms/types";

export const checkImageValidity = (images: string[]) => {
  let error = false;
  images.forEach((image) => {
    const url = image.toLowerCase();
    if (!IMG_URL_REGEX.test(url)) error = true;
  });
  if (error) return false;
  return true;
};

const ImageCarousel = ({ defaultImage, imageList }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!defaultImage && (!imageList || imageList.length < 1)) return null;
  const images = imageList ? [defaultImage, ...imageList] : [defaultImage];
  const validImages: string[] = [];
  images.forEach((img) => {
    if (!img) return;
    const url = img.toLowerCase();
    if (IMG_URL_REGEX.test(url)) validImages.push(img);
  });
  if (validImages.length < 1) return null;
  return (
    <S.Wrapper>
      <S.Overlay>
        <S.OverlayButtons>
          <S.Button
            $direction="left"
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
          >
            <S.ArrowLeft />
          </S.Button>{" "}
          <S.Button
            $direction="right"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            disabled={currentIndex === validImages.length - 1}
          >
            <S.ArrowRight />
          </S.Button>
        </S.OverlayButtons>
        <S.OverlayText>
          {currentIndex + 1}/{validImages.length}
        </S.OverlayText>
      </S.Overlay>
      <S.Container $shiftIndex={currentIndex}>
        {validImages.map((image, i) => (
          <S.Image key={image}>
            <Image
              src={image}
              alt={`암벽센터 제공 사진 (${(i + 1).toString()})`}
              fill
              priority={i === 0}
            />
          </S.Image>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    overflow: hidden;
    border-radius: 8px;
    width: inherit;
    height: ${IMAGE_SIZE.desktop.height + "px"};
    @media ${DEVICE_SIZE.laptop} {
      height: ${IMAGE_SIZE.laptop.height + "px"};
    }
    @media ${DEVICE_SIZE.tablet} {
      height: ${IMAGE_SIZE.tablet.height + "px"};
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      height: ${IMAGE_SIZE.mobileLarge.height + "px"};
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      height: ${IMAGE_SIZE.mobileSmall.height + "px"};
    }
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
    width: 70px;
    padding: 0;
    background: #7be1ff;
    opacity: 0.7;
    border-radius: ${({ $direction }) =>
      $direction === "left" ? "0px 12px 12px 0px" : "12px 0px 0px 12px"};
    cursor: pointer;
    @media ${DEVICE_SIZE.tablet} {
      height: 80px;
      width: 40px;
    }
  `,
  Container: styled.div<{ $shiftIndex: number }>`
    display: flex;
    position: relative;
    width: inherit;
    height: inherit;
    left: ${({ $shiftIndex }) => -1 * $shiftIndex * IMAGE_SIZE.desktop.width + "px"};
    @media ${DEVICE_SIZE.laptop} {
      left: ${({ $shiftIndex }) => -1 * $shiftIndex * IMAGE_SIZE.laptop.width + "px"};
    }
    @media ${DEVICE_SIZE.tablet} {
      left: ${({ $shiftIndex }) => -1 * $shiftIndex * IMAGE_SIZE.tablet.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      left: ${({ $shiftIndex }) => -1 * $shiftIndex * IMAGE_SIZE.mobileLarge.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      left: ${({ $shiftIndex }) => -1 * $shiftIndex * IMAGE_SIZE.mobileSmall.width + "px"};
    }
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
    flex-shrink: 0;
    width: inherit;
    height: inherit;
    & img {
      object-fit: cover;
    }
  `,
  ArrowLeft: styled(IoIosArrowBack)`
    color: white;
    font-size: 3rem;
    @media ${DEVICE_SIZE.tablet} {
      font-size: 2rem;
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1.4rem;
    }
  `,
  ArrowRight: styled(IoIosArrowForward)`
    color: white;
    font-size: 3rem;
    @media ${DEVICE_SIZE.tablet} {
      font-size: 2rem;
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1.4rem;
    }
  `,
};

export default ImageCarousel;
