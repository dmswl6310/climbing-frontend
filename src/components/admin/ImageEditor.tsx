import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import useS3 from '../../hooks/useS3';
import { GymData } from '@/pages/admin/edit';

interface ImageEditorProps {
  loadedImages: string[] | undefined;
  thumbnails: string[] | undefined;
  defaultImage: string | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
  setLoadedData: Dispatch<SetStateAction<GymData>>;
  updateData: (data: string) => Promise<void>;
}

const ImageEditor = ({
  loadedImages,
  thumbnails,
  defaultImage,
  setCurrentData,
  setLoadedData,
  updateData,
}: ImageEditorProps) => {
  const uploadImage = (url: string, fileCount: number, key: string) => {
    if (key === 'default') {
      setCurrentData((prev) => ({ ...prev, defaultImage: url }));
      setLoadedData((prev) => ({ ...prev, defaultImage: url }));
      updateData(JSON.stringify({ defaultImage: url }));
      return;
    }
    if (!url.includes('thumb_')) return;

    const originImage = url.replace('thumb_', '');

    setCurrentData((current) => {
      const currentThumbnails = current.imageThumbnails || [];
      const currentImages = current.images || [];
      if (
        currentThumbnails.length - (loadedImages ? loadedImages.length : 0) ===
        fileCount - 1
      ) {
        const images = [...currentImages, originImage];
        const imageThumbnails = [...currentThumbnails, url];
        updateData(JSON.stringify({ images, imageThumbnails }));
        setLoadedData((prev) => ({ ...prev, images, imageThumbnails }));
      }
      return {
        ...current,
        images: [...currentImages, originImage],
        imageThumbnails: [...currentThumbnails, url],
      };
    });
  };

  const deleteImage = (url: string, key: string) => {
    if (key === 'default') {
      setCurrentData((prev) => ({ ...prev, defaultImage: undefined }));
      setLoadedData((prev) => {
        updateData(JSON.stringify({ ...prev, defaultImage: '' }));
        return { ...prev, defaultImage: undefined };
      });

      return;
    }

    const imageUrl = url.replace('thumb_', '');
    setCurrentData((prev) => {
      const images = prev.images!.filter((img) => img !== imageUrl);
      const imageThumbnails = prev.imageThumbnails!.filter(
        (img) => img !== url,
      );
      updateData(JSON.stringify({ images, imageThumbnails }));
      return { ...prev, images, imageThumbnails };
    });
    setLoadedData((prev) => {
      const images = prev.images!.filter((img) => img !== imageUrl);
      const imageThumbnails = prev.imageThumbnails!.filter(
        (img) => img !== url,
      );
      return { ...prev, images, imageThumbnails };
    });
  };

  const { handleS3Upload, handleS3Delete } = useS3(uploadImage, deleteImage);

  return (
    <Styled.Wrapper>
      <Styled.Header>암장 이미지</Styled.Header>
      <Styled.Content $direction="column">
        <div>
          <h3>대표 이미지</h3>
          {defaultImage ? (
            <Styled.Image>
              <Styled.DeleteButton
                onClick={() => handleS3Delete(defaultImage, 'default')}
              >
                <RiDeleteBin6Fill color="#ffffff" />
              </Styled.DeleteButton>
              <Image
                src={defaultImage}
                width={462}
                height={215}
                alt={defaultImage}
              />
            </Styled.Image>
          ) : (
            <ImageUploader dataKey="default" handleS3Upload={handleS3Upload} />
          )}
        </div>
        <div>
          <h3>
            추가 이미지
            <br />
            {thumbnails ? thumbnails.length : 0}/10
          </h3>
          {thumbnails ? (
            <>
              <ImageUploader
                dataKey="display"
                imageCount={thumbnails.length}
                handleS3Upload={handleS3Upload}
              />
              <ImageList handleS3Delete={handleS3Delete} images={thumbnails} />
            </>
          ) : (
            <ImageUploader dataKey="display" handleS3Upload={handleS3Upload} />
          )}
        </div>
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
  Image: styled.div`
    position: relative;
    border: 1px solid #d0d0d0;

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

export default ImageEditor;
