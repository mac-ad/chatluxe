import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";

const ContactInfo = ({
  showContactDetailHandler,
}: {
  showContactDetailHandler: Function;
}) => {
  const chatDetail = useChatStore((state: ChatStoreState) => state);

  return (
    <div className="p-4 border-l dark:border-l-[rgba(255,255,255,.2)]">
      <div className="flex items-center gap-6 mb-10">
        <Icon
          icon="charm:arrow-left"
          fontSize={20}
          className="cursor-pointer xl:hidden "
          onClick={() => showContactDetailHandler()}
        />
        <Icon
          icon="maki:cross"
          fontSize={20}
          className="cursor-pointer hidden xl:block"
          onClick={() => showContactDetailHandler()}
        />
        <h1 className="text-2xl font-bold">Contact Info</h1>
      </div>
      {/* group image */}
      <div className="flex flex-col items-center justify-center gap-2  ">
        <Avatar
          src={
            chatDetail?.isGroupConversation
              ? ""
              : chatDetail?.recieverDetail?.avatar?.url
          }
          className="h-[180px] w-[180px]"
        />
        <div>
          <h3>
            {chatDetail?.isGroupConversation
              ? chatDetail?.name
              : chatDetail?.recieverDetail?.username}
          </h3>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ContactInfo;
