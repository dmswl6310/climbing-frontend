"use client";
import { styled } from "styled-components";
import { useEffect, useRef, useState } from "react";
import router from "next/router";
import { COLOR } from "@/styles/global-color";
import DropDown from "./DropDown";
import { SearchProps } from "@/constants/search/types";
import CurrentLocationBtn from "../search/CurrentLocationBtn";
import { DEVICE_SIZE } from "@/constants/styles";

const Search = ({
  dataList,
  width,
  height,
  fontSize = "18px",
  placeholder = "",
  postfixIcon,
  onSubmit,
  useLocation = false,
  searchWord,
  border,
  dropDownCount = 10,
  isSearchPage = true,
}: SearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(-1);
  const [isInputFocus, setInputFocus] = useState(false);
  const [filterStr, setFilterStr] = useState("");
  const filteredList = dataList
    .filter((dataItem) => dataItem.cityDistrict.match(filterStr))
    .slice(0, dropDownCount);

  const handleClick = (event: {
    preventDefault(): unknown;
    target: { innerText: any };
  }) => {
    event.preventDefault();

    if (onSubmit) {
      // 검색내용 포함시켜 라우팅
      router
        .push({
          pathname: "/search",
          query: { q: event.target.innerText },
        })
        .then(() => {
          if (isSearchPage) router.reload();
        });
    }
  };

  // 바깥쪽을 클릭했을때 dropdown 숨기기 위해
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setInputFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <Styled.Wrapper
      width={width}
      ref={searchRef}
      $needChangeWidth={!useLocation}
    >
      {useLocation && <CurrentLocationBtn fontSize="17px" />}
      <Styled.Form
        className={isInputFocus ? "container" : ""}
        onSubmit={onSubmit}
        autoComplete="off"
        $border={border}
        $inputFocus={isInputFocus}
        $height={height}
      >
        {/* form에 action 요소 추가하여 전송할 주소 설정가능 */}
        <Styled.Input
          name="search"
          type="text"
          placeholder={placeholder}
          defaultValue={searchWord}
          fontSize={fontSize}
          onClick={(e) => {
            e.stopPropagation(); // 상위로 이벤트 전송 막음
          }}
          onFocus={(e) => {
            setIndex(-1);
            setInputFocus(true);
            setFilterStr(e.target.value);
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key == "ArrowUp") {
              if (index > -1) {
                if (index != 0) {
                  (e.target as HTMLInputElement).value =
                    filteredList[index - 1].cityDistrict;
                }
                setIndex(index - 1);
              }
            } else if (e.key == "ArrowDown") {
              if (index < filteredList.length - 1) {
                (e.target as HTMLInputElement).value =
                  filteredList[index + 1].cityDistrict;
                setIndex(index + 1);
              }
            } else if (e.key == "Escape") {
              (e.target as HTMLInputElement).value = "";
              setFilterStr("");
              setIndex(-1);
            } else {
              setFilterStr((e.target as HTMLInputElement).value);
            }
          }}
        />
        <Styled.IconWrapper>{postfixIcon}</Styled.IconWrapper>
      </Styled.Form>
      {isInputFocus && filteredList.length != 0 && (
        <DropDown
          prefixIcon={postfixIcon}
          dropItems={filteredList}
          highlightWord={filterStr}
          highlightIndex={index}
          setHighlightIndex={setIndex}
          fontSize={fontSize}
          handleClick={handleClick as (arg: unknown) => unknown}
        />
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div<{
    width?: string;
    $needChangeWidth?: boolean;
  }>`
    border-radius: 5px;
    background-color: white;
    position: relative;
    ${(props) => props.width && `width: ${props.width};`}
    @media ${DEVICE_SIZE.laptop} {
      ${(props) => props.$needChangeWidth && `width: 400px;`}
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: auto;
    }
  `,
  Form: styled.form<{
    $border?: string;
    $inputFocus?: boolean;
    $height?: string;
  }>`
    align-items: center;
    display: flex;
    justify-content: space-between;
    ${(props) => props.$height && `height: ${props.$height};`}
    border: ${(props) =>
      (!props.$inputFocus && props.$border) ||
      `2px solid ${COLOR.LIGHT_MAIN};`};
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 5px;
  `,
  Input: styled.input<{
    fontSize?: string;
  }>`
    border: none;
    outline: none; // input 포커스시의 볼더 없애기
    width: 95%;
    ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
    @media ${DEVICE_SIZE.mobileLarge} {
      font-size: 1rem;
    }
  `,
  IconWrapper: styled.button`
    margin: 0;
    padding: 0;
    display: flex;
    border: none;
    outline: none;
    background-color: inherit;
    cursor: pointer;
  `,
};

export default Search;
