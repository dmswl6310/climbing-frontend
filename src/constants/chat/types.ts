import type { Client } from "@stomp/stompjs";

export type FetchedChatroom = {
  exists: boolean;
  roomId: string | null;
};

export interface ChatModalProps {
  gymId: string;
  gymName: string;
}

export interface SocketProps {
  gymName: string;
  client: Client | null;
  roomId: string | null;
  isRoomFetchError: boolean;
  isSocketError: boolean;
}
