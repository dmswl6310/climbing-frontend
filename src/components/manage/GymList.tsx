import { useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaBuilding } from "react-icons/fa6";
import { NavContext, type NavStateProps } from "@/NavContext";

type GymListProps = {
  name: string;
  id: string;
};

const GymList = ({ name, id }: GymListProps) => {
  const router = useRouter();
  const { selectedGymId, setSelectedGymId } = useContext(NavContext) as NavStateProps;
  const handleClick = (path: string) => {
    if (selectedGymId !== id) setSelectedGymId(id);
    router.push(path);
  };
  return (
    <Wrapper>
      <Icon>
        <FaBuilding size="1.3rem" />
      </Icon>
      <span className="strong">{name}</span>
      <Btn onClick={() => handleClick(`/manage/edit/${id}?p=1`)}>정보 수정</Btn>
      <Btn onClick={() => handleClick(`/manage/comments/${id}`)}>댓글 관리</Btn>
      <Btn onClick={() => handleClick(`/manage/chat/${id}`)}>1:1 문의</Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  background: #f3f3f3;
  border-radius: 0.7rem;
  padding: 1rem;
  margin: 0.7rem 0;
  align-items: center;
  .strong {
    font-weight: 700;
    font-size: 1.1rem;
    margin-right: 1.3rem;
  }
`;

const Btn = styled.div`
  padding: 0.7rem;
  border-radius: 0.7rem;
  background: white;
  color: #666;
  &:hover {
    color: #bababa;
  }
  cursor: pointer;
`;

const Icon = styled.div`
  background: white;
  border-radius: 50%;
  display: grid;
  place-content: center center;
  padding: 1rem;
  width: 1rem;
  height: 1rem;
`;

export default GymList;
