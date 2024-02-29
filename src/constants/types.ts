// 데이터 타입 정의
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
