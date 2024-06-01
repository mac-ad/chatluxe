import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Tooltip } from "@nextui-org/react";
import React from "react";

const AvatarWithIcon = ({
  src,
  icon,
  onIconClick,
  tooltipContent,
}: {
  src: string;
  icon: string;
  onIconClick: Function;
  tooltipContent?: string;
}) => {
  return tooltipContent ? (
    <Tooltip content={tooltipContent} onClick={() => onIconClick()}>
      <div className="relative">
        <Avatar src={src} data-hover={() => {}} />
        <Icon
          icon={icon}
          className="absolute right-0 top-0 hidden"
          onClick={() => onIconClick()}
        />
      </div>
    </Tooltip>
  ) : (
    <div className="relative" onClick={() => onIconClick()}>
      <Avatar src={src} />
      <Icon
        icon={icon}
        className="absolute right-0 top-0"
        onClick={() => onIconClick()}
      />
    </div>
  );
};

export default AvatarWithIcon;
