import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import MyEmojiPicker from "../MyEmojiPicker/MyEmojiPicker";
import { useForm } from "react-hook-form";
import { ChatStoreState, useChatStore } from "@/store/chatStore";
import messageService from "@/services/message/message.service";
import FileUploadComponent from "../FileUploadComponent/FileUploadComponent";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IMessageItem } from "@/types/messages.types";
import { useSocket } from "@/lib/context/socket-context";
import { SOCKET_EVENTS } from "@/constants/common";

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
    name: "Audio",
    icon: "lucide:audio-waveform",
    color: "#01A885",
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

const MessageType = ({
  setMessages,
}: {
  setMessages?: Dispatch<SetStateAction<IMessageItem[] | []>>;
}) => {
  const chatStore = useChatStore((state: ChatStoreState) => state);
  const chatDetail = useChatStore(
    (state: ChatStoreState) => state.currentChatDetail
  );

  const [showFileUpload, setShowFileUpload] = useState<boolean>(false);
  const { socket } = useSocket();

  const { handleSubmit, setValue, watch, register } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const defaultValues = watch();

  const onSubmit = async (data: any) => {
    setValue("text", "");
    const payload = { ...data };
    console.log("data = ", data);
    if (data?.text === "") return;

    // const formdata = new FormData();
    // formdata.append("file", data?.images?.[0]);

    // console.log(data?.images?.[0]);

    // console.log("formdata = ", formdata);

    try {
      const res = await messageService.sendMessage({
        conversationId: chatDetail?._id!,
        payload: payload,
      });

      // add new message to the message list
      chatStore.addMessageToMessages(res.data);

      // emit recieved message socket
      // for this current logged in user update chat
    } catch (err) {}
  };

  // change this later type change
  const emojiChangeHandler = (value: any) => {
    // console.log("value = ", value);
    setValue("text", defaultValues?.text + " " + value?.native);
  };

  return (
    <div className="flex items-center gap-1">
      {/* emoji */}
      <MyEmojiPicker changeHandler={emojiChangeHandler} />

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
                onClick={() => setShowFileUpload(true)}
                key={idx}
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
      <form
        action=""
        className="flex-1 flex items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          value={defaultValues?.text}
          placeholder="Type a message"
          onChange={(e: any) => {
            setValue("text", e.target.value);
          }}
          className="p-3 px-4 rounded-md w-full border dark:border-none dark:bg-[#2A3843] outline-none"
          autoFocus
        />
        {/* voice or submit */}
        <Button className="bg-transparent" size="sm" type="submit">
          {/* <Icon icon="icon-park-solid:voice" fontSize={25} /> */}
          <Icon icon="majesticons:send" fontSize={30} />
        </Button>
      </form>

      {/* file upload component */}
      {/* <div
        className={twMerge(
          " absolute top-[70px] left-0 w-full h-[calc(100vh-74px)] dark:bg-[#101B20] bg-white z-[200] p-2 transition-all translate-y-[100%]",
          showFileUpload ? "translate-y-0" : ""
        )}
      > */}
      <Modal
        isOpen={showFileUpload}
        // isOpen={true}
        size="4xl"
        onClose={() => setShowFileUpload(false)}
        className="p-8"
        backdrop="opaque"
      >
        <ModalContent>
          <FileUploadComponent
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            defaultValues={defaultValues}
          />
        </ModalContent>
      </Modal>

      {/* </div> */}
    </div>
  );
};

export default MessageType;
