import styled from "styled-components";
import { BsTwitterX, BsFacebook, BsInstagram, BsTelephoneFill } from "react-icons/bs";
import type { ContactInfoProps, SnsList } from "@/constants/gyms/types";

export const CONTACT_ICONS = {
  phone: <BsTelephoneFill />,
  twitter: <BsTwitterX />,
  facebook: <BsFacebook />,
  instagram: <BsInstagram />,
};

const ContactInfo = ({ contact, snsList }: ContactInfoProps) => {
  const platforms = snsList ? Object.keys(snsList) : [];
  return (
    <S.Wrapper>
      <div>
        {CONTACT_ICONS.phone} {contact}
      </div>
      {snsList &&
        platforms.length >= 1 &&
        platforms.map((platform) => {
          if (snsList[platform as keyof SnsList] === "" || !snsList[platform as keyof SnsList])
            return null;
          return (
            <div key={platform}>
              {CONTACT_ICONS[platform as keyof typeof CONTACT_ICONS]}{" "}
              {snsList[platform as keyof SnsList]}
            </div>
          );
        })}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    div {
      display: flex;
      gap: 6px;
      align-items: center;
      & > * {
        flex-shrink: 0;
      }
    }
  `,
};

export default ContactInfo;
