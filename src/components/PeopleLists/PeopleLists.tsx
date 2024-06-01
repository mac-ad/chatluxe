import userService from "@/services/user/user.service";
import Search from "../ChatLists/Search";
import ChatItem from "../ChatLists/ChatItem";
import { useEffect, useState } from "react";
import { User, UserShort } from "@/types/auth.types";
import UserItem from "./UserItem";
import conversationService from "@/services/conversation/conversation.service";
import { NavEnum } from "@/constants/nav";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSocket } from "@/lib/context/socket-context";
import { SOCKET_EVENTS } from "@/constants/common";

const PeopleLists = ({
  createGroupHandler,
  setChats,
}: {
  createGroupHandler: Function;
  setChats: any;
}) => {
  const [users, setUsers] = useState<UserShort[] | []>([]);
  const store = useGlobalStore((state: GlobalStoreState) => state);
  const chatStore = useChatStore((state: ChatStoreState) => state);

  const { socket } = useSocket();

  const getAllUsers = async () => {
    try {
      const res = await userService.getAll({});
      console.log(res, "res");
      setUsers(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const conversationHandler = async (user: User) => {
    try {
      const res = await conversationService.createOrGetConversation({
        param: user?._id,
      });
      //   navigate to chat tab
      store.add("currentNav", NavEnum.CHATS);
      // save chat detail
      chatStore.saveChat(res.data);
      // add recently created chat item to the chatlist

      // if conversation is fetched then just set it as current chat
      // if conversation is created then append to the top of chat lists
      if (res?.statusCode === 201) {
        // created
        setChats((prev: any) => [res.data, ...prev]);
        // emit to participants
        // socket?.emit(SOCKET_EVENTS.NEW_CHAT, res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("called");
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b dark:border-none px-3 h-[var(--header-height)]">
        <h1 className="text-2xl font-bold">People</h1>
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
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="px-2 flex flex-col gap-2">
        <Search />
        <div className="flex gap-2">
          {/* {searchTags?.map((item: any) => (
        <Tag name={item?.name} key={item?.name} />
      ))} */}
        </div>
      </div>
      <div className="flex-1  overflow-y-auto overflow-x-hidden">
        <div>
          {users?.map((user: UserShort, idx: number) => (
            <UserItem data={user} key={idx} onClick={conversationHandler} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleLists;
