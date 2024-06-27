import { type MouseEvent, useRef } from "react";
import styled from "styled-components";
import { HiCog } from "react-icons/hi";
import ReactIcon from "../common/ReactIcon";
import { COLOR } from "@/styles/global-color";

export type Member = {
  nickname: string;
  email: string;
  role: string;
};

export interface MemberList {
  members: Member[];
  openModal: (member: Member) => void;
}

const MemberTable = ({ members, openModal }: MemberList) => {
  const hoverElem = useRef<null | HTMLDivElement>(null);

  const handleMouseEnter = (e: MouseEvent) => {
    if (!hoverElem.current) return;
    const xPos = e.clientX;
    const yPos = (e.target as HTMLSpanElement).offsetTop + 30;
    const text = (e.target as HTMLSpanElement).textContent;
    hoverElem.current.style.top = `${yPos}px`;
    hoverElem.current.style.left = `${xPos}px`;
    hoverElem.current.style.padding = "0.3rem";
    hoverElem.current.textContent = text;
  };

  const handleMouseLeave = () => {
    if (!hoverElem.current) return;
    hoverElem.current.textContent = "";
    hoverElem.current.style.padding = "0";
  };

  return (
    <>
      <table>
        <colgroup>
          <col className="nickname" />
          <col className="email" />
          <col className="role" />
          <col className="button" />
        </colgroup>
        <thead>
          <tr>
            <td>Nickname</td>
            <td>Email</td>
            <td>Role</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {members.map((member, i) => (
            <tr key={i}>
              <td className="nickname">
                <TdText>
                  <span title={member.nickname}>{member.nickname}</span>
                </TdText>
              </td>
              <td className="email">
                <TdText>
                  <span title={member.email}>{member.email}</span>
                </TdText>
              </td>
              <td className="role">
                <Tag className={member.role}>{member.role}</Tag>
              </td>
              <td>
                <ReactIcon clickable={true}>
                  <HiCog size="1.3rem" color="#9c9c9c" onClick={() => openModal(member)} />
                </ReactIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <HoverText ref={hoverElem} />
    </>
  );
};

const TdText = styled.div`
  width: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  span {
    position: relative;
    cursor: default;
  }
`;

const HoverText = styled.div`
  position: fixed;
  z-index: 10;
  border-radius: 4px;
  background: ${COLOR.BACKGROUND_DARK};
  max-width: 30ch;
  color: white;
`;

const Tag = styled.div`
  border-radius: 50px;
  padding: 0.2rem 0.5rem;
  font-size: 0.85rem;
  max-width: 55px;
  text-align: center;
  user-select: none;
  &.admin {
    border: 1px solid rgb(184, 95, 177);
    background: rgb(247, 214, 229);
    color: rgb(184, 95, 177);
  }
  &.manager {
    border: 1px solid rgb(95, 116, 151);
    background: rgb(211, 224, 245);
    color: rgb(95, 116, 151);
  }
  &.user {
    border: 1px solid rgb(73, 161, 73);
    background: rgb(207, 242, 203);
    color: rgb(73, 161, 73);
  }
`;

export default MemberTable;
