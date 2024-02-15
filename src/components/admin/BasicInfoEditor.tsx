import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsTelephoneFill,
} from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { GymData } from '@/pages/admin/edit';
import { CONTACT_ICONS } from '../ContactInfo';

interface BasicInfoProps {
  name: string;
  address: { jibunAddress: string; roadAddress: string; unitAddress: string };
  contact: string;
  snsList: Array<{ platform: string; account: string }> | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

const REGEX_NUMBER = /^[0-9-]*$/;

const BasicInfoEditor = ({
  name,
  address,
  contact,
  snsList,
  setCurrentData,
}: BasicInfoProps) => {
  const handleNameChange = (input: string) => {
    if (input.length > 20) return;
    setCurrentData((prev) => ({ ...prev, name: input }) as GymData);
  };

  const handleContactChange = (input: string) => {
    if (!REGEX_NUMBER.test(input)) return;
    setCurrentData((prev) => ({ ...prev, contact: input }) as GymData);
  };

  return (
    <Styled.Wrapper>
      <Styled.Header>기본 정보</Styled.Header>
      <Styled.Content $direction="row">
        <div>
          <h4>암장 이름</h4>
          <Styled.TextField>
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </Styled.TextField>
        </div>
        <div>
          <h4>주소</h4>
          <Styled.TextField>
            <input defaultValue={address.roadAddress} readOnly />
            <input defaultValue={address.unitAddress} placeholder="상세 주소" />
            <IoSearch className="field-icon" onClick={() => console.log()} />
          </Styled.TextField>
        </div>
        <div>
          <h4>연락처</h4>
          <Styled.TextField>
            <BsTelephoneFill />
            <input
              value={contact}
              onChange={(e) => handleContactChange(e.target.value)}
            />
          </Styled.TextField>
        </div>
        {snsList?.map((sns, i) => (
          <div key={i}>
            <h4>SNS</h4>
            <Styled.TextField>
              {CONTACT_ICONS[sns.platform]}
              <input defaultValue={sns.account} />
            </Styled.TextField>
          </div>
        ))}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
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
  `,
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: 370px;

    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0;
    }

    .field-icon {
      flex-shrink: 0;
      cursor: pointer;
    }
  `,
};

export default BasicInfoEditor;
