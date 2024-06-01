import { IconOnlyNavItems, IconOnlyNavItem, NavEnum } from "@/constants/nav";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Dispatch, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const IconOnlyNav = ({
  activeItem,
  onClick,
}: {
  activeItem: NavEnum;
  onClick: Function;
}) => {
  const toggleTheme = useGlobalStore(
    (state: GlobalStoreState) => state.toggleTheme
  );
  const theme = useGlobalStore((state: GlobalStoreState) => state.theme);

  const { logOutUser, user } = useGlobalStore(
    (state: GlobalStoreState) => state
  );

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 ">
      <Tooltip content={user?.username} placement="right">
        <div
          onClick={() => {}}
          className={twMerge(
            // idx === IconOnlyNavItems?.length - 1 ? "mt-auto" : "",
            "w-[40px] rounded-md aspect-square dark:text-[#ddd] flex items-center justify-center cursor-pointer dark:hover:text-white transition-all"
          )}
        >
          <Avatar src={user?.avatar?.url} />
        </div>
      </Tooltip>
      {IconOnlyNavItems?.map((item: IconOnlyNavItem, idx: number) =>
        item?.key === NavEnum.THEME ? (
          <Switch
            key={idx}
            defaultSelected
            size="sm"
            color="default"
            startContent={<Icon icon="solar:sun-2-bold" />}
            endContent={<Icon icon="tabler:moon-filled" />}
            className="rotate-[90deg] mt-auto"
            onClick={() => toggleTheme()}
          />
        ) : (
          <Tooltip
            content={item?.name}
            key={item?.name}
            placement="right"
            className="rounded-md"
          >
            {item?.key === NavEnum.SETTINGS ? (
              <Dropdown backdrop="opaque" placement="top-start" className="">
                <DropdownTrigger>
                  <div className="w-[40px] cursor-pointer rounded-md aspect-square hover:bg-[#ddd] dark:hover:bg-[#364249] flex items-center justify-center">
                    <Icon
                      icon={item?.icon}
                      className="dark:text-white"
                      fontSize={25}
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection>
                    {/* <DropdownItem key="new" shortcut="⌘N" onClick={() => {}}>
                      More Settings
                    </DropdownItem> */}
                    <DropdownItem
                      key="new"
                      endContent={
                        <Icon icon="material-symbols:logout" fontSize={20} />
                      }
                      onClick={() => logOutUser()}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div
                onClick={() => onClick(item?.key)}
                className={twMerge(
                  // idx === IconOnlyNavItems?.length - 1 ? "mt-auto" : "",
                  activeItem === item.key
                    ? "dark:bg-[#364249] bg-[#ddd] dark:text-white"
                    : "",
                  "w-[40px] rounded-md aspect-square dark:text-[#ddd] flex items-center justify-center cursor-pointer dark:hover:text-white transition-all"
                )}
              >
                <Icon icon={item?.icon} fontSize={22} />
              </div>
            )}
          </Tooltip>
        )
      )}

      <Tooltip content="profile"></Tooltip>
    </div>
  );
};

export default IconOnlyNav;
