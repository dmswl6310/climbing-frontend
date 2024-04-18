import { useState } from "react";
import { Address } from "react-daum-postcode";
import { IoSearch } from "react-icons/io5";
import PostcodeReader from "./PostcodeReader";
import useApi from "@/hooks/useApi";
import { NAVERMAP_GEOCODE_API } from "@/constants/constants";
import type { AddressFieldProps } from "@/constants/admin/types";

const AddressField = ({ address, handleAddressChange, handleFocus }: AddressFieldProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [userDisplay, setUserDisplay] = useState("R");
  useApi(NAVERMAP_GEOCODE_API);

  const handleOverlay = () => {
    if (isShowing) setIsShowing(false);
    else setIsShowing(true);
  };

  const callGeocodingApi = (queryString: string) => {
    naver.maps.Service.geocode({ query: queryString }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) {
        // 에러 로깅
        console.log(status);
        return alert(
          "네이버 지도 서비스에 오류가 발생했습니다.\n오류가 지속되면 관리자에게 문의해 주세요.",
        );
      }

      const [result] = response.v2.addresses;
      const unitAddress = (document.querySelector(".field__unit-address") as HTMLInputElement)
        .value;

      handleAddressChange((prev) => ({
        ...prev,
        address: {
          jibunAddress: result.jibunAddress,
          roadAddress: result.roadAddress,
          unitAddress,
        },
        coordinates: {
          latitude: Number(result.y),
          longitude: Number(result.x),
        },
      }));
    });
  };

  const handleComplete = (data: Address) => {
    const { roadAddress, userSelectedType } = data;
    const unitAddressField = document.querySelector(".field__unit-address") as HTMLInputElement;

    // 유저가 선택한 주소 형식(도로명 또는 지번)을 감지하고 해당 형식을 input 필드에 반영
    if (userSelectedType !== "R") setUserDisplay("J");
    callGeocodingApi(roadAddress);
    setIsShowing(false);
    unitAddressField.focus();
  };

  return (
    <>
      <IoSearch className="field-icon" onClick={handleOverlay} />
      <input
        className="field__display-address"
        placeholder="주소 검색"
        readOnly
        tabIndex={-1}
        value={userDisplay === "R" ? address.roadAddress : address.jibunAddress}
      />
      <input
        className="field__unit-address"
        name="unit-address"
        placeholder="상세 주소"
        required
        value={address.unitAddress}
        onChange={(e) => {
          const unitAddress = e.target.value;
          if (unitAddress.length > 30) return;
          handleAddressChange((prev) => {
            const currentAddress = prev.address;
            return { ...prev, address: { ...currentAddress, unitAddress } };
          });
        }}
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
