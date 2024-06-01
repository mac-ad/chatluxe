import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Search from "../ChatLists/Search";
import { Icon } from "@iconify/react/dist/iconify.js";
import userService from "@/services/user/user.service";
import { User, UserShort } from "@/types/auth.types";
import UserItem from "../PeopleLists/UserItem";
import SelectedMember from "./SelectedMember";
import { Avatar, AvatarGroup, Button, Input } from "@nextui-org/react";
import { SOCKET_EVENTS, UserItemType } from "@/constants/common";
import MyInput from "../MyInput/MyInput";
import { twMerge } from "tailwind-merge";
import conversationService from "@/services/conversation/conversation.service";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { IconOnlyNavItems } from "@/constants/nav";
import { IChatItem } from "@/types/conversations.types";
import { useSocket } from "@/lib/context/socket-context";

const CreateGroup = ({
  crossHandler,
  setChats,
}: {
  crossHandler: Function;
  setChats: Dispatch<SetStateAction<IChatItem[] | []>>;
}) => {
  const [users, setUsers] = useState<UserShort[] | []>([]);

  const [members, setMembers] = useState<UserShort[] | []>([]);
  const [showFinalCreate, setShowFinalCreate] = useState<boolean>(false);
  const [profile, setProfile] = useState<string>("");
  const groupNameRef = useRef<any>(null);

  const { socket } = useSocket();
  const chatStore = useChatStore((state: ChatStoreState) => state);
  const globalStore = useGlobalStore((state: GlobalStoreState) => state);

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

  const groupCreationHandler = (data: UserShort) => {
    console.log("add", data);
    setMembers((prev) => [...prev, data]);
  };

  const memberCrossHandler = (data: UserShort) => {
    console.log("changing");
    setMembers((prev: UserShort[]) => [
      ...prev.filter((item: UserShort) => item._id !== data?._id),
    ]);
  };

  //   const showFinalCreate = () => {
  //   }

  const finalCreateGroupHandler = async () => {
    try {
      const payload = {
        name: groupNameRef.current.value,
        participants: members?.map((item: UserShort) => item?._id),
      };
      console.log("createing final group with", payload);

      const res = await conversationService.createGroup({ payload });
      chatStore.saveChat(res.data);
      globalStore.add("currentNav", IconOnlyNavItems[0]?.key);

      // send new chat event to all other participants
      socket?.emit(SOCKET_EVENTS.NEW_CHAT, res.data);

      // save new chat in chatlist
      setChats((prev: IChatItem[]) => [res.data, ...prev]);
      crossHandler();
    } catch (err) {}
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full relative">
      <div className="flex items-center gap-4 border-b dark:border-none px-3 h-[var(--header-height)]">
        <Icon
          icon="maki:cross"
          fontSize={20}
          className="cursor-pointer"
          onClick={() => crossHandler()}
        />
        <h1 className="text-2xl font-bold">Add group members</h1>
      </div>
      <div className="px-2 flex flex-col gap-2">
        <Search />
      </div>
      <div className="pl-5  flex flex-col ">
        <AvatarGroup max={20} className="">
          {members?.map((user: UserShort) => (
            <SelectedMember
              data={user}
              onCross={() => memberCrossHandler(user)}
            />
          ))}
        </AvatarGroup>
      </div>
      <div className="flex-1  overflow-y-auto overflow-x-hidden ">
        <div>
          {users?.map((user: UserShort, idx: number) =>
            members?.some((item: UserShort) => item._id === user._id) ? null : (
              <UserItem
                data={user}
                key={idx}
                onClick={groupCreationHandler}
                placeholder="Hey I am using Chatluxe!"
                type={UserItemType.ADD_GROUP}
              />
            )
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "absolute h-full w-full  dark:bg-[#101B20] top-0 left-0 z-[200] bg-white  transition-all translate-x-[100%]",
          showFinalCreate ? "translate-x-0" : ""
        )}
      >
        <div className="flex items-center gap-4 border-b dark:border-none px-3 h-[var(--header-height)]">
          <Icon
            icon="charm:arrow-left"
            fontSize={20}
            className="cursor-pointer"
            onClick={() => setShowFinalCreate(false)}
          />
          <h1 className="text-2xl font-bold">Finalize New Group</h1>
        </div>
        <div className="flex items-center gap-4 flex-col justify-center items-center mt-10 relative w-fit mx-auto group">
          <Avatar src={profile} className="h-[180px] w-[180px]" />
          <label
            htmlFor="avatarInput"
            className="group-hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full rounded-full p-4 bg-[rgba(0,0,0,.7)] flex-col gap-1 cursor-pointer flex items-center justify-center gap-2 opacity-0"
          >
            <Icon icon="bi:camera-fill" fontSize={20} />
            <span className=" text-center">Not implemented yet!</span>
          </label>
        </div>
        <div className="px-4 mt-10">
          <Input
            placeholder="Group name"
            variant="bordered"
            ref={groupNameRef}
            size="lg"
            radius="sm"
          />
        </div>
        <div className="mb-4 mx-auto mt-10  w-fit">
          <Button radius="sm" onClick={finalCreateGroupHandler}>
            Create
            <Icon icon="charm:arrow-right" fontSize={20} />
          </Button>
        </div>
      </div>
      {members?.length > 0 && (
        <div className="mb-4 mx-auto">
          <Button radius="full" onClick={() => setShowFinalCreate(true)}>
            <Icon icon="charm:arrow-right" fontSize={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
