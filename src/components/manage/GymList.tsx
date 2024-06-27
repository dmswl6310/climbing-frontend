import { useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaBuilding } from "react-icons/fa6";
import EllipsisButton from "../common/EllipsisButton";
import { NavContext, type NavStateProps } from "@/NavContext";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";

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
        <FaBuilding size="1.3rem" color="white" />
      </Icon>
      <div className="gym-name" title={name}>
        {name}
      </div>
      <EllipsisButton
        options={[
          { text: "정보 수정", action: () => handleClick(`/manage/edit/${id}?p=1`) },
          { text: "댓글 관리", action: () => handleClick(`/manage/comments/${id}`) },
          { text: "1:1 문의", action: () => handleClick(`/manage/chat/${id}`) },
        ]}
      />
      <Btn onClick={() => handleClick(`/manage/edit/${id}?p=1`)}>정보 수정</Btn>
      <Btn onClick={() => handleClick(`/manage/comments/${id}`)}>댓글 관리</Btn>
      <Btn onClick={() => handleClick(`/manage/chat/${id}`)}>1:1 문의</Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  background: ${COLOR.BACKGROUND_LIGHT};
  border: 1px solid ${COLOR.DISABLED};
  border-radius: 0.7rem;
  padding: 1rem;
  margin: 0.7rem 0;
  align-items: center;
  &:first-child {
    margin: 0;
  }
  .gym-name {
    margin-right: auto;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: default;
  }
  @media ${DEVICE_SIZE.tablet} {
    gap: 0.75rem;
  }
`;

const Btn = styled.div`
  padding: 0.7rem 1.5rem;
  border-radius: 0.7rem;
  border: 1px solid ${COLOR.DISABLED};
  background: white;
  color: ${COLOR.BACKGROUND_DARK};
  white-space: nowrap;
  &:hover {
    color: ${COLOR.DISABLED};
  }
  cursor: pointer;
  @media ${DEVICE_SIZE.tablet} {
    padding: 0.3rem 0.7rem;
    border-radius: 0.5rem;
  }
  @media ${DEVICE_SIZE.mobileLarge} {
    display: none;
  }
`;

const Icon = styled.div`
  background: ${COLOR.BACKGROUND_DARK};
  border-radius: 50%;
  display: grid;
  place-content: center center;
  padding: 1rem;
  width: 1rem;
  height: 1rem;
  @media ${DEVICE_SIZE.tablet} {
    display: none;
  }
`;

export default GymList;
