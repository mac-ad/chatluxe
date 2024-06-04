import conversationService from "@/services/conversation/conversation.service";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { IChatItem, Participant } from "@/types/conversations.types";
import { convertTimeToHHMM } from "@/utils/common";
import customToast from "@/utils/customToast";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const ChatItem = ({
  data,
  onClick,
  refreshChatList,
}: {
  data: IChatItem;
  refreshChatList: Function;
  onClick: Function;
}) => {
  const chatStore = useChatStore((state: ChatStoreState) => state);
  const chatDetail = useChatStore(
    (state: ChatStoreState) => state.currentChatDetail
  );
  const self = useGlobalStore((state: GlobalStoreState) => state.user);

  // const recieverDetail: Participant = useMemo(
  //   () =>
  //     data?.participants?.filter(
  //       (item: Participant) => item?._id !== self?._id
  //     )?[0],
  //   [data]
  // );

  const recieverDetail: Participant | null = useMemo(
    () =>
      data?.isGroupConversation
        ? null
        : data?.participants?.filter(
            (item: Participant) => item?._id !== self?._id
          )?.[0],
    [data]
  );

  // console.log(
  //   (data?.participants?.filter(
  //     (item: Participant) => item?._id !== self?._id
  //   ) as Participant)?.[0]
  // );

  const chatDeleteHandler = async () => {
    try {
      // delete this chat
      const res = await conversationService.deleteChat({ id: data?._id });
      customToast.success({
        content: res.message,
      });
      // if currentChat is the deleted chat then set the chat state to initial state
      if (chatDetail?._id === data?._id) {
        chatStore.resetChatDetail();
      }
      // remove item from chat List
      chatStore.removeItemFromChatList(data);
      // refetch chat lists
      // refreshChatList(data);
    } catch (err) {}
  };

  return (
    <div
      className={twMerge(
        " group transition-all  grid grid-cols-[.5fr_5fr_.5fr] flex items-center p-4 gap-3 border-b dark:border-b-[rgba(255,255,255,.1)] hover:bg-[#ddd] dark:hover:bg-[#212C32]  cursor-pointer",
        chatDetail?._id === data?._id ? "dark:bg-[#212C32] bg-[#ddd]" : ""
      )}
      onClick={() => onClick()}
    >
      {/* <Badge
        content=""
        isOneChar
        size="sm"
        color="success"
        placement="bottom-right"
      > */}
      <Avatar src={recieverDetail?.avatar?.url} className="" />
      {/* </Badge> */}
      <div className="overflow-hidden flex-1">
        <h3 className="font-semibold w-full">
          {data?.isGroupConversation ? data?.name : recieverDetail?.username}
        </h3>
        <p className="text-sm opacity-80 dark:opacity-50  overflow-hidden text-ellipsis w-full whitespace-nowrap ">
          {data?.lastMessage &&
            (!data?.isGroupConversation
              ? data?.lastMessage?.text
              : `${data?.lastMessage?.sender?.username} : ${data?.lastMessage?.text}`)}
        </p>
      </div>
      <div className="self-start ml-auto flex flex-col">
        <span className="text-xs whitespace-nowrap opacity-80 dark:opacity-50">
          {convertTimeToHHMM(data?.updatedAt)}
        </span>
        <div className=" flex justify-end translate-x-[100%] group-hover:translate-x-0 transition-all">
          <Dropdown placement="bottom-start" className="">
            <DropdownTrigger>
              <div className="w-[30px] cursor-pointer rounded-full aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center">
                <Icon icon="akar-icons:chevron-down" fontSize={15} />
              </div>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection>
                <DropdownItem>Archive Chat</DropdownItem>
                <DropdownItem>Mute Notifications</DropdownItem>
                <DropdownItem>Mark as unread</DropdownItem>
                <DropdownItem>Block</DropdownItem>
                <DropdownItem
                  className="text-danger"
                  color="danger"
                  onClick={chatDeleteHandler}
                >
                  {data?.isGroupConversation
                    ? "Delete Group Chat"
                    : "Delete Chat"}
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
