import Image from 'next/image';
import styled from 'styled-components';
import { RiDeleteBin6Fill } from 'react-icons/ri';

interface ImageListProps {
  images: string[];
  handleS3Delete: (url: string, dataKey: string) => void;
}

const URL_PREFIX = 'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/';

const ImageList = ({ images, handleS3Delete }: ImageListProps) => {
  return (
    <Styled.Wrapper>
      {images.map((image, i) => (
        <Styled.Image key={i}>
          <Styled.DeleteButton onClick={() => handleS3Delete(image, 'display')}>
            <RiDeleteBin6Fill color="#ffffff" />
          </Styled.DeleteButton>
          <Image src={image} fill alt={image.replace(URL_PREFIX, '')} />
        </Styled.Image>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    gap: 12px;
    width: 900px;
    overflow-x: auto;
  `,
  Image: styled.div`
    position: relative;
    border: 1px solid #d0d0d0;
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
