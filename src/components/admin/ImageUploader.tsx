import { DragEventHandler } from 'react';
import FileResizer from 'react-image-file-resizer';
import styled from 'styled-components';
import { MdOutlineUploadFile } from 'react-icons/md';

interface ImageUploadProps {
  handleS3Upload: (file: File, fileName: string) => Promise<void>;
}

const ALLOWED_IMG_TYPES = ['image/jpeg', 'image/png'];
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 760;
const MAX_PHOTO_COUNT = 5;
const IMG_FORMAT = 'JPEG';
const THUMBNAIL_WIDTH = 140;
const THUMBNAIL_HEIGHT = 140;

const ImageUploader = ({ handleS3Upload }: ImageUploadProps) => {
  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length === 0) return;
    if (e.dataTransfer.files.length > MAX_PHOTO_COUNT)
      return alert(
        `사진은 최대 ${MAX_PHOTO_COUNT}장까지 업로드할 수 있습니다.`,
      );

    const droppedFiles = Array.from(e.dataTransfer.files);
    let rejectedFileCount = 0;

    droppedFiles.forEach((file) => {
      if (ALLOWED_IMG_TYPES.includes(file.type)) {
        // 파일 리사이징 및 랜덤 파일명 생성
        FileResizer.imageFileResizer(
          file,
          MAX_WIDTH,
          MAX_HEIGHT,
          IMG_FORMAT,
          70,
          0,
          (resizedImg) => {
            const randomizedFileName = `${crypto.randomUUID()}.${IMG_FORMAT}`;
            handleS3Upload(resizedImg as File, randomizedFileName);
            FileResizer.imageFileResizer(
              resizedImg as File,
              THUMBNAIL_WIDTH,
              THUMBNAIL_HEIGHT,
              IMG_FORMAT,
              100,
              0,
              (thumb) => {
                const thumbFileName = `thumb_${randomizedFileName}`;
                handleS3Upload(thumb as File, thumbFileName);
              },
              'file',
            );
          },
          'file',
        );
      } else {
        // 유효한 이미지 형식(jpeg/png)이 아닐 시 이용자에게 알리기 위해 파일 갯수 트랙킹
        rejectedFileCount += 1;
      }
    });

    if (rejectedFileCount > 0) {
      alert(`${rejectedFileCount}개의 파일은 업로드되지 않았습니다.`);
    }
  };

  return (
    <Styled.Wrapper>
      <div
        id="drop_zone"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <MdOutlineUploadFile />
        <br />
      </div>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    #drop_zone {
      width: 600px;
      height: 200px;
      background: #f4f4f4;
      border-radius: 8px;
      border: 2px dashed #cacaca;
      font-size: 36pt;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `,
};

export default ImageUploader;
