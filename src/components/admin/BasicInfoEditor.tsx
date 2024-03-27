import styled from "styled-components";
import { BsTwitterX, BsFacebook, BsInstagram, BsTelephoneFill, BsGlobe2 } from "react-icons/bs";
import AddressField from "./AddressField";
import { PHONE_REGEX } from "@/constants/admin/constants";
import type { BasicInfoProps } from "@/constants/admin/types";

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
      case "name": {
        if (input.length > 20) return;
        break;
      }
      case "homepage": {
        if (input.length > 50) return;
        break;
      }
      case "contact": {
        if (!PHONE_REGEX.test(input)) return;
        if (input.length > 15) return;
        break;
      }
    }

    setCurrentData((prev) => ({ ...prev, [key]: input }));
  };

  const handleSnsChange = (input: string, key: string) => {
    if (input.length > 20) return;
    setCurrentData((prev) => {
      const newObject = prev ? { ...prev.sns } : {};
      newObject[key as keyof typeof newObject] = input;
      return { ...prev, sns: newObject };
    });
  };

  return (
    <S.Wrapper>
      <S.Header>기본 정보</S.Header>
      <S.Content $direction="column">
        <div>
          <S.Block>
            <strong>암장 이름</strong>
            <S.TextField $width="355px">
              <input value={name} onChange={(e) => handleTextChange(e.target.value, "name")} />
              {name.length}/20
            </S.TextField>
          </S.Block>
          <S.Block>
            <strong>주소</strong>
            <S.TextField $width="520px">
              <AddressField address={address} handleAddressChange={setCurrentData} />
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
              {contact.length}/15
            </S.TextField>
          </S.Block>
          <S.Block>
            <strong>도메인</strong>
            <S.TextField $width="355px">
              <BsGlobe2 />
              <input
                value={homepage || ""}
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
                    value={snsList?.[platform as keyof typeof snsList] || ""}
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
    gap: 30px;

    .field__list,
    & > div {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
  `,
  Block: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
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
    width: ${({ $width }) => $width || "200px"};

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
