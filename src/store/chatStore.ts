import { Conversation, IChatItem } from "@/types/conversations.types";
import { IMessageItem } from "@/types/messages.types";
import { create } from "zustand";

export interface ChatStoreState {
  currentChatDetail: Conversation | null;
  loadingChatDetail: boolean;
  chatLists: [] | IChatItem[];
  loadingChatList: boolean;
  messages: [] | IMessageItem[];
  loadingMessages: boolean;
  saveChat: Function;
  add: Function;
  reset: Function;
  addToChatLists: Function;
  resetChatDetail: Function;
  removeItemFromChatList: Function;
  saveMessages: Function;
  addMessageToMessages: Function;
  replaceChatItem: Function;
  onMessageRecieved: Function;
}

export const useChatStore = create<ChatStoreState>()((set, get) => ({
  currentChatDetail: null,
  loadingChatDetail: false,
  chatLists: [],
  loadingChatList: false,
  messages: [],
  loadingMessages: false,
  saveChat: (data: Conversation) => {
    console.log("saving chat", data);
    set((state: ChatStoreState) => ({
      ...state,
      currentChatDetail: data,
      loadingChatDetail: false,
    }));
  },
  saveChatList: (data: IChatItem[] | []) => {
    set((state: ChatStoreState) => ({
      ...state,
      chatLists: data,
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
      currentChatDetail: null,
      chatLists: [],
      messages: [],
    }));
  },
  addToChatLists: (data: IChatItem) => {
    set((state: ChatStoreState) => {
      let currentChatLists = state.chatLists;

      return {
        ...state,
        chatLists: [...currentChatLists, data],
      };
    });
  },
  resetChatDetail: () => {
    set((state: ChatStoreState) => ({
      ...state,
      currentChatDetail: null,
    }));
  },
  removeItemFromChatList: (data: IChatItem) => {
    set((state: ChatStoreState) => {
      const updatedChatLists = state?.chatLists?.filter(
        (item: IChatItem) => item?._id !== data?._id
      );

      return {
        ...state,
        chatLists: updatedChatLists,
      };
    });
  },

  saveMessages: (data: IMessageItem[] | []) => {
    set((state: ChatStoreState) => ({
      ...state,
      messages: data,
    }));
  },
  addMessageToMessages: (data: IMessageItem) => {
    console.log("inside addMessage");
    set((state: ChatStoreState) => {
      let currentMessages = state.messages;

      return {
        ...state,
        messages: [...currentMessages, data],
      };
    });
  },
  replaceChatItem: (data: IChatItem) => {
    set((state: ChatStoreState) => ({
      ...state,
      chatLists: state?.chatLists?.map((item: IChatItem) =>
        item?._id === data?._id ? data : item
      ),
    }));
  },
  onMessageRecieved: (data: IMessageItem) => {
    set((state: ChatStoreState) => {
      console.log(
        "inside onMessagerecew store current Detail",
        state.currentChatDetail
      );

      // if message is of current chat then add to messages otherwise
      // it need to be updated in notification or unread in chat Item

      const ofCurrentChat = state?.currentChatDetail?._id === data.conversation;

      if (ofCurrentChat) {
        return {
          ...state,
          messages: [...state.messages, data],
        };
      }

      return state;
    });
  },
}));
