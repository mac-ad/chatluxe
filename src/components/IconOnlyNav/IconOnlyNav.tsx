import { IconOnlyNavItems, IconOnlyNavItem, NavEnum } from "@/constants/nav";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch, Tooltip } from "@nextui-org/react";
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

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 ">
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
          </Tooltip>
        )
      )}

      <Tooltip content="profile"></Tooltip>
    </div>
  );
};

export default IconOnlyNav;
