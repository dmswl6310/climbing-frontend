import { styled } from "styled-components";
import reactStringReplace from "react-string-replace";
import { COLOR } from "@/styles/global-color";
import { DropDownProps, DropItem } from "@/constants/search/types";
import { DEVICE_SIZE } from "@/constants/styles";

const DropDown = ({
  dropItems,
  prefixIcon,
  highlightWord = "",
  highlightIndex = -1,
  setHighlightIndex,
  width,
  fontSize,
  handleClick,
}: DropDownProps) => {
  const handleMouseHover = (index: number) => {
    if (setHighlightIndex) {
      setHighlightIndex(index);
    }
  };

  const listItems = dropItems.map(({ cityDistrict }: DropItem, index) => (
    <S.Element
      key={index}
      $highlight={index == highlightIndex}
      fontSize={fontSize}
      onClick={handleClick}
      onMouseEnter={() => handleMouseHover(index)}
    >
      {prefixIcon || null}
      <S.Space></S.Space>
      <S.MatchContainer>
        {reactStringReplace(
          cityDistrict,
          highlightWord as string,
          (match, index) => {
            return <strong key={index}>{match}</strong>;
          }
        )}
      </S.MatchContainer>
    </S.Element>
  ));

  return (
    <S.Wrapper className="container" width={width}>
      <S.Group>{listItems}</S.Group>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{
    width?: string;
  }>`
    position: absolute;
    z-index: 1;
    background-color: white;
    // TODO: 사이즈가 안맞음..
    width: ${(props) =>
      props.width ? `${parseInt(props.width, 10) - 3}px` : `99.4%`};
    border: 2px solid ${COLOR.LIGHT_MAIN};
    border-radius: 5px;
  `,
  Group: styled.ul`
    margin: 0;
    padding: 0;
  `,
  Element: styled.li<{
    $highlight: boolean;
    fontSize?: string;
  }>`
    display: flex;
    flex-direction: row;
    height: 30px;
    padding: 3px 10px;
    align-items: center;
    list-style: none;
    ${(props) => props.fontSize && `font-size: ${props.fontSize}`};
    ${(props) => props.$highlight && `background-color: ${COLOR.LIGHT_MAIN}`};
    @media ${DEVICE_SIZE.mobileLarge} {
      font-size: 1rem;
    }
  `,
  Space: styled.div`
    margin-left: 10px;
  `,
  MatchContainer: styled.div`
    align-items: center;
    padding: 0;
    margin: 0;
  `,
};

export default DropDown;
