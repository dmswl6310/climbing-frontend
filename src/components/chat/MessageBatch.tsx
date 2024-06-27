import styled from "styled-components";
import { MessageFormat } from "./ChatHistory";
import { getFormattedTime } from "@/ChatHistoryContext";
import { COLOR } from "@/styles/global-color";

interface MessageBatchProps {
  messages: MessageFormat[];
  speaker: string;
}

const MessageBatch = ({ messages, speaker }: MessageBatchProps) => {
  return messages.map(({ userType, message, createdAt }, i) => {
    const className = messages[i + 1]?.userType !== userType ? "last-message" : "";
    const isSpeaker = userType === speaker;
    const isSameTimeFrame =
      messages[i + 1]?.userType === userType &&
      messages[i + 1] &&
      getFormattedTime(messages[i + 1].createdAt) === getFormattedTime(createdAt);

    return (
      <S.Wrapper key={i}>
        <S.Message $speaker={userType === speaker} className={className}>
          {isSpeaker && !isSameTimeFrame && <span>{getFormattedTime(createdAt)}</span>}
          <div>{message}</div>
          {!isSpeaker && !isSameTimeFrame && <span>{getFormattedTime(createdAt)}</span>}
        </S.Message>
      </S.Wrapper>
    );
  });
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    &:last-of-type .last-message {
      margin: 0;
    }
  `,
  Message: styled.div<{ $speaker: boolean }>`
    display: flex;
    align-items: flex-end;
    gap: 4px;
    max-width: 85%;
    align-self: ${({ $speaker }) => ($speaker ? "flex-end" : "flex-start")};
    &.last-message {
      margin-bottom: 1.5rem;
    }
    span {
      color: ${COLOR.BACKGROUND_DARK};
      font-size: 0.8rem;
      flex-shrink: 0;
    }
    & > div {
      border-radius: 0.75rem;
      border: 1px solid ${COLOR.DISABLED};
      padding: 8px;
      background: ${({ $speaker }) => $speaker && COLOR.DISABLED};
    }
  `,
};

export default MessageBatch;
