import styled from "styled-components";
import NoData from "./NoData";
import Tag from "../common/Tag";
import type { TagListProps } from "@/constants/gyms/types";

const TagList = ({ tags }: TagListProps) => {
  return !tags || tags.length < 1 ? (
    <NoData />
  ) : (
    <Wrapper>
      {tags.map((tag: string, i: number) => (
        <Tag key={i} prefix="#" text={tag} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export default TagList;
