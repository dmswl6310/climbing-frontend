import styled from "styled-components";
import HelpModal from "@/components/chat/HelpModal";

const SocketPage = () => {
  return (
    <Wrapper>
      <HelpModal />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 600px;
`;

export default SocketPage;
