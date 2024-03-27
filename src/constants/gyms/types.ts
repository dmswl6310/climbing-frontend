import { Session } from "next-auth";

// 데이터 타입 정의
export interface GymData {
  id?: string;
  name: string;
  address: {
    jibunAddress: string;
    roadAddress: string;
    unitAddress: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: string;
  latestSettingDay?: string;
  sns?: { twitter?: string; facebook?: string; instagram?: string };
  homepage?: string;
  images?: Array<string>;
  imageThumbnails?: Array<string>;
  defaultImage?: string;
  openHours?: Array<{ days: string; openTime: string; closeTime: string }>;
  pricing?: Array<{ item: string; price: string }>;
  tags?: Array<string>;
  description?: string;
  grades?: Array<string>;
  accommodations?: Array<string>;
  comments?: Array<{ user: string; date: string; text: string }>;
  likes?: number;
}

export interface DetailedListItem {
  [key: string]: string | number;
}

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpenHours {
  days: string;
  openTime: string;
  closeTime: string;
}

export interface Pricing {
  item: string;
  price: string;
}

export interface SnsList {
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export type UserComments = Array<{ user: string; date: string; text: string }>;

// 컴포넌트 props 타입 정의
export interface ContactInfoProps {
  contact: string;
  snsList: SnsList;
}

export interface DetailedListProps {
  items: Array<DetailedListItem>;
}

export interface GradeBarProps {
  grades: string[];
}

export interface ImageCarouselProps {
  defaultImage: string;
  imageList: string[];
}

export interface MapProps {
  coordinates: MapCoordinates;
}

export interface OpenHoursTableProps {
  openHours: Array<OpenHours>;
}

export interface PricingTableProps {
  pricing: Array<Pricing>;
}

export interface TagProps {
  prefix?: string;
  text: string;
}

export interface CommentsProps {
  id: string;
  comments?: UserComments;
  session: Session | null;
}

export interface CommentTextareaProps {
  handleAddComment: (input: string) => void;
}
