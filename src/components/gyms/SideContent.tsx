import styled from "styled-components";
import ContactInfo from "./ContactInfo";
import GradeBar from "./GradeBar";
import NoData from "./NoData";
import OpenHoursTable from "./OpenHoursTable";
import PricingTable from "./PricingTable";
import TagList from "./TagList";
import { DEVICE_SIZE } from "@/constants/styles";
import type { GymData } from "@/constants/gyms/types";

const SideContent = ({ gymData }: { gymData: GymData }) => {
  return (
    <Wrapper>
      <div className="container">
        <h4>관련 태그</h4>
        <TagList tags={gymData.tags} />
      </div>
      <div className="container">
        <h4>이용금액</h4>
        <PricingTable pricing={gymData.pricing} />
      </div>
      <div className="container">
        <h4>영업시간</h4>
        <OpenHoursTable openHours={gymData.openHours} />
      </div>
      <div className="container">
        <h4>시설 정보</h4>
        {!gymData.accommodations ? <NoData /> : gymData.accommodations.join(", ")}
      </div>
      <div className="container">
        <h4>난이도</h4>
        <GradeBar grades={gymData.grades} />
      </div>
      <div className="container">
        <ContactInfo contact={gymData.contact} snsList={gymData.sns} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  gap: 20px;
  & > div {
    box-sizing: border-box;
    padding: 24px 28px;
  }
  h4 {
    margin-top: 0;
    margin-bottom: 16px;
  }
  @media ${DEVICE_SIZE.desktop} {
    width: 430px;
  }
  @media ${DEVICE_SIZE.laptop} {
    margin-top: 40px;
    width: inherit;
  }
`;

export default SideContent;
