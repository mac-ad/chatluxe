import { UserShort } from "@/types/auth.types";
import { Avatar, Tooltip } from "@nextui-org/react";
import AvatarWithIcon from "../AvatarWithIcon/AvatarWithIcon";

const SelectedMember = ({
  data,
  onCross,
}: {
  data: UserShort;
  onCross: Function;
}) => {
  return (
    <div
      className="rounded-md flex items-center w-fit cursor-pointer"
      onClick={() => onCross()}
    >
      <AvatarWithIcon
        icon="maki:cross"
        src={data?.avatar?.url}
        onIconClick={onCross}
        tooltipContent={data?.username}
      />
      {/* <span className="text-tiny">{data?.username}</span> */}
    </div>
  );
};

export default SelectedMember;
