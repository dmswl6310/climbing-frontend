import type { Session } from "next-auth";

// 데이터 타입 정의
export type BaseGymData = {
  name: string;
  address: GymAddress;
  coordinates: MapCoordinates;
  contact: string;
};

export type GymAddress = {
  jibunAddress: string;
  roadAddress: string;
  unitAddress: string;
};

// /gyms로 받는 썸네일 데이터
export type SimpleGymData = {
  id: number;
  name: string;
  address: GymAddress;
  latestSettingDay?: string;
  likeNumber?: string;
};

export type GymData = BaseGymData & {
  id: string;
  latestSettingDay: string | null;
  sns: SnsList | null;
  homepage: string | null;
  images: string[] | null;
  defaultImage: string | null;
  openHours: OpenHours[] | null;
  pricing: Pricing[] | null;
  tags: string[] | null;
  description: string | null;
  grades: string[] | null;
  accommodations: string[] | null;
  comments: UserComment[] | null;
  likeNumber: number | null;
};

export type GymDataObject = {
  [key: string]:
    | string
    | string[]
    | SnsList
    | OpenHours[]
    | Pricing[]
    | UserComment[]
    | number
    | MapCoordinates
    | GymAddress;
};

export type MapCoordinates = {
  latitude: number;
  longitude: number;
};

export type OpenHours = {
  days: string;
  openTime: string;
  closeTime: string;
};

export type Pricing = {
  item: string;
  price: string;
};

export type SnsList = {
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

export type UserComment = { user: string; createdAt: string; text: string };

// 컴포넌트 props 타입 정의
export interface CommentsProps {
  id: string;
  comments: UserComment[] | null;
  session: Session | null;
}

export interface CommentTextareaProps {
  handleAddComment: (input: string) => Promise<string>;
}

export interface ContactInfoProps {
  contact: string;
  snsList: SnsList | null;
}

export interface GradeBarProps {
  grades: string[] | null;
}

export interface ImageCarouselProps {
  defaultImage: string | null;
  imageList: string[] | null;
}

export interface MapProps {
  name: string;
  coordinates: MapCoordinates;
}

export interface OpenHoursTableProps {
  openHours: Array<OpenHours> | null;
}

export interface PricingTableProps {
  pricing: Array<Pricing> | null;
}

export interface TagListProps {
  tags: string[] | null;
}

export interface TagProps {
  prefix?: string;
  text: string;
}
