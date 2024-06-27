import styled from "styled-components";
import { BsTwitterX, BsFacebook, BsInstagram, BsTelephoneFill, BsGlobe2 } from "react-icons/bs";
import AddressField from "../AddressField";
import { PHONE_REGEX } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { BasicInfoProps } from "@/constants/manage/types";

const BasicInfoEditor = ({
  name,
  address,
  contact,
  snsList,
  homepage,
  setNewData,
}: BasicInfoProps) => {
  const handleTextChange = (input: string, key: string) => {
    switch (key) {
      case "name": {
        if (input.length > 20) return;
        break;
      }
      case "homepage": {
        if (input.includes(" ") || input.length > 50) return;
        break;
      }
      case "contact": {
        if (!PHONE_REGEX.test(input)) return;
        if (input.length > 15) return;
        break;
      }
    }
    setNewData({ [key]: input });
  };

  const handleSnsChange = (input: string, key: string) => {
    if (input.length > 30) return;
    const newList = snsList ? { ...snsList } : {};
    newList[key as keyof typeof newList] = input;
    setNewData({ sns: { ...newList } });
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-header">기본 정보</div>
      <S.Content $direction="column">
        <div>
          <S.Block>
            <strong>암장 이름</strong>
            <S.TextField $width="355px">
              <input value={name} onChange={(e) => handleTextChange(e.target.value, "name")} />
              {name?.length ?? 0}/20
            </S.TextField>
          </S.Block>
          <S.Block>
            <strong>주소</strong>
            <S.TextField $width="520px">
              <AddressField address={address} handleAddressChange={setNewData} />
            </S.TextField>
          </S.Block>
        </div>
        <div>
          <S.Block>
            <strong>연락처</strong>
            <S.TextField $width="355px">
              <BsTelephoneFill />
              <input
                value={contact}
                onChange={(e) => handleTextChange(e.target.value, "contact")}
              />
              {contact?.length ?? 0}/15
            </S.TextField>
          </S.Block>
          <S.Block>
            <strong>도메인</strong>
            <S.TextField $width="355px">
              <BsGlobe2 />
              <input
                value={homepage ?? ""}
                onChange={(e) => handleTextChange(e.target.value, "homepage")}
              />
            </S.TextField>
          </S.Block>
        </div>
        <div>
          <S.Block>
            <strong>SNS</strong>
            <div className="field__list">
              {SNS_VALUES.map(({ platform, icon }, i) => (
                <S.TextField key={i} $width="355px">
                  {icon}
                  <input
                    name={platform}
                    value={snsList?.[platform as keyof typeof snsList] ?? ""}
                    onChange={(e) => {
                      handleSnsChange(e.target.value, e.target.name);
                    }}
                  />
                </S.TextField>
              ))}
            </div>
          </S.Block>
        </div>
      </S.Content>
    </div>
  );
};

const S = {
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 30px;
    .field__list,
    & > div {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
    }
  `,
  Block: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media ${DEVICE_SIZE.mobileLarge} {
      width: 100%;
    }
  `,
  TextField: styled.div<{ $width?: string }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${COLOR.BACKGROUND_LIGHT};
    color: ${COLOR.BACKGROUND_DARK};
    border-radius: 8px;
    border: 1px solid ${COLOR.DISABLED};
    padding: 12px 18px;
    width: ${({ $width }) => $width || "200px"};
    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0;
      color: ${COLOR.BACKGROUND_DARK};
    }
    input:focus {
      color: black;
    }
    input:nth-child(3) {
      width: 50%;
    }
    .field-icon {
      flex-shrink: 0;
      cursor: pointer;
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: 100%;
      padding: 0.6rem;
    }
  `,
};

const SNS_VALUES = [
  {
    platform: "twitter",
    icon: <BsTwitterX />,
  },
  {
    platform: "facebook",
    icon: <BsFacebook />,
  },
  { platform: "instagram", icon: <BsInstagram /> },
];

export default BasicInfoEditor;
