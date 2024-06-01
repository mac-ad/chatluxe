import messageService from "@/services/message/message.service";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { IMessageItem } from "@/types/messages.types";
import { convertTimeToHHMM } from "@/utils/common";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const items = [
  {
    content:
      "Lorem Ipsum is simply dummy text of the🙄🙄🙄🙄 printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy tex",
  },
  {
    content:
      "e 1500s, when an unknown printer took a galley of type and scrambl",
  },
  {
    content: "ing essen",
  },
  {
    self: true,
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it h🙄🙄🙄🙄as a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', mak",
  },
  { content: "Ipsum is that it has a more-or-less normal" },
  { self: true, content: " a more-or-less normal" },
  {
    content: "odel text",
  },
  {
    content:
      "f using Lorem Ipsum is that it ha🙄🙄🙄🙄s a more-or-less normal distribution of letters, as opposed to using 'Content here, content ",
    self: true,
  },
  {
    content: "Lorem Ipsum is that it has a ",
  },
  {
    content: "rem Ipsum is ",
  },
  {
    content: " ok!",
  },
  {
    self: true,
    content:
      "Where does it come from Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making i🙄🙄🙄🙄t over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum",
  },
  {
    self: true,
    content:
      "a, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word",
  },
  {
    content: " up one of the m",
  },
  {
    content:
      "of the more obscure🙄🙄🙄🙄 Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literatu",
  },
  {
    content: "does it come from Contra",
  },
  {
    content: "So, lets meet. iits been a long time",
  },
  { self: true, content: "okay" },
  {
    content: "asdasd",
  },
  {
    content: "🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄",
  },
];

const Messages = ({ messages }: { messages: IMessageItem[] | [] }) => {
  // fetch all messages of the current conversation

  const chatDetail = useChatStore((state: ChatStoreState) => state);
  const self = useGlobalStore((state: GlobalStoreState) => state.user);

  return (
    <div className="flex flex-col gap-2 py-4">
      {messages?.map((msg: any, idx: number) => (
        <div
          className={twMerge(
            msg?.sender?._id === self?._id ? "ml-auto" : "",
            "w-fit  max-w-[60%]"
          )}
          key={idx}
        >
          <Message
            idx={idx}
            self={msg?.sender?._id === self?._id}
            // content={msg.text}
            data={msg}
          />
        </div>
      ))}
    </div>
  );
};

const Message = ({
  self,
  data,
  idx,
}: {
  self: boolean;
  data: IMessageItem;
  idx: number;
}) => {
  return (
    <div className="flex items-start gap-2 ">
      {!self && (
        <Tooltip content={data?.sender?.username}>
          <Avatar src={data?.sender?.avatar?.url} className="h-6 w-6" />
        </Tooltip>
      )}

      <div
        className={twMerge(
          "p-2 w-fit rounded-md flex min-w-[150px] flex-col border bg-[#ddd] dark:bg-[#212C32] dark:border-transparent gap-1 group overflow-hidden",
          self ? "bg-[rgba(0,0,0,.8)] text-white" : ""
        )}
      >
        <div className="flex gap-3">
          <p className="text-sm">{data?.text}</p>
          <div className="ml-auto translate-x-[160%] transition-all group-hover:translate-x-0">
            <Dropdown placement="bottom-end" className="">
              <DropdownTrigger>
                <Icon
                  icon="akar-icons:chevron-down"
                  fontSize={15}
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem key="new">Reply</DropdownItem>
                  <DropdownItem key="new">React</DropdownItem>
                  <DropdownItem key="new">Forward</DropdownItem>
                  <DropdownItem key="new">Pin</DropdownItem>
                  <DropdownItem key="new">Star</DropdownItem>
                  <DropdownItem
                    key="new"
                    className="text-danger"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <small className="ml-auto text-[10px] opacity-60 dark:opacity-50">
          {convertTimeToHHMM(data?.createdAt)}
        </small>
      </div>
    </div>
  );
};

export default Messages;
