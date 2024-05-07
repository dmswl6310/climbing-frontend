import { useState } from "react";
import styled from "styled-components";
import AddressField from "./AddressField";
import { PHONE_REGEX } from "@/constants/admin/constants";
import type { GymData } from "@/constants/gyms/types";
import type { NewGymFormProps } from "@/constants/admin/types";

const NewGymForm = ({ handleSubmit, disableForm }: NewGymFormProps) => {
  const [focusedElem, setFocusedElem] = useState<string>("");
  const [formData, setFormData] = useState<GymData>({
    name: "",
    address: { jibunAddress: "", roadAddress: "", unitAddress: "" },
    coordinates: { latitude: 0, longitude: 0 },
    contact: "",
  });

  const handleInput = (input: string, type: string, key: string) => {
    if (input.length > 20) return;
    if (type === "number" && !PHONE_REGEX.test(input)) return;
    setFormData((prev) => ({ ...prev, [key]: input }));
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
          <h4>암장명</h4>
          <S.TextField $focused={focusedElem === "name"}>
            <input
              value={formData.name}
              onChange={(e) => handleInput(e.target.value, "string", "name")}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleFocus("")}
              required
            />
          </S.TextField>
        </div>
        <div>
          <h4>암장 주소</h4>
          <S.TextField $width="450px" $focused={focusedElem === "address"}>
            <AddressField
              address={formData.address}
              handleAddressChange={setFormData}
              handleFocus={handleFocus}
            />
          </S.TextField>
        </div>
        <div>
          <h4>연락처</h4>
          <S.TextField $focused={focusedElem === "contact"}>
            <input
              value={formData.contact}
              onChange={(e) => handleInput(e.target.value, "number", "contact")}
              placeholder="전화번호 입력"
              onFocus={() => handleFocus("contact")}
              onBlur={() => handleFocus("")}
              required
            />
          </S.TextField>
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
    background: #fafafa;
    border-radius: 8px;
    padding: 12px 18px;
    width: ${({ $width }) => $width || "200px"};
    border: ${({ $focused }) => ($focused ? "1px solid #d0d0d0" : "1px solid #d0d0d0")};
    box-shadow: ${({ $focused }) => ($focused ? "0 0 4px gray" : null)};
    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0;
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
