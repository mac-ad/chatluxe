import { Conversation } from "@/types/conversations.types";
import { create } from "zustand";

// export interface ChatStore {
//     _id:string | null;
//     isGroupConversation : boolean | null;
//     admin :
// }

export interface ChatStoreState extends Conversation {
  saveChat: Function;
  loading: boolean;
  add: Function;
  reset: Function;
}

export const useChatStore = create<ChatStoreState>()((set, get) => ({
  _id: null,
  isGroupConversation: null,
  loading: false,
  participants: [],
  admin: null,
  createdAt: null,
  updatedAt: null,
  __v: null,
  saveChat: (data: Conversation) => {
    set((state: ChatStoreState) => ({
      ...state,
      ...data,
      loading: false,
    }));
  },
  add: (key: string, value: string) => {
    set((state: ChatStoreState) => ({
      ...state,
      [key]: value,
    }));
  },
  reset: () => {
    set((state: ChatStoreState) => ({
      ...state,
      _id: null,
      isGroupConversation: null,
      loading: false,
      participants: [],
      admin: null,
      createdAt: null,
      updatedAt: null,
      __v: null,
    }));
  },
}));
