import { Dispatch, SetStateAction } from "react";
import { GymData, SimpleGymData } from "../gyms/types";

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
export interface DropItem {
  id: number;
  city: string;
  district?: string;
  cityDistrict: string;
}

export interface DropDownProps {
  dropItems: Array<any>;
  prefixIcon?: JSX.Element; // list왼쪽 react-icon 컴포넌트 태그
  highlightWord?: String; // 강조 문구 있을 시, 강조 표시
  highlightIndex?: number; // 강조할 행은 강조표시
  setHighlightIndex?: Dispatch<SetStateAction<number>>;
  width?: string; // search컴포넌트 없이 dropdown 단독으로 쓸때만 사용
  fontSize?: string;
  handleClick?: (arg: unknown) => unknown;
}

export interface CurrentLocationBtnProps {
  fontSize?: string;
}

export interface GymListBannerProps {
  searchWord?: string;
  sortingType?: string;
  isSearchPage?: boolean;
}

export interface LazyLoadingItemsProps {
  searchWord?: string;
  sortingType?: string;
  isSearchPage?:boolean;
}

export interface SearchBannerProps {
  searchWord?: string;
}

export interface SearchProps {
  dataList: Array<any>;
  width?: string;
  height?: string;
  fontSize?: string;
  placeholder?: string;
  postfixIcon?: JSX.Element; // 검색창에 표시되는 아이콘
  onSubmit?: (event: any) => any; // 엔터 클릭시 발생되는 이벤트
  useLocation?: boolean; // 현재 위치로 검색
  searchWord?: string;
  border?: string;
  dropDownCount?: number;
  isSearchPage?: boolean;
}

export interface CardProps {
  width?: string;
  height?: string;
  cardInfo: SimpleGymData;
}
