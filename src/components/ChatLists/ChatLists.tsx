import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Search from "./Search";
import Tag from "../Tag/Tag";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Conversation, IChatItem } from "@/types/conversations.types";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import conversationService from "@/services/conversation/conversation.service";
import ChatItem from "./ChatItem";

const searchTags = [
  {
    name: "All",
  },
  {
    name: "Unread",
  },
  {
    name: "Groups",
  },
];

const ChatLists = ({
  createGroupHandler,
  chats,
  setChats,
}: {
  createGroupHandler: Function;
  chats: IChatItem[];
  setChats?: Dispatch<SetStateAction<IChatItem[]>>;
}) => {
  const logout = useGlobalStore((state: GlobalStoreState) => state.logOutUser);
  const currentConv = useChatStore((state: ChatStoreState) => state);

  const chatStore = useChatStore((state: ChatStoreState) => state);
  const currentChatDetail = useChatStore(
    (state: ChatStoreState) => state.currentChatDetail
  );

  const getChatDetail = async (data: IChatItem) => {
    try {
      const res = await conversationService.getChatDetail({
        param: data?._id!,
      });
      // add chat detail to store local
      console.log("got detail = ", res.data);
      chatStore.saveChat(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const chatItemClickHandler = (data: IChatItem) => {
    if (data?._id === currentChatDetail?._id) return;
    // get chat detail and save in store
    chatStore.add("loading", true);
    getChatDetail(data);
  };

  const removeChatItem = (item: IChatItem) => {
    // setChats((prev: IChatItem[]) =>
    //   prev.filter((it: IChatItem) => it?._id !== item?._id)
    // );
  };

  const logoutHandler = () => {
    logout();
    chatStore.reset();
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b dark:border-none px-3 h-[var(--header-height)]">
        <h1 className="text-2xl font-bold">Chats</h1>
        {/* menu */}
        <Dropdown backdrop="opaque" placement="bottom-end" className="">
          <DropdownTrigger>
            <div className="w-[40px] cursor-pointer rounded-md aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center">
              <Icon icon="system-uicons:menu-vertical" fontSize={25} />
            </div>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem
                key="new"
                shortcut="⌘N"
                onClick={() => createGroupHandler()}
              >
                New Group
              </DropdownItem>
              <DropdownItem
                key="new"
                endContent={
                  <Icon icon="material-symbols:logout" fontSize={20} />
                }
                onClick={() => logoutHandler()}
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="px-2 flex flex-col gap-2">
        <Search />
        <div className="flex gap-2">
          {searchTags?.map((item: any) => (
            <Tag name={item?.name} key={item?.name} />
          ))}
        </div>
      </div>
      <div className="flex-1  overflow-y-auto overflow-x-hidden">
        <div>
          {chats?.length === 0 && (
            <div className="flex justify-center mt-5 opacity-50">
              No Chats found
            </div>
          )}
          {chats?.map((chat: IChatItem, idx: number) => (
            <ChatItem
              data={chat}
              key={idx}
              onClick={() => chatItemClickHandler(chat)}
              refreshChatList={removeChatItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatLists;
