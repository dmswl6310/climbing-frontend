import Image from "next/image";
import styled from "styled-components";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ImageUploader from "./ImageUploader";
import ImageList from "./ImageList";
import useS3 from "../../hooks/useS3";
import type { ImageEditorProps } from "@/constants/admin/types";

const ImageEditor = ({
  loadedImages,
  thumbnails,
  defaultImage,
  setCurrentData,
  setLoadedData,
  updateData,
}: ImageEditorProps) => {
  const uploadImage = (url: string, fileCount: number, key: string) => {
    if (key === "default") {
      setCurrentData((prev) => ({ ...prev, defaultImage: url }));
      setLoadedData((prev) => {
        updateData(JSON.stringify({ ...prev, defaultImage: url }));
        return { ...prev, defaultImage: url };
      });
      return;
    }
    if (!url.includes("thumb_")) return;

    const originImage = url.replace("thumb_", "");

    setCurrentData((current) => {
      const currentThumbnails = current.imageThumbnails || [];
      const currentImages = current.images || [];
      if (currentThumbnails.length - (loadedImages ? loadedImages.length : 0) === fileCount - 1) {
        const images = [...currentImages, originImage];
        const imageThumbnails = [...currentThumbnails, url];
        setLoadedData((prev) => {
          updateData(JSON.stringify({ ...prev, images, imageThumbnails }));
          return { ...prev, images, imageThumbnails };
        });
      }
      return {
        ...current,
        images: [...currentImages, originImage],
        imageThumbnails: [...currentThumbnails, url],
      };
    });
  };

  const deleteImage = (url: string, key: string) => {
    if (key === "default") {
      setCurrentData((prev) => ({ ...prev, defaultImage: "" }));
      setLoadedData((prev) => {
        updateData(JSON.stringify({ ...prev, defaultImage: "" }));
        return { ...prev, defaultImage: "" };
      });

      return;
    }

    const imageUrl = url.replace("thumb_", "");
    setCurrentData((prev) => {
      const images = prev.images!.filter((img) => img !== imageUrl);
      const imageThumbnails = prev.imageThumbnails!.filter((img) => img !== url);
      updateData(JSON.stringify({ ...prev, images, imageThumbnails }));
      return { ...prev, images, imageThumbnails };
    });
    setLoadedData((prev) => {
      const images = prev.images!.filter((img) => img !== imageUrl);
      const imageThumbnails = prev.imageThumbnails!.filter((img) => img !== url);
      return { ...prev, images, imageThumbnails };
    });
  };

  const { handleS3Upload, handleS3Delete } = useS3(uploadImage, deleteImage);

  return (
    <S.Wrapper>
      <S.Header>암장 이미지</S.Header>
      <S.Content $direction="column">
        <S.Row>
          <strong>대표 이미지</strong>
          {defaultImage ? (
            <S.Image>
              <S.DeleteButton onClick={() => handleS3Delete(defaultImage, "default")}>
                <RiDeleteBin6Fill color="#ffffff" />
              </S.DeleteButton>
              <Image src={defaultImage} width={462} height={215} alt={defaultImage} />
            </S.Image>
          ) : (
            <ImageUploader dataKey="default" handleS3Upload={handleS3Upload} />
          )}
        </S.Row>
        <S.Row>
          <strong>
            추가 이미지
            <br />
            {thumbnails ? thumbnails.length : 0}/10
          </strong>
          {thumbnails ? (
            <>
              {thumbnails.length < 10 ? (
                <ImageUploader
                  dataKey="display"
                  imageCount={thumbnails.length}
                  handleS3Upload={handleS3Upload}
                />
              ) : null}
              <ImageList handleS3Delete={handleS3Delete} images={thumbnails} />
            </>
          ) : (
            <ImageUploader dataKey="display" handleS3Upload={handleS3Upload} />
          )}
        </S.Row>
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
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
  Row: styled.div`
    display: flex;
    gap: 12px;
    strong {
      flex-shrink: 0;
      margin-right: 20px;
    }
  `,
  Image: styled.div`
    position: relative;
    border: 1px solid #d0d0d0;
    width: 462px;
    height: 215px;
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
