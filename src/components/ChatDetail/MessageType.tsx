import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import MyEmojiPicker from "../MyEmojiPicker/MyEmojiPicker";

const attachmentItems = [
  {
    name: "Document",
    icon: "ion:document",
    color: "#7E67FF",
    fontSize: 20,
    disabled: false,
  },
  {
    name: "Photos & Videos",
    icon: "mdi:images",
    color: "#017AFC",
    fontSize: 20,
    disabled: false,
  },
  {
    name: "Camera",
    icon: "fluent:camera-28-filled",
    color: "#FE2E75",
    fontSize: 20,
    disabled: true,
  },
  {
    name: "Contact",
    icon: "material-symbols:person",
    color: "#019DE3",
    fontSize: 20,
    disabled: true,
  },
  {
    name: "Poll",
    icon: "fluent:poll-horizontal-16-filled",
    color: "#FEBD38",
    fontSize: 20,
    disabled: true,
  },
];

const MessageType = () => {
  return (
    <div className="flex items-center gap-2">
      {/* emoji */}
      <MyEmojiPicker />

      {/* attachments */}
      <Dropdown placement="top-start" backdrop="opaque">
        <DropdownTrigger>
          <div className="w-[40px] cursor-pointer rounded-full aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center">
            <Icon icon="ic:round-add" fontSize={25} />
          </div>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection>
            {attachmentItems?.map((item, idx: number) => (
              <DropdownItem
                key="new"
                startContent={
                  <Icon
                    icon={item?.icon}
                    color={item?.color}
                    fontSize={item?.fontSize}
                  />
                }

                // isDisabled={item?.disabled}
              >
                <span>{item.name}</span>
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      {/* message input */}
      <form action="" className="flex-1 flex">
        <input
          type="text"
          placeholder="Type a message"
          className="p-3 px-4 rounded-md w-full border dark:border-none dark:bg-[#2A3843] outline-none"
        />
      </form>

      {/* voice or submit */}
      <div className="w-[40px]  cursor-pointer rounded-full aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center">
        {/* <Icon icon="icon-park-solid:voice" fontSize={25} /> */}
        <Icon icon="majesticons:send" fontSize={25} />
      </div>
    </div>
  );
};

export default MessageType;
