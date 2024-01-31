"use client";

import { styled } from "styled-components";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import DropDown, { DropItem } from "./DropDown";
import router from "next/router";

interface SearchProps {
  dataList: Array<DropItem>;
  width?: string;
  fontSize?: string;
  placeholder?: string;
  postfixIcon?: JSX.Element; // 검색창에 표시되는 아이콘
  onSubmit?: (arg: unknown) => unknown; // 엔터 클릭시 발생되는 이벤트
  useLocation?: boolean; // 현재 위치로 검색
  searchWord?: string;
}

export const Search = ({
  dataList,
  width,
  fontSize,
  placeholder = "",
  postfixIcon,
  onSubmit,
  useLocation = false,
  searchWord,
}: SearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(-1);
  const [isInputFocus, setInputFocus] = useState(false);
  const [filterStr, setFilterStr] = useState("");
  const filteredList = dataList.filter((dataItem) =>
    dataItem.info.match(filterStr)
  );

  const handleClick = (event: { target: { innerText: any } }) => {
    if (onSubmit) {
      // 검색내용 포함시켜 라우팅
      router.push({
        pathname: "/search",
        query: { q: event.target.innerText },
      });
    }
  };

  // const handleMoueOver = () => {};

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
    <Styled.Wrapper width={width} ref={searchRef}>
      <Styled.Form onSubmit={onSubmit} autoComplete="off">
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
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key == "ArrowUp") {
              if (index > -1) {
                if (index != 0) {
                  (e.target as HTMLInputElement).value =
                    filteredList[index - 1].info;
                }
                setIndex(index - 1);
              }
            } else if (e.key == "ArrowDown") {
              if (index < filteredList.length - 1) {
                (e.target as HTMLInputElement).value =
                  filteredList[index + 1].info;
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
        {postfixIcon}
      </Styled.Form>
      {isInputFocus && filteredList.length != 0 && (
        <DropDown
          prefixIcon={postfixIcon}
          dropItems={filteredList}
          highlightWord={filterStr}
          highlightIndex={index}
          fontSize={fontSize}
          handleClick={handleClick as (arg: unknown) => unknown}
          // onMouseOver={handleMouseOver}
          useLocation={useLocation}
        />
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div<{
    width?: string;
  }>`
    background-color: white;
    position: relative;
    ${(props) => props.width && `width: ${props.width};`}
  `,
  Form: styled.form`
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
  `,
  Input: styled.input<{
    fontSize?: string;
  }>`
    border: none;
    outline: none; // input 포커스시의 볼더 없애기
    width: 80%;
    ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
  `,
};

export default Search;
function querySelector(arg0: string) {
  throw new Error("Function not implemented.");
}
