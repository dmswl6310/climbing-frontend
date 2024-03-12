import { useState } from 'react';
import styled from 'styled-components';
import AddressField from './AddressField';
import { GymData } from '@/constants/gyms/types';
import { NewGymFormProps } from '@/constants/admin/types';
import { PHONE_REGEX } from '@/constants/admin/constants';

const NewGymForm = ({ handleSubmit }: NewGymFormProps) => {
  const [formData, setFormData] = useState<GymData>({
    name: '',
    address: { jibunAddress: '', roadAddress: '', unitAddress: '' },
    coordinates: { latitude: 0, longitude: 0 },
    contact: '',
  });

  const handleInput = (input: string, type: string, key: string) => {
    if (input.length > 20) return;
    if (type === 'number' && !PHONE_REGEX.test(input)) return;
    setFormData((prev) => ({ ...prev, [key]: input }));
  };

  return (
    <S.Wrapper>
      <S.Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ ...formData });
        }}
      >
        <div>
          <h4>암장명</h4>
          <S.TextField>
            <input
              value={formData.name}
              onChange={(e) => handleInput(e.target.value, 'string', 'name')}
              required
            />
          </S.TextField>
        </div>
        <div>
          <h4>암장 주소</h4>
          <S.TextField $width="450px">
            <AddressField
              address={formData.address}
              handleAddressChange={setFormData}
            />
          </S.TextField>
        </div>
        <div>
          <h4>연락처</h4>
          <S.TextField>
            <input
              value={formData.contact}
              onChange={(e) => handleInput(e.target.value, 'number', 'contact')}
              placeholder="전화번호 입력"
              required
            />
          </S.TextField>
        </div>
        <input type="submit" value="등록" />
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
