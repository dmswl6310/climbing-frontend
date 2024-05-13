import Image from "next/image";
import styled from "styled-components";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ImageList from "./ImageList";
import ImageUploader from "./ImageUploader";
import useS3, { FOLDER_NAME, THUMBNAIL_PREFIX } from "../../../hooks/useS3";
import type { ImageEditorProps } from "@/constants/manage/types";

const ImageEditor = ({
  images,
  defaultImage,
  setCurrentData,
  setLoadedData,
  updateData,
}: ImageEditorProps) => {
  const thumbnails =
    images?.map((image) =>
      image.replace(`${FOLDER_NAME}/`, `${FOLDER_NAME}/${THUMBNAIL_PREFIX}`),
    ) || [];

  const uploadImage = (url: string, key: string) => {
    // 썸네일 이미지가 아닌 URL만 DB 및 상태에 반영
    if (url.includes(`${THUMBNAIL_PREFIX}`)) return;
    setCurrentData((current) => {
      if (!current) return null;
      if (key === "default") {
        setLoadedData((prev) => {
          if (!prev) return null;
          updateData(JSON.stringify({ ...prev, defaultImage: url }));
          return { ...prev, defaultImage: url };
        });
        return { ...current, defaultImage: url };
      } else {
        const currentImages = current.images || [];
        const images = [...currentImages, url];
        setLoadedData((prev) => {
          if (!prev) return null;
          updateData(JSON.stringify({ ...prev, images }));
          return { ...prev, images };
        });
        return { ...current, images };
      }
    });
  };

  const deleteImage = (url: string, key: string) => {
    setCurrentData((current) => {
      if (!current) return null;
      if (key === "default") {
        setLoadedData((prev) => {
          if (!prev) return null;
          updateData(JSON.stringify({ ...prev, defaultImage: "" }));
          return { ...prev, defaultImage: "" };
        });
        return { ...current, defaultImage: "" };
      } else {
        const originUrl = url.replace(`${THUMBNAIL_PREFIX}`, "");
        const images = current.images!.filter((img) => img !== originUrl);
        setLoadedData((prev) => {
          if (!prev) return null;
          updateData(JSON.stringify({ ...prev, images }));
          return { ...prev, images };
        });
        return { ...current, images };
      }
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
