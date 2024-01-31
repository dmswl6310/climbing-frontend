import { styled } from "styled-components";
import reactStringReplace from "react-string-replace";
import CurrentLocationBtn from "./CurrentLocationBtn";

interface DropDownProps {
  dropItems: Array<DropItem>;
  prefixIcon?: JSX.Element; // list왼쪽 react-icon 컴포넌트 태그
  highlightWord?: String; // 강조 문구 있을 시, 강조 표시
  highlightIndex?: number; // 강조할 행은 강조표시
  width?: string; // search컴포넌트 없이 dropdown 단독으로 쓸때만 사용
  fontSize?: string;
  useLocation?: boolean;
  handleClick?: (arg: unknown) => unknown;
}

export interface DropItem {
  id: number;
  info: string;
}

const DropDown = ({
  dropItems,
  prefixIcon,
  highlightWord = "",
  highlightIndex = -1,
  width,
  fontSize,
  useLocation = false,
  handleClick,
}: DropDownProps) => {
  const listItems = dropItems.map(({ id, info }: DropItem, index) => (
    <S.Element
      key={index}
      $highlight={index == highlightIndex}
      fontSize={fontSize}
      onClick={handleClick}
    >
      {prefixIcon || null}
      {reactStringReplace(info, highlightWord as string, (match, index) => (
        <b key={index}>{match}</b>
      ))}
    </S.Element>
  ));

  return (
    <S.Wrapper width={width}>
      <S.Group>{listItems}</S.Group>
      {useLocation && <CurrentLocationBtn />}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{
    width?: string;
  }>`
    position: absolute;
    z-index: 1;
    margin: 0px;
    background-color: white;

    width: ${(props) => props.width || `100%`};
    border: 1px solid black;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
  `,
  Group: styled.ul`
    margin: 0;
    padding: 0;
  `,
  Element: styled.li<{
    $highlight: boolean;
    fontSize?: string;
  }>`
    padding-left: 5px;
    list-style: none;
    ${(props) => props.fontSize && `font-size: ${props.fontSize}`};
    ${(props) => props.$highlight && `background-color: #eeee8d`};
  `,
};

export default DropDown;
