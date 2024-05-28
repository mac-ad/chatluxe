import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";

const ChatItem = ({ idx }: { idx: number }) => {
  return (
    <div className="group flex items-center p-4 gap-3 border-b dark:border-b-[rgba(255,255,255,.1)] hover:bg-[#ddd] dark:hover:bg-[#212C32]  cursor-pointer">
      {/* <img
        src=
        className="w-[45px] aspect-square object-cover rounded-full"
        alt=""
      /> */}
      <Avatar src={`https://i.pravatar.cc/${100 + idx}`} />
      <div>
        <h3 className="font-semibold">Rahul Shah</h3>
        <p className="text-sm opacity-80 dark:opacity-50 ">
          Lorem ipsum dolor sit a.......
        </p>
      </div>
      <div className="self-start ml-auto flex flex-col">
        <span className="text-xs whitespace-nowrap">7:50 PM</span>
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
                <DropdownItem key="new" className="text-danger" color="danger">
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
