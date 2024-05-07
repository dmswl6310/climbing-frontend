import { type Dispatch, type ReactNode, type SetStateAction, createContext, useState } from "react";
import type { MessageFormat } from "./components/chat/ChatHistory";

export type ChatHistoryProps = { [key: string]: MessageFormat[] } | null;

export type ChatHistoryContextProps = {
  history: ChatHistoryProps;
  updateHistory: Dispatch<SetStateAction<ChatHistoryProps>> | (() => void);
};

const ChatHistoryContext = createContext<ChatHistoryContextProps>({
  history: null,
  updateHistory: () => {},
});

const ChatHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<ChatHistoryProps>({});
  return (
    <ChatHistoryContext.Provider value={{ history, updateHistory: setHistory }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export { ChatHistoryContext, ChatHistoryProvider };
