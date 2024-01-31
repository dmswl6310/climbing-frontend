import styled from 'styled-components';
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsTelephoneFill,
} from 'react-icons/bs';

interface IconsType {
  [key: string]: JSX.Element;
}

interface ContactListItem {
  platform: string;
  address: string;
}

// Property 명칭 확정 시 수정
interface ContactInfoProps {
  [key: string]: Array<ContactListItem>;
}

// 상수
const CONTACT_ICONS: IconsType = {
  phone: <BsTelephoneFill />,
  twitter: <BsTwitterX />,
  facebook: <BsFacebook />,
  instagram: <BsInstagram />,
};

const ContactInfo = ({ contactList }: ContactInfoProps) => {
  // 임시 - 백엔드와 데이터 구조 협의 후 수정 필요
  const sampleList = [
    { platform: 'twitter', address: 'sdlfkj' },
    { platform: 'facebook', address: 'sdlfkj' },
    { platform: 'instagram', address: 'sdlfkj' },
    { platform: 'phone', address: '010-1234-5678' },
  ];

  return (
    <Styled.Wrapper>
      {contactList.map((contact) => (
        <div key={contact.platform}>
          {CONTACT_ICONS[contact.platform]} {contact.address}
        </div>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    gap: 30px;
    width: 100%;

    div {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `,
};

export default ContactInfo;
