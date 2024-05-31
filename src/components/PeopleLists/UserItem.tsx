import { NavEnum } from "@/constants/nav";
import conversationService from "@/services/conversation/conversation.service";
import friendshipService from "@/services/friendship/friendship.service";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { User } from "@/types/auth.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useEffect, useMemo } from "react";

const UserItem = ({ data }: { data: User }) => {
  const friends = useGlobalStore(
    (state: GlobalStoreState) => state?.user?.friends
  );
  const store = useGlobalStore((state: GlobalStoreState) => state);
  const chatStore = useChatStore((state: ChatStoreState) => state);

  // const isFriend = useMemo(
  //   () => friends?.includes(data?._id),
  //   [friends, data?._id]
  // );

  const sendFriendRequestHandler = async () => {
    const payload = {
      user_id: data?._id,
    };
    try {
      const res = await friendshipService.sendFriendRequest({
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const abortController = new AbortController();

  const conversationHandler = async () => {
    try {
      abortController.abort();
      const res = await conversationService.createOrGetConversation({
        param: data?._id,
        signal: abortController.signal,
      });
      //   navigate to chat tab
      store.add("currentNav", NavEnum.CHATS);
      // save chat detail
      chatStore.saveChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => abortController.abort();
  }, []);

  return (
    <div
      className="group transition-all flex items-center p-4 gap-3 border-b dark:border-b-[rgba(255,255,255,.1)] dark:hover:bg-[#212C32]   cursor-pointer"
      onClick={conversationHandler}
    >
      <Avatar src={data?.avatar?.url} />
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">{data?.username}</h3>
        <div className="flex items-center gap-2">
          {/* {!isFriend && (
            <Button size="sm" onClick={sendFriendRequestHandler}>
              <Icon icon="material-symbols:add" />
              Add Bro
            </Button>
          )}
          {isFriend && <Button size="sm">Go to Chat</Button>} */}
        </div>
      </div>
      <div className="self-start ml-auto flex flex-col">
        {/* <span className="text-xs whitespace-nowrap opacity-80 dark:opacity-50">
          7:50 PM
        </span> */}
        {/* <div className=" flex justify-end translate-x-[100%] group-hover:translate-x-0 transition-all">
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
                <DropdownItem key="new" className="text-danger" color="danger">
                  Delete Chat
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div> */}
      </div>
    </div>
  );
};

export default UserItem;
