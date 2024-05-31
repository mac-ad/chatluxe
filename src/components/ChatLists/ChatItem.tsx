import conversationService from "@/services/conversation/conversation.service";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { IChatItem } from "@/types/conversations.types";
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
  getAllConversations,
}: {
  data: IChatItem;
  getAllConversations: Function;
}) => {
  const chatDetail = useChatStore((state: ChatStoreState) => state);

  const getChatDetail = async (id: string) => {
    try {
      const res = await conversationService.createOrGetConversation({
        param: data?.recieverDetail?._id,
      });
      // add chat detail to store local
      chatDetail.saveChat(res.data);
      chatDetail.add("loading", false);
    } catch (err) {
      console.log("err", err);
    }
  };

  const ChatItemClickHandler = () => {
    // get chat detail and save in store
    chatDetail.add("loading", true);
    getChatDetail(data?._id);
  };

  const chatDeleteHandler = async () => {
    try {
      // delete this chat
      const res = await conversationService.deleteChat({ id: data?._id });
      customToast.success({
        content: res.message,
      });
      // if currentChat is the deleted chat then set the chat state to initial state
      chatDetail.reset();
      // refetch chat lists
      getAllConversations();
    } catch (err) {}
  };

  return (
    <div
      className={twMerge(
        "group transition-all flex items-center p-4 gap-3 border-b dark:border-b-[rgba(255,255,255,.1)] hover:bg-[#ddd] dark:hover:bg-[#212C32]  cursor-pointer",
        chatDetail?._id === data?._id ? "dark:bg-[#212C32] " : ""
      )}
      onClick={ChatItemClickHandler}
    >
      {/* <Badge
        content=""
        isOneChar
        size="sm"
        color="success"
        placement="bottom-right"
      > */}
      <Avatar src={data?.recieverDetail?.avatar?.url} />
      {/* </Badge> */}
      <div>
        <h3 className="font-semibold">{data?.recieverDetail?.username}</h3>
        <p className="text-sm opacity-80 dark:opacity-50">
          {data?.lastMessage ?? `Say hi to ${data?.recieverDetail?.username}`}
        </p>
      </div>
      <div className="self-start ml-auto flex flex-col">
        <span className="text-xs whitespace-nowrap opacity-80 dark:opacity-50">
          7:50 PM
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
                <DropdownItem key="new">Archive Chat</DropdownItem>
                <DropdownItem key="new">Mute Notifications</DropdownItem>
                <DropdownItem key="new">Mark as unread</DropdownItem>
                <DropdownItem key="new">Block</DropdownItem>
                <DropdownItem
                  key="new"
                  className="text-danger"
                  color="danger"
                  onClick={chatDeleteHandler}
                >
                  Delete Chat
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
