import { Dispatch, SetStateAction, useState } from 'react';
import { Address } from 'react-daum-postcode';
import PostcodeReader from './PostcodeReader';

type AddressObject = {
  jibunAddress: string;
  roadAddress: string;
  unitAddress: string;
};

type CoordinatesObject = {
  latitude: number;
  longitude: number;
};

interface AddressFieldProps {
  setAddress: Dispatch<SetStateAction<AddressObject>>;
  setCoordinates: Dispatch<SetStateAction<CoordinatesObject>>;
}

const AddressField = ({ setAddress, setCoordinates }: AddressFieldProps) => {
  const [isShowing, setIsShowing] = useState(false);

  const handleOverlay = () => {
    if (isShowing) setIsShowing(false);
    else setIsShowing(true);
  };

  const callGeocodingApi = (queryString: string) => {
    naver.maps.Service.geocode({ query: queryString }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR)
        console.log('error occurred'); // 추후에 예외 처리

      const [result] = response.v2.addresses;

      // 지번 주소, 도로명 주소, 좌표를 state에 저장 (상세 주소는 별도 onChange 이벤트를 통해 저장)
      setAddress((prev) => ({
        ...prev,
        jibunAddress: result.jibunAddress,
        roadAddress: result.roadAddress,
      }));
      setCoordinates({
        latitude: Number(result.y),
        longitude: Number(result.x),
      });
    });
  };

  const handleComplete = (data: Address) => {
    const { zonecode, roadAddress, jibunAddress, userSelectedType } = data;
    let displayAddress;

    // 유저가 선택한 주소 형식(도로명 또는 지번)을 감지하고 해당 형식을 input 필드에 반영
    if (userSelectedType === 'R') {
      displayAddress = roadAddress;
    } else {
      displayAddress = jibunAddress;
    }

    (
      document.querySelector('.field__display-address') as HTMLInputElement
    ).value = `${displayAddress} (${zonecode})`;

    callGeocodingApi(roadAddress);
    setIsShowing(false);

    (
      document.querySelector('.field__unit-address') as HTMLInputElement
    ).focus();
  };

  return (
    <div>
      <input className='field__display-address' readOnly={true} />
      <input
        className='field__unit-address'
        name='unit-address'
        placeholder='상세 주소'
        required={true}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, unitAddress: e.target.value }))
        }
      />
      <input type='button' onClick={handleOverlay} value='우편번호 찾기' />
      {isShowing ? (
        <PostcodeReader
          handleClose={handleOverlay}
          handleComplete={handleComplete}
        />
      ) : null}
    </div>
  );
};

export default AddressField;
