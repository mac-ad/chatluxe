import { ChatStoreState, useChatStore } from "@/store/chatStore";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { Participant } from "@/types/conversations.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";
import { useMemo } from "react";
import UserItem from "../PeopleLists/UserItem";

const ContactInfo = ({
  showContactDetailHandler,
}: {
  showContactDetailHandler: Function;
}) => {
  const chatDetail = useChatStore(
    (state: ChatStoreState) => state.currentChatDetail
  );
  const self = useGlobalStore((state: GlobalStoreState) => state.user);

  const recieverDetail: Participant | undefined | null = useMemo(
    () =>
      chatDetail?.isGroupConversation
        ? null
        : chatDetail?.participants?.filter(
            (item: Participant) => item?._id !== self?._id
          )?.[0],
    [chatDetail]
  );

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
            chatDetail?.isGroupConversation ? "" : recieverDetail?.avatar?.url
          }
          className="h-[180px] w-[180px]"
        />
        <div>
          <h3>
            {chatDetail?.isGroupConversation
              ? chatDetail?.name
              : recieverDetail?.username}
          </h3>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-4">
        {chatDetail?.isGroupConversation && (
          <div>
            <h3 className="text-lg font-semibold opacity-80 mb-1">Admin</h3>
            <div>
              <UserItem data={chatDetail?.admin as Participant} />
            </div>
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold opacity-80 mb-3">
            {chatDetail?.participants?.length! - 1} Members
          </h2>
          {chatDetail?.participants?.map((item: Participant) =>
            item?._id !== chatDetail?.admin?._id ? (
              <UserItem data={item} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
