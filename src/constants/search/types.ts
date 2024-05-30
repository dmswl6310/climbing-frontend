import { GymData, SimpleGymData } from "../gyms/types";

// 주소 데이터
export const sampleAddress = [
  { id: 1, info: "잠실" },
  { id: 2, info: "잠실2동" },
  { id: 3, info: "잠실1동" },
  { id: 4, info: "송파동" },
  { id: 5, info: "송파2동" },
  { id: 6, info: "송파1동" },
];

// 데이터 타입 정의
// export interface GymCardInfo {
//   // 썸네일 요약된 gym 정보
//   id: number;
//   thumbnailSrc: string;
//   address: string;
//   name: string;
//   latestSettingDay: string;
//   likeNumber: number;
// }

// 컴포넌트 props 타입 정의
export interface GymListBannerProps {
  searchWord?: string;
  sortingType?: string;
}

export interface LazyLoadingItemsProps {
  searchWord?: string;
  sortingType?: string;
}

export interface SearchBannerProps {
  searchWord?: string;
}

export interface CardProps {
  width?: string;
  height?: string;
  cardInfo: SimpleGymData;
}
