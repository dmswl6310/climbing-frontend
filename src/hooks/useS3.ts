import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

// 테스트용 값
const S3_REGION = 'ap-northeast-2';
const BUCKET_NAME = 'oruritest';
const S3_PATH = `https://${BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/`;
const FOLDER_NAME = 'bubu';
const THUMBNAIL_PREFIX = 'thumb_';

const useS3 = (
  uploadCallback: (url: string, fileCount: number, dataKey: string) => void,
  deleteCallback: (url: string, dataKey: string) => void,
) => {
  // S3 클라이언트 생성
  const client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY as string,
    },
  });

  // S3에 업로드하는 함수
  const handleS3Upload = async (
    file: File,
    fileName: string,
    fileCount: number,
    dataKey: string,
  ) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${FOLDER_NAME}/${fileName}`,
      Body: file,
    };

    try {
      await client.send(new PutObjectCommand(params));
    } catch (error) {
      console.log('에러 발생: ' + error);
    } finally {
      uploadCallback(
        `${S3_PATH}${FOLDER_NAME}/${fileName}`,
        fileCount,
        dataKey,
      );
    }
  };

  // 삭제 함수
  const handleS3Delete = async (url: string, dataKey: string) => {
    if (dataKey === 'default') {
      const fileKey = url.replace(S3_PATH, '');
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileKey.replace(THUMBNAIL_PREFIX, ''),
      };

      try {
        await client.send(new DeleteObjectCommand(params));
      } catch (error) {
        console.log('에러 발생: ' + error);
      } finally {
        deleteCallback(url, dataKey);
      }
      return;
    }

    const fileKey = url.replace(S3_PATH, '');
    const thumbParams = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
    };
    const originParams = {
      Bucket: BUCKET_NAME,
      Key: fileKey.replace(THUMBNAIL_PREFIX, ''),
    };

    try {
      await client.send(new DeleteObjectCommand(thumbParams));
      await client.send(new DeleteObjectCommand(originParams));
    } catch (error) {
      console.log('에러 발생: ' + error);
    } finally {
      deleteCallback(url, dataKey);
    }
  };

  return {
    handleS3Upload,
    handleS3Delete,
  };
};

export default useS3;
