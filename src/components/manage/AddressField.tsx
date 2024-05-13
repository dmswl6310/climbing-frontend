import { type ChangeEvent, useRef, useState } from "react";
import { Address } from "react-daum-postcode";
import { IoSearch } from "react-icons/io5";
import PostcodeReader from "./PostcodeReader";
import useApi from "@/hooks/useApi";
import { NAVERMAP_GEOCODE_API } from "@/constants/constants";
import type { AddressFieldProps } from "@/constants/manage/types";

const AddressField = ({ address, handleAddressChange, handleFocus }: AddressFieldProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [userDisplay, setUserDisplay] = useState("R");
  const unitAddressField = useRef<HTMLInputElement | null>(null);
  useApi(NAVERMAP_GEOCODE_API);

  const handleOverlay = () => {
    if (isShowing) setIsShowing(false);
    else setIsShowing(true);
  };

  const handleUnitAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const unitAddress = e.target.value;
    if (unitAddress.length > 30 || !address) return;
    handleAddressChange({ address: { ...address, unitAddress } });
  };

  const callGeocodingApi = (queryString: string) => {
    naver.maps.Service.geocode({ query: queryString }, (status, response) => {
      if (!unitAddressField.current) return;
      if (status === naver.maps.Service.Status.ERROR) {
        // 에러 로깅
        console.log(status);
        return alert(
          "네이버 지도 서비스에 오류가 발생했습니다.\n오류가 지속되면 관리자에게 문의해 주세요.",
        );
      }

      const [{ jibunAddress, roadAddress, x, y }] = response.v2.addresses;
      const unitAddress = unitAddressField.current.value;

      handleAddressChange({
        address: { jibunAddress, roadAddress, unitAddress },
        coordinates: { latitude: Number(y), longitude: Number(x) },
      });
    });
  };

  const handleComplete = (data: Address) => {
    const { roadAddress, userSelectedType } = data;
    // 유저가 선택한 주소 형식(도로명 또는 지번)을 감지하고 해당 형식을 input 필드에 반영
    if (userSelectedType !== "R") setUserDisplay("J");
    callGeocodingApi(roadAddress);
    setIsShowing(false);
    unitAddressField.current?.focus();
  };

  return (
    <>
      <IoSearch className="field-icon" onClick={handleOverlay} />
      <input
        placeholder="주소 검색"
        readOnly
        tabIndex={-1}
        value={userDisplay === "R" ? address?.roadAddress : address?.jibunAddress}
        style={{ cursor: "pointer" }}
        onClick={handleOverlay}
      />
      <input
        ref={unitAddressField}
        placeholder="상세 주소"
        required
        value={address?.unitAddress}
        onChange={handleUnitAddressChange}
        onFocus={() => {
          if (handleFocus) handleFocus("address");
        }}
        onBlur={() => {
          if (handleFocus) handleFocus("");
        }}
      />
      {isShowing ? (
        <PostcodeReader handleClose={handleOverlay} handleComplete={handleComplete} />
      ) : null}
    </>
  );
};

export default AddressField;
