"use client";

import ChatLists from "@/components/ChatLists/ChatLists";
import IconOnlyNav from "@/components/IconOnlyNav/IconOnlyNav";
import { IconOnlyNavItems, NavEnum } from "@/constants/nav";
import todoService from "@/services/todo/todo.service";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentNav, setCurrentNav] = useState<NavEnum>(
    IconOnlyNavItems[0].key
  );

  return (
    <div className="flex  dark:bg-[#101B20] dark:text-white h-full w-full ">
      {/* leftest nav bar */}
      <div className="dark:border-r-[0] border-r p-2 dark:bg-[#212C32] pt-6 dark:border-r-[rgba(255,255,255,.1)] dark:border-r text-[rgba(0,0,0,.7)]">
        <IconOnlyNav activeItem={currentNav} onClick={setCurrentNav} />
      </div>
      {/* list of friends */}
      <div className="border-r dark:border-r-0  max-w-[350px] flex-1 py-2">
        <ChatLists />
      </div>
      {/* chat Displaying Area */}
      <div className=" p-2">chatdisplay</div>
    </div>
  );
}
