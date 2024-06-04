import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import MessageType from "./MessageType";
import Messages from "./Messages";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { Conversation, Participant } from "@/types/conversations.types";
import { useEffect, useMemo, useState } from "react";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { IMessageItem } from "@/types/messages.types";
import messageService from "@/services/message/message.service";
import { useSocket } from "@/lib/context/socket-context";
import { SOCKET_EVENTS } from "@/constants/common";

const ChatDetail = ({
  showContactDetailHandler,
}: {
  showContactDetailHandler: Function;
}) => {
  const chatDetail = useChatStore((state: ChatStoreState) => state);
  const self = useGlobalStore((state: GlobalStoreState) => state?.user);

  console.log("inside chat detail", chatDetail);

  const [messages, setMessages] = useState<IMessageItem[] | []>([]);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);

  const { socket } = useSocket();

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  // if (chatDetail?.loading)
  //   return (
  //     <div className="h-full w-full flex items-center justify-center">
  //       <Spinner size="lg" />
  //     </div>
  //   );

  const recieverDetail: Participant | null | undefined = useMemo(
    () =>
      chatDetail?.isGroupConversation
        ? null
        : chatDetail?.participants?.filter(
            (item: Participant) => item?._id !== self?._id
          )?.[0],
    [chatDetail]
  );

  const fetchAllMessages = async () => {
    setMessagesLoading(true);
    try {
      const res = await messageService.getAll({
        conversationId: chatDetail?._id!,
      });
      setMessages(res.data);
      setMessagesLoading(false);
    } catch (err) {
      setMessagesLoading(false);
    }
  };

  const onMessageRecieved = (payload: IMessageItem) => {
    // if message is coming in currently selected chat then update message otherwise update the chat item
    // console.log(
    //   "message recieved",
    //   chatDetail,
    //   payload,
    //   chatDetail?._id === payload?.conversation
    // );
    console.log("message recieved", chatDetail);

    if (!chatDetail?._id) return;

    if (chatDetail?._id === payload?.conversation) {
      setMessages((prev: IMessageItem[]) => [...prev, payload]);
    }
  };

  useEffect(() => {
    if (chatDetail?._id && !chatDetail?.loading) {
      fetchAllMessages();
    }
  }, [chatDetail]);

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_EVENTS.MESSAGE_RECIEVED, onMessageRecieved);

    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE_RECIEVED);
    };
  }, [socket]);

  if (!chatDetail?._id)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <img src="/nochat.png" alt="" className="h-full w-full object-cover" />
      </div>
    );

  return (
    <div
      className="w-full h-full flex flex-col "
      style={
        {
          // backgroundImage: `url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")`,
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
        }
      }
    >
      {/* chat detail header */}
      <div className=" w-full flex items-center gap-4 px-3 h-[var(--header-height)] py-[12px] dark:bg-[#212C32] border-b dark:border-b-[rgba(255,255,255,.1)]">
        <Avatar
          src={
            chatDetail?.isGroupConversation ? "" : recieverDetail?.avatar?.url
          }
        />
        <div className="flex flex-col">
          <h2>
            {chatDetail?.isGroupConversation
              ? chatDetail?.name
              : recieverDetail?.username}
          </h2>
          <p className="text-sm dark:opacity-50 opacity-80">
            last seen today at 7:06 PM
          </p>
        </div>

        {/* dropdown */}
        <div className="ml-auto">
          <Dropdown backdrop="opaque" showArrow placement="bottom-end">
            <DropdownTrigger>
              <div className="w-[40px] cursor-pointer rounded-md aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center">
                <Icon icon="system-uicons:menu-vertical" fontSize={25} />
              </div>
            </DropdownTrigger>
            <DropdownMenu variant="bordered">
              <DropdownSection>
                <DropdownItem onClick={() => showContactDetailHandler()}>
                  Contact Info
                </DropdownItem>
                <DropdownItem>Close Chat</DropdownItem>
                <DropdownItem>Mute Notifications</DropdownItem>
                <DropdownItem>Clear Chat List</DropdownItem>
                <DropdownItem>Delete Chat</DropdownItem>
                <DropdownItem color="danger" className="text-danger">
                  Block
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* messages area */}
      <div
        className="flex-1  overflow-y-auto px-4 relative bg-transparent  overflow-y-auto"
        // onContextMenu={contextMenuHandler}
      >
        {menuVisible && (
          // <DropdownMenu variant="bordered">
          //   <DropdownSection>
          //     <DropdownItem onClick={() => showContactDetailHandler()}>
          //       Contact Info
          //     </DropdownItem>
          //     <DropdownItem>Close Chat</DropdownItem>
          //     <DropdownItem>Mute Notifications</DropdownItem>
          //     <DropdownItem>Clear Chat List</DropdownItem>
          //     <DropdownItem>Delete Chat</DropdownItem>
          //     <DropdownItem color="danger" className="text-danger">
          //       Block
          //     </DropdownItem>
          //   </DropdownSection>
          // </DropdownMenu>
          <div style={{ left: menuX + "px", top: menuY + "px" }}></div>
        )}
        {/* <div
          style={{
            backgroundImage: `url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")`,
          }}
          className="absolute h-full w-full top-0 left-0 opacity-30 z-[0]"
        ></div> */}
        {/* <div className="z-[100]"> */}
        {!messagesLoading ? (
          <Messages messages={messages} />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}

        {/* </div> */}
      </div>
      {/* message type area */}
      <div className="mt-auto border-t dark:border-t-[rgba(255,255,255,.1)] dark:bg-[#212C32] p-3">
        <MessageType setMessages={setMessages} />
      </div>
    </div>
  );
};

export default ChatDetail;
