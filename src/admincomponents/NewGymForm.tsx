import { useState } from 'react';
import styled from 'styled-components';
import TextField from './TextField';
import AddressField from './AddressField';

interface NewGymFormProps {
  handleSubmit: Function;
}

const NewGymForm = ({ handleSubmit }: NewGymFormProps) => {
  const [address, setAddress] = useState({
    jibunAddress: '',
    roadAddress: '',
    unitAddress: '',
  });
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  return (
    <Styled.Wrapper>
      <Styled.Form
        onSubmit={(e) => {
          e.preventDefault();
          const nameField = document.querySelector(
            '.field__name',
          ) as HTMLInputElement;
          handleSubmit({ name: nameField.value, address, coordinates });
        }}
      >
        <div>
          <h4>암장명</h4>
          <TextField formName={'name'} characterLimit={20} />
        </div>
        <div>
          <h4>암장 주소</h4>
          <AddressField
            setAddress={setAddress}
            setCoordinates={setCoordinates}
          />
        </div>
        <div>
          <h4>이용금액</h4>
        </div>
        <div>
          <h4>영업시간</h4>
        </div>
        <div>
          <h4>연락처</h4>
        </div>
        <input type='submit' />
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
};

export default NewGymForm;
