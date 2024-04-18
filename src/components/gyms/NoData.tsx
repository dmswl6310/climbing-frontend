import styled from "styled-components";
import { NO_DATA } from "@/constants/gyms/constants";

const NoData = () => {
  return <Wrapper>{NO_DATA}</Wrapper>;
};

const Wrapper = styled.div`
  color: #979797;
  text-align: center;
`;

export default NoData;
