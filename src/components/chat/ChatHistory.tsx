import { useEffect } from "react";
import styled from "styled-components";
import { BiSolidHelpCircle } from "react-icons/bi";
import MessageBatch from "./MessageBatch";
import { getFormattedDate } from "@/ChatHistoryContext";
import { COLOR } from "@/styles/global-color";

export type MessageFormat = {
  userType: string;
  message: string;
  createdAt: string;
};

type SortedMessageList = {
  date: string;
  messages: MessageFormat[];
}[];

interface ChatHistoryProps {
  history: MessageFormat[] | undefined;
  speaker: string;
}

const ChatHistory = ({ history, speaker }: ChatHistoryProps) => {
  useEffect(() => {
    document.querySelector(".tracker")?.scrollIntoView();
  }, [history]);

  const sortMessages = (messages: MessageFormat[]) => {
    const list: SortedMessageList = [];
    messages.forEach((message) => {
      const date = getFormattedDate(message.createdAt);
      const listItem = list.find((item) => item.date === date);
      if (!listItem) {
        const newItem = { date, messages: [message] };
        list.push(newItem);
      } else {
        listItem.messages.push(message);
      }
    });
    return list;
  };

  const sortedMessages: SortedMessageList = history ? sortMessages(history) : [];

  return (
    <S.Wrapper>
      {sortedMessages.length < 1 ? (
        <S.Placeholder>
          {speaker === "customer" ? (
            <>
              <BiSolidHelpCircle size="2rem" />
              <p>문의를 남겨주시면 신속하게 도와드리겠습니다.</p>
            </>
          ) : (
            <p>문의 내용이 없습니다.</p>
          )}
        </S.Placeholder>
      ) : (
        sortedMessages.map((batch, i) => (
          <div className="batch" key={i}>
            <div className="divider">{batch.date}</div>
            <MessageBatch messages={batch.messages} speaker={speaker} />
          </div>
        ))
      )}
      <div className="tracker"></div>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    border-radius: 6px;
    padding-right: 4px;
    padding-left: 12px;
    flex: 1 0 0;
    margin-bottom: 12px;
    overflow-y: auto;
    scrollbar-gutter: stable;
    word-break: break-all;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #e5e5e5;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${COLOR.DISABLED};
    }
    & .batch {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    & .divider {
      text-align: center;
      font-weight: 700;
      margin: 12px 0;
    }
  `,
  Placeholder: styled.div`
    margin-top: 26px;
    text-align: center;
  `,
};

export default ChatHistory;
