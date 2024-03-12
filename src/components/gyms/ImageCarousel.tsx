import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ImageCarouselProps } from '@/constants/gyms/types';

const BASE_WIDTH = 1200;

const ImageCarousel = ({ defaultImage, imageList }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, _] = useState(
    defaultImage !== '' ? [defaultImage, ...imageList] : [...imageList],
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
          </S.Button>{' '}
          <S.Button
            $direction="right"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            disabled={currentIndex === currentImages.length - 1}
          >
            <IoIosArrowForward color="white" size="3rem" />
          </S.Button>
        </S.OverlayButtons>
        <S.OverlayText>
          {currentIndex + 1}/{currentImages.length} | 전체사진
        </S.OverlayText>
      </S.Overlay>
      <S.Container $shift={`-${currentIndex * BASE_WIDTH}px`}>
        {currentImages.map((image, i) => (
          <S.Image key={i}>
            <Image src={image} alt={`${(i + 1).toString()}번 사진`} fill />
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
      $direction === 'left' ? '0px 8px 8px 0px' : '8px 0px 0px 8px'};
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
