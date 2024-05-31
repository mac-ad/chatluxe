"use client";

import ChatDetail from "@/components/ChatDetail/ChatDetail";
import ChatLists from "@/components/ChatLists/ChatLists";
import IconOnlyNav from "@/components/IconOnlyNav/IconOnlyNav";
import PeopleLists from "@/components/PeopleLists/PeopleLists";
import { IconOnlyNavItems, NavEnum } from "@/constants/nav";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import React, { useState } from "react";

const App = () => {
  const currentNav = useGlobalStore(
    (state: GlobalStoreState) => state.currentNav
  );
  const store = useGlobalStore((state: GlobalStoreState) => state);

  const changeNav = (key: String) => {
    store.add("currentNav", key);
  };

  return (
    <div className="flex dark:bg-[#101B20] dark:text-white h-full w-full ">
      {/* leftest nav bar */}
      <div className="dark:border-r-[0] border-r p-2 dark:bg-[#212C32] pt-6 dark:border-r-[rgba(255,255,255,.1)] dark:border-r text-[rgba(0,0,0,.7)]">
        <IconOnlyNav activeItem={currentNav} onClick={changeNav} />
      </div>
      {/* list of friends */}
      <div className="border-r  max-w-[350px] flex-1   dark:border-r-[rgba(255,255,255,.1)]  ">
        {currentNav === NavEnum.CHATS && <ChatLists />}
        {currentNav === NavEnum.PEOPLE && <PeopleLists />}
      </div>
      {/* chat Displaying Area */}
      <div className="flex-1">
        <ChatDetail />
      </div>
    </div>
  );
};

export default App;
