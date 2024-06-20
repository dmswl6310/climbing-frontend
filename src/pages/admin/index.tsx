import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import FilterBar from "@/components/admin/FilterBar";
import MemberTable from "@/components/admin/MemberTable";
import Modal from "@/components/admin/Modal";
import PageNavigator from "@/components/admin/PageNavigator";
import { SERVER_ADDRESS, TEST_ADDRESS } from "@/constants/constants";
import { DEVICE_SIZE } from "@/constants/styles";
import type { Member } from "@/components/admin/MemberTable";

const fetchMembers = (page = 1, filter = "all") => {
  switch (filter) {
    case "all": {
      return fetch(`${TEST_ADDRESS}/adminusers?_page=${page}_per_page=10`).then((res) =>
        res.json(),
      );
    }
    default: {
      return fetch(`${TEST_ADDRESS}/adminusers?role=${filter}&_page=${page}_per_page=10`).then(
        (res) => res.json(),
      );
    }
  }
};

const AdminPage = () => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isFetching } = useQuery({
    queryKey: ["users", page, filter],
    queryFn: () => fetchMembers(page, filter),
    placeholderData: keepPreviousData,
    select: (data) => {
      if (filter === "all") return data;
      return { ...data, data: data.data.filter((member: Member) => member.role === filter) };
    },
  });

  useEffect(() => setPage(1), [filter]);

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

  const handleFilterSelect = (value: string) => setFilter(value);

  const handlePageSelect = (value: number) => setPage(value);

  return (
    <Wrapper>
      <h1>멤버 관리</h1>
      <FilterBar handleFilterSelect={handleFilterSelect} />
      {isFetching ? (
        <Placeholder>
          <BarLoader />
        </Placeholder>
      ) : (
        data && <MemberTable members={data.data} openModal={openModal} />
      )}
      {data && (
        <PageNavigator
          currentPage={data.prev + 1}
          pages={data.pages}
          handlePageSelect={handlePageSelect}
        />
      )}
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
    @media ${DEVICE_SIZE.tablet} {
      width: 180px;
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: 140px;
    }
  }
  .email {
    width: 430px;
    line-height: 1.5rem;
    @media ${DEVICE_SIZE.tablet} {
      width: 250px;
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: 180px;
    }
  }
  .button {
    width: 40px;
  }
`;

const Placeholder = styled.div`
  display: grid;
  place-content: center center;
  width: 866px;
  height: 528px;
`;

export default AdminPage;
