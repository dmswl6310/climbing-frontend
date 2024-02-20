import { useState } from 'react';
import styled from 'styled-components';
import AddressField from './AddressField';
import { GymData } from '@/pages/admin/edit';

interface NewGymFormProps {
  handleSubmit: (formData: GymData) => void;
}

const REGEX_NUMBER = /^[0-9-]*$/;

const NewGymForm = ({ handleSubmit }: NewGymFormProps) => {
  const [formData, setFormData] = useState<GymData>({
    name: '',
    address: { jibunAddress: '', roadAddress: '', unitAddress: '' },
    coordinates: { latitude: 0, longitude: 0 },
    contact: '',
    latestSettingDay: '',
  });

  const handleInput = (input: string, type: string, key: string) => {
    if (input.length > 20) return;
    if (type === 'number' && !REGEX_NUMBER.test(input)) return;
    setFormData((prev) => ({ ...prev, [key]: input }));
  };

  const getSettingDate = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const day = currentDate.getDate().toString();
    const settingDate = `${year.slice(-2)}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
    return settingDate;
  };

  return (
    <Styled.Wrapper>
      <Styled.Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({
            ...formData,
            latestSettingDay: getSettingDate(),
          });
        }}
      >
        <div>
          <h4>암장명</h4>
          <Styled.TextField>
            <input
              value={formData.name}
              onChange={(e) => handleInput(e.target.value, 'string', 'name')}
              required
            />
          </Styled.TextField>
        </div>
        <div>
          <h4>암장 주소</h4>
          <Styled.TextField $width="450px">
            <AddressField
              address={formData.address}
              handleAddressChange={setFormData}
            />
          </Styled.TextField>
        </div>
        <div>
          <h4>연락처</h4>
          <Styled.TextField>
            <input
              value={formData.contact}
              onChange={(e) => handleInput(e.target.value, 'number', 'contact')}
              placeholder="전화번호 입력"
              required
            />
          </Styled.TextField>
        </div>
        <input type="submit" value="등록" />
      </Styled.Form>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    h4 {
      margin-top: 0;
      margin-bottom: 4px;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  TextField: styled.div<{ $width?: string }>`
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
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

export default NewGymForm;
