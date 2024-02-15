import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { GymData } from '@/pages/admin/edit';

interface AccommodationsEditorProps {
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

const AccommodationsEditor = ({setCurrentData}: AccommodationsEditorProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Header>시설 정보</Styled.Header>
      <Styled.Content>{"테스트"}</Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
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
    gap: 20px;
  `,
};

export default AccommodationsEditor;