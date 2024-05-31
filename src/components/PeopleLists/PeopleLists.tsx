import userService from "@/services/user/user.service";
import Search from "../ChatLists/Search";
import ChatItem from "../ChatLists/ChatItem";
import { useEffect, useState } from "react";
import { User } from "@/types/auth.types";
import UserItem from "./UserItem";

const PeopleLists = () => {
  const [users, setUsers] = useState<User[] | []>([]);

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

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b dark:border-none px-3 h-[var(--header-height)]">
        <h1 className="text-2xl font-bold">People</h1>
        {/* menu */}
        {/* <Dropdown backdrop="opaque" placement="bottom-end" className="">
      <DropdownTrigger>
        <div className="w-[40px] cursor-pointer rounded-md aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center">
          <Icon icon="system-uicons:menu-vertical" fontSize={25} />
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection>
          <DropdownItem key="new" shortcut="⌘N">
            New Group
          </DropdownItem>
          <DropdownItem
            key="new"
            endContent={
              <Icon icon="material-symbols:logout" fontSize={20} />
            }
            onClick={() => logout()}
          >
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown> */}
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
          {users?.map((user: User, idx: number) => (
            <UserItem data={user} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleLists;
