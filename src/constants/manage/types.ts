import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { BaseGymData, GymData, GymDataObject } from "../gyms/types";

// 데이터 타입 정의
type Range<T> = [T, T];
type ValuePiece = Date | null;
type GymDataStateAction = Dispatch<SetStateAction<GymData | null>>;
type SetNewData = (obj: GymDataObject) => void;
export type Value = ValuePiece | Range<ValuePiece>;
export type Chatroom = { id: number; roomName: string };
export type ChatroomRef = {
  url: string;
  windowRef: Window;
};

// 컴포넌트 props 타입 정의
export interface AccommodationsEditorProps {
  accommodationsList: string[] | null | undefined;
  setNewData: SetNewData;
}

export interface AddressFieldProps {
  address: { jibunAddress: string; roadAddress: string; unitAddress: string } | undefined;
  handleAddressChange: SetNewData;
  handleFocus?: (key: string) => void;
}

export interface BasicInfoProps {
  name: string | undefined;
  address: { jibunAddress: string; roadAddress: string; unitAddress: string } | undefined;
  contact: string | undefined;
  snsList: { twitter?: string; facebook?: string; instagram?: string } | null | undefined;
  homepage: string | null | undefined;
  setNewData: SetNewData;
}

export interface ColorPickerProps {
  className: string;
  handleColorSelect: (color: string) => void;
}

export interface ContentContainerProps {
  direction?: string;
  gap?: string;
  children: ReactNode;
}

export interface DescriptionEditorProps {
  description: string | null | undefined;
  setNewData: SetNewData;
}

export interface GradeBlockProps {
  index: number;
  size: number;
  color: string;
  handleColorChange: (index: number, color: string) => void;
}

export interface GradeEditorProps {
  gradesList: string[] | null | undefined;
  setNewData: SetNewData;
}

export interface ImageEditorProps {
  images: string[] | null | undefined;
  defaultImage: string | null | undefined;
  setCurrentData: GymDataStateAction;
  setLoadedData: GymDataStateAction;
  updateImageData: (data: string) => Promise<void>;
}

export interface ImageListProps {
  images: string[];
  handleS3Delete: (url: string, dataKey: string) => void;
}

export interface ImageUploadProps {
  dataKey: string;
  imageCount?: number;
  handleS3Upload: (file: File, fileName: string, dataKey: string) => Promise<void>;
}

export interface NewGymFormProps {
  handleSubmit: (formData: BaseGymData) => void;
  disableForm: boolean;
}

export interface OpenHoursEditorProps {
  openHoursList: Array<{ days: string; openTime: string; closeTime: string }> | null | undefined;
  setNewData: SetNewData;
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
  pricingList: Array<{ item: string; price: string }> | null | undefined;
  setNewData: SetNewData;
}

export interface PricingFieldProps {
  index: number;
  item: string;
  price: string;
  handleChange: (newValue: string, index: number, key: string) => void;
}

export interface SettingDayCalendarProps {
  setNewData: SetNewData;
}

export interface SettingDayEditorProps {
  date: string | null | undefined;
  setNewData: SetNewData;
}

export interface TextFieldProps {
  formName?: string | undefined;
  characterLimit: number;
}
