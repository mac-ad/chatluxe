import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="border p-2 w-full rounded-md outline-none pr-8  dark:bg-[#212C32] dark:border-none"
      />
      <Icon
        icon="bx:search"
        className="absolute right-2 top-[50%] translate-y-[-50%]"
      />
    </div>
  );
};

export default Search;
