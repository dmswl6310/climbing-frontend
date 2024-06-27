import FileResizer from "react-image-file-resizer";
import styled from "styled-components";
import { MdOutlineUploadFile } from "react-icons/md";
import {
  ALLOWED_IMG_TYPES,
  IMG_FORMAT,
  MAX_HEIGHT,
  MAX_PHOTO_COUNT,
  MAX_WIDTH,
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { ImageUploadProps } from "@/constants/manage/types";

const ImageUploader = ({ dataKey, imageCount, handleS3Upload }: ImageUploadProps) => {
  const handleFile = (files: FileList | null) => {
    if (!files) return;
    if (dataKey === "default" && files.length > 1)
      return alert("대표 이미지는 하나만 설정할 수 있습니다.");
    if (imageCount && imageCount + files.length > MAX_PHOTO_COUNT)
      return alert(`추가 이미지는 최대 ${MAX_PHOTO_COUNT}장까지 설정할 수 있습니다.`);

    const allFiles = Array.from(files);
    const uploadFiles = allFiles.filter((file) => ALLOWED_IMG_TYPES.includes(file.type));
    const rejectedFileCount = allFiles.length - uploadFiles.length;

    uploadFiles.forEach((file) => {
      FileResizer.imageFileResizer(
        file,
        MAX_WIDTH,
        MAX_HEIGHT,
        IMG_FORMAT,
        85,
        0,
        (resizedImg) => {
          const randomizedFileName = `${Date.now()}.${IMG_FORMAT}`;
          handleS3Upload(resizedImg as File, randomizedFileName, dataKey);
          FileResizer.imageFileResizer(
            resizedImg as File,
            THUMBNAIL_WIDTH,
            THUMBNAIL_HEIGHT,
            IMG_FORMAT,
            70,
            0,
            (thumb) => {
              const thumbFileName = `thumb_${randomizedFileName}`;
              handleS3Upload(thumb as File, thumbFileName, dataKey);
            },
            "file",
          );
        },
        "file",
      );
    });

    if (rejectedFileCount > 0) {
      alert(`${rejectedFileCount}개의 파일은 업로드되지 않았습니다.`);
    }
  };

  return (
    <S.Wrapper
      $width={dataKey === "default" ? "462px" : "140px"}
      $height={dataKey === "default" ? "215px" : "80px"}
    >
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          handleFile(e.target.files);
          e.target.value = "";
        }}
        multiple
      />
      <div>
        <MdOutlineUploadFile size="1.4em" />
        사진 업로드
      </div>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ $width?: string; $height?: string }>`
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    border-radius: 6px;
    border: 2px dashed ${COLOR.DISABLED};
    background: ${COLOR.BACKGROUND_LIGHT};
    overflow: hidden;
    flex-shrink: 0;
    div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      font-size: 12pt;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
      padding: 12px;
      @media ${DEVICE_SIZE.mobileLarge} {
        font-size: 10pt;
      }
    }
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      opacity: 0;
      cursor: pointer;
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: inherit;
      height: 80px;
    }
  `,
};

export default ImageUploader;
