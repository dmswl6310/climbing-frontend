import { useState } from "react";
import styled from "styled-components";
import MemberTable from "@/components/admin/MemberTable";
import Modal from "@/components/admin/Modal";
import type { Member } from "@/components/admin/MemberTable";

const AdminPage = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // fetch 로직 추가

  const openModal = (member: Member) => {
    setSelectedMember(member);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateRole = (role: string) => {
    // PUT 작업
  };

  return (
    <Wrapper>
      <MemberTable members={testData} openModal={openModal} />
      {isOpen && (
        <Modal closeModal={closeModal} selectedMember={selectedMember} updateRole={updateRole} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-content: center center;
  table {
    border-collapse: collapse;
    table-layout: fixed;
  }
  tr {
    height: 3rem;
    border-bottom: 1px solid #e5e5e5;
  }
  thead > tr {
    font-weight: 600;
  }
  tbody > tr:last-child {
    border: none;
  }
  .role {
    width: 90px;
  }
  .nickname {
    width: 300px;
  }
  .email {
    width: 430px;
    line-height: 1.5rem;
  }
  .button {
    width: 40px;
  }
`;

const testData = [
  { nickname: "스피커", role: "admin", email: "sdfklj@gmail.com" },
  { nickname: "모니터", role: "manager", email: "635s4ef@gmail.com" },
  { nickname: "마우스", role: "manager", email: "383__dflskdj@gmail.com" },
  { nickname: "키보드", role: "user", email: "dfe5fe82@gmail.com" },
  { nickname: "데스크탑", role: "user", email: "sd6f8eg__@gmail.com" },
  {
    nickname: "케이블케이블케이블케이블케이블케이블케이블케이블케이블케이블케이블케이블",
    role: "user",
    email: "fsle_ef5@gmail.com",
  },
  {
    nickname:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et consectetur neque totam cum sed, fugiat est suscipit, itaque saepe officiis adipisci eligendi? Quasi eius repellat, dolorem temporibus fugit delectus, mollitia reiciendis quaerat numquam itaque labore suscipit odit eveniet expedita, corrupti deserunt! Quod eos sequi ipsam molestiae explicabo at quas!",
    role: "user",
    email: "fsle_ef5@gmail.com",
  },
];

export default AdminPage;
