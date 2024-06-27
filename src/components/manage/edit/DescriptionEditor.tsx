import styled from "styled-components";
import ContentContainer from "../ContentContainer";
import { COLOR } from "@/styles/global-color";
import type { DescriptionEditorProps } from "@/constants/manage/types";

const DescriptionEditor = ({ description, setNewData }: DescriptionEditorProps) => {
  const handleChange = (input: string) => {
    if (input.length > 300) return;
    setNewData({ description: input });
  };
  return (
    <div className="editor-wrapper">
      <div className="editor-header">설명글</div>
      <ContentContainer direction="row-reverse" gap="20px">
        <S.TextField>
          <textarea value={description ?? ""} onChange={(e) => handleChange(e.target.value)} />
        </S.TextField>
        <span style={{ fontWeight: 700, alignSelf: "stretch" }}>
          {description?.length || 0}/300
        </span>
      </ContentContainer>
    </div>
  );
};

const S = {
  TextField: styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${COLOR.BACKGROUND_LIGHT};
    border-radius: 8px;
    border: 1px solid ${COLOR.DISABLED};
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
