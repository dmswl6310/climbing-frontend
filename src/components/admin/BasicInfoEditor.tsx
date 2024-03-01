import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsTelephoneFill,
  BsGlobe2,
} from 'react-icons/bs';
import AddressField from './AddressField';
import { GymData } from '@/pages/admin/edit';

interface BasicInfoProps {
  name: string;
  address: { jibunAddress: string; roadAddress: string; unitAddress: string };
  contact: string;
  snsList?: { twitter?: string; facebook?: string; instagram?: string };
  homepage?: string;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

const REGEX_NUMBER = /^[0-9-]*$/;

const BasicInfoEditor = ({
  name,
  address,
  contact,
  snsList,
  homepage,
  setCurrentData,
}: BasicInfoProps) => {
  const handleTextChange = (input: string, key: string) => {
    switch (key) {
      case 'name': {
        if (input.length > 20) return;
        break;
      }
      case 'homepage': {
        if (input.length > 50) return;
        break;
      }
      case 'contact': {
        if (!REGEX_NUMBER.test(input)) return;
        if (input.length > 15) return;
        break;
      }
    }

    setCurrentData((prev) => ({ ...prev, [key]: input }) as GymData);
  };

  const handleSnsChange = (input: string, key: string) => {
    if (input.length > 20) return;
    setCurrentData((prev) => {
      const newObject = prev ? { ...prev.sns } : {};
      newObject[key as keyof typeof newObject] = input;
      return { ...prev, sns: newObject } as GymData;
    });
  };

  return (
    <S.Wrapper>
      <S.Header>기본 정보</S.Header>
      <S.Content $direction="column">
        <div>
          <div>
            <h4>암장 이름</h4>
            <S.TextField $width="380px">
              <input
                value={name}
                onChange={(e) => handleTextChange(e.target.value, 'name')}
              />
              {name.length}/20
            </S.TextField>
          </div>
          <div>
            <h4>주소</h4>
            <S.TextField $width="450px">
              <AddressField
                address={address}
                handleAddressChange={setCurrentData}
              />
            </S.TextField>
          </div>
        </div>
        <div>
          <div>
            <h4>연락처</h4>
            <S.TextField $width="240px">
              <BsTelephoneFill />
              <input
                value={contact}
                onChange={(e) => handleTextChange(e.target.value, 'contact')}
              />
              {contact.length}/15
            </S.TextField>
          </div>
          <div>
            <h4>도메인</h4>
            <S.TextField $width="350px">
              <BsGlobe2 />
              <input
                value={homepage || ''}
                onChange={(e) => handleTextChange(e.target.value, 'homepage')}
              />
            </S.TextField>
          </div>
        </div>
        <div>
          <div>
            <h4>SNS</h4>
            <div className="field__list">
              {SNS_VALUES.map(({ platform, icon }, i) => (
                <S.TextField key={i} $width="300px">
                  {icon}
                  <input
                    name={platform}
                    value={snsList?.[platform as keyof typeof snsList] || ''}
                    onChange={(e) => {
                      handleSnsChange(e.target.value, e.target.name);
                    }}
                  />
                </S.TextField>
              ))}
            </div>
          </div>
        </div>
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
  `,
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;

    .field__list,
    & > div {
      display: flex;
      gap: 8px;
    }
  `,
  TextField: styled.div<{ $width?: string }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: ${({ $width }) => $width || '200px'};

    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0;
    }

    input:nth-child(3) {
      width: 50%;
    }

    .field-icon {
      flex-shrink: 0;
      cursor: pointer;
    }
  `,
};

const SNS_VALUES = [
  {
    platform: 'twitter',
    icon: <BsTwitterX />,
  },
  {
    platform: 'facebook',
    icon: <BsFacebook />,
  },
  { platform: 'instagram', icon: <BsInstagram /> },
];

export default BasicInfoEditor;
