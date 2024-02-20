import FileResizer from 'react-image-file-resizer';
import styled from 'styled-components';
import { MdOutlineUploadFile } from 'react-icons/md';

interface ImageUploadProps {
  dataKey: string;
  imageCount?: number;
  handleS3Upload: (
    file: File,
    fileName: string,
    fileCount: number,
    dataKey: string,
  ) => Promise<void>;
}

const ALLOWED_IMG_TYPES = ['image/jpeg', 'image/png'];
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 760;
const MAX_PHOTO_COUNT = 10;
const IMG_FORMAT = 'JPEG';
const THUMBNAIL_WIDTH = 140;
const THUMBNAIL_HEIGHT = 140;

const ImageUploader = ({
  dataKey,
  imageCount,
  handleS3Upload,
}: ImageUploadProps) => {
  const handleFile = (files: FileList | null) => {
    if (!files) return;
    if (dataKey === 'default' && files.length > 1)
      return alert('대표 이미지는 하나만 설정할 수 있습니다.');
    if (imageCount && imageCount + files.length > MAX_PHOTO_COUNT)
      return alert(
        `추가 이미지는 최대 ${MAX_PHOTO_COUNT}장까지 설정할 수 있습니다.`,
      );

    const allFiles = Array.from(files);
    const uploadFiles = allFiles.filter((file) =>
      ALLOWED_IMG_TYPES.includes(file.type),
    );
    const uploadFileCount = uploadFiles.length;
    const rejectedFileCount = allFiles.length - uploadFileCount; // 유효한 이미지 형식(jpeg/png)이 아닐 시 이용자에게 알리기 위해 파일 갯수 트랙킹

    uploadFiles.forEach((file) => {
      FileResizer.imageFileResizer(
        file,
        MAX_WIDTH,
        MAX_HEIGHT,
        IMG_FORMAT,
        70,
        0,
        (resizedImg) => {
          const randomizedFileName = `${crypto.randomUUID()}.${IMG_FORMAT}`;
          handleS3Upload(
            resizedImg as File,
            randomizedFileName,
            uploadFileCount,
            dataKey,
          );
          if (dataKey === 'default') return;
          FileResizer.imageFileResizer(
            resizedImg as File,
            THUMBNAIL_WIDTH,
            THUMBNAIL_HEIGHT,
            IMG_FORMAT,
            100,
            0,
            (thumb) => {
              const thumbFileName = `thumb_${randomizedFileName}`;
              handleS3Upload(
                thumb as File,
                thumbFileName,
                uploadFileCount,
                dataKey,
              );
            },
            'file',
          );
        },
        'file',
      );
    });

    if (rejectedFileCount > 0) {
      alert(`${rejectedFileCount}개의 파일은 업로드되지 않았습니다.`);
    }
  };

  return (
    <Styled.Wrapper
      $width={dataKey === 'default' ? '462px' : ''}
      $height={dataKey === 'default' ? '215px' : ''}
    >
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          handleFile(e.target.files);
          e.target.value = '';
        }}
        multiple
      />
      <div>
        <MdOutlineUploadFile size="1.4em" />
        사진 업로드
      </div>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div<{ $width?: string; $height?: string }>`
    position: relative;
    z-index: 2;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    border-radius: 8px;
    border: 2px dashed #cacaca;
    background: #f4f4f4;
    overflow: hidden;

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
    }

    input {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      opacity: 0;
      cursor: pointer;
    }
  `,
};

export default ImageUploader;
