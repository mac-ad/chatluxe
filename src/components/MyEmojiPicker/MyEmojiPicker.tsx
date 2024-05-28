import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const MyEmojiPicker = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const toggle = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div className="relative ">
      <div
        onClick={toggle}
        className="w-[40px] cursor-pointer rounded-full aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center"
      >
        <Icon icon="fluent:emoji-angry-24-regular" fontSize={25} />
      </div>
      {showEmojiPicker && (
        <div className="absolute top-0 translate-y-[-100%]">
          <Picker data={data} onEmojiSelect={console.log} className="" />
        </div>
      )}
    </div>
  );
};

export default MyEmojiPicker;
