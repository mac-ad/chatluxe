"use client";

import ChatDetail from "@/components/ChatDetail/ChatDetail";
import ChatLists from "@/components/ChatLists/ChatLists";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import CreateGroup from "@/components/CreateGroup/CreateGroup";
import IconOnlyNav from "@/components/IconOnlyNav/IconOnlyNav";
import PeopleLists from "@/components/PeopleLists/PeopleLists";
import { SOCKET_EVENTS } from "@/constants/common";
import { IconOnlyNavItems, NavEnum } from "@/constants/nav";
import { useSocket } from "@/lib/context/socket-context";
import conversationService from "@/services/conversation/conversation.service";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { IChatItem } from "@/types/conversations.types";
import { IMessageItem } from "@/types/messages.types";
import customToast from "@/utils/customToast";
import React, { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const App = () => {
  const currentNav = useGlobalStore(
    (state: GlobalStoreState) => state.currentNav
  );
  const store = useGlobalStore((state: GlobalStoreState) => state);
  const chatStore = useChatStore((state: ChatStoreState) => state);
  const currentChatDetail = useChatStore(
    (state: ChatStoreState) => state.currentChatDetail
  );
  const chats = useChatStore((state: ChatStoreState) => state.chatLists);

  console.log("in app chats = ", chatStore);

  const { socket } = useSocket();

  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [showChatDetail, setShowChatDetail] = useState<boolean>(false);

  // const [chats, setChats] = useState<IChatItem[] | []>([]);

  const changeNav = (key: String) => {
    store.add("currentNav", key);
  };

  // get all conversations
  const getAllConversations = async () => {
    try {
      const res = await conversationService.getAll({});
      // flattened res data
      // just for temporary until i figure out how to send this flattend response from backend
      const flattenedResponse: IChatItem[] = Object.values(
        Object.values(res.data).flat()
      ) as IChatItem[];
      chatStore.add("chatLists", flattenedResponse);
      // setChats(flattenedResponse);
      // chatStore.save
    } catch (err) {
      console.log("err", err);
    }
  };

  const onConnect = () => {
    console.log("connected");
  };

  const onNewChat = (chat: IChatItem) => {
    chatStore.addToChatLists(chat);
    customToast.success({
      content: `Someone created a chat with you`,
    });
  };

  // console.log("chats = ", chats);

  const onChatUpdate = (chat: IChatItem) => {
    console.log("chat updated", chat);
    chatStore.replaceChatItem(chat);
    // setChats((prev: IChatItem[]) => [
    //   ...prev.map((item: IChatItem) => (item?._id === chat?._id ? chat : item)),
    // ]);
  };

  const onMessageRecieved = (payload: IMessageItem) => {
    console.log("message recieved", payload);
    chatStore.onMessageRecieved(payload);

    // if message is coming in currently selected chat then update message otherwise update the chat item
    // console.log(
    //   "message recieved",
    //   chatDetail,
    //   payload,
    //   chatDetail?._id === payload?.conversation
    // );
    // console.log("message recieved", chatDetail);
    // if (!chatDetail?._id) return;
    // if (chatDetail?._id === payload?.conversation) {
    //   setMessages((prev: IMessageItem[]) => [...prev, payload]);
    // }
  };

  useEffect(() => {
    if (!socket) return;
    // register socket events
    console.log("socket available", socket);
    socket.on(SOCKET_EVENTS.CONNECTED, onConnect);
    socket.on(SOCKET_EVENTS.NEW_CHAT, onNewChat);
    socket.on(SOCKET_EVENTS.CHAT_UPDATE, onChatUpdate);
    socket.on(SOCKET_EVENTS.MESSAGE_RECIEVED, onMessageRecieved);
    // cleanups
    return () => {
      socket.off(SOCKET_EVENTS.CONNECTED);
      socket.off(SOCKET_EVENTS.CHAT_UPDATE);
      socket.off(SOCKET_EVENTS.NEW_CHAT);
      socket.off(SOCKET_EVENTS.MESSAGE_RECIEVED);
    };
  }, [socket]);

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <div className="flex dark:bg-[#101B20] dark:text-white h-full w-full max-w-[1700px] mx-auto">
      {/* leftest nav bar */}
      <div className="dark:border-r-[0] border-r p-2 dark:bg-[#212C32] pt-6 dark:border-r-[rgba(255,255,255,.1)] dark:border-r text-[rgba(0,0,0,.7)]">
        <IconOnlyNav activeItem={currentNav} onClick={changeNav} />
      </div>
      {/* list of friends */}
      <div className="border-r  max-w-[350px] min-w-[350px] lg:max-w-[400px] flex-1 relative  dark:border-r-[rgba(255,255,255,.1)]  overflow-x-hidden">
        {currentNav === NavEnum.CHATS && (
          <ChatLists
            chats={chats}
            // setChats={setChats}
            createGroupHandler={() => setShowCreateGroup((prev) => !prev)}
          />
        )}
        {currentNav === NavEnum.PEOPLE && (
          <PeopleLists
            // setChats={setChats}
            createGroupHandler={() => setShowCreateGroup((prev) => !prev)}
          />
        )}
        {showCreateGroup && (
          <div
            className={twMerge(
              "absolute top-0 left-0 h-full w-full z-[100] dark:bg-[#101B20] bg-[white]  translate-x-[-100%] transition-all",
              showCreateGroup ? "translate-x-0" : ""
            )}
          >
            <CreateGroup
              crossHandler={() => setShowCreateGroup((prev) => !prev)}
              // setChats={setChats}
            />
          </div>
        )}
      </div>
      {/* chat Displaying Area */}
      <div className="flex-1 relative  flex  overflow-y-hidden">
        <ChatDetail
          showContactDetailHandler={() => setShowChatDetail((prev) => !prev)}
        />
        {showChatDetail && (
          <div
            className={twMerge(
              "absolute xl:relative top-0 left-0 h-full w-full z-[200] dark:bg-[#101B20] bg-[white] translate-x-[100%] transition-all overflow-y-auto",
              showChatDetail ? "translate-x-0" : ""
            )}
          >
            <ContactInfo
              showContactDetailHandler={() =>
                setShowChatDetail((prev) => !prev)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
