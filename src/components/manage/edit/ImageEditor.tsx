import Image from "next/image";
import styled from "styled-components";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ContentContainer from "../ContentContainer";
import ImageList from "./ImageList";
import ImageUploader from "./ImageUploader";
import useS3, { FOLDER_NAME, THUMBNAIL_PREFIX } from "../../../hooks/useS3";
import { checkImageValidity } from "@/components/gyms/ImageCarousel";
import { IMG_URL_REGEX } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { ImageEditorProps } from "@/constants/manage/types";

const ImageEditor = ({
  images,
  defaultImage,
  setCurrentData,
  setLoadedData,
  updateImageData,
}: ImageEditorProps) => {
  const thumbnails =
    images?.map((image) =>
      image.replace(`${FOLDER_NAME}/`, `${FOLDER_NAME}/${THUMBNAIL_PREFIX}`),
    ) || [];
  const validThumbnails: string[] = [];
  thumbnails.forEach((img) => {
    const url = img.toLowerCase();
    if (IMG_URL_REGEX.test(url)) validThumbnails.push(img);
  });

  const uploadImage = (url: string, key: string) => {
    // 썸네일 이미지가 아닌 URL만 DB 및 상태에 반영
    if (url.includes(`${THUMBNAIL_PREFIX}`)) return;
    setCurrentData((current) => {
      if (!current) return null;
      if (key === "default") {
        setLoadedData((prev) => {
          if (!prev) return null;
          updateImageData(JSON.stringify({ ...prev, defaultImage: url }));
          return { ...prev, defaultImage: url };
        });
        return { ...current, defaultImage: url };
      } else {
        const currentImages = current.images || [];
        const images = [...currentImages, url];
        setLoadedData((prev) => {
          if (!prev) return null;
          updateImageData(JSON.stringify({ ...prev, images }));
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
          updateImageData(JSON.stringify({ ...prev, defaultImage: "" }));
          return { ...prev, defaultImage: "" };
        });
        return { ...current, defaultImage: "" };
      } else {
        const originUrl = url.replace(`${THUMBNAIL_PREFIX}`, "");
        const images = current.images!.filter((img) => img !== originUrl);
        setLoadedData((prev) => {
          if (!prev) return null;
          updateImageData(JSON.stringify({ ...prev, images }));
          return { ...prev, images };
        });
        return { ...current, images };
      }
    });
  };

  const { handleS3Upload, handleS3Delete } = useS3(uploadImage, deleteImage);

  return (
    <div className="editor-wrapper">
      <div className="editor-header">암장 이미지</div>
      <ContentContainer direction="column" gap="20px">
        <S.Row>
          <strong>대표 이미지</strong>
          {defaultImage && checkImageValidity([defaultImage]) ? (
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
          <strong className="desktop-view">
            추가 이미지
            <br />
            {validThumbnails ? validThumbnails.length : 0}/10
          </strong>
          <strong className="mobile-view">
            추가 이미지 ({validThumbnails ? validThumbnails.length : 0}/10)
          </strong>
          {validThumbnails ? (
            <>
              {validThumbnails.length < 10 ? (
                <ImageUploader
                  dataKey="display"
                  imageCount={validThumbnails.length}
                  handleS3Upload={handleS3Upload}
                />
              ) : null}
              <ImageList handleS3Delete={handleS3Delete} images={validThumbnails} />
            </>
          ) : (
            <ImageUploader dataKey="display" handleS3Upload={handleS3Upload} />
          )}
        </S.Row>
      </ContentContainer>
    </div>
  );
};

const S = {
  Row: styled.div`
    display: flex;
    gap: 12px;
    strong {
      flex-shrink: 0;
      margin-right: 20px;
    }
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
      gap: 0.5rem;
      strong {
        margin-right: 0;
      }
      width: 100%;
    }
  `,
  Image: styled.div`
    position: relative;
    border: 1px solid ${COLOR.DISABLED};
    width: 462px;
    height: 215px;
    img {
      object-fit: cover;
      width: inherit;
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: inherit;
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
