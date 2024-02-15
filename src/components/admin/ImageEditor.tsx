import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ImageField from './ImageField';
import { GymData } from '@/pages/admin/edit';

interface ImageEditorProps {
  images: string[] | undefined;
  thumbnails: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

const ImageEditor = ({
  images,
  thumbnails,
  setCurrentData,
}: ImageEditorProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Header>암장 이미지</Styled.Header>
      <Styled.Content $direction="column">
        <ImageField
          originalImg={images ? images : null}
          thumbnailImg={thumbnails ? thumbnails : null}
          setCurrentData={setCurrentData}
        />
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
  `,
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;
  `,
};

export default ImageEditor;
