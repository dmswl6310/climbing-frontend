import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import GradeBlock from './GradeBlock';
import { GymData } from '@/pages/admin/edit';

interface GradeEditorProps {
  gradesList: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

const NEW_GRADES = ['#d9d9d9', '#d9d9d9'];
const DEFAULT_COLOR = '#d9d9d9';

const GradeEditor = ({ gradesList, setCurrentData }: GradeEditorProps) => {
  const handleCreate = () => {
    setCurrentData((prev) => ({ ...prev, grades: [...NEW_GRADES] }) as GymData);
  };

  const handleColorChange = (index: number, color: string) => {
    const currentList = gradesList ? [...gradesList] : [...NEW_GRADES];
    currentList[index] = color;
    setCurrentData(
      (prev) => ({ ...prev, grades: [...currentList] }) as GymData,
    );
  };

  const handleCountChange = (operation: string) => {
    if (operation === 'plus') {
      if (gradesList!.length === 10) return;
      setCurrentData((prev) => {
        const currentList = [...prev.grades!];
        return { ...prev, grades: [...currentList, DEFAULT_COLOR] } as GymData;
      });
    } else {
      if (gradesList!.length === 2) return;
      setCurrentData((prev) => {
        const newList = prev.grades!.filter(
          (_, i) => i !== prev.grades!.length - 1,
        );
        return { ...prev, grades: [...newList] } as GymData;
      });
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Header>난이도</Styled.Header>
      <Styled.Content $direction="column">
        {gradesList ? (
          <>
            <Styled.Bar>
              <FaMinus onClick={() => handleCountChange('minus')} />
              {gradesList.map((grade, i) => (
                <GradeBlock
                  key={i}
                  index={i}
                  color={grade}
                  handleColorChange={handleColorChange}
                />
              ))}
              <FaPlus onClick={() => handleCountChange('plus')} />
            </Styled.Bar>
            <Styled.Label>
              <span>easy</span>
              <span>hard</span>
            </Styled.Label>
          </>
        ) : (
          <button onClick={handleCreate}>난이도 생성</button>
        )}
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
    gap: 6px;
  `,
  Bar: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;

    svg {
      margin: 0px 8px;
      cursor: pointer;
    }
  `,
  Label: styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0px 37px;
    justify-content: space-between;
  `,
};

export default GradeEditor;
