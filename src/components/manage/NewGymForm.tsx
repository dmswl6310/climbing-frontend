import { useState } from "react";
import styled from "styled-components";
import AddressField from "./AddressField";
import { PHONE_REGEX } from "@/constants/manage/constants";
import { COLOR } from "@/styles/global-color";
import type { BaseGymData, GymDataObject } from "@/constants/gyms/types";
import type { NewGymFormProps } from "@/constants/manage/types";

const NewGymForm = ({ handleSubmit, disableForm }: NewGymFormProps) => {
  const [focusedElem, setFocusedElem] = useState<string>("");
  const [formData, setFormData] = useState<BaseGymData>({
    name: "",
    address: { jibunAddress: "", roadAddress: "", unitAddress: "" },
    coordinates: { latitude: 0, longitude: 0 },
    contact: "",
  });

  const handleNameInput = (input: string) => {
    if (input.length > 20) return;
    setFormData((prev) => ({ ...prev, name: input }));
  };

  const handleContactInput = (input: string) => {
    if (input.length > 15) return;
    if (!PHONE_REGEX.test(input)) return;
    setFormData((prev) => ({ ...prev, contact: input }));
  };

  const handleAddressInput = (obj: GymDataObject) => {
    setFormData((prev) => ({ ...prev, ...obj }));
  };

  const handleFocus = (key: string) => {
    setFocusedElem(key);
  };

  return (
    <S.Wrapper>
      <S.Form
        onSubmit={(e) => {
          e.preventDefault();
          if (formData.address.jibunAddress === "")
            return alert("지번 또는 도로명 주소를 입력해 주세요.");
          handleSubmit({ ...formData });
        }}
      >
        <div>
          <h4>
            암장명 <span>*</span>
          </h4>
          <S.TextField $focused={focusedElem === "name"} $width="270px">
            <input
              value={formData.name}
              onChange={(e) => handleNameInput(e.target.value)}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleFocus("")}
              required
            />
          </S.TextField>
        </div>
        <div>
          <h4>
            암장 주소 <span>*</span>
          </h4>
          <S.TextField $width="450px" $focused={focusedElem === "address"}>
            <AddressField
              address={formData.address}
              handleAddressChange={handleAddressInput}
              handleFocus={handleFocus}
            />
          </S.TextField>
        </div>
        <div>
          <h4>
            연락처 <span>*</span>
          </h4>
          <S.TextField $focused={focusedElem === "contact"}>
            <input
              value={formData.contact}
              onChange={(e) => handleContactInput(e.target.value)}
              placeholder="전화번호 입력"
              onFocus={() => handleFocus("contact")}
              onBlur={() => handleFocus("")}
              required
            />
          </S.TextField>
        </div>
        <div>
          <span>*</span> 필수 입력
        </div>
        <input
          type="submit"
          value={disableForm ? "등록 중..." : "등록"}
          className="btn-primary"
          disabled={disableForm}
        />
      </S.Form>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    h4 {
      margin-top: 0;
      margin-bottom: 4px;
    }
    span {
      color: red;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 36px;
    input[type="submit"] {
      border-radius: 10px;
      width: 130px;
      padding: 18px;
      align-self: center;
    }
  `,
  TextField: styled.div<{ $width?: string; $focused?: boolean }>`
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    background: ${COLOR.BACKGROUND_LIGHT};
    border-radius: 8px;
    padding: 12px 18px;
    width: ${({ $width }) => $width || "200px"};
    border: ${({ $focused }) =>
      $focused ? `1px solid ${COLOR.DISABLED}` : `1px solid ${COLOR.DISABLED}`};
    box-shadow: ${({ $focused }) => ($focused ? `0 0 4px ${COLOR.DISABLED}` : null)};
    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0;
      color: ${COLOR.BACKGROUND_DARK};
    }
    input:focus {
      outline: none;
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

export default NewGymForm;
