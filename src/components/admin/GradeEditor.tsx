import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoTrash } from 'react-icons/io5';
import GradeBlock from './GradeBlock';
import { GradeEditorProps } from '@/constants/admin/types';
import { DEFAULT_COLOR, NEW_GRADES } from '@/constants/admin/constants';

const GradeEditor = ({ gradesList, setCurrentData }: GradeEditorProps) => {
  const handleCreate = () => {
    setCurrentData((prev) => ({ ...prev, grades: [...NEW_GRADES] }));
  };

  const handleDelete = () => {
    setCurrentData((prev) => ({ ...prev, grades: [] }));
  };

  const handleColorChange = (index: number, color: string) => {
    const currentList = gradesList ? [...gradesList] : [...NEW_GRADES];
    currentList[index] = color;
    setCurrentData((prev) => ({ ...prev, grades: [...currentList] }));
  };

  const handleCountChange = (operation: string) => {
    if (operation === 'plus') {
      if (gradesList!.length === 10) return;
      setCurrentData((prev) => {
        const currentList = [...prev.grades!];
        return { ...prev, grades: [...currentList, DEFAULT_COLOR] };
      });
    } else {
      if (gradesList!.length === 2) return;
      setCurrentData((prev) => {
        const newList = prev.grades!.filter(
          (_, i) => i !== prev.grades!.length - 1,
        );
        return { ...prev, grades: [...newList] };
      });
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <span>난이도</span>
        <S.Icon onClick={handleDelete}>
          <IoTrash />
        </S.Icon>
      </S.Header>
      <S.Content $direction="column">
        {gradesList && gradesList.length > 0 ? (
          <>
            <S.Bar>
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
            </S.Bar>
            <S.Label>
              <span>easy</span>
              <span>hard</span>
            </S.Label>
          </>
        ) : (
          <button onClick={handleCreate}>난이도 생성</button>
        )}
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
    display: flex;
    justify-content: space-between;
  `,
  Icon: styled.div`
    cursor: pointer;
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
