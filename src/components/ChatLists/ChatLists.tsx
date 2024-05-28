import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Search from "./Search";
import Tag from "../Tag/Tag";
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

const chatItems = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

const ChatLists = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b dark:border-none px-2 py-2">
        <h1 className="text-xl font-bold">Chats</h1>
        {/* menu */}
        <Dropdown showArrow placement="bottom-end" className="">
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
            <Tag name={item?.name} />
          ))}
        </div>
      </div>
      <div className="flex-1  overflow-y-auto overflow-x-hidden">
        <div>
          {chatItems?.map((item: any, idx: number) => (
            <ChatItem idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatLists;
