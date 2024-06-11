import { type Dispatch, type ReactNode, type SetStateAction, createContext, useState } from "react";
import type { MessageFormat } from "./components/chat/ChatHistory";

export type ChatHistoryProps = { [key: string]: MessageFormat[] } | null;

export type ChatHistoryContextProps = {
  history: ChatHistoryProps;
  updateHistory: Dispatch<SetStateAction<ChatHistoryProps>> | (() => void);
};

type ChatHistoryData = {
  roomId: number;
  sender: string;
  message: string;
  createdAt: string;
};

type FetchedChatHistory = ChatHistoryData[];

type GetFormattedChatHistoryProps = (
  fetchedHistory: FetchedChatHistory,
  nickname: string,
  leftUserType: string,
  rightUserType: string,
) => MessageFormat[];

const ChatHistoryContext = createContext<ChatHistoryContextProps>({
  history: null,
  updateHistory: () => {},
});

export const getFormattedChatHistory: GetFormattedChatHistoryProps = (
  fetchedHistory,
  nickname,
  leftUserType,
  rightUserType,
) =>
  fetchedHistory.reduce((acc: Array<MessageFormat | unknown>, cur: ChatHistoryData) => {
    const { sender, message, createdAt } = cur;
    const log = {
      userType: nickname === sender ? rightUserType : leftUserType,
      message,
      createdAt,
    };
    return [...acc, log];
  }, []) as MessageFormat[];

export const getFormattedDate = (time: string) => {
  return new Date(time).toLocaleDateString("ko-KR");
};

export const getFormattedTime = (time: string) => {
  return new Date(time).toLocaleTimeString("ko-KR").slice(0, -3);
};

const ChatHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<ChatHistoryProps>(null);
  return (
    <ChatHistoryContext.Provider value={{ history, updateHistory: setHistory }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export { ChatHistoryContext, ChatHistoryProvider };
