import styled from "styled-components";

// 소켓 동작 확인 후에 적용
export type MessageFormat = {
  user: string;
  message: string;
};

interface ChatHistoryProps {
  messages: MessageFormat[];
}

const ChatHistory = ({ messages }: { messages: string[] }) => {
  return (
    <Wrapper>
      {messages.map((message, i) => (
        <M.Wrapper $direction={"flex-end"} key={i}>
          <M.Message>{message}</M.Message>
        </M.Wrapper>
      ))}
      {/* {messages.map(({ user, message }, i) => (
        <M.Wrapper $direction={user === "관리자" ? "flex-start" : "flex-end"} key={i}>
          {user === "관리자" ? <M.Name>{user}</M.Name> : null}
          <M.Message>{message}</M.Message>
        </M.Wrapper>
      ))} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cacaca;
  gap: 20px;
  background: white;
  border-radius: 6px;
  padding: 10px;
  flex: 1 0 0;
  margin-bottom: 12px;
  overflow-y: scroll;
`;

const M = {
  Wrapper: styled.div<{ $direction: string }>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 80%;
    align-self: ${({ $direction }) => $direction};
  `,
  Name: styled.div`
    font-weight: 700;
  `,
  Message: styled.div`
    border-radius: 6px;
    border: 1px solid #cacaca;
    padding: 6px;
  `,
};

export default ChatHistory;
