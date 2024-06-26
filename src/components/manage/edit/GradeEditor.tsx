import styled from "styled-components";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoTrash } from "react-icons/io5";
import ContentContainer from "../ContentContainer";
import GradeBlock from "./GradeBlock";
import ReactIcon from "@/components/common/ReactIcon";
import { DEFAULT_COLOR, NEW_GRADES } from "@/constants/manage/constants";
import { DEVICE_SIZE } from "@/constants/styles";
import type { GradeEditorProps } from "@/constants/manage/types";

const GradeEditor = ({ gradesList, setNewData }: GradeEditorProps) => {
  const handleCreate = () => setNewData({ grades: [...NEW_GRADES] });

  const handleDelete = () => setNewData({ grades: [] });

  const handleColorChange = (index: number, color: string) => {
    const currentList = gradesList ? [...gradesList] : [...NEW_GRADES];
    currentList[index] = color;
    setNewData({ grades: [...currentList] });
  };

  const handleCountChange = (operation: string) => {
    const currentList = gradesList ? gradesList : [];
    if (operation === "plus") {
      if (gradesList!.length === 10) return;
      setNewData({ grades: [...currentList, DEFAULT_COLOR] });
    }
    if (operation === "minus") {
      if (gradesList!.length === 2) return;
      const filteredList = currentList.filter((_, i) => i !== currentList.length - 1);
      setNewData({ grades: [...filteredList] });
    }
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-header editor-removable">
        <span>난이도</span>
        <ReactIcon clickable={true}>
          <IoTrash onClick={handleDelete} size="1.3rem" />
        </ReactIcon>
      </div>
      <ContentContainer direction="column" gap="6px">
        {gradesList && gradesList.length > 0 ? (
          <>
            <S.Bar>
              <FaMinus onClick={() => handleCountChange("minus")} />
              {gradesList.map((grade, i) => (
                <GradeBlock
                  key={i}
                  index={i}
                  size={gradesList.length}
                  color={grade}
                  handleColorChange={handleColorChange}
                />
              ))}
              <FaPlus onClick={() => handleCountChange("plus")} />
            </S.Bar>
            <S.Label>
              <span>easy</span>
              <span>hard</span>
            </S.Label>
          </>
        ) : (
          <div>
            <button className="btn-secondary" onClick={handleCreate}>
              + 난이도 생성
            </button>
          </div>
        )}
      </ContentContainer>
    </div>
  );
};

const S = {
  Bar: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    svg {
      margin: 0px 8px;
      cursor: pointer;
      @media ${DEVICE_SIZE.laptop} {
        margin: 0 0.2rem;
      }
    }
  `,
  Label: styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0px 37px;
    justify-content: space-between;
    color: #b7b7b7;
    @media ${DEVICE_SIZE.laptop} {
      padding: 0 1.5rem;
    }
  `,
};

export default GradeEditor;
