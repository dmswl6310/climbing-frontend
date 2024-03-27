import { Dispatch, SetStateAction } from "react";
import { GymData } from "../gyms/types";

// 데이터 타입 정의
type Range<T> = [T, T];
type ValuePiece = Date | null;
export type Value = ValuePiece | Range<ValuePiece>;

// 컴포넌트 props 타입 정의
export interface DescriptionEditorProps {
  description?: string;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

export interface AccommodationsEditorProps {
  accommodationsList: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

export interface AddressFieldProps {
  address: { jibunAddress: string; roadAddress: string; unitAddress: string };
  handleAddressChange: Dispatch<SetStateAction<GymData>>;
}

export interface BasicInfoProps {
  name: string;
  address: { jibunAddress: string; roadAddress: string; unitAddress: string };
  contact: string;
  snsList?: { twitter?: string; facebook?: string; instagram?: string };
  homepage?: string;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

export interface ColorPickerProps {
  handleColorSelect: (color: string) => void;
}

export interface GradeBlockProps {
  index: number;
  color: string;
  handleColorChange: (index: number, color: string) => void;
}

export interface GradeEditorProps {
  gradesList: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

export interface ImageEditorProps {
  loadedImages: string[] | undefined;
  thumbnails: string[] | undefined;
  defaultImage: string | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
  setLoadedData: Dispatch<SetStateAction<GymData>>;
  updateData: (data: string) => Promise<boolean>;
}

export interface ImageListProps {
  images: string[];
  handleS3Delete: (url: string, dataKey: string) => void;
}

export interface ImageUploadProps {
  dataKey: string;
  imageCount?: number;
  handleS3Upload: (
    file: File,
    fileName: string,
    fileCount: number,
    dataKey: string,
  ) => Promise<void>;
}

export interface NewGymFormProps {
  handleSubmit: (formData: GymData) => void;
}

export interface OpenHoursEditorProps {
  openHoursList: Array<{ days: string; openTime: string; closeTime: string }> | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

export interface OpenHoursFieldProps {
  index: number;
  days: string;
  openTime: string;
  closeTime: string;
  handleChange: (newValue: string, index: number, key: string) => void;
}

export interface PostcodeReaderProps {
  handleClose: Function;
  handleComplete: Function;
}

export interface PricingEditorProps {
  pricingList: Array<{ item: string; price: string }> | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

export interface PricingFieldProps {
  index: number;
  item: string;
  price: string;
  handleChange: (newValue: string, index: number, key: string) => void;
}

export interface SettingDayEditorProps {
  date: string | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

export interface TextFieldProps {
  formName?: string | undefined;
  characterLimit: number;
}

export interface UserCommentProps {
  user: string;
  date: string;
  text: string;
}
