import styled from 'styled-components';
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsTelephoneFill,
} from 'react-icons/bs';
import { ContactInfoProps } from '@/constants/types';

// 상수
export const CONTACT_ICONS = {
  phone: <BsTelephoneFill />,
  twitter: <BsTwitterX />,
  facebook: <BsFacebook />,
  instagram: <BsInstagram />,
};

const ContactInfo = ({ contact, snsList }: ContactInfoProps) => {
  const platforms = Object.keys(snsList);
  return (
    <S.Wrapper>
      <div>
        {CONTACT_ICONS.phone} {contact}
      </div>
      {platforms.map((platform, i) => (
        <div key={i}>
          {CONTACT_ICONS[platform as keyof typeof CONTACT_ICONS]}{' '}
          {snsList[platform as keyof typeof snsList]}
        </div>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    div {
      display: flex;
      gap: 6px;
      align-items: center;
      width: 160px;
    }
  `,
};

export default ContactInfo;
