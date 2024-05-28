import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import MessageType from "./MessageType";
import Messages from "./Messages";

const ChatDetail = () => {
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
      <div className=" w-full flex items-center gap-4 p-3 dark:bg-[#212C32] border-b dark:border-b-[rgba(255,255,255,.1)]">
        <Avatar src="https://i.pravatar.cc/100" />
        <div className="flex flex-col">
          <h2>Rahul Shah</h2>
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
      </div>
      {/* messages area */}
      <div className="flex-1  overflow-y-auto px-4 relative bg-transparent">
        {/* <div
          style={{
            backgroundImage: `url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")`,
          }}
          className="absolute h-full w-full top-0 left-0 opacity-30 z-[0]"
        ></div> */}
        {/* <div className="z-[100]"> */}
        <Messages />
        {/* </div> */}
      </div>
      {/* message type area */}
      <div className="mt-auto border-t dark:border-t-[rgba(255,255,255,.1)] dark:bg-[#212C32] p-3">
        <MessageType />
      </div>
    </div>
  );
};

export default ChatDetail;
