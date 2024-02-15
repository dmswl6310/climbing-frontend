import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { GymData } from '@/pages/admin/edit';

interface DescriptionEditorProps {
  description: string;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

const DescriptionEditor = ({
  description,
  setCurrentData,
}: DescriptionEditorProps) => {
  const handleChange = (input: string) => {
    if (input.length > 300) return;
    setCurrentData((prev) => ({ ...prev, description: input }) as GymData);
  };
  return (
    <Styled.Wrapper>
      <Styled.Header>설명글</Styled.Header>
      <Styled.Content>
        <Styled.TextField>
          <textarea
            value={description}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Styled.TextField>
        {description.length}/300
      </Styled.Content>
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
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: 100%;
    height: 150px;

    textarea {
      border: none;
      background: transparent;
      width: 100%;
      height: 100%;
      padding: 0;
      resize: none;
    }
  `,
};

export default DescriptionEditor;