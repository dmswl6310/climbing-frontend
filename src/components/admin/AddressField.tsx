import { useState } from "react";
import { Address } from "react-daum-postcode";
import { IoSearch } from "react-icons/io5";
import PostcodeReader from "./PostcodeReader";
import useApi from "@/hooks/useApi";
import { NAVERMAP_GEOCODE_API } from "@/constants/constants";
import type { AddressFieldProps } from "@/constants/admin/types";

const AddressField = ({ address, handleAddressChange }: AddressFieldProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [userDisplay, setUserDisplay] = useState("R");
  useApi(NAVERMAP_GEOCODE_API);

  const handleOverlay = () => {
    if (isShowing) setIsShowing(false);
    else setIsShowing(true);
  };

  const callGeocodingApi = (queryString: string) => {
    naver.maps.Service.geocode({ query: queryString }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) console.log("error occurred"); // 추후에 예외 처리

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
      />
      {isShowing ? (
        <PostcodeReader handleClose={handleOverlay} handleComplete={handleComplete} />
      ) : null}
    </>
  );
};

export default AddressField;
